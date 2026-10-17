# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

The website for Tokio at `https://tokio.ialfaro.com`: a landing page, a download page, the docs and an about/legal page. English only.

Tokio itself is an Electron desktop app (Windows, macOS, Linux) that connects to a TikTok LIVE and reacts to its events with text-to-speech, music requests (Spotify/YouTube), sound alerts and browser-source overlays. It lives in `tokio-app/tokio` (locally `../tokio`) and has its own `AGENTS.md`.

Stack: Astro 7, Starlight, TypeScript (strict), Yarn 1, Node >= 24. The site is static and deployed to GitHub Pages from `tokio-app/website`.

## Commands

```sh
yarn dev           # dev server at http://localhost:4321
yarn build         # astro check + astro build into dist/
yarn preview       # serve dist/
yarn typecheck     # astro check
yarn format        # prettier --write .
yarn format:check  # prettier --check . (CI runs this)
```

Verify changes with `yarn typecheck`, `yarn build` and `yarn format:check`. For layout changes, also check the pages at phone width (375px) in `yarn dev`.

## Agent models

- **Planning:** use **Opus 5.5 at high effort**. Before handing off or starting the implementation, be 90–95% confident in the plan. If you aren't, keep reading code or ask the user until you are.
- **Implementation:** when delegating to a subagent, use **Sonnet 5.5 at high effort** when it can do the work: well-scoped changes that follow existing patterns (a new docs page, a new section on a page).
- Otherwise use **Opus 5.5**: medium effort for moderate tasks, high effort for complex or cross-cutting ones (the release fetching, the deploy workflow, licensing text).

## Layout

| Path                           | Role                                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| `src/pages/`                   | The pages outside the docs: `index.astro` (landing), `download.astro`, `about.astro`          |
| `src/content/docs/docs/`       | Docs in Markdown/MDX, served under `/docs/` by Starlight                                      |
| `src/layouts/Base.astro`       | Layout for `src/pages/`: head tags, `Header`, `Footer`                                        |
| `src/components/`              | `Header`, `Footer`, `Icon`, `DownloadButton`, `DownloadTable`, `LiveFeed` (hero illustration) |
| `src/lib/release.ts`           | Reads the latest Tokio release from the GitHub API at build time                              |
| `src/lib/os.ts`                | Browser-side OS detection for the download links                                              |
| `src/styles/tokens.css`        | Design tokens, shared by both layouts                                                         |
| `src/styles/site.css`          | Base styles and utility classes (`.btn`, `.card`, `.section`, `.prose`) for `src/pages/`      |
| `src/styles/starlight.css`     | Maps the tokens onto Starlight's `--sl-color-*` variables (dark and light)                    |
| `src/assets/`                  | Images processed by Astro (`icon.png`, screenshots)                                           |
| `public/`                      | Served as is: `favicon.ico`, `icon.png`, `CNAME`, `robots.txt`                                |
| `astro.config.mjs`             | Site URL, Starlight config and the docs sidebar                                               |
| `.github/workflows/deploy.yml` | Builds and deploys to GitHub Pages                                                            |

`dist/` and `.astro/` are generated. Don't edit them.

## Architecture

### Pages and docs

- Starlight owns the docs and the 404 page. The docs live in `src/content/docs/docs/` so their URLs start with `/docs/`. Don't put files directly in `src/content/docs/`: they'd take root URLs and clash with `src/pages/`.
- A new docs page needs an entry in the `sidebar` in `astro.config.mjs`. Use Starlight's components (`Card`, `LinkCard`, `Steps`, `Tabs`, asides with `:::note`/`:::tip`/`:::caution`) in `.mdx` files.
- Pages outside the docs use `Base.astro` and the classes in `site.css`. Page-specific styles go in the page's scoped `<style>`.
- URLs end with a slash (`trailingSlash: "always"`). Write internal links as `/docs/install/`, not `/docs/install`.

### Download links

- `getLatestRelease()` in `src/lib/release.ts` fetches `repos/tokio-app/tokio/releases/latest` once per build. Only published, non-draft releases count. It uses `GITHUB_TOKEN` when set and returns `null` when GitHub can't be reached; pages must still build and work then.
- `DOWNLOADS` is one card per system: the installer on Windows, the app itself on macOS and Linux. The installer is only worth it on Windows; the app's releases still carry the macOS and Linux installers, but the site doesn't link to them.
- The installer's name has no version (`Tokio-Installer-windows-x64.exe`), so its `FALLBACK_DOWNLOADS` link goes to `releases/latest/download/<file>` and always works.
- The app's own packages carry the version (`tokio-<version>-setup.exe`, `-mac-arm64.zip`, `-mac-x64.zip`, `-x86_64.AppImage`) and are matched by suffix. Without the GitHub API, the macOS and Linux cards link to the latest release's page instead. `PACKAGES` holds only the Windows setup, for those who skip the installer. The names come from `artifactName` in the app's `electron-builder.yml` and the upload paths in its `release.yml`; keep `DOWNLOADS` and `PACKAGES` in sync when those change.
- The site is static, so the version only changes on rebuild. `deploy.yml` runs on push to `main`, by hand, and on a `repository_dispatch` of type `release`.
- `DownloadButton` links to `/download/` and, after OS detection, straight to the installer on Windows and to the AppImage on Linux. Linux only gets the direct link when the build read the release, since the AppImage's name carries the version. macOS has two zips (Apple Silicon and Intel), so it keeps the download page.
- `DownloadTable` lists the same files with their real names in the Install docs (`install.mdx`), so the docs never spell out a version by hand.

### Styling

- Colors, radii and spacing come from the app's `tokio/src/ui/styles/tokens.css`. Keep the shared names and values in sync; web-only tokens are added below them. Use tokens instead of raw values.
- The marketing pages are dark only, like the app. The docs follow Starlight's dark/light switch, so `starlight.css` defines both palettes.
- Ship no client framework. Small processed `<script>` tags in `.astro` files are fine; don't add React, Vue or similar for these pages.
- Animations must respect `prefers-reduced-motion` (handled globally in `site.css`).
- Icons: `Icon.astro` draws line icons inline and takes brand icons (`github`, `apple`, `linux`) from Starlight. Add new line icons there instead of adding an icon package.
- Layouts must work at phone width with no horizontal scroll.
- Starlight's own components are restyled with plain (unlayered) rules in `starlight.css`, which win over Starlight's `@layer starlight.*` styles. The docs pagination is made smaller there and kept in two fixed columns, so a lone "Previous" or "Next" link takes half the width.

### Look and feel

The site must not look generated. Avoid the usual template patterns:

- No pill tags or badges (version pills, "Free and open source" chips, colored labels), and no uppercase "eyebrow" labels above headings. Say it in plain text instead.
- No colored shadows on buttons or gradient text.
- No grids of identical cards with an icon in a tinted square and a "Learn more →" link. Show features as rows with a concrete example (a template, a chat command, a URL, a code line), and link the title.
- No fake window chrome (traffic-light dots).
- Prefer real content over decoration: actual commands, file names, event names and settings from the app.
- Keep the brand's warmth, though. Plain is not the goal: soft rose washes (`--accent-soft` radial gradients) behind the hero and the closing "Ready for your next LIVE?" section, and rose accents such as the step timeline, are wanted. Keep them subtle and limited to a few places.
- The getting-started timeline has four steps that match the app's flow: install, set it up (voices, music provider, alert sounds, overlays), prepare your stream (turn on the features, add the overlays to OBS or TikTok LIVE Studio), go live and connect. Everything is set up before the LIVE starts; Tokio can only connect once it has. The connect docs (`connect.mdx`) follow the same four steps.

## Content

- The app's `README.md` is the source of truth for features, chat commands, install steps, platforms and the overlay setup. When the app changes, update the docs and the landing page to match. Check facts against the app's code before writing them; don't describe settings or behavior you haven't confirmed.
- Keep these app facts exact: the overlay address `http://tokio-app.local:37891/<overlay>/`, the WebSocket `ws://localhost:37891/?id=<id>`, the event names (`tokio:event:*`), and the default chat commands (`!play`, `!next`, `!last`, `!revoke`).
- The overlay developer docs describe `info.yaml`, `config.yaml` (`OverlayConfigSchema` in the app's `src/common/schemas/overlay.ts`), the `<script id="tokio-setup">` block and the `tokio-event-loader` package (`../tokio-event-loader`). Update them when those change.
- Overlays can be written in plain HTML or with any framework; `tokio-event-loader` has no dependencies and ships ESM, CommonJS and browser builds. Don't describe overlays as plain-HTML only, and give framework users the build requirements (relative asset paths, YAML files next to the built `index.html`, the `tokio-setup` block in the HTML template).
- Write plain, user-facing English, in the app's tone: short sentences, second person, UI names in **bold** (**Settings → Overlay Server**).

## Licensing

- The website's source is MIT (`LICENSE`).
- Tokio's source is MIT, except `drm-v2.ts` (LGPL-3.0-only). The **distributed app is AGPL-3.0-only** because it includes `tiktok-live-connector` and `tiktok-live-proto`. The About page must keep stating this, along with the copyright (`© 2026 Italo Alfaro and contributors`), the no-warranty notice and where to get the source.
- `SERVICES` in `src/pages/about.astro` mirrors the Services list in the app's `THIRD_PARTY_NOTICES.md`. Keep them in sync.
- Check licenses when adding or upgrading a dependency. Ask before adding anything copyleft (GPL, AGPL, LGPL, MPL, CC BY-SA), including fonts and icon sets.
- Tokio is not affiliated with TikTok or ByteDance. Keep that notice in the footer and on the About page, and don't use TikTok's logo or branding.

## Deployment

- GitHub Pages via Actions (`deploy.yml`), with Pages set to "GitHub Actions" as its source.
- Custom domain: `public/CNAME` (`tokio.ialfaro.com`) and `site` in `astro.config.mjs` must match. Don't remove `CNAME` and don't set `base`.
- CI runs `yarn format:check` and `yarn build` before deploying, so a format or type error blocks the deploy.

## Dependencies

- `@emnapi/core` and `@emnapi/runtime` are dev dependencies only because `@astrojs/check` loads a WASM build of `astro2tsx` that needs them as peers, and Yarn 1 doesn't install peers. Without them `astro check` asks to install `@astrojs/check` and checks nothing. Keep them until that's fixed upstream.
- Keep `typescript` on 5.x or 6.x: `astro check` refuses TypeScript 7.

## Conventions

- Prettier with `prettier-plugin-astro`: 2-space indent, double quotes, semicolons, trailing commas. Run `yarn format` on files you touch; lint-staged runs Prettier at commit.
- Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`). commitlint enforces this in a husky hook, so don't bypass hooks.
- Keep existing URLs stable (`/download/`, `/about/`, `/docs/...`), since links from elsewhere point at them.
