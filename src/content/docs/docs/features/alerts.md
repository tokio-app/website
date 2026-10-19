---
title: Alerts
description: Play a sound for follows, gifts, chat and other LIVE events.
---

Play a sound for LIVE events. Set them up on the **Alerts** page and turn alerts on for the session on **Home**.

## Events

Any of these events can trigger an alert:

- Chat
- Emote (a chat message with emotes)
- Follow
- Share
- Like
- Gift
- Envelope
- Super Fan, Super Fan Box and Super Fan Join
- Member Join
- Music Change (a new song from [music requests](/docs/features/music-requests/))

## Sounds

- Upload your own sounds, or search [MyInstants](https://www.myinstants.com) from inside the app.
- Your sound library is shared by all your profiles.
- Set each alert's volume, and use the play button to preview it.

## Gift alerts

Gift alerts can react to any gift or only to the ones you pick, listed from cheapest to most expensive. They fire once per combo, when the combo ends, so a streak of 20 roses plays one sound.

Tokio gets the gift list from TikTok when it starts, and it can miss some gifts, like ones from other regions. While you're connected, Tokio saves the gifts viewers send that aren't on it, so they show up in the list for every profile once someone has sent them.

## Chat alerts

Chat alerts play for every message. Type a keyword to play only for messages that have it as a whole word or phrase: **hi** plays for "Hi there!" but not for "this". Case, accents and emojis don't matter.

## Emote alerts

Emote alerts can react to any emote or only to the ones you pick. They play once per message, however many emotes it has.

TikTok doesn't share a LIVE's emotes, so while you're connected Tokio saves the ones viewers use to the active profile, numbered in the order they first appear. An emote shows up in the list once someone has used it, and an alert with no emotes picked plays for all of them.

## Join alerts

Member Join and Super Fan Join alerts play for anyone who joins. Type a viewer's @handle or name to play only when they join, for example to give a regular their own entrance sound. Case, accents and emojis in the name don't matter.

## Text-to-speech alerts

Instead of a sound, an alert can speak a message. Open the alert's sound picker and go to the **Text-to-speech** tab: type the message, pick a voice, set the speed and pitch, and press play to hear it with sample values. The alert's volume slider still sets how loud it is.

Messages can include details of the event:

- `{username}` and `{handle}`: every event with a viewer, which is all but Envelope, Super Fan Box and Music Change
- `{comment}`: Chat and Emote
- `{gift}` and `{count}` (the combo size): Gift
- `{count}` (the likes sent): Like
- `{song}`: Music Change

The replacements and the **Remove Emojis** setting from the **TTS** page apply to these messages, and a message with a banned word, for example in a viewer's name, isn't spoken. Like chat, messages are made one at a time with the TTS page's cooldown between them, and the ones that don't fit in its queue length are skipped, so a busy LIVE can't flood the voice service. Picking a sound again replaces the message.

## Queue

- **One after another**: alerts wait in a queue and play in order. Set the maximum queue length so they don't pile up.
- **At the same time**: turn on **simultaneous** playback so different events play at the same time.

Alerts stop when you disconnect or turn the feature off.
