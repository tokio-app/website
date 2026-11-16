---
title: Control API
description: Skip songs, stop TTS, replay alerts and pause Tokio from a Stream Deck, Companion or a script.
---

The [live controls](/docs/features/live-controls/) answer web requests, so any tool that can send one can press them: a Stream Deck plugin, Bitfocus Companion, Touch Portal or a script.

## Set it up

1. In **Settings → Remote control**, check **Enable remote control**. The overlay server must be on too.
2. Click **Show QR code and key**, and copy the **Key**.
3. Send every request with the header `Authorization: Bearer <key>`.

From the computer running Tokio, send requests to `http://localhost:37891`. From another device, use the computer's network address instead, like `http://192.168.1.20:37891` (it's in **Settings → Overlay server**).

## Requests

| Request                         | What it does                    |
| ------------------------------- | ------------------------------- |
| `GET /remote/api/state`         | Says whether Tokio is paused    |
| `POST /remote/api/skip-song`    | Skips the song                  |
| `POST /remote/api/stop-tts`     | Stops the message being read    |
| `POST /remote/api/replay-alert` | Replays the last event's alerts |
| `POST /remote/api/pause`        | Pauses Tokio, or resumes it     |

`state` answers `{ "paused": false }`. Every other request answers `{ "done": true, "paused": false }`: `paused` is the state after it, and `done` is `false` when there was nothing to do, such as no alert to replay yet, music not connected, or a pause that was already on.

Without a body, `pause` switches between paused and not. Send `{ "paused": true }` or `{ "paused": false }` as JSON to set it whatever it was.

```sh
curl -X POST http://localhost:37891/remote/api/pause \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{ "paused": true }'
```

## Errors

| Status   | What happened                                                             |
| -------- | ------------------------------------------------------------------------- |
| 401      | The key is missing or wrong. After a new key in Tokio, copy it again.     |
| 403      | Remote control is off in **Settings → Remote control**.                   |
| 400, 413 | The body isn't valid JSON, has fields other than `paused`, or is too big. |
| 404      | No such request.                                                          |
| 500      | The control failed. The answer's `error` says why.                        |
