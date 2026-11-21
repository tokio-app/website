---
title: Events
description: Every event Tokio sends to overlays, with its data.
---

Subscribe with `tokio.on(TOKIO_EVENTS.<NAME>, callback)`. Over a raw WebSocket, the `type` of each message is the event name in the table.

## LIVE events

| Constant         | Event name                 | Sent when                                      |
| ---------------- | -------------------------- | ---------------------------------------------- |
| `CHAT`           | `tokio:event:chat`         | A viewer sends a chat message                  |
| `FOLLOW`         | `tokio:event:follow`       | A viewer follows you                           |
| `SHARE`          | `tokio:event:share`        | A viewer shares the LIVE                       |
| `LIKE`           | `tokio:event:like`         | A viewer likes the LIVE                        |
| `GIFT`           | `tokio:event:gift`         | A viewer sends a gift                          |
| `ENVELOPE`       | `tokio:event:envelope`     | A treasure envelope or a Super Fan box is sent |
| `SUPER_FAN`      | `tokio:event:superfan`     | A viewer becomes a Super Fan                   |
| `SUPER_FAN_BOX`  | `tokio:event:superfanbox`  | A Super Fan box is sent, before its `ENVELOPE` |
| `SUPER_FAN_JOIN` | `tokio:event:superfanjoin` | A Super Fan joins the LIVE                     |
| `MEMBER_JOIN`    | `tokio:event:memberjoin`   | A viewer joins the LIVE                        |
| `ROOM_USER`      | `tokio:event:roomuser`     | The viewer count and top viewers change        |
| `SUBSCRIBE`      | `tokio:event:subscribe`    | A viewer subscribes or renews on Twitch        |
| `GIFT_SUB`       | `tokio:event:giftsub`      | A viewer gifts subscriptions on Twitch         |
| `CHEER`          | `tokio:event:cheer`        | A viewer spends Bits on Twitch                 |
| `RAID`           | `tokio:event:raid`         | Another Twitch channel raids you               |
| `REDEEM`         | `tokio:event:redeem`       | A viewer redeems a channel points reward       |
| `MUSIC_CHANGE`   | `tokio:event:music:change` | The music request queue changes                |

## Platforms

Tokio connects to TikTok and Twitch, alone or in the same LIVE. Each platform sends some of the events:

| Events                                                                                             | Come from         |
| -------------------------------------------------------------------------------------------------- | ----------------- |
| `CHAT`, `FOLLOW`, and chat emotes                                                                  | TikTok and Twitch |
| `SHARE`, `LIKE`, `GIFT`, `ENVELOPE`, `SUPER_FAN`, `SUPER_FAN_BOX`, `SUPER_FAN_JOIN`, `MEMBER_JOIN` | TikTok            |
| `SUBSCRIBE`, `GIFT_SUB`, `CHEER`, `RAID`, `REDEEM`                                                 | Twitch            |
| `ROOM_USER`                                                                                        | Both, summed      |

An overlay gets the events of every platform the profile connects to, so check `user.platform` to tell them apart. `ROOM_USER` adds up `viewers` and `views` across the platforms, which is TikTok's alone when Twitch isn't connected. Twitch has no `views`, so it adds 0, and `ranks` are TikTok's. Twitch's viewer count updates every 30 seconds.

In Tokio's previews, the Twitch events come as samples when you click **Test**. Twitch only has Bits and channel points on Affiliate and Partner channels.

## Settings

Tokio sends `CONFIG` (`tokio:config`) with the overlay's settings when the streamer saves them, and on each change while they edit them in the preview. See [Settings](/docs/developers/building-an-overlay/#settings).

## Fans

Tokio sends `FANS` (`tokio:fans`) with the fans the streamer's profile has seen in its LIVEs, when the overlay connects, after a profile switch, and again when the list changes, at most every 5 seconds. In Tokio's previews, it comes as a sample when you click **Test**.

TikTok only sends a viewer's fan level when they do something in the LIVE, so this list has fans your overlay hasn't seen yet. It holds up to 100, from the highest fan level down and, at the same level, the most recently seen first.

## Gifters

Tokio sends `GIFTERS` (`tokio:gifters`) with the top gifters, at most once a second: when the overlay connects, after a profile loads, when a LIVE starts, ends or is deleted, when the history is cleared, and on gifts.

`live` is this LIVE's top 10 by coins, empty while Tokio isn't connected. `allTime` is the top 10 across every LIVE the profile kept, this one included.

Ties go to whoever got there first. Only gifts count as coins: treasure chests and Super Fan subscriptions don't.

In Tokio's previews, it comes as a sample when you click **Test**.

## Music

Tokio sends `MUSIC_CHANGE` with the whole song request queue each time it changes and when its last song ends. An overlay also gets it as it connects, while the queue has songs.

In Tokio's previews, it comes as a sample when you click **Test**.

The queue is in order: the songs already played, the one playing (`playing: true`), then the ones waiting. When no song is playing, the queue is empty or its last song ended.

`title` is the song and its artists, as `Song - Artist`. Tokio can't tell when a song is paused, so `playing` only marks where the queue is.

## Connection events

These come from `@tokioapp/overlay` itself, about its WebSocket. They don't fire in Tokio's previews, which don't use one, so don't wait for `OPEN` to show the overlay.

| Constant | Event name    | Data                         |
| -------- | ------------- | ---------------------------- |
| `OPEN`   | `tokio:open`  | none                         |
| `CLOSE`  | `tokio:close` | `{ code, reason, wasClean }` |
| `ERROR`  | `tokio:error` | `{ type, message?, error? }` |

## Data

Most events include the viewer who triggered them:

```ts
interface UserData {
  username: string; // display name
  handle: string; // @handle
  profilePictures: string[];
  superfan?: boolean;
  follower?: boolean;
  moderator?: boolean;
  fanLevel?: number;
  fanBadge?: string; // the picture of the fan level's badge
  userId?: string; // the platform's id, which stays when the handle changes
  platform?: "tiktok" | "twitch"; // missing means TikTok
}
```

`platform` says where the viewer is, and a missing one means TikTok. A Twitch viewer's `userId` starts with `twitch:`, like `twitch:1234`, so it never matches a TikTok one.

`fanBadge` is the picture TikTok shows for the fan level: a heart that changes every 10 levels, without the number, so draw `fanLevel` next to it. It's empty for a viewer who isn't a fan.

`follower`, `moderator` and `superfan` are only real on `CHAT` and `GIFT`. Every other TikTok event sends `false`, even `FOLLOW`.

Twitch's chat says who moderates and who subscribes, but not who follows. On a Twitch `CHAT`, `moderator` is true for your moderators and for you, `superfan` for your subscribers, and `follower` is always `false`. A Twitch viewer has no `fanLevel` or `fanBadge`, nor profile pictures, except a raiding streamer's. Its other events leave `moderator` and `superfan` out. A cheer, subscription or gift from an anonymous viewer comes with the username `Anonymous`, and no `userId`.

| Event                                                  | Data                                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------------------- |
| `CHAT`                                                 | `{ user, comment: { content, emotes, lang, translation? } }`              |
| `FOLLOW`, `SUPER_FAN`, `SUPER_FAN_JOIN`, `MEMBER_JOIN` | `{ user }`                                                                |
| `SHARE`                                                | `{ user, shareCount }`                                                    |
| `LIKE`                                                 | `{ user, likeCount, totalLikes }`                                         |
| `GIFT`                                                 | `{ user, gift: { id, name, coins, type, comboCount, repeatEnd, image } }` |
| `ENVELOPE`, `SUPER_FAN_BOX`                            | none                                                                      |
| `SUBSCRIBE`                                            | `{ user, tier, months, message }`                                         |
| `GIFT_SUB`                                             | `{ user, count, tier }`                                                   |
| `CHEER`                                                | `{ user, bits, message }`                                                 |
| `RAID`                                                 | `{ user, viewers }`                                                       |
| `REDEEM`                                               | `{ user, reward: { id, title, cost }, input }`                            |
| `ROOM_USER`                                            | `{ views, viewers, ranks }`                                               |
| `MUSIC_CHANGE`                                         | The queue: `{ title, thumbnail, playing, played }[]`                      |
| `FANS`                                                 | `{ fans: Fan[] }`                                                         |
| `GIFTERS`                                              | `{ live: TopGifter[], allTime: TopGifter[] }`                             |

Each chat emote is `{ emoteID, index, images }`, and a comment made only of emotes has an empty `content`. A gift's `image` is the URL of its picture.

A chat's `content` is what the viewer typed, and `lang` is the language TikTok tagged it with, empty when it didn't. Twitch's chat has no language tag, so its `lang` is always empty and it never comes with `translation`. Its `content` leaves out the emotes' codes and cheermotes, and each emote's `emoteID` is `twitch:` and its id, with Twitch's picture in `images`. With [Chat translation](/docs/features/chat-translation/) on, a message tagged with another language than the streamer's comes with `translation`: `{ text, from, to }`, the translated text and both languages as lowercase codes, like `en` and `es`. Messages already in the streamer's language, chat commands and messages Tokio couldn't translate come without it, so fall back to `content`. An emote's `index` points into `content`, not the translation.

On Twitch, `tier` is `"1000"`, `"2000"` or `"3000"`, or `"prime"` for a Prime subscription, and `SUBSCRIBE`'s `months` is how many months the viewer has subscribed, 1 for a new subscription. `message` is what the viewer wrote with a subscription or a cheer, without cheermotes, and empty for nothing. `GIFT_SUB`'s `count` is how many subscriptions they gave at once. `RAID`'s `user` is the raiding channel's streamer, and `viewers` the people they brought. `REDEEM`'s `input` is what the reward asked the viewer to type, empty for nothing.

`gift.id` is a string, while a `gifts` setting's value is a number, so compare them with `Number(gift.id)`. `coins` is one gift's price, so a streak is worth `coins × comboCount`.

`totalLikes` can drop for a while, so keep the highest you've seen. In `ROOM_USER`, `viewers` is how many watch now and `views` the LIVE's total, and each of `ranks` is `{ username, handle, profilePictures, userId, score, position }`.

:::tip[Gift combos]
A gift streak sends several `GIFT` events with a growing `comboCount`. The last one has `repeatEnd: true`; react to that one for a single reaction per combo.
:::

Each fan in `FANS`:

```ts
interface Fan {
  userId: string;
  username: string; // display name
  handle: string; // @handle
  fanLevel: number;
  fanBadge: string; // the picture of the fan level's badge
  superfan: boolean; // a Super Fan, as their last chat, gift or Super Fan event said
  seenAt: number; // when Tokio last saw them, in ms since the epoch
}
```

Fans have no profile picture, since TikTok's links to them expire within a couple of days. For a fan in the LIVE, take it from the `user` of their events. The badge's links don't expire.

Each gifter in `GIFTERS`:

```ts
interface TopGifter {
  userId: string;
  username: string; // display name
  handle: string; // @handle
  picture: string; // their profile picture, from their latest gift
  live: { coins: number; gifts: number }; // in this LIVE, 0 if they sent none
  allTime: { coins: number; gifts: number }; // in every LIVE the profile kept
  giftedAt: number; // when their last gift came, in ms since the epoch
  platform?: "tiktok" | "twitch"; // missing means TikTok
}
```

`picture` is empty when TikTok sent none. TikTok's links expire about 2 days after it sends them, so fall back to something, such as their initial, when one fails to load.
