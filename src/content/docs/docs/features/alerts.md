---
title: Alerts
description: Play a sound, or show an image or a video, for follows, gifts, chat and other LIVE events.
---

Play a sound, show an image or a video, or both, for LIVE events. Set them up on the **Alerts** page and turn alerts on for the session on **Home**.

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
- **Clear** in the sound picker takes the sound or message off the alert and keeps it in your library.
- Deleting a sound from your library removes it from your computer and from every alert that plays it, in all your profiles. Tokio asks first.
- Set each alert's volume, and use the play button to preview it.

## Images and videos

An alert can also show an image or a video, with its sound or message or on its own. Click the alert's **Media** to choose one:

- Pick a file from your media library, shown as thumbnails with the alert's own marked, or press **Browse file...** to add one: png, jpg, gif, webp, mp4 or webm, up to 50 MB. Your media library is shared by all your profiles. Upload, preview and delete files in **Settings → Media Library**.
- **Clear** takes the image or video off the alert and keeps it in your library. Deleting one from the library removes it from your computer and from every alert that shows it, after you confirm.
- **Duration** is how many seconds it stays on screen, 5 unless you change it. It stays while the alert's sound plays if that's longer, and a longer video is cut. For a video, turn on **Match video** to have it follow the video's length, up to 60 seconds, also when you pick another video.
- A video plays with its own sound, at the alert's volume.

Each alert shows its image or video on its own overlay, so you can place each one where you want it. Copy the overlay's URL from the alert's media and add it to your streaming app like any overlay (see [Adding an overlay](/docs/guides/adding-an-overlay/)):

```
http://tokio-app.local:37891/alerts/<alert-id>/
```

Press the alert's play button to see it on the overlay.

## Gift alerts

Gift alerts can react to any gift or only to the ones you pick. Under the gifts, choose when the alert plays:

- **When streak ends**: once per combo, when the combo ends, so a streak of 20 roses plays one sound. This is the default.
- **Every gift**: once for each gift sent, so a streak of 20 roses plays it 20 times. The ones that don't fit in the queue's maximum length are skipped.

Click **Any gift** in the alert's row to open the gift list. Search it by name, filter it by price (**Exactly**, **More than**, **Less than**, **At least**, **At most** or **Between** two amounts of coins) and sort it by price or name. Check the gifts you want and press **Done**. When you open the list again, the gifts you picked come first. **Select all shown** checks every gift the filters leave, such as all the gifts worth 1,000 coins or more, and **Clear** unchecks them all: with none checked, the alert plays for any gift.

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
- `{gift}` and `{count}` (the combo size): Gift. An alert on **Every gift** has no `{count}`.
- `{count}` (the likes sent): Like
- `{song}`: Music Change

The replacements and the **Remove Emojis** setting from the **TTS** page apply to these messages, and a message with a banned word, for example in a viewer's name, isn't spoken. Like chat, messages are made one at a time with the TTS page's cooldown between them, and the ones that don't fit in its queue length are skipped, so a busy LIVE can't flood the voice service. Picking a sound again replaces the message.

## Queue

- **One after another**: alerts wait in a queue and play in order. Set the maximum queue length so they don't pile up.
- **At the same time**: turn on **simultaneous** playback so different events play at the same time.

An alert with an image or video keeps its place in the queue until it leaves the screen. For events that come often, like likes, keep the duration short or turn on simultaneous playback.

Alerts stop, and their images and videos go away, when you disconnect or turn the feature off.
