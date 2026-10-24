---
title: Games
description: Let your LIVE spawn mobs, give items and run commands in Minecraft.
---

Let viewers do things in your Minecraft world: a gift spawns a mob, a follow gives you an item, a chat keyword changes the weather. Connect the game and make your actions on the **Games** page.

Tokio works with **Minecraft Bedrock Edition** and **Minecraft Java Edition**. Bedrock connects by itself. Java needs the Tokio mod. Both connect from the game's own chat, and Tokio takes one game at a time: when another one connects, it replaces the first.

## Connect Minecraft

1. In Tokio, open **Games** and turn on **Minecraft**. The status reads **Waiting for Minecraft**.
2. Follow your edition's steps below.
3. Type the command shown on the page in the game's chat. Click it on the page to copy it.

Until a game connects, the page shows the setup for both editions side by side, each with its steps and its command. The command has your PC's address.

![The Minecraft section while it waits for the game: the steps and the command to type for Bedrock Edition and for Java Edition](../../../../assets/screenshots/games-connect.png)

When the game connects, the status says **Connected to Bedrock Edition** or **Connected to Java Edition**, and the setup steps go away.

Tokio listens for the game only while **Minecraft** is on. It's off until you turn it on, and the switch is the same for all profiles.

## Bedrock Edition

Bedrock needs a world with cheats on, and one setting changed once.

1. In Minecraft, open **Settings → General → Network settings** and turn on **Enable WebSockets**. **Require Encrypted WebSockets** can stay on.
2. Open a world with cheats on.
3. Type the command shown on the page in the game's chat, like this one:

```
/connect 192.168.1.20:37892
```

When you leave the world, the connection ends and the status goes back to **Waiting for Minecraft**: type the command again next time.

If it doesn't connect:

- The status says **Port 37892 is in use**: another program holds the port. Close it, then turn **Minecraft** off and on.
- The game says WebSockets are off: turn on **Enable WebSockets**, as in step 1.
- The game won't take the command: the world needs cheats on.

## Java Edition

Java Edition connects through the Tokio mod, a mod for Fabric. It works in single-player worlds, and in LAN worlds you host. It doesn't work on dedicated servers. Cheats aren't needed: the mod runs Tokio's commands as you, where you stand, with the permission a command block has. Their answers don't show in the game's chat.

### Install the mod

You do this once. The mod is for Minecraft Java **26.3**.

1. Install [Fabric Loader](https://fabricmc.net/use/installer/) for Minecraft 26.3.
2. Download [Fabric API](https://modrinth.com/mod/fabric-api) for 26.3 and put it in Minecraft's `mods` folder.
3. Download the Tokio mod's `.jar` from its [releases page](https://github.com/tokio-app/minecraft-mod/releases/latest) and put it in the same `mods` folder.
4. Start Minecraft with the Fabric profile.

### Connect

1. In Tokio, open **Games** and turn on **Minecraft**.
2. Open a world. Cheats can stay off.
3. Type the command shown on the page in the game's chat, like this one:

```
/tokio connect 192.168.1.20:37892
```

On the same PC as Tokio, `/tokio connect` is enough. The mod never reconnects by itself: type the command again each time you open the world.

| Command                    | What it does                                       |
| -------------------------- | -------------------------------------------------- |
| `/tokio`                   | Says whether the world is connected to Tokio       |
| `/tokio connect [address]` | Connects to Tokio, at `localhost:37892` by default |
| `/tokio disconnect`        | Disconnects from Tokio                             |

Only the world's host can use them.

### If it doesn't connect

- The game doesn't know `/tokio`: the mod isn't loaded. Check that Minecraft runs with the Fabric profile, and that Fabric API and the Tokio mod are in the `mods` folder.
- The chat says **Couldn't connect to Tokio at …**: turn on **Minecraft** in Tokio, and check that the address in the command is one of your PC's addresses, as the page shows them.
- The chat says **Disconnected from Tokio.** with a reason. **Another game connected to Tokio.** means another game replaced this one. **Minecraft was turned off in Tokio.** means the switch on the **Games** page was turned off. Type `/tokio connect` again to come back.
- A guest in your LAN world can't use the commands: only the host can.

## Another device

The same command works when Minecraft runs on another device on the same network as your PC, like a phone for Bedrock, or another PC for Java. If your PC has more than one address, the page shows a command for each: use the one on your device's network.

## Actions

An action is a trigger and the steps that run when it happens. Click **+** next to **Actions** to add one, then pick its edition, its trigger and its steps. Each action has its own switch, an **Edition** picker, a **Test** button, a **Duplicate** button and a button to remove it. Actions belong to the profile.

![Two actions, each with its switch, edition, trigger, and buttons to test, duplicate and remove it: a follow that spawns a zombie named after the viewer, and a gift that says a message in the game's chat](../../../../assets/screenshots/games-actions.png)

An action is for one edition, **Bedrock** or **Java**. New actions take the edition of the game that's connected, or Bedrock when none is. The mob and item lists show that edition's own. When you change an action's edition, Tokio moves its mobs and items to the other edition's, by their English name. One with no match becomes a zombie, or a diamond for an item.

**Duplicate** copies an action and puts the copy right after it. Change the copy's edition to run the same steps in the other game.

Triggers and their filters are the same as for [alerts](/docs/features/alerts/#triggers): Chat, Emote, Follow, Share, Like, Gift, Envelope, Super Fan, Super Fan Box, Super Fan Join, Member Join and Music Change. Like also takes a number of likes.

- **Gift**: pick the gifts, and choose **When streak ends** or **Every gift**, as in [gift alerts](/docs/features/alerts/#gift-alerts). With **Every gift**, the steps run once for each gift sent.
- **Chat**: type a keyword or phrase to run only for messages that have it.
- **Like**: choose how many likes run it, 100 to start. Likes from all viewers count together, as for the [countdown timer](/docs/features/countdown-timer/): **every 100 likes** runs the steps once each time the LIVE gets 100 more. The count starts over when you disconnect.
- **Member Join** and **Super Fan Join**: type an @handle or name to run only for that viewer.
- **Emote**: pick the emotes, or leave it for any.

Actions run while **Minecraft** is on, whether or not the features on **Home** are. An action runs only while a game of its edition is connected: a Java action does nothing while Bedrock is connected, and the other way round.

## Steps

Steps run in order, as the player in the game. Click **Add step** to add one.

- **Spawn mob**: pick a mob, how many (1 to 100), and an optional name. The mobs appear where you stand.
- **Give item**: pick an item and how many (1 to 100). You get it.
- **Weather**: **Clear**, **Rain** or **Thunder**.
- **Time of day**: **Day**, **Noon**, **Night** or **Midnight**.
- **Command**: any command, typed as in the game's chat, with or without the slash. Use it for anything else, like effects, titles or sounds:

```
say {username} sent {count} {gift}!
```

A command step runs as you typed it, so write it for the action's edition: some commands differ between Bedrock and Java. A mob or item that doesn't exist in the game runs nothing.

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

Test needs a connected game of the action's edition. With no game connected, it says to turn on Minecraft and connect the game first. With the other edition connected, it says to connect Minecraft Java Edition first, or Bedrock Edition.

## Limits

- An action on **Every gift** runs up to 100 times for one event.
- An action sends up to 100 commands for one event.
- Tokio sends the game up to 50 commands at a time, and keeps up to 500 waiting. Any beyond that fail.

## Notices

Tokio tells you in a notice when something doesn't work.

- **Minecraft Java Edition isn't connected** (or **Bedrock Edition**): an action ran while **Minecraft** was on and no game of its edition was connected. The notice says to type the `/tokio connect` command, or `/connect` for Bedrock, from **Games** in the game's chat. It shows at most once a minute.
- **A command failed in Minecraft**: the game refused a command, with its answer, like a mob that can't spawn there. It shows at most once every 30 seconds for each action.
- **Tokio couldn't listen for Minecraft**: the port was in use when Tokio started.
