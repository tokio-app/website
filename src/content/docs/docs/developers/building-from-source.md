---
title: Building Tokio from source
description: Build and run Tokio from its source code.
---

Tokio's source is on [GitHub](https://github.com/tokio-app/tokio). Building it requires Node.js 24.18 or later and Yarn 1.22.

```sh
git clone https://github.com/tokio-app/tokio.git
cd tokio
yarn install
yarn dev          # run in development (quit Tokio first)
yarn test         # unit tests
yarn typecheck    # type-check every process
yarn lint         # lint
yarn format       # format with Prettier, which CI checks
yarn build:win    # build the Windows setup into dist/
yarn build:mac    # build the macOS zips into dist/ (on macOS)
yarn build:linux  # build the Linux AppImage into dist/
```

## Contributing

To contribute, read [CONTRIBUTING.md](https://github.com/tokio-app/tokio/blob/main/CONTRIBUTING.md) and the [code of conduct](https://github.com/tokio-app/tokio/blob/main/CODE_OF_CONDUCT.md).
