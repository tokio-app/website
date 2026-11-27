---
title: Events
description: Every event Tokio sends to overlays, with its data.
---

Subscribe with `tokio.on(TOKIO_EVENTS.<NAME>, callback)`. Over a raw WebSocket, the `type` of each message is the event name in the table.

## LIVE events

| Constant         | Event name                 | Sent when                                       |
| ---------------- | -------------------------- | ----------------------------------------------- |
| `CHAT`           | `tokio:event:chat`         | A viewer sends a chat message                   |
| `FOLLOW`         | `tokio:event:follow`       | A viewer follows you                            |
| `SHARE`          | `tokio:event:share`        | A viewer shares the LIVE                        |
| `LIKE`           | `tokio:event:like`         | A viewer likes the LIVE                         |
| `GIFT`           | `tokio:event:gift`         | A viewer sends a gift                           |
| `ENVELOPE`       | `tokio:event:envelope`     | A treasure envelope or a Super Fan box is sent  |
| `SUPER_FAN`      | `tokio:event:superfan`     | A viewer becomes a Super Fan                    |
| `SUPER_FAN_BOX`  | `tokio:event:superfanbox`  | A Super Fan box is sent, before its `ENVELOPE`  |
| `SUPER_FAN_JOIN` | `tokio:event:superfanjoin` | A Super Fan joins the LIVE                      |
| `MEMBER_JOIN`    | `tokio:event:memberjoin`   | A viewer joins the LIVE                         |
| `ROOM_USER`      | `tokio:event:roomuser`     | The viewer count and top viewers change         |
| `SUBSCRIBE`      | `tokio:event:subscribe`    | A viewer subscribes, renews or becomes a member |
| `GIFT_SUB`       | `tokio:event:giftsub`      | A viewer gifts subscriptions or memberships     |
| `CHEER`          | `tokio:event:cheer`        | A viewer spends Bits on Twitch                  |
| `RAID`           | `tokio:event:raid`         | Another channel raids or hosts you              |
| `REDEEM`         | `tokio:event:redeem`       | A viewer redeems a channel points reward        |
| `SUPER_CHAT`     | `tokio:event:superchat`    | A viewer sends a Super Chat or Super Sticker    |
| `KICKS`          | `tokio:event:kicks`        | A viewer sends Kicks on Kick                    |
| `MUSIC_CHANGE`   | `tokio:event:music:change` | The music request queue changes                 |

## Platforms

Tokio connects to TikTok, Twitch, YouTube and Kick, alone or several in the same LIVE. Each platform sends some of the events:

| Events                                                                                     | Come from                        |
| ------------------------------------------------------------------------------------------ | -------------------------------- |
| `CHAT` and chat emotes                                                                     | TikTok, Twitch, YouTube and Kick |
| `FOLLOW`                                                                                   | TikTok and Twitch                |
| `GIFT`                                                                                     | TikTok and YouTube               |
| `SUBSCRIBE`, `GIFT_SUB`                                                                    | Twitch, YouTube and Kick         |
| `RAID`, `REDEEM`                                                                           | Twitch and Kick                  |
| `SHARE`, `LIKE`, `ENVELOPE`, `SUPER_FAN`, `SUPER_FAN_BOX`, `SUPER_FAN_JOIN`, `MEMBER_JOIN` | TikTok                           |
| `CHEER`                                                                                    | Twitch                           |
| `SUPER_CHAT`                                                                               | YouTube                          |
| `KICKS`                                                                                    | Kick                             |
| `ROOM_USER`                                                                                | All of them, summed              |

An overlay gets the events of every platform the profile connects to, so check `user.platform` to tell them apart. `ROOM_USER` adds up `viewers` and `views` across the platforms, which is TikTok's alone when no other is connected. Twitch, YouTube and Kick have no `views`, so they add 0, and `ranks` are TikTok's. Twitch's and YouTube's viewer counts update every 30 seconds, and Kick's every 60.

In Tokio's previews, **Test** sends the events of the profile's platforms, each the way its platform sends it. Twitch only has Bits and channel points on Affiliate and Partner channels.

## Settings

Tokio sends `CONFIG` (`tokio:config`) with the overlay's settings when the streamer saves them, and on each change while they edit them in the preview. See [Settings](/docs/developers/building-an-overlay/#settings).

## Fans

Tokio sends `FANS` (`tokio:fans`) with the TikTok fans the streamer's profile has seen in its LIVEs, when the overlay connects, after a profile switch, and again when the list changes, at most every 5 seconds. In Tokio's previews, it comes as a sample when you click **Test**.

TikTok only sends a viewer's fan level when they do something in the LIVE, so this list has fans your overlay hasn't seen yet. It holds up to 100, from the highest fan level down and, at the same level, the most recently seen first. Twitch's and Kick's subscribers and YouTube's members stay out of it.

## Gifters

Tokio sends `GIFTERS` (`tokio:gifters`) with the top gifters, at most once a second: when the overlay connects, after a profile loads, when a LIVE starts, ends or is deleted, when the history is cleared, and on gifts.

`live` is this LIVE's top 10 TikTok gifters by coins, empty while Tokio isn't connected. `allTime` is the top 10 across every LIVE the profile kept, this one included. Only TikTok's coins count, so Twitch's Bits, YouTube's Super Chats and Jewels and Kick's Kicks never put anyone here, and one platform's money never ranks against another's.

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
  vip?: boolean; // a VIP on Twitch or Kick
  fanLevel?: number;
  fanBadge?: string; // the picture of the fan level's badge
  userId?: string; // the platform's id, which stays when the handle changes
  platform?: "tiktok" | "twitch" | "youtube" | "kick"; // missing means TikTok
  subMonths?: number; // months subscribed or a member, from their chat badge
}
```

`platform` says where the viewer is, and a missing one means TikTok. A Twitch viewer's `userId` starts with `twitch:`, like `twitch:1234`, and a YouTube viewer's is `youtube:` and their channel id, like `youtube:UC…`, so they never match a TikTok one. YouTube's chat doesn't give a Gift's sender's channel id, so Tokio uses the one it saw on their other events in the LIVE, and otherwise `youtube:` and their @handle, like `youtube:@tokio`. A Kick viewer's `userId` is `kick:` and their Kick id, like `kick:1234`. Kick's subscriptions and gifted subs name people only by username, so Tokio finds their id in the LIVE's chat or looks up their channel, and sends the event without one when that fails. Kick's hosts and channel rewards come without a `userId`.

`fanBadge` is the picture TikTok shows for the fan level: a heart that changes every 10 levels, without the number, so draw `fanLevel` next to it. It's empty for a viewer who isn't a fan.

`follower`, `moderator` and `superfan` are only real on `CHAT` and `GIFT`. Every other TikTok event sends `false`, even `FOLLOW`.

Twitch's chat says who moderates and who subscribes, but not who follows. On a Twitch `CHAT`, `moderator` is true for your moderators and for you, `superfan` for your subscribers, `vip` for your VIPs, and `follower` is always `false`. A Twitch viewer has no `fanLevel` or `fanBadge`, nor profile pictures, except a raiding streamer's. Its other events leave `moderator`, `superfan` and `vip` out. A cheer, subscription or gift from an anonymous viewer comes with the username `Anonymous`, and no `userId`.

On a YouTube `CHAT`, `moderator` is true for your channel's moderators and for you, `superfan` for its members, and `follower` is always `false`, since YouTube has no followers. A YouTube viewer has no `fanLevel` or `fanBadge`, but chatters do have profile pictures.

On a Kick `CHAT`, `moderator` is true for your moderators and for you, `superfan` for your subscribers and founders, `vip` for your VIPs, and `follower` is always `false`, since Kick's chat says nothing about follows. A Kick viewer has no `fanLevel` or `fanBadge`. Chatters have no profile pictures, but a Kicks sender does.

`subMonths` is how many months a Twitch or Kick subscriber, or a YouTube member, has been one, when their chat badge says so. YouTube's badge shows only a milestone, so a member of a year has 12, and a new member none. It's missing on TikTok, and on Twitch's and Kick's events other than `CHAT`.

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
| `SUPER_CHAT`                                           | `{ user, amount, usd, message, sticker }`                                 |
| `KICKS`                                                | `{ user, kicks, message }`                                                |
| `ROOM_USER`                                            | `{ views, viewers, ranks }`                                               |
| `MUSIC_CHANGE`                                         | The queue: `{ title, thumbnail, playing, played }[]`                      |
| `FANS`                                                 | `{ fans: Fan[] }`                                                         |
| `GIFTERS`                                              | `{ live: TopGifter[], allTime: TopGifter[] }`                             |

Each chat emote is `{ emoteID, index, images }`, and a comment made only of emotes has an empty `content`. A gift's `image` is the URL of its picture.

A chat's `content` is what the viewer typed, and `lang` is the language TikTok tagged it with, empty when it didn't. Twitch's, YouTube's and Kick's chat have no language tag, so their `lang` is always empty and they never come with `translation`. Twitch's `content` leaves out the emotes' codes and cheermotes, and each emote's `emoteID` is `twitch:` and its id, with Twitch's picture in `images`. A Kick emote's `emoteID` is `kick:` and its id, with its picture on files.kick.com. With [Chat translation](/docs/features/chat-translation/) on, a message tagged with another language than the streamer's comes with `translation`: `{ text, from, to }`, the translated text and both languages as lowercase codes, like `en` and `es`. Messages already in the streamer's language, chat commands and messages Tokio couldn't translate come without it, so fall back to `content`. An emote's `index` points into `content`, not the translation.

On Twitch, `tier` is `"1000"`, `"2000"` or `"3000"`, or `"prime"` for a Prime subscription, and `SUBSCRIBE`'s `months` is how many months the viewer has subscribed, 1 for a new subscription. `message` is what the viewer wrote with a subscription or a cheer, without cheermotes, and empty for nothing. `GIFT_SUB`'s `count` is how many subscriptions they gave at once. `RAID`'s `user` is the raiding channel's streamer, and `viewers` the people they brought. `REDEEM`'s `input` is what the reward asked the viewer to type, empty for nothing.

On YouTube, `SUBSCRIBE` is a membership: a new member, or a milestone with its `months`. Each channel names its own membership levels, so `tier` is always empty, as is `GIFT_SUB`'s, and a `GIFT_SUB` comes once for the whole gift. A YouTube emote is a member's custom emoji; standard emojis stay in `content`.

On Kick, `SUBSCRIBE`'s `months` is how many months the viewer has subscribed, `tier` is always empty, as is `GIFT_SUB`'s, and a `GIFT_SUB` comes once for the whole gift. A `RAID` is a host: its `user` is the hosting streamer, by username, and `viewers` the people they brought.

`SUPER_CHAT`'s `amount` is what the viewer paid, as YouTube shows it, like `"$4.99"`, so don't add amounts up: they can be in different currencies. Add up `usd` instead, the amount in US dollars at the day's exchange rates. It's `null` when Tokio couldn't read the amount, before the rates load, or for a currency they don't have. `message` is what they wrote, empty for a Super Sticker, and `sticker` is the Super Sticker's picture URL, empty for a Super Chat.

A YouTube Gift comes as `GIFT` with an `id` of `youtube:` and its picture's file name, like `youtube:silver_star_v2_320x320`. Its `coins` is one Gift's price in YouTube's Jewels, not TikTok's coins, so check `user.platform` before you add gifts up. It's `0` for a Gift Tokio doesn't know the price of.

When YouTube reports a combo, the same Gift sent several times in a row, it comes as one `GIFT` with `comboCount` set to how many. A Gift's sender never joins `GIFTERS`.

`KICKS` is Kick's money, like `CHEER`'s Bits: `kicks` is how many the viewer sent, and `message` what they pinned with them, empty for nothing. Kick sends no `GIFT`.

`gift.id` is a string, while a `gifts` setting's value is a number, so compare them with `Number(gift.id)`. `coins` is one gift's price, in TikTok's coins or YouTube's Jewels, so a streak is worth `coins × comboCount`.

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
  platform?: "tiktok" | "twitch" | "youtube" | "kick"; // missing means TikTok
}
```

`picture` is empty when TikTok sent none. TikTok's links expire about 2 days after it sends them, so fall back to something, such as their initial, when one fails to load.
