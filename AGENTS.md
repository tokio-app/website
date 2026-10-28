# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

The website for Tokio at `https://tokio.ialfaro.com`: a landing page, a download page, the docs and an about/legal page, in English and Spanish.

Tokio itself is an Electron desktop app (Windows, macOS, Linux) that connects to a TikTok LIVE and reacts to its events with text-to-speech, music requests (Spotify/YouTube), alerts (sounds, images and videos), game actions (Minecraft commands) and browser-source overlays. It lives in `tokio-app/tokio` (locally `../tokio`) and has its own `AGENTS.md`.

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

| Path                           | Role                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/pages/`                   | The pages outside the docs: `index.astro` (landing), `overlays.astro`, `download.astro`, `about.astro`. `es/` renders each in Spanish                                                                                                                                                                                                                    |
| `src/content/docs/docs/`       | Docs in Markdown/MDX, served under `/docs/` by Starlight. Their Spanish copies are in `src/content/docs/es/docs/`, served under `/es/docs/`                                                                                                                                                                                                              |
| `src/i18n/`                    | The languages (`languages.mjs`), the words of the pages outside the docs (`en.json`, `es.json`), their helpers (`index.ts`) and the script that opens the visitor's language (`detect.mjs`)                                                                                                                                                              |
| `src/layouts/Base.astro`       | Layout for `src/pages/`: head tags, `Header`, `Footer`                                                                                                                                                                                                                                                                                                   |
| `src/components/`              | `Header`, `Footer`, `Icon`, `DownloadButton`, `DownloadTable`, `LiveFeed` (the hero: the app's Home), `LanguageLink` (the page in the other language), `DarkOnly` (no theme switch in the docs), and for the docs `Screenshot` (an app screenshot at the app's size), `Flow` (a diagram of where things run) and `ModDownload` (the Minecraft mod's jar) |
| `src/lib/release.ts`           | Reads the latest Tokio release from the GitHub API at build time                                                                                                                                                                                                                                                                                         |
| `src/lib/overlays.ts`          | Reads the official overlays' catalog at build time                                                                                                                                                                                                                                                                                                       |
| `src/lib/os.ts`                | Browser-side OS detection for the download links                                                                                                                                                                                                                                                                                                         |
| `src/styles/tokens.css`        | Design tokens, shared by both layouts                                                                                                                                                                                                                                                                                                                    |
| `src/styles/site.css`          | Base styles and utility classes (`.btn`, `.card`, `.section`, `.prose`) for `src/pages/`                                                                                                                                                                                                                                                                 |
| `src/styles/starlight.css`     | Maps the tokens onto Starlight's `--sl-color-*` variables (dark only)                                                                                                                                                                                                                                                                                    |
| `src/assets/`                  | Images processed by Astro: `icon.png`, and the docs' screenshots of the app in `screenshots/`, the app in Spanish in `screenshots/es/`                                                                                                                                                                                                                   |
| `public/`                      | Served as is: `favicon.ico`, `icon.png`, `CNAME`, `robots.txt`                                                                                                                                                                                                                                                                                           |
| `astro.config.mjs`             | Site URL, Starlight config and the docs sidebar                                                                                                                                                                                                                                                                                                          |
| `.github/workflows/deploy.yml` | Builds and deploys to GitHub Pages                                                                                                                                                                                                                                                                                                                       |

`dist/` and `.astro/` are generated. Don't edit them.

## Skills

Skills live in `.claude/skills/<name>/SKILL.md`. Claude Code offers each one as `/<name>` and loads it when a task matches its description.

**Other agents:** before doing one of these tasks, read its `SKILL.md`.

- `frontend-design`: the visual direction for new or reshaped pages (Anthropic's skill, Apache-2.0, vendored as published, like the app's copy)

## Architecture

### Pages and docs

- Starlight owns the docs and the 404 page. The docs live in `src/content/docs/docs/` so their URLs start with `/docs/`. Don't put files directly in `src/content/docs/`: they'd take root URLs and clash with `src/pages/`. The exceptions are `404.md`, and `es/` for the Spanish docs.
- `404.md` speaks both languages: GitHub Pages serves the root `404.html` for every missing path, and Starlight builds it only in English. With it, the build warns that `[...slug]` can't render `/404`, and makes an unlinked `/es/404/`; both are harmless.
- A new docs page needs an entry in the `sidebar` in `astro.config.mjs`. Use Starlight's components (`Steps`, `Tabs`, asides with `:::note`/`:::tip`/`:::caution`), `<details>`, and this site's `Screenshot` and `Flow` in `.mdx` files.
- Pages outside the docs use `Base.astro` and the classes in `site.css`. Page-specific styles go in the page's scoped `<style>`.
- URLs end with a slash (`trailingSlash: "always"`). Write internal links as `/docs/install/`, not `/docs/install`.

### Languages

- English is at the root URLs and Spanish under `/es/`, with the same paths after the prefix.
- `src/i18n/languages.mjs` lists the languages, and `astro.config.mjs` makes Starlight's `locales` from it. Starlight then writes Astro's `i18n` config (setting both is a build error), so `Astro.currentLocale` is the page's language everywhere.
- Spanish's `lang` is `es`, not `es-419`: Starlight finds its built-in Spanish UI only for `es`, and the sitemap rejects `es-419`. The text itself is the app's Latin American Spanish.
- **Pages outside the docs:**
  - They read their words with `textOf(langOf(Astro.currentLocale))` from `src/i18n/<lang>.json`, and their links go through `localize`.
  - Texts with a link, `<strong>` or `<code>` are HTML, rendered with `set:html`, and `fill` fills their `{name}`s.
  - A key missing from `es.json` fails `astro check`.
- **Spanish routes:** `src/pages/es/<page>.astro` renders `../<page>.astro`, which reads its language from the URL, so a page's markup and styles stay in one file. A new page gets its Spanish route too.
- **Starlight's own UI** comes in Spanish built in, and `src/content/i18n/es.json` overrides what clashes with the app's voice.
- **Sidebar:** items are slugs, so each shows its page's title in its language. Groups and links take `translations`.
- **Screenshots:** `Screenshot` shows `screenshots/es/<name>.png` on Spanish pages, or the English file while that's missing.
- **Detection:** `detect.mjs` runs inline in every head (`Base.astro`, and Starlight's `head`), after the canonical and hreflang links.
  - A language picked with `LanguageLink` (`localStorage`) wins.
  - Without one, an English page entered from outside the site opens in the browser's first language the site has, by base subtag.
  - Other languages' pages never move without a pick, and links inside the site never apply the browser rule.
  - Only a page whose canonical path is the address bar's moves, so the 404 never does.
- **`LanguageLink`** names each other language in itself, next to the GitHub icon: in `Header.astro`, and as Starlight's `LanguageSelect`. On phones the site header shows only its globe, and About joins the links hidden there.
- **Adding a language** takes:
  - an entry in `languages.mjs`
  - `src/i18n/<code>.json`, plus its line in `index.ts`
  - `src/pages/<code>/`
  - the docs in `src/content/docs/<code>/docs/`
  - the screenshots in `screenshots/<code>/`, from the app's screenshot script
  - a `translations` entry per sidebar group and link

### Download links

- `getLatestRelease()` in `src/lib/release.ts` fetches `repos/tokio-app/tokio/releases/latest` once per build. Only published, non-draft releases count. It uses `GITHUB_TOKEN` when set and returns `null` when GitHub can't be reached; pages must still build and work then.
- `DOWNLOADS` is one card per system, each the app's own package: the setup on Windows, a zip per Mac architecture, the AppImage on Linux. Tokio has no separate installer.
- The packages carry the version (`tokio-<version>-setup.exe`, `-mac-arm64.zip`, `-mac-x64.zip`, `-x86_64.AppImage`) and are matched by suffix. Without the GitHub API, every card links to the latest release's page instead. The names come from `artifactName` in the app's `electron-builder.yml` and the upload paths in its `build-app.yml`; keep `DOWNLOADS` in sync when those change.
- The site is static, so the version only changes on rebuild. `deploy.yml` runs on push to `main`, by hand, and on a `repository_dispatch` of type `release`. The release workflows of the app and of the overlays send it after publishing, with the `WEBSITE_DISPATCH_TOKEN` secret (Contents read and write on this repo); without the secret they only warn.
- `DownloadButton` links to `/download/` and, after OS detection, straight to the setup on Windows and to the AppImage on Linux. They only get the direct link when the build read the release, since their names carry the version. macOS has two zips (Apple Silicon and Intel), so it keeps the download page.
- `DownloadTable` lists the same files with their real names in the Install docs (`install.mdx`), so the docs never spell out a version by hand.
- The Tokio mod for Minecraft Java Edition (`tokio-app/minecraft-mod`) downloads straight from the Games docs: `getModDownload()` reads its latest release the same way and `ModDownload` links its jar (`tokio-<version>.jar`, not the `-sources` one). Don't send users to the mod's release page; that's only the fallback without the GitHub API. The mod's releases don't trigger a rebuild, so a new jar shows after the site's next deploy.

### Overlays page

- `/overlays/` lists the official overlays from the catalog that `tokio-app/overlays` (locally `../tokio-overlays`) publishes with every release, `releases/latest/download/overlays.json` (format in that repo's `README.md`). `getOverlays()` in `src/lib/overlays.ts` reads it once per build. It needs no API call, so no token or rate limit.
- It returns `null` when the catalog can't be read, and the page links to the overlays' latest release instead. Entries that don't validate, or whose zip or preview isn't under `https://github.com/tokio-app/overlays/releases/download/`, are left out. Schema 1 is the format read; a new schema renames or removes fields, and the site must then read both.
- Previews go through `getImage` (`inferSize`, `layout: "constrained"`, webp), so they're resized and served from this site. Astro checks every redirect against `image.remotePatterns` in `astro.config.mjs`, and GitHub redirects downloads to `release-assets.githubusercontent.com`, so both hosts are allowed. A preview that fails shows a placeholder instead of failing the build.
- Don't show an overlay's URL on the page. Tokio generates it (`http://tokio-app.local:37891/<overlay-id>/`), and streamers copy it from the gallery.
- Local rebuilds may warn "An error was encountered while revalidating a cached remote asset". Astro 7.4 revalidates cached images without the image config, so it rejects GitHub's redirect and keeps the cached preview. That's harmless, since a release's files never change, and CI builds have no cache. Don't loosen `remotePatterns` for it.
- New overlays only show after a rebuild, see Download links.

### Styling

- Colors, radii, spacing and type sizes come from the app's `tokio/src/ui/styles/tokens.css`. Keep the shared names, values and order in sync; web-only tokens go below them. Use tokens instead of raw values.
- Type is Archivo (`@fontsource-variable/archivo`, its `wdth.css` for the width axis), imported in `Base.astro` and first in Starlight's `customCss`. Text is 400; labels, nav and buttons 500; titles and bold text 600. Only the hero's live numbers use the app's readout: `font-stretch: var(--stretch-readout)`, 700, `tabular-nums`.
- The whole site is dark only, like the app. In the docs, `DarkOnly.astro` replaces Starlight's `ThemeProvider` and `ThemeSelect` (`components` in `astro.config.mjs`), so there's no theme switch and no light palette; Starlight already renders `<html data-theme="dark">`.
- Ship no client framework. Small processed `<script>` tags in `.astro` files are fine; don't add React, Vue or similar for these pages.
- Animations must respect `prefers-reduced-motion`. `site.css` handles it globally, delays included, so staggered entrances show at once.
- Icons: `Icon.astro` draws line icons inline and takes brand icons (`github`, `apple`, `linux`) from Starlight. Add new line icons there instead of adding an icon package.
- Layouts must work at phone width with no horizontal scroll. Keep lines of text under 80 characters: `.prose` is 68ch wide and the docs' content column 37rem.
- `Screenshot.astro` shows each docs screenshot at half its pixel size, the app's own size, or narrower to fit the text column. It's never enlarged, and never wider than the text: screenshots that spread past the column break the page's layout.
- Page styles are scoped with `:where()`, so they add no specificity, and a `site.css` rule such as `.prose ul` beats a page's `.services`. When they conflict, prefix the page's selector with the parent's class (`.prose .services`).
- Starlight's own components are restyled with plain (unlayered) rules in `starlight.css`, which win over Starlight's `@layer starlight.*` styles. The docs pagination is made smaller there and kept in two fixed columns, so a lone "Previous" or "Next" link takes half the width. The "On this page" column keeps the left sidebar's width, with the content centered between the two; Starlight would give it half the spare width.
- Code blocks use Expressive Code's plain frame for every language (`expressiveCode.defaultProps.frame: "code"` in `astro.config.mjs`): its terminal frame draws window dots.
- Local builds reuse rendered Markdown from `node_modules/.astro/data-store.json`. After changing Expressive Code or Markdown options, delete it before building, or the docs keep the old output. CI builds start without it.

### Look and feel

The site follows the app's "On air" look (`tokio/.claude/rules/renderer.md`) and the `frontend-design` skill. It must not look generated:

- No pill tags or badges (version pills, "Free and open source" chips, colored labels), no uppercase "eyebrow" labels, and no meta lines joined with middle dots. Say it in a sentence instead.
- No colored shadows on buttons, no gradient text, and no shadows on cards.
- No grids of identical cards with an icon in a tinted square and a "Learn more →" link. Show features as rows with a concrete example (a template, a chat command, a URL, the app's own rows), and link the title.
- No fake window chrome (traffic-light dots).
- Prefer real content over decoration: actual commands, file names, event names and settings from the app. Mono is for code only.
- One Ink surface. Panels (`--background-tertiary`, radius 8, a `--border` hairline) only hold grouped content, such as the hero's feed, the feature examples and the download cards; hairlines and spacing do the rest. Controls take radius 6, the hero's window 10.
- Rose means LIVE or "do this": the tally and the LIVE dot, primary buttons, links, selection (the docs' current page) and focus. Text on rose buttons is white. Rose is never a border, frame or decoration.
- The tally, the app's rose line at the top's center fading out to both sides, only appears on the hero's picture of the app while LIVE. The site itself isn't live.
- Keep the brand's warmth, though. Plain is not the goal: the soft rose washes (`--accent-soft` radial gradients) behind the hero and the closing "Ready for your next LIVE?" section stay, subtle. The step timeline's track warms up from the gray line at step 1 to rose at step 4, where you go LIVE.
- Descriptions are short, a few words each, as in the app.
- In the docs, the app's screenshots are the loud element and everything around them stays quiet. No markers, badges or captions on them: a tight crop points at what to click. `Flow` draws only what has no screen (how Tokio sits between TikTok and your stream, a streaming app on another computer): stops on a hairline track, with the LIVE dot as its only color.
- The getting-started timeline has four steps that match the app's flow: install, set it up (the Euler Stream API key, voices, music provider, alert sounds, overlays), prepare your stream (turn on the features, add the overlays to OBS or TikTok LIVE Studio), go live and connect. Everything is set up before the LIVE starts; Tokio can only connect once it has. The connect docs (`connect.mdx`) follow the same four steps. The steps' links line up at the bottom, whatever their text's length.

## Content

- These docs are the full reference for Tokio's features, settings, chat commands, install steps, platforms and the overlay setup; the app's `README.md` only sums them up and links here. When the app changes, update the docs and the landing page to match. Check facts against the app's code before writing them; don't describe settings or behavior you haven't confirmed.
- The docs' screenshots in `src/assets/screenshots/` come from the app's `drive-app` skill (`scripts/screenshots.mjs`, run with `--scale 2`), with made-up viewers: retake them there instead of editing them, when a page they show changes. The Spanish ones in `screenshots/es/` come from the same run with `--lang es-419`; retake both. Each is a crop of what its section describes, shown with `<Screenshot name="<file name>" alt="..." />` on a line of its own after the text it shows, with alt text that says what's in it. An unknown name fails the build. `starlight.css` frames them with a hairline, since they share the page's Ink.
- User pages show, then tell: one sentence of what the feature does, then its picture (what viewers see, or the feature's screen). `<Steps>` are for doing, `<Tabs>` for choosing (a system, a music provider, a streaming app), tables for looking things up, and collapsed `<details>` for troubleshooting, limits and other rare cases, which stay in the docs. A paragraph is at most two short sentences, and the text names what to click instead of describing the screenshot.
- Some anchors are linked from elsewhere. Keep `#java-edition` on Games: the app's Games page links there for the mod's install steps, so Bedrock and Java stay headings, not tabs, with those steps visible, named Bedrock Edition and Java Edition in both languages. Keep `#features` on the Introduction (`#funciones` in Spanish, `home.docsFeaturesAnchor`): the landing page links there.
- Connecting needs the user's own Euler Stream API key (free account, pasted in **Settings → TikTok LIVE**). Never suggest a shared key, and don't write Euler's rate limits: they can change at any time. Link `https://www.eulerstream.com`, `/register` and `/pricing`.
- Keep these app facts exact: the overlay address `http://tokio-app.local:37891/<overlay-id>/` (generated by Tokio), the WebSocket `ws://localhost:37891/?id=<id>`, the event names (`tokio:event:*`), and the default chat commands (`!play`, `!next`, `!last`, `!revoke`).
- The overlay developer docs describe `info.yaml`, `config.yaml` (`OverlayConfigSchema` in the app's `src/common/schemas/overlay.ts`), the `<script id="tokio-setup">` block and the `@tokioapp/overlay` package (`../tokio-event-loader`). Update them when those change.
- Overlays can be written in plain HTML or with any framework; `@tokioapp/overlay` has no dependencies and ships ESM, CommonJS and browser builds. Don't describe overlays as plain-HTML only, and give framework users the build requirements (relative asset paths, YAML files next to the built `index.html`, the `tokio-setup` block in the HTML template).
- Write plain, user-facing English, in the app's tone: short sentences, second person, UI names in **bold** (**Settings → Overlay server**).
- **Both languages:**
  - Every change lands in both languages in the same commit: a docs page and its `es/` copy, `en.json` and `es.json`.
  - A Spanish page keeps its English page's sections, components and screenshots.
- **The Spanish is the app's:**
  - neutral Latin American with `tú`, the glossary in `tokio/.claude/rules/i18n.md`, and the humanizer (`tokio/.claude/skills/humanizer/SKILL.md`) on every sentence
  - UI names in bold are the app's own Spanish, looked up by key: `en.json` → key → `es-419.json`, in `tokio/src/common/i18n/locales/`
  - internal links start with `/es/`, and anchors follow the Spanish headings' slugs, accents kept

## Licensing

- The website's source is MIT (`LICENSE`), except `.claude/skills/frontend-design/`, Anthropic's skill under Apache-2.0 (its `LICENSE.txt` is beside it).
- The site self-hosts the Archivo typeface (`@fontsource-variable/archivo`, as in the app). Its font files are under the SIL OFL 1.1, the copyleft exception the user approved: it allows bundling with any software. The About page's "This website" section names it; keep that.
- Tokio's source and the distributed app are MIT, except `drm-v2.ts` (LGPL-3.0-only). It connects to TikTok LIVE through `@tokioapp/connector` (MIT, `tokio-app/connector`). The About page must keep stating this, along with the copyright (`© 2026 Italo Alfaro and contributors`), the no-warranty notice and where to get the source.
- `about.services` in `src/i18n/<lang>.json` mirrors the Services list in the app's `THIRD_PARTY_NOTICES.md`. Keep them in sync.
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
