// Release info for the download links, read from GitHub at build time.

export const REPO = "tokio-app/tokio";
export const REPO_URL = `https://github.com/${REPO}`;
export const RELEASES_URL = `${REPO_URL}/releases`;
export const LATEST_RELEASE_URL = `${RELEASES_URL}/latest`;

export type OS = "windows" | "mac" | "linux";

export interface Download {
  os: OS;
  label: string;
  arch: string;
  /** Unknown for the app's packages when GitHub can't be reached. */
  file?: string;
  url: string;
  size?: number;
}

export interface Release {
  version: string;
  url: string;
  publishedAt: string;
  downloads: Download[];
  packages: Download[];
}

type Source = Omit<Download, "url" | "file" | "size">;

// What each system downloads: the installer on Windows, the app itself on
// macOS and Linux. The installer's name has no version, so its link always
// points at the latest published release. The app's packages carry the
// version, so they're matched by suffix; patterns follow `artifactName` in the
// app's electron-builder.yml. Keep in sync with the app's release workflow.
const DOWNLOADS: (Source & ({ file: string } | { pattern: RegExp }))[] = [
  {
    os: "windows",
    label: "Windows",
    arch: "x64",
    file: "Tokio-Installer-windows-x64.exe",
  },
  {
    os: "mac",
    label: "macOS",
    arch: "Apple Silicon",
    pattern: /-mac-arm64\.zip$/,
  },
  { os: "mac", label: "macOS", arch: "Intel", pattern: /-mac-x64\.zip$/ },
  { os: "linux", label: "Linux", arch: "x64", pattern: /-x86_64\.AppImage$/ },
];

// The app's own Windows setup, for those who skip the installer.
const PACKAGES: (Source & { pattern: RegExp })[] = [
  {
    os: "windows",
    label: "Windows setup",
    arch: "x64",
    pattern: /-setup\.exe$/,
  },
];

/**
 * Download links that work without the GitHub API. The app's packages link to
 * the latest release's page, since their names carry the version.
 */
export const FALLBACK_DOWNLOADS: Download[] = DOWNLOADS.map(
  ({ os, label, arch, ...source }) =>
    "file" in source
      ? {
          os,
          label,
          arch,
          file: source.file,
          url: `${LATEST_RELEASE_URL}/download/${source.file}`,
        }
      : { os, label, arch, url: LATEST_RELEASE_URL },
);

interface GitHubAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  html_url: string;
  published_at: string;
  assets: GitHubAsset[];
}

let cached: Promise<Release | null> | undefined;

/**
 * The latest published release, or null when GitHub can't be reached.
 * Fetched once per build. Uses GITHUB_TOKEN when set, to avoid rate limits in CI.
 */
export function getLatestRelease(): Promise<Release | null> {
  cached ??= fetchLatestRelease();
  return cached;
}

async function fetchLatestRelease(): Promise<Release | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "tokio-website",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases/latest`,
      { headers, signal: AbortSignal.timeout(10_000) },
    );
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
    const data = (await res.json()) as GitHubRelease;
    const assets = new Map(data.assets.map((a) => [a.name, a]));

    const fromAsset = (d: Source, asset: GitHubAsset): Download => ({
      ...d,
      file: asset.name,
      url: asset.browser_download_url,
      size: asset.size,
    });

    // A file missing from the release keeps its fallback link.
    const downloads = DOWNLOADS.map(({ os, label, arch, ...source }, i) => {
      const fallback = FALLBACK_DOWNLOADS[i];
      if ("file" in source) {
        const asset = assets.get(source.file);
        return asset ? { ...fallback, size: asset.size } : fallback;
      }
      const asset = data.assets.find((a) => source.pattern.test(a.name));
      return asset ? fromAsset({ os, label, arch }, asset) : fallback;
    });

    const packages = PACKAGES.flatMap(({ pattern, ...p }) => {
      const asset = data.assets.find((a) => pattern.test(a.name));
      return asset ? [fromAsset(p, asset)] : [];
    });

    return {
      version: data.tag_name.replace(/^v/, ""),
      url: data.html_url,
      publishedAt: data.published_at,
      downloads,
      packages,
    };
  } catch (error) {
    console.warn(
      `[release] Using fallback download links: ${(error as Error).message}`,
    );
    return null;
  }
}

export function formatSize(bytes?: number): string {
  if (!bytes) return "";
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
