---
title: Alerts
description: Play a sound or a message, or show an image or a video, for follows, gifts, chat and other LIVE events.
---

Play a sound or a spoken message, show an image or a video, or both, when something happens in your LIVE. Set them up on the **Alerts** page, and turn **Alerts** on under **Active Features** on **Home**.

![Five alerts on the Alerts page: a follow alert that speaks a message, a gift alert for two gifts with a sound and an image, a chat alert for a keyword, a share alert and a join alert for one viewer](../../../../assets/screenshots/alerts.png)

Click **Add alert**, pick its trigger, and give it a sound, a message or media. Each alert has its own switch, volume and play button to preview it. Alerts belong to the profile; your sounds and media are shared by all profiles.

## Triggers

Chat, Emote (a chat message with emotes), Follow, Share, Like, Gift, Envelope, Super Fan, Super Fan Box, Super Fan Join, Member Join and Music Change (a new song from [music requests](/docs/features/music-requests/)).

## Sounds

Click the alert's sound to pick one of your sounds, search [MyInstants](https://www.myinstants.com), or **Browse file...** for an mp3, wav or ogg up to 8 MB.

![The sound picker: your sounds, MyInstants and text-to-speech tabs, and Browse file](../../../../assets/screenshots/alerts-sounds.png)

**Clear** takes the sound off the alert and keeps it in your library. Manage the library in **Settings → Sound Library**.

## Spoken messages

On the picker's **Text-to-speech** tab, type a message, pick its voice, speed and pitch, and press **Use text-to-speech**.

![The Text-to-speech tab of the sound picker, with a message that thanks the viewer for the follow](../../../../assets/screenshots/alerts-tts.png)

Click a variable to add the event's details:

- `{username}` and `{handle}`: every trigger with a viewer, so all but Envelope, Super Fan Box and Music Change
- `{comment}`: Chat and Emote
- `{gift}` and `{count}` (the combo size): Gift
- `{count}` (the likes sent): Like
- `{song}`: Music Change

The **TTS** page's replacements, **Remove Emojis**, banned words, cooldown and queue length apply too, so a busy LIVE can't flood the voice.

## Images and videos

Click **Select media...** to show a png, jpg, gif, webp, mp4 or webm, up to 50 MB, with the alert's sound or on its own.

![The media picker: the alert's overlay URL, the media library as thumbnails, and the duration](../../../../assets/screenshots/alerts-media.png)

- **Duration (seconds)** is how long it stays, up to 60, or longer if the sound plays longer. A shorter video leaves when it ends. **Match video** uses the video's length.
- A video plays its own sound, at the alert's volume.
- Manage your media in **Settings → Media Library**.

Each alert shows its media on its own overlay, so you can place it anywhere. Copy the URL from the picker and add it to your streaming app (see [Adding an overlay](/docs/guides/adding-an-overlay/)), then press the alert's play button to check it:

```
http://tokio-app.local:37891/alerts/<alert-id>/
```

## Gift alerts

Click **Any gift** to pick gifts. Search them, filter them by price and sort them. **Select all shown** checks every gift the filters leave, like all gifts of 1,000 coins or more. With none checked, the alert plays for any gift.

![The gift list filtered to gifts of at least 1,000 coins, with Galaxy checked](../../../../assets/screenshots/alerts-gifts.png)

Under the gifts, choose when it plays:

- **When streak ends**: once per combo, so a streak of 20 roses plays it once. The default.
- **Every gift**: once per gift, up to the queue's length.

TikTok's gift list misses some gifts, like other regions' ones. Tokio adds the ones viewers send, for all profiles.

## Chat, emote and join alerts

- **Chat**: type a keyword or phrase to play only for messages with it as a whole word. **hi** plays for "Hi there!" but not for "this", in any case.
- **Emote**: click **Any emote** to pick emotes. TikTok doesn't list a LIVE's emotes, so the list fills as viewers use them.
- **Member Join** and **Super Fan Join**: type an @handle or name to play only for that viewer, like an entrance sound for a regular.

## Queue

Alerts play one at a time. **Max queue length** drops the extras in a burst, and **Play alerts simultaneously** lets different triggers play at the same time.

![The Alerts page header, with Play alerts simultaneously and Max queue length](../../../../assets/screenshots/alerts-queue.png)

An alert with media holds the queue for its duration, so keep it short for frequent events like likes. Alerts stop when you disconnect or turn them off.
