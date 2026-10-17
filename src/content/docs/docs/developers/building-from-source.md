---
title: Building Tokio from source
description: Build and run Tokio from its source code.
---

Tokio's source is on [GitHub](https://github.com/tokio-app/tokio). Building it requires Node.js 24+ and Yarn 1.

```sh
git clone https://github.com/tokio-app/tokio.git
cd tokio
yarn install
yarn dev          # run in development
yarn test         # unit tests
yarn typecheck    # type-check every process
yarn lint         # lint
yarn build:win    # build the Windows setup into dist/
yarn build:mac    # build the macOS zips into dist/ (on macOS)
yarn build:linux  # build the Linux AppImage into dist/
```

## Installer

The small download-and-install program in `src/installer/` is written in Rust and runs on Windows, macOS and Linux. Building it needs a [Rust toolchain](https://rustup.rs) (1.85+); on Linux also `libwebkit2gtk-4.1-dev`, `libssl-dev` and `libdbus-1-dev`.

```sh
yarn build:installer  # build the installer for this system into installer-out/
```

The installer doesn't need rebuilding for new versions: when it runs, it downloads the app from the latest GitHub release, picking the `yarn build:win`, `build:mac` or `build:linux` artifact for its system by name. Set `INSTALLER_URL` at build time to download from a fixed URL instead.

## Contributing

Want to help? Read [CONTRIBUTING.md](https://github.com/tokio-app/tokio/blob/main/CONTRIBUTING.md) and the [code of conduct](https://github.com/tokio-app/tokio/blob/main/CODE_OF_CONDUCT.md).
