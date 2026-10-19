---
title: Overlays
description: Install the official overlays or import your own, set them up, add them to your streaming app and remove them.
---

Overlays are web pages that react to your LIVE: a follow banner, a gift counter, the song that's playing. Tokio serves them from your computer and sends them every LIVE event.

## Install an official overlay

On the **Overlays** page, **Official Overlays** lists the overlays made for Tokio, with a preview of each. You can also see them on this site's [Overlays page](/overlays/).

Click **Install**. The overlay appears in the gallery, marked **Verified**.

When a new version is out, its button changes to **Update**. Updating keeps your settings. Refresh the overlay in your streaming app to load the new version.

## Import your own overlay

In **Settings → Imported Overlays**, import an overlay by choosing its folder. It appears in the gallery on the **Overlays** page. Imported overlays don't get updates.

## Set it up

Open an overlay in the gallery to change its settings: colors, text, the gifts it reacts to, and anything else the overlay offers. Save, and the new settings reach the overlay right away.

## Add it to your stream

Tokio gives each overlay its own URL on your computer:

```
http://tokio-app.local:37891/<overlay-id>/
```

Copy it from the gallery and add it to your streaming app. See [Adding an overlay](/docs/guides/adding-an-overlay/) for OBS and TikTok LIVE Studio.

## Remove an overlay

Remove an official overlay with the trash button on its card under **Official Overlays**, and one you imported from **Settings → Imported Overlays**. Tokio deletes it with its settings, and its URL stops working in your streaming app.

## Make your own

Overlays are web pages, written by hand or built with any framework. See [Building an overlay](/docs/developers/building-an-overlay/).
