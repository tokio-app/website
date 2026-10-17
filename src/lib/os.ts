// Runs in the browser. Guesses the visitor's desktop OS for the download links.

import type { OS } from "./release";

export const OS_LABELS: Record<OS, string> = {
  windows: "Windows",
  mac: "macOS",
  linux: "Linux",
};

/** The visitor's desktop OS, or null on phones, tablets and unknown systems. */
export function detectOS(): OS | null {
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string; mobile?: boolean };
  };
  const ua = nav.userAgent.toLowerCase();
  if (nav.userAgentData?.mobile || /android|iphone|ipad|ipod/.test(ua)) {
    return null;
  }

  // Firefox and Safari have no userAgentData; their user agent names the OS.
  const platform = (nav.userAgentData?.platform || ua).toLowerCase();

  if (platform.includes("win")) return "windows";
  // iPads report a Mac platform but have touch.
  if (platform.includes("mac")) return nav.maxTouchPoints > 1 ? null : "mac";
  if (platform.includes("linux")) return "linux";
  return null;
}
