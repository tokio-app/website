// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  // Custom domain on GitHub Pages, so no `base`. Must match public/CNAME.
  site: "https://tokio.ialfaro.com",
  trailingSlash: "always",
  integrations: [
    // Starlight also generates the sitemap because `site` is set.
    starlight({
      title: "Tokio",
      description:
        "Make your TikTok LIVE react to chat, gifts and follows: text-to-speech, music requests, sound alerts and overlays.",
      logo: { src: "./src/assets/icon.png", alt: "Tokio" },
      favicon: "/favicon.ico",
      customCss: ["./src/styles/tokens.css", "./src/styles/starlight.css"],
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
            { label: "Download", link: "/download/" },
            { label: "About and license", link: "/about/" },
          ],
        },
      ],
    }),
  ],
});
