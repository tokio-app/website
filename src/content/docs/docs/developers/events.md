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

## Library events

These come from `tokio-event-loader`:

| Constant | Event name     | Data                                                                                   |
| -------- | -------------- | -------------------------------------------------------------------------------------- |
| `OPEN`   | `tokio:open`   | none                                                                                   |
| `CLOSE`  | `tokio:close`  | `{ code, reason, wasClean }`                                                           |
| `ERROR`  | `tokio:error`  | `{ type, message?, error? }`                                                           |
| `CONFIG` | `tokio:config` | The overlay's settings, see [Settings](/docs/developers/building-an-overlay/#settings) |

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
}
```

| Event                                                  | Data                                                               |
| ------------------------------------------------------ | ------------------------------------------------------------------ |
| `CHAT`                                                 | `{ user, comment: { content, emotes, lang } }`                     |
| `FOLLOW`, `SUPER_FAN`, `SUPER_FAN_JOIN`, `MEMBER_JOIN` | `{ user }`                                                         |
| `SHARE`                                                | `{ user, shareCount }`                                             |
| `LIKE`                                                 | `{ user, likeCount, totalLikes }`                                  |
| `GIFT`                                                 | `{ user, gift: { id, name, coins, type, comboCount, repeatEnd } }` |
| `ENVELOPE`, `SUPER_FAN_BOX`                            | none                                                               |
| `ROOM_USER`                                            | `{ views, viewers, ranks: (User & { score, position })[] }`        |
| `MUSIC_CHANGE`                                         | The queue: `{ title, thumbnail, duration, playing, played }[]`     |

Each chat emote is `{ emoteID, index, images }`.

:::tip[Gift combos]
A gift streak sends several `GIFT` events with a growing `comboCount`. The last one has `repeatEnd: true`; react to that one for a single reaction per combo.
:::
