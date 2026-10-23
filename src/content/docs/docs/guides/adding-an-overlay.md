---
title: Adding an overlay
description: Show Tokio's overlays in OBS Studio, TikTok LIVE Studio or any streaming app.
---

Overlays are served by Tokio's overlay server. Turn it on first in **Settings → Overlay Server**, then copy the overlay's URL from the **Overlays** page, or an alert's from its media on the **Alerts** page.

## The overlay address

TikTok LIVE Studio doesn't accept `localhost` links, so overlays use their own address, `tokio-app.local`:

```
http://tokio-app.local:37891/<overlay-id>/
```

Each [alert's images and videos](/docs/features/alerts/#images-and-videos) show on its own overlay, at `http://tokio-app.local:37891/alerts/<alert-id>/`.

The first time you turn on the server, your system asks for administrator rights (your password on macOS and Linux) so Tokio can add this address to your hosts file, pointing to your own computer. Accept the prompt, or the server stays off. You won't be asked again while the entry is there.

## OBS Studio

1. In **Sources**, click **+** and choose **Browser**.
2. Paste the overlay URL and set the width and height to your canvas size.

## TikTok LIVE Studio

1. Click **Add source** and choose **Link**.
2. Paste the overlay URL and place the overlay on your scene.

## Other apps

Any streaming app that can show a web page works the same way: add a browser or web source and paste the overlay URL.

## On another computer

If OBS runs on another computer on your network, it can't use `tokio-app.local`, which points to the computer it's on. **Settings → Overlay Server** shows your computer's network address. Use it in place of `tokio-app.local`:

```
http://<network address>:37891/<overlay-id>/
```

For example, `http://192.168.1.20:37891/<overlay-id>/`. The overlay gets its events from Tokio on your computer.

The first time the server starts, Windows may ask whether to allow Tokio through the firewall. Allow it, or the other computer can't connect.

:::tip
Tokio has to stay open while you stream so the overlays keep getting events.
:::
