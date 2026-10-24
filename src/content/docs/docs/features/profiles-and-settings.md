---
title: Profiles and settings
description: Keep separate settings for each stream and configure Tokio.
---

## Profiles

Keep separate settings for different streams. Create a blank profile or clone an existing one, and switch between them from the title bar.

A profile holds your text-to-speech, music and alert settings, and the emotes viewers have used in its LIVE. Your uploaded sounds, images and videos are libraries shared by all profiles.

Tokio saves your changes as you make them, to the profile you made them on.

## Settings

- **TikTok LIVE**: your [Euler Stream](https://www.eulerstream.com) API key. Euler Stream signs Tokio's connection to TikTok LIVE, and each user brings their own key: [sign up](https://www.eulerstream.com/register) for free and paste it here. Tokio can't connect without it.
- **Voice engines**: optionally add your TikTok session ID. With it, the TikTok voices come straight from TikTok. Without it, they go through `tiktok-tts.weilnet.workers.dev`, a proxy run by a third party, which gets the text of every message they read.
- **Overlay server**: turn the local server for overlays on or off. It also shows your computer's network address, for a streaming app on another computer. See [Adding an overlay](/docs/guides/adding-an-overlay/#on-another-computer).
- **Tray**: Tokio keeps running in the tray (the menu bar on macOS) when you close its window, so the voices, sounds and overlays carry on. Click the icon, or choose **Open Tokio** in its menu, to bring the window back, and **Quit Tokio** to quit. Turn it off to quit when you close the window.

## Notifications

When something fails, such as a voice that can't be generated, a sound that's missing or a change that couldn't be saved, Tokio tells you what went wrong. The bell in the title bar keeps the session's history.
