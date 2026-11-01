---
title: Events
description: Every event Tokio sends to overlays, with its data.
---

Subscribe with `tokio.on(TOKIO_EVENTS.<NAME>, callback)`. Over a raw WebSocket, the `type` of each message is the event name in the table.

## LIVE events

| Constant         | Event name                 | Sent when                               |
| ---------------- | -------------------------- | --------------------------------------- |
| `CHAT`           | `tokio:event:chat`         | A viewer sends a chat message           |
| `FOLLOW`         | `tokio:event:follow`       | A viewer follows you                    |
| `SHARE`          | `tokio:event:share`        | A viewer shares the LIVE                |
| `LIKE`           | `tokio:event:like`         | A viewer likes the LIVE                 |
| `GIFT`           | `tokio:event:gift`         | A viewer sends a gift                   |
| `ENVELOPE`       | `tokio:event:envelope`     | A treasure envelope is sent             |
| `SUPER_FAN`      | `tokio:event:superfan`     | A viewer becomes a Super Fan            |
| `SUPER_FAN_BOX`  | `tokio:event:superfanbox`  | A Super Fan box is sent                 |
| `SUPER_FAN_JOIN` | `tokio:event:superfanjoin` | A Super Fan joins the LIVE              |
| `MEMBER_JOIN`    | `tokio:event:memberjoin`   | A viewer joins the LIVE                 |
| `ROOM_USER`      | `tokio:event:roomuser`     | The viewer count and top viewers change |
| `MUSIC_CHANGE`   | `tokio:event:music:change` | The music request queue changes         |

## Settings

Tokio sends `CONFIG` (`tokio:config`) with the overlay's settings when the streamer saves them, and on each change while they edit them in the preview. See [Settings](/docs/developers/building-an-overlay/#settings).

## Fans

Tokio sends `FANS` (`tokio:fans`) with the fans the streamer's profile has seen in its LIVEs, when the overlay connects and again when the list changes, at most every 5 seconds. Tokio's previews don't send it.

TikTok only sends a viewer's fan level when they do something in the LIVE, so this list has fans your overlay hasn't seen yet. It holds up to 100, from the highest fan level down and, at the same level, the most recently seen first.

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
interface User {
  username: string; // display name
  handle: string; // @handle
  profilePictures: string[];
  superfan?: boolean;
  follower?: boolean;
  moderator?: boolean;
  fanLevel?: number;
  fanBadge?: string; // the picture of the fan level's badge
  userId?: string; // TikTok's id, which stays when the handle changes
}
```

`fanBadge` is the picture TikTok shows for the fan level: a heart that changes every 10 levels, without the number, so draw `fanLevel` next to it. It's empty for a viewer who isn't a fan.

| Event                                                  | Data                                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------------------- |
| `CHAT`                                                 | `{ user, comment: { content, emotes, lang } }`                            |
| `FOLLOW`, `SUPER_FAN`, `SUPER_FAN_JOIN`, `MEMBER_JOIN` | `{ user }`                                                                |
| `SHARE`                                                | `{ user, shareCount }`                                                    |
| `LIKE`                                                 | `{ user, likeCount, totalLikes }`                                         |
| `GIFT`                                                 | `{ user, gift: { id, name, coins, type, comboCount, repeatEnd, image } }` |
| `ENVELOPE`, `SUPER_FAN_BOX`                            | none                                                                      |
| `ROOM_USER`                                            | `{ views, viewers, ranks: (User & { score, position })[] }`               |
| `MUSIC_CHANGE`                                         | The queue: `{ title, thumbnail, playing, played }[]`                      |
| `FANS`                                                 | `{ fans: Fan[] }`                                                         |

Each chat emote is `{ emoteID, index, images }`. A gift's `image` is the URL of its picture.

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
  seenAt: number; // when Tokio last saw them, in ms since the epoch
}
```

Fans have no profile picture, since TikTok's links to them expire within a couple of days. For a fan in the LIVE, take it from the `user` of their events. The badge's links don't expire.
