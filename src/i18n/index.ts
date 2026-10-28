// The words of the pages outside the docs and of the shared components, one
// file per language. The docs are Markdown per language: English in
// src/content/docs/docs/, the others in src/content/docs/<code>/docs/.
import en from "./en.json";
import es from "./es.json";
import { LANGUAGES } from "./languages.mjs";

export type Text = typeof en;

// Every language has every text: a missing one fails astro check
const TEXT = { en, es } satisfies Record<string, Text>;

export type Lang = keyof typeof TEXT;

export const DEFAULT_LANG: Lang = "en";

export const LANGUAGE_NAMES = LANGUAGES as { code: Lang; name: string }[];

/** The page's language, from Astro.currentLocale. */
export function langOf(locale: string | undefined): Lang {
  return locale && locale in TEXT ? (locale as Lang) : DEFAULT_LANG;
}

export function textOf(lang: Lang): Text {
  return TEXT[lang];
}

/** Fills a text's {name}s. Texts with links or emphasis are HTML (set:html). */
export function fill(text: string, params: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? params[name] : match,
  );
}

/** A root-relative link in that language: /docs/ is /es/docs/ in Spanish. */
export function localize(href: string, lang: Lang): string {
  return lang === DEFAULT_LANG || !href.startsWith("/")
    ? href
    : `/${lang}${href}`;
}

/** This page's path in another language. */
export function twinPath(path: string, lang: Lang): string {
  const prefix = LANGUAGE_NAMES.find(
    ({ code }) => code !== DEFAULT_LANG && path.startsWith(`/${code}/`),
  );
  return localize(prefix ? path.slice(prefix.code.length + 1) : path, lang);
}
