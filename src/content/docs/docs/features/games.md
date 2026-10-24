---
title: Games
description: Let your LIVE spawn mobs, give items and run commands in Minecraft.
---

Let viewers do things in your Minecraft world: a gift spawns a mob, a follow gives you an item, a chat keyword changes the weather. Connect the game and make your actions on the **Games** page.

Tokio supports **Minecraft Bedrock Edition** for now. Java Edition can't connect yet.

## Connect Minecraft

Minecraft connects to Tokio, from its own chat. You need a world with cheats on, and one setting changed once.

1. In Minecraft, open **Settings → General → Network settings** and turn on **Enable WebSockets**. **Require Encrypted WebSockets** can stay on.
2. In Tokio, open **Games** and turn on **Minecraft**. The status reads **Waiting for Minecraft**.
3. Open a world with cheats on.
4. Type the command shown on the page in the game's chat. Click it on the page to copy it. It has your PC's address, like this one:

```
/connect 192.168.1.20:37892
```

The status changes to **Connected**, and the setup steps go away. When you leave the world, the connection ends and the status goes back to **Waiting for Minecraft**: type the command again next time.

![The Minecraft section while it waits for the game: the steps, then the command to type](../../../../assets/screenshots/games-connect.png)

Tokio listens for the game only while **Minecraft** is on. It's off until you turn it on, and the switch is the same for all profiles.

### Another device

The same command works when Minecraft runs on another device, like a phone, on the same network as your PC. If your PC has more than one address, the page shows a command for each: use the one on your device's network.

### If it doesn't connect

- The status says **Port 37892 is in use**: another program holds the port. Close it, then turn **Minecraft** off and on.
- The game says WebSockets are off: turn on **Enable WebSockets**, as in step 1.
- The game won't take the command: the world needs cheats on.

## Actions

An action is a trigger and the steps that run when it happens. Click **+** next to **Actions** to add one, then pick its trigger and its steps. Each action has its own switch, a **Test** button and a button to remove it. Actions belong to the profile.

![Two actions: a follow that spawns a zombie named after the viewer, and a gift that says a message in the game's chat](../../../../assets/screenshots/games-actions.png)

Triggers and their filters are the same as for [alerts](/docs/features/alerts/#triggers): Chat, Emote, Follow, Share, Like, Gift, Envelope, Super Fan, Super Fan Box, Super Fan Join, Member Join and Music Change.

- **Gift**: pick the gifts, and choose **When streak ends** or **Every gift**, as in [gift alerts](/docs/features/alerts/#gift-alerts). With **Every gift**, the steps run once for each gift sent.
- **Chat**: type a keyword to run only for messages that have it.
- **Member Join** and **Super Fan Join**: type an @handle or name to run only for that viewer.
- **Emote**: pick the emotes, or leave it for any.

Actions run while **Minecraft** is on, whether or not the features on **Home** are. With a game not connected, they do nothing.

## Steps

Steps run in order, as the player who typed the command. Click **Add step** to add one.

- **Spawn mob**: pick a mob, how many (1 to 100), and an optional name. The mobs appear where you stand.
- **Give item**: pick an item and how many (1 to 100). You get it.
- **Weather**: **Clear**, **Rain** or **Thunder**.
- **Time of day**: **Day**, **Noon**, **Night** or **Midnight**.
- **Command**: any command, typed as in the game's chat, with or without the slash. Use it for anything else, like effects, titles or sounds:

```
say {username} sent {count} {gift}!
```

A mob or item that doesn't exist in the game runs nothing.

## Variables

A mob's name and a command can use the trigger's details. Click a variable under the steps to add it, or type it.

- `{username}` and `{handle}`: every trigger with a viewer, so all but Envelope, Super Fan Box and Music Change
- `{comment}`: Chat and Emote
- `{gift}` and `{count}` (the streak's size): Gift. **Every gift** has no `{count}`, since the steps run once for each gift.
- `{count}` (the likes sent): Like
- `{song}`: Music Change

Viewers choose their own names and messages, so Tokio cleans what a variable adds before it goes into a command. It removes quotes (`"` and `'`), backslashes, brackets and braces (`[ ] { }`), `§`, `@` and control characters, and cuts the text to 100 characters. Your own text in the step stays as you wrote it.

## Test

The play button on an action runs its steps once with sample values, like a made-up viewer. Below the steps, Tokio says how many commands ran, or how many failed, and lists the last 25 with the game's answer to each. A command the game refuses shows in red, and the game answers in its own language. Click the line with the count to fold the list, or to open it again.

Test needs a connected game. Without one it says to turn on Minecraft and connect the game first.

## Limits

- An action on **Every gift** runs up to 100 times for one event.
- An action sends up to 100 commands for one event.
- Tokio sends the game up to 50 commands at a time, and keeps up to 500 waiting. Any beyond that fail.

## Notices

Tokio tells you in a notice when something doesn't work.

- **Minecraft isn't connected**: an action ran while **Minecraft** was on and no game was connected. It shows at most once a minute.
- **A command failed in Minecraft**: the game refused a command, with its answer, like a mob that can't spawn there. It shows at most once every 30 seconds for each action.
- **Tokio couldn't listen for Minecraft**: the port was in use when Tokio started.

## Java Edition

Java Edition can't connect to Tokio yet. It would need a mod to join, and that doesn't exist yet.
