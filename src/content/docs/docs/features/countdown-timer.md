---
title: Countdown timer
description: A countdown on your stream that viewers add time to with gifts, likes, follows and chat.
---

Run a subathon-style countdown on your stream: the clock runs down, and viewers add time to it with gifts, likes, follows, shares, chat and other LIVE events. Set it up on the **Tools** page.

## Add it to your stream

The timer has its own overlay. Copy its URL from **Tools** and add it to your streaming app like any overlay (see [Adding an overlay](/docs/guides/adding-an-overlay/)):

```
http://tokio-app.local:37891/timer/
```

Make the browser source as big as you like: the clock grows to fill it.

## Controls

- **Start** runs the clock from the starting time, or carries on from where it stopped.
- **Pause** holds the clock. LIVE events still add time while it's paused.
- **Stop** holds the clock, and events stop adding time until you press **Start** again. The clock also stops when it reaches 0.
- **Reset** puts the starting time back. Tokio asks first, since the time added so far is lost.
- **Add** and **Remove** change the clock by the minutes you enter, for example to add time for a donation from somewhere else.

**Starting time** is where the clock starts, and where **Reset** takes it back to. The clock keeps running when you leave the **Tools** page, and pauses when the LIVE ends or Tokio disconnects from it, with a notice. Turn off **Pause when the LIVE ends or disconnects** to keep it running.

## Time added

In **Time Added**, choose how many seconds each event adds. Set one to 0 to leave it out.

- **Coins**: seconds per coin of the gifts sent.
- **Likes**: seconds every so many likes.
- **New Super Fans**, **Follows** and **Shares**: seconds each.
- **Chat messages**: seconds each, for the messages that count.

Chat messages count only when they have the keyword or phrase you enter, matched like a [chat alert's](/docs/features/alerts/), and each viewer's messages count once in the cooldown you set, so spamming chat doesn't keep adding time. Leave the keyword empty to count any message.

Two settings apply to all of them:

- **Multiplier** multiplies the seconds of every event, for example 2 for a double-time hour.
- **Maximum time** stops added time once the clock reaches it. 0 means no limit.

## On stream

The overlay shows the clock, with an optional title above it. When viewers add time, how much shows under the clock for a moment, like **+1:30**. Time added in a burst adds up into one number. While the multiplier is on, the overlay shows it there too, like **×2**.

In **Timer Look**, right under the preview so you see each change, set:

- The colors of the clock, the title, the added time and the warning.
- **Title**: text over the clock, such as "Subathon". Leave it empty for none.
- **Warning**: how many minutes before the end the clock turns to its warning color. 0 turns it off.
- **Clock font** and **Title font**: any font installed on the computer that runs your streaming app. When they're empty, or the font isn't installed there, the overlay uses Archivo, Tokio's typeface.
- **Show the multiplier**: turn it off to keep the multiplier off stream.
- **Show the triggers, one at a time**: the overlay also shows what each event adds, one after another under the clock, like **Follow +30s**, with the multiplier counted in. Give each event the name viewers see, in their language.

## Profiles and restarts

Each profile has its own timer, with its own settings and clock. When you switch profiles, Tokio saves the clock first. If Tokio closes while the clock runs, it comes back paused with about the time it had: press **Start** to carry on.
