---
title: Overlays
description: Import overlays, set them up and add them to your streaming app.
---

Overlays are web pages that react to your LIVE: a follow banner, a gift counter, the song that's playing. Tokio serves them from your computer and sends them every LIVE event.

## Import an overlay

On the **Overlays** page, import an overlay by choosing its folder. It appears in the gallery.

## Set it up

Open an overlay in the gallery to change its settings: colors, text, the gifts it reacts to, and anything else the overlay offers. Save, and the new settings reach the overlay right away.

## Add it to your stream

Each overlay gets its own URL on your computer:

```
http://tokio-app.local:37891/<overlay>/
```

Copy it from the gallery and add it to your streaming app. See [Adding an overlay](/docs/guides/adding-an-overlay/) for OBS and TikTok LIVE Studio.

## Make your own

Overlays are web pages, written by hand or built with any framework. See [Building an overlay](/docs/developers/building-an-overlay/).
