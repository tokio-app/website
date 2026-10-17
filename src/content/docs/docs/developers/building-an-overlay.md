---
title: Building an overlay
description: Make your own Tokio overlay with plain HTML or any framework, and test it with sample events.
---

An overlay is a web page. Write it by hand in HTML, CSS and JavaScript, or build it with React, Vue, Svelte or any other framework: Tokio only needs the finished folder. It serves the folder at `http://tokio-app.local:37891/<overlay>/` and sends the page every LIVE event over a WebSocket.

## Folder layout

```
my-overlay/
├── info.yaml     # name and version
├── config.yaml   # settings shown in Tokio's gallery (optional)
└── index.html    # the overlay, or your framework's build output
```

Any other files in the folder (scripts, styles, images) are served next to `index.html`.

### info.yaml

```yaml
name: Likes Counter
version: 1.0.0
config: true
```

| Key       | Description                                                |
| --------- | ---------------------------------------------------------- |
| `name`    | Shown in the gallery.                                      |
| `version` | Your overlay's version.                                    |
| `config`  | `true` when the overlay has a `config.yaml` with settings. |

## Listening to events

[`tokio-event-loader`](https://www.npmjs.com/package/tokio-event-loader) (MIT) connects to Tokio and hands you the events. It has no dependencies and ships an ES module, a CommonJS build and a browser build with TypeScript types, so it works the same in a plain page and in any framework.

- `tokio.on(event, callback)` subscribes to an event and returns a function that unsubscribes.
- `tokio.off(event, callback)` removes a callback.
- `tokio.connect(id)` connects to Tokio and reconnects on its own if Tokio restarts. Call it once, when the overlay starts. `tokio.disconnect()` closes the connection.

See [Events](/docs/developers/events/) for every event and its data.

### In a plain HTML page

Load the browser build from a CDN. It defines a global `TokioEventLoader`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script src="https://unpkg.com/tokio-event-loader@1.0.4"></script>
    <script id="tokio-setup">
      window.__OVERLAY_CONFIG__ = { title: "Likes", main_color: "#ffffff" };
      window.__OVERLAY_ID__ = "";
    </script>
  </head>
  <body>
    <h1 id="title">Likes</h1>
    <p id="likes">0</p>

    <script type="module">
      const { tokio, TOKIO_EVENTS } = TokioEventLoader;
      const title = document.getElementById("title");
      const likes = document.getElementById("likes");

      function apply(config) {
        title.textContent = config.title;
        title.style.color = config.main_color;
      }

      apply(window.__OVERLAY_CONFIG__);

      // Sent when the streamer saves the overlay's settings.
      tokio.on(TOKIO_EVENTS.CONFIG, apply);

      tokio.on(TOKIO_EVENTS.LIKE, (data) => {
        likes.textContent = data.totalLikes;
      });

      tokio.connect(window.__OVERLAY_ID__);
    </script>
  </body>
</html>
```

### With a framework

Install the package and import it:

```sh
npm install tokio-event-loader
```

```js
import { tokio, TOKIO_EVENTS } from "tokio-event-loader";

tokio.on(TOKIO_EVENTS.GIFT, (data) => {
  console.log(`${data.user.username} sent ${data.gift.name}`);
});

tokio.connect(window.__OVERLAY_ID__);
```

Because `tokio.on` returns its own unsubscribe function, it fits a component's cleanup directly. In React, for example:

```jsx
useEffect(
  () => tokio.on(TOKIO_EVENTS.LIKE, (data) => setLikes(data.totalLikes)),
  [],
);
```

When you build the overlay:

- **Use relative asset paths.** The overlay is served under `/<overlay>/`, so absolute paths such as `/assets/app.js` don't resolve. In Vite, set `base: "./"`.
- **Ship the YAML files with the build.** `info.yaml` and `config.yaml` must sit next to the built `index.html`. In Vite, put them in `public/` and they're copied into the output folder.
- **Keep the setup block in the HTML template.** If the overlay has settings, put the `<script id="tokio-setup">` block in your `index.html` template so it survives the build, and read `window.__OVERLAY_CONFIG__` at runtime.

Import the build output folder (for example `dist/`) into Tokio.

## Settings

When `info.yaml` has `config: true`, `index.html` must contain a `<script id="tokio-setup">` block. Tokio replaces it with the overlay's saved settings and ID:

```html
<script id="tokio-setup">
  window.__OVERLAY_CONFIG__ = { title: "Likes", main_color: "#ffffff" };
  window.__OVERLAY_ID__ = "my-overlay";
</script>
```

`config.yaml` describes the settings. Fields are grouped in sections, and each field's `id` becomes a key of `__OVERLAY_CONFIG__`:

```yaml
sections:
  - name: General
    id: general
fields:
  - name: Title
    id: title
    type: input
    section: general
    attributes:
      mode: text
      placeholder: Overlay title...
      value: Likes
      default: Likes
  - name: Main color
    id: main_color
    type: color
    section: general
    attributes:
      value: ffffff
      default: ffffff
```

Every field has a `name`, a unique `id`, a `section` (the `id` of a section) and a `type`. Its `attributes` always include a `value` and a `default` of the same type.

| Type       | Other attributes                                                       | Value in `__OVERLAY_CONFIG__`                                    |
| ---------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `input`    | `mode` (`text` or `number`), `placeholder`                             | The text or number                                               |
| `dropdown` | `options` (`value`, `label`, optional `img`), `multiple`, `searchable` | The selected value, or a list when `multiple`                    |
| `color`    | none; values are hex codes without `#`, 6 or 8 characters              | The color with `#`, for example `"#ffffff"`                      |
| `check`    | none                                                                   | `true` or `false`                                                |
| `toggle`   | none                                                                   | `true` or `false`                                                |
| `slider`   | `min`, `max`                                                           | The number                                                       |
| `gifts`    | `multiple`; values are TikTok gift IDs                                 | A gift `{ value, label, img, coins }`, or a list when `multiple` |

## Testing without importing

While you build an overlay, test it from the **Tools** page instead of importing it after every change. It works with your framework's dev server too:

1. Turn on the overlay server in **Settings → Overlay Server**.
2. On **Tools → Test Overlays**, enter a name and create an ID.
3. Connect your overlay with that ID, for example `tokio.connect("<test ID>")`, and open it in your browser.
4. Click **Test**. Tokio sends your overlay a sample of every LIVE event.

If Tokio says "No overlay connected with this ID.", check that the page is open and connected with the same ID.

## Import it

When it's ready, import the folder on the **Overlays** page. Tokio gives it an ID, writes its settings into the page and serves it. See [Overlays](/docs/features/overlays/).

## Without the library

The library is optional. Connect a WebSocket to `ws://localhost:37891/?id=<overlay ID>`. Each message is JSON with the event name and its data:

```json
{
  "type": "tokio:event:like",
  "data": { "user": {}, "likeCount": 5, "totalLikes": 1200 }
}
```
