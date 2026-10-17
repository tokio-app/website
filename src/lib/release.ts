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
  file: string;
  url: string;
  size?: number;
}

export interface Release {
  version: string;
  url: string;
  publishedAt: string;
  installers: Download[];
  packages: Download[];
}

// The installer names have no version, so these links always point at the
// latest published release. Keep in sync with the app's release workflow.
const INSTALLERS: Omit<Download, "url">[] = [
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
    file: "Tokio-Installer-mac-arm64.zip",
  },
  {
    os: "mac",
    label: "macOS",
    arch: "Intel",
    file: "Tokio-Installer-mac-x64.zip",
  },
  {
    os: "linux",
    label: "Linux",
    arch: "x64",
    file: "Tokio-Installer-linux-x64.tar.gz",
  },
];

// The app's own packages carry the version, so they're matched by suffix.
// Patterns follow `artifactName` in the app's electron-builder.yml.
const PACKAGES: (Omit<Download, "url" | "file"> & { pattern: RegExp })[] = [
  {
    os: "windows",
    label: "Windows setup",
    arch: "x64",
    pattern: /-setup\.exe$/,
  },
  {
    os: "mac",
    label: "macOS",
    arch: "Apple Silicon",
    pattern: /-mac-arm64\.zip$/,
  },
  { os: "mac", label: "macOS", arch: "Intel", pattern: /-mac-x64\.zip$/ },
  { os: "linux", label: "Linux AppImage", arch: "x64", pattern: /\.AppImage$/ },
];

/** Installer links that work without the GitHub API. */
export const FALLBACK_INSTALLERS: Download[] = INSTALLERS.map((i) => ({
  ...i,
  url: `${LATEST_RELEASE_URL}/download/${i.file}`,
}));

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

    const installers = FALLBACK_INSTALLERS.map((i) => {
      const asset = assets.get(i.file);
      return asset ? { ...i, size: asset.size } : i;
    });

    const packages = PACKAGES.flatMap(({ pattern, ...p }) => {
      const asset = data.assets.find((a) => pattern.test(a.name));
      if (!asset) return [];
      return [
        {
          ...p,
          file: asset.name,
          url: asset.browser_download_url,
          size: asset.size,
        },
      ];
    });

    return {
      version: data.tag_name.replace(/^v/, ""),
      url: data.html_url,
      publishedAt: data.published_at,
      installers,
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
