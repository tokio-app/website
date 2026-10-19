// The official overlays, read at build time from the catalog that
// tokio-app/overlays publishes with every release (format in its README).

export const OVERLAYS_REPO_URL = "https://github.com/tokio-app/overlays";
export const OVERLAYS_RELEASE_URL = `${OVERLAYS_REPO_URL}/releases/latest`;

const CATALOG_URL = `${OVERLAYS_REPO_URL}/releases/latest/download/overlays.json`;
// Zips and previews only come from that repo's releases.
const RELEASES_PREFIX = `${OVERLAYS_REPO_URL}/releases/download/`;

export interface Overlay {
  /** Its folder name, and its path in Tokio's overlay URL. Never changes. */
  id: string;
  name: string;
  version: string;
  description: string;
  /** The zip and its size in bytes. */
  url: string;
  size: number;
  preview: string | null;
}

let cached: Promise<Overlay[] | null> | undefined;

/**
 * The official overlays, or null when the catalog can't be read. Fetched once
 * per build.
 */
export function getOverlays(): Promise<Overlay[] | null> {
  cached ??= fetchOverlays();
  return cached;
}

async function fetchOverlays(): Promise<Overlay[] | null> {
  try {
    const res = await fetch(CATALOG_URL, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
    const data: unknown = await res.json();
    // Schema 1 is the format this site reads. A new one renames or removes
    // fields, see the overlays repo's README.
    if (!isRecord(data) || data.schema !== 1 || !Array.isArray(data.overlays)) {
      throw new Error("it isn't a schema 1 catalog");
    }
    return data.overlays.filter(isOverlay).map((overlay) => ({
      id: overlay.id,
      name: overlay.name,
      version: overlay.version,
      description: overlay.description,
      url: overlay.url,
      size: overlay.size,
      preview: isRelease(overlay.preview) ? overlay.preview : null,
    }));
  } catch (error) {
    console.warn(`[overlays] No overlay list: ${(error as Error).message}`);
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Entries that can't be shown are left out.
function isOverlay(value: unknown): value is Overlay {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.id) &&
    typeof value.name === "string" &&
    typeof value.version === "string" &&
    typeof value.description === "string" &&
    typeof value.size === "number" &&
    isRelease(value.url) &&
    (value.preview === null || typeof value.preview === "string")
  );
}

function isRelease(url: unknown): url is string {
  return (
    typeof url === "string" &&
    URL.canParse(url) &&
    new URL(url).href.startsWith(RELEASES_PREFIX)
  );
}
