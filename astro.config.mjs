// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { DETECT_LANGUAGE } from "./src/i18n/detect.mjs";
import { LANGUAGES } from "./src/i18n/languages.mjs";

// The first language at the root, the others under /<code>/. Starlight writes
// Astro's i18n config from these, which sets Astro.currentLocale on every page.
const [root, ...others] = LANGUAGES;
const locales = {
  root: { label: root.name, lang: root.code },
  ...Object.fromEntries(
    others.map(({ code, name }) => [code, { label: name, lang: code }]),
  ),
};

// https://astro.build/config
export default defineConfig({
  // Custom domain on GitHub Pages, so no `base`. Must match public/CNAME.
  site: "https://tokio.ialfaro.com",
  trailingSlash: "always",
  // The overlay previews, from the overlays' releases (src/lib/overlays.ts).
  // GitHub redirects downloads to release-assets.githubusercontent.com, and
  // Astro checks every redirect against these.
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/tokio-app/overlays/releases/download/**",
      },
      { protocol: "https", hostname: "*.githubusercontent.com" },
    ],
  },
  integrations: [
    // Starlight also generates the sitemap because `site` is set.
    starlight({
      title: "Tokio",
      description:
        "Make your TikTok LIVE react to chat, gifts and follows: text-to-speech, music requests, sound alerts, a countdown timer and overlays.",
      logo: { src: "./src/assets/icon.png", alt: "Tokio" },
      favicon: "/favicon.ico",
      locales,
      // After Starlight's canonical and hreflang links: see detect.mjs
      head: [{ tag: "script", content: DETECT_LANGUAGE }],
      customCss: [
        "@fontsource-variable/archivo/wdth.css",
        "./src/styles/tokens.css",
        "./src/styles/starlight.css",
      ],
      components: {
        // Dark only, like the rest of the site: no theme switch
        ThemeProvider: "./src/components/DarkOnly.astro",
        ThemeSelect: "./src/components/DarkOnly.astro",
        // The site header's link to the other language, not a select
        LanguageSelect: "./src/components/LanguageLink.astro",
      },
      expressiveCode: {
        // The plain frame for shell code too: the terminal frame draws
        // window dots.
        defaultProps: { frame: "code" },
        // Code blocks are panels
        styleOverrides: { borderRadius: "8px" },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/tokio-app/tokio",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/tokio-app/website/edit/main/",
      },
      lastUpdated: true,
      // Pages show their title in their language. Groups and links take a
      // `translations` per language. Starlight adds /<code> to the links.
      sidebar: [
        {
          label: "Getting started",
          items: ["docs", "docs/install", "docs/connect"],
        },
        {
          label: "Features",
          items: [
            "docs/features/text-to-speech",
            "docs/features/music-requests",
            "docs/features/alerts",
            "docs/features/games",
            "docs/features/overlays",
            "docs/features/countdown-timer",
            "docs/features/profiles-and-settings",
          ],
        },
        {
          label: "Guides",
          items: ["docs/guides/adding-an-overlay"],
        },
        {
          label: "Overlay developers",
          items: [
            "docs/developers/building-an-overlay",
            "docs/developers/events",
            "docs/developers/building-from-source",
          ],
        },
        {
          label: "More",
          items: [
            { label: "Overlays", link: "/overlays/" },
            { label: "Download", link: "/download/" },
            { label: "About and license", link: "/about/" },
          ],
        },
      ],
    }),
  ],
});
