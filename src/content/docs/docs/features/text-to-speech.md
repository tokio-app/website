---
title: Text-to-speech
description: Read chat messages aloud with TikTok, Edge or system voices.
---

Chat messages are read aloud as they come in. Set it up on the **TTS** page and turn it on for the session on **Home**.

## Voices

Tokio has three voice engines. Choose one in **Settings → Providers**, then pick a voice on the **TTS** page:

- **TikTok**: TikTok's own voices (the "Default" provider).
- **Edge**: Microsoft Edge's voices.
- **Windows**: the voices installed on your system, SAPI and OneCore, including older 32-bit voices. Only available on Windows.

Adjust speed, pitch and volume to taste. When you switch engines, the profile's voice goes back to the new engine's default.

## Format

Choose which messages get read and how. The message template can use these placeholders:

| Placeholder  | Replaced with             |
| ------------ | ------------------------- |
| `{username}` | The viewer's display name |
| `{handle}`   | The viewer's `@handle`    |
| `{comment}`  | The chat message          |

For example, `{username} {comment}` reads "Lucia hi from Lima!". You can also read only the messages that start with a command.

## Replacements

Teach the voice how to say acronyms, slang and names. Each replacement swaps a word for the way it should be pronounced.

## Permissions

Let everyone talk, or only followers, superfans or moderators. You can also set a minimum fan level, a whitelist and a blacklist.

## Protection

A cooldown per viewer and a maximum queue length keep the chat from flooding the voice.

Permissions and protection are shared with [music requests](/docs/features/music-requests/).
