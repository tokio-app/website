---
title: Music requests
description: Let viewers request songs from chat, played from YouTube or Spotify.
---

Viewers request songs from chat, played from **YouTube** or **Spotify** in a separate player window. Set it up on the **Music** page and turn it on for the session on **Home**.

## Provider

Choose YouTube or Spotify on the **Music** page and connect. Spotify needs your own **Spotify Client ID**, entered on the same page.

## Chat commands

The chat commands can be renamed or turned off in the **Controls** section:

| Command   | Action                             |
| --------- | ---------------------------------- |
| `!play`   | Request a song                     |
| `!next`   | Skip to the next song              |
| `!last`   | Go back to the last song           |
| `!revoke` | Remove your request from the queue |

For example, a viewer types `!play One More Time` to add that song to the queue.

## Who can request

Music requests use the same [permissions and protection](/docs/features/text-to-speech/#permissions) settings as text-to-speech: who can use the commands, a cooldown per viewer and a maximum queue length.

Song changes are also a LIVE event, so they can trigger an [alert](/docs/features/alerts/) or update an [overlay](/docs/features/overlays/).
