---
title: Install
description: Download and install Tokio on Windows, macOS or Linux.
---

Tokio runs on Windows, macOS and Linux. Get it from the [download page](/download/) or the [latest release](https://github.com/tokio-app/tokio/releases/latest).

On Windows, download the installer and run it. It downloads and installs the latest version of Tokio. On macOS and Linux there's no installer: you download Tokio itself.

| System                | Download                          |
| --------------------- | --------------------------------- |
| Windows (x64)         | `Tokio-Installer-windows-x64.exe` |
| macOS (Apple Silicon) | `tokio-<version>-mac-arm64.zip`   |
| macOS (Intel)         | `tokio-<version>-mac-x64.zip`     |
| Linux (x64)           | `tokio-<version>-x86_64.AppImage` |

On Windows you can also skip the installer: each release has Tokio's own setup, `tokio-<version>-setup.exe`.

All features work on every system, except the voices installed on the system: they're only available on Windows. TikTok and Edge voices work everywhere.

:::caution[macOS]
Unzip the download and move **Tokio** to your Applications folder. Tokio isn't notarized yet, so macOS may block it the first time. Open it from Finder with right-click → **Open**, or allow it in **System Settings → Privacy & Security**.
:::

:::note[Linux]
Make the AppImage executable with `chmod +x` (or in the file's properties) and run it. It needs FUSE.
:::

## Updates

Tokio checks for new versions on its own, from the latest published release on GitHub. On Windows and Linux it downloads them in the background and installs them when you restart. On macOS it opens the release page, where you download the new zip.
