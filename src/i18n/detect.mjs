// Opens each page in the visitor's language. It runs inline in every page's
// <head>, after the canonical and hreflang links, before anything paints:
// Base.astro's, and the docs' through Starlight's `head` (astro.config.mjs).
//
// - A language picked with LanguageLink wins.
// - Without one, a default-language page entered from outside the site (another
//   site, a typed URL, the app) follows the browser's first language the site
//   has, by base subtag: es-PE is Spanish. Other languages' pages never move
//   without a pick, so a shared link keeps its language, and links inside the
//   site never move a visitor whose storage is blocked.
// - The twin is the page's own hreflang alternate, and only a page whose
//   canonical path is the address bar's moves: the 404 GitHub Pages serves at
//   any missing path never does.
import { LANGUAGES } from "./languages.mjs";

export const PICK_KEY = "tokio-language";

export const DETECT_LANGUAGE = `(() => {
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical || new URL(canonical.href).pathname !== location.pathname) return;
  const here = document.documentElement.lang;
  const twins = new Map(
    [...document.querySelectorAll('link[rel="alternate"][hreflang]')]
      .filter((link) => link.hreflang !== "x-default")
      .map((link) => [link.hreflang, new URL(link.href).pathname]),
  );
  let wanted = null;
  try {
    wanted = localStorage.getItem("${PICK_KEY}");
  } catch {}
  if (!wanted && here === "${LANGUAGES[0].code}" && !document.referrer.startsWith(location.origin)) {
    wanted = (navigator.languages || [navigator.language])
      .map((tag) => tag.toLowerCase().split(/[-_]/)[0])
      .find((code) => twins.has(code));
  }
  const twin = wanted && wanted !== here && twins.get(wanted);
  if (twin) location.replace(twin + location.search + location.hash);
})();`;
