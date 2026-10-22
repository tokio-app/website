// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

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
        "Make your TikTok LIVE react to chat, gifts and follows: text-to-speech, music requests, sound alerts and overlays.",
      logo: { src: "./src/assets/icon.png", alt: "Tokio" },
      favicon: "/favicon.ico",
      customCss: [
        "@fontsource-variable/archivo/wdth.css",
        "./src/styles/tokens.css",
        "./src/styles/starlight.css",
      ],
      // Dark only, like the rest of the site: no theme switch
      components: {
        ThemeProvider: "./src/components/DarkOnly.astro",
        ThemeSelect: "./src/components/DarkOnly.astro",
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
      sidebar: [
        {
          label: "Getting started",
          items: [
            { label: "Introduction", slug: "docs" },
            { label: "Install", slug: "docs/install" },
            { label: "Connect to your LIVE", slug: "docs/connect" },
          ],
        },
        {
          label: "Features",
          items: [
            { label: "Text-to-speech", slug: "docs/features/text-to-speech" },
            { label: "Music requests", slug: "docs/features/music-requests" },
            { label: "Alerts", slug: "docs/features/alerts" },
            { label: "Overlays", slug: "docs/features/overlays" },
            {
              label: "Profiles and settings",
              slug: "docs/features/profiles-and-settings",
            },
          ],
        },
        {
          label: "Guides",
          items: [
            {
              label: "Adding an overlay",
              slug: "docs/guides/adding-an-overlay",
            },
          ],
        },
        {
          label: "Overlay developers",
          items: [
            {
              label: "Building an overlay",
              slug: "docs/developers/building-an-overlay",
            },
            { label: "Events", slug: "docs/developers/events" },
            {
              label: "Building Tokio from source",
              slug: "docs/developers/building-from-source",
            },
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
