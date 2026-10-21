---
title: Music requests
description: Let viewers request songs from chat, played from YouTube or Spotify.
---

Viewers request songs from chat. **YouTube** songs play in Tokio's own player window, and **Spotify** songs in the Spotify app you have open, on your computer or your phone. Set it up on the **Music** page and turn it on for the session on **Home**.

## Provider

Choose YouTube or Spotify on the **Music** page and connect. Spotify needs your own **Spotify Client ID**, entered on the same page.

Both services need a **Premium** account. On YouTube Music, a free account plays ads, which can delay songs or cut them short. On Spotify, only Premium accounts let apps control playback, and creating the Spotify app whose Client ID Tokio uses needs Premium too.

## Chat commands

The chat commands can be renamed or turned off in the **Controls** section, and viewers can type them in any case:

| Command   | Action                                   |
| --------- | ---------------------------------------- |
| `!play`   | Request a song                           |
| `!next`   | Skip to the next song                    |
| `!last`   | Go back to the last song                 |
| `!revoke` | Remove a song from the queue by its name |

For example, a viewer types `!play One More Time` to add that song to the queue.

## Who can request

Music requests have their own [permissions and protection](/docs/features/text-to-speech/#permissions) settings, set the same way as text-to-speech's: who can use the commands, a cooldown between requests and a maximum queue length.

Song changes are also a LIVE event, so they can trigger an [alert](/docs/features/alerts/) or update an [overlay](/docs/features/overlays/).
