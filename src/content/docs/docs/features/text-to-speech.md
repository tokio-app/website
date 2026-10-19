---
title: Text-to-speech
description: Read chat messages aloud with TikTok, Edge or system voices.
---

Chat messages are read aloud as they come in. Set it up on the **TTS** page and turn it on for the session on **Home**.

## Voices

Tokio has three voice engines, and the **TTS** page lists all their voices in one place:

- **TikTok**: TikTok's own voices. They work without setup; to use your TikTok session instead, add its session ID in **Settings → Voice Engines**.
- **Edge**: Microsoft Edge's voices.
- **Windows**: the voices installed on your system, SAPI and OneCore, including older 32-bit voices. Only available on Windows.

Click the voice to open the list. Search it by voice name or language, filter it by engine and language, and press play on any voice to hear a short line in its language before you pick it. Adjust speed, pitch and volume to taste.

Type a message and press **Test Voice** to hear it with your replacements and emoji setting, even before you save them. A message chat wouldn't read, like one with a banned word, shows a warning instead.

## Format

Choose which messages get read and how. The message template can use these placeholders:

| Placeholder  | Replaced with             |
| ------------ | ------------------------- |
| `{username}` | The viewer's display name |
| `{handle}`   | The viewer's `@handle`    |
| `{comment}`  | The chat message          |

For example, `{username} {comment}` reads "Lucia hi from Lima!". You can also read only the messages that start with a command.

Some voices read emojis by name, so 😂 can come out as "face with tears of joy". Turn on **Remove Emojis** to leave them out of messages and names. Messages that are only emojis are then skipped. Replacements apply first, so one can still turn an emoji into words, like ❤️ into "love".

## Replacements

Teach the voice how to say acronyms, slang and names. Each replacement swaps a word for the way it should be pronounced.

## Permissions

Let everyone talk, or only followers, superfans or moderators. You can also set a minimum fan level, a whitelist and a blacklist.

## Protection

A cooldown per viewer and a maximum queue length keep the chat from flooding the voice.

Permissions and protection are shared with [music requests](/docs/features/music-requests/).
