# Tokio website

The website for [Tokio](https://github.com/tokio-app/tokio), the desktop app that makes your TikTok LIVE react to chat, gifts and follows. Live at [tokio.ialfaro.com](https://tokio.ialfaro.com).

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Development

Requires Node.js 24+ and Yarn 1.

```sh
yarn install
yarn dev        # dev server at http://localhost:4321
yarn build      # type-check and build into dist/
yarn preview    # serve dist/
yarn format     # prettier
```

| Path                | Content                                     |
| ------------------- | ------------------------------------------- |
| `src/pages/`        | Landing, overlays, download and about pages |
| `src/content/docs/` | Docs, served under `/docs/`                 |
| `src/components/`   | Components for the pages outside the docs   |
| `src/styles/`       | Design tokens and base styles               |

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages (`.github/workflows/deploy.yml`). The download page reads the latest Tokio release and the overlays page the latest overlays catalog at build time, so the workflow also runs by hand and on a `repository_dispatch` event of type `release`, which the release workflows of Tokio and of the overlays send.

## License

The website's source is licensed under the [MIT License](LICENSE), except the vendored `.claude/skills/frontend-design/` (Apache-2.0). It self-hosts the [Archivo](https://github.com/Omnibus-Type/Archivo) typeface, under the [SIL Open Font License 1.1](https://openfontlicense.org). Tokio is MIT-licensed too, except one LGPL-3.0-only file; see its [repository](https://github.com/tokio-app/tokio) for details.
