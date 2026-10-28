---
title: Compilar Tokio desde el código fuente
description: Compila y ejecuta Tokio desde su código fuente.
---

El código fuente de Tokio está en [GitHub](https://github.com/tokio-app/tokio). Para compilarlo necesitas Node.js 24.18 o posterior y Yarn 1.22.

```sh
git clone https://github.com/tokio-app/tokio.git
cd tokio
yarn install
yarn dev          # ejecutar en modo desarrollo (cierra Tokio antes)
yarn test         # pruebas unitarias
yarn typecheck    # revisar los tipos de cada proceso
yarn lint         # lint
yarn format       # formatear con Prettier, que CI revisa
yarn build:win    # generar el instalador de Windows en dist/
yarn build:mac    # generar los zip de macOS en dist/ (en macOS)
yarn build:linux  # generar el AppImage de Linux en dist/
```

## Contribuir

Para colaborar, lee [CONTRIBUTING.md](https://github.com/tokio-app/tokio/blob/main/CONTRIBUTING.md) y el [código de conducta](https://github.com/tokio-app/tokio/blob/main/CODE_OF_CONDUCT.md).
