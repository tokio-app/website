---
title: API de control
description: Salta canciones, detén el TTS, repite alertas y pausa Tokio desde un Stream Deck, Companion o un script.
---

Los [controles del LIVE](/es/docs/features/live-controls/) responden a solicitudes web, así que cualquier herramienta que pueda enviar una puede usarlos: un plugin de Stream Deck, Bitfocus Companion, Touch Portal o un script.

## Configúralo

1. En **Configuración → Control remoto**, marca **Activar el control remoto**. El servidor de overlays también tiene que estar activado.
2. Haz clic en **Mostrar código QR y clave** y copia la **Clave**.
3. Envía cada solicitud con el encabezado `Authorization: Bearer <clave>`.

Desde la computadora con Tokio, envía las solicitudes a `http://localhost:37891`. Desde otro dispositivo, usa la dirección de red de la computadora, como `http://192.168.1.20:37891` (está en **Configuración → Servidor de overlays**).

## Solicitudes

| Solicitud                       | Qué hace                               |
| ------------------------------- | -------------------------------------- |
| `GET /remote/api/state`         | Dice si Tokio está en pausa            |
| `POST /remote/api/skip-song`    | Salta la canción                       |
| `POST /remote/api/stop-tts`     | Detiene el mensaje que se está leyendo |
| `POST /remote/api/replay-alert` | Repite las alertas del último evento   |
| `POST /remote/api/pause`        | Pausa Tokio, o lo reanuda              |

`state` responde `{ "paused": false }`. Las demás solicitudes responden `{ "done": true, "paused": false }`: `paused` es el estado después de la solicitud, y `done` es `false` cuando no había nada que hacer, como cuando todavía no hay una alerta que repetir, la música no está conectada o Tokio ya estaba en pausa.

Sin cuerpo, `pause` alterna entre pausa y reanudación. Envía `{ "paused": true }` o `{ "paused": false }` como JSON para fijarlo sin importar cómo estaba.

```sh
curl -X POST http://localhost:37891/remote/api/pause \
  -H "Authorization: Bearer <clave>" \
  -H "Content-Type: application/json" \
  -d '{ "paused": true }'
```

## Errores

| Estado   | Qué pasó                                                                                |
| -------- | --------------------------------------------------------------------------------------- |
| 401      | Falta la clave o es incorrecta. Si creaste una clave nueva en Tokio, vuelve a copiarla. |
| 403      | El control remoto está desactivado en **Configuración → Control remoto**.               |
| 400, 413 | El cuerpo no es JSON válido, tiene campos además de `paused` o es demasiado grande.     |
| 404      | No existe esa solicitud.                                                                |
| 500      | El control falló. El `error` de la respuesta dice por qué.                              |
