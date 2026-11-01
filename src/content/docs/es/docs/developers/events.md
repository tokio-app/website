---
title: Eventos
description: Todos los eventos que Tokio envía a los overlays, con sus datos.
---

Suscríbete con `tokio.on(TOKIO_EVENTS.<NAME>, callback)`. Con un WebSocket directo, el `type` de cada mensaje es el nombre del evento que aparece en la tabla.

## Eventos del LIVE

| Constante        | Nombre del evento          | Se envía cuando                                |
| ---------------- | -------------------------- | ---------------------------------------------- |
| `CHAT`           | `tokio:event:chat`         | Un espectador escribe en el chat               |
| `FOLLOW`         | `tokio:event:follow`       | Un espectador te sigue                         |
| `SHARE`          | `tokio:event:share`        | Un espectador comparte el LIVE                 |
| `LIKE`           | `tokio:event:like`         | Un espectador le da Me gusta al LIVE           |
| `GIFT`           | `tokio:event:gift`         | Un espectador envía un regalo                  |
| `ENVELOPE`       | `tokio:event:envelope`     | Alguien envía un cofre                         |
| `SUPER_FAN`      | `tokio:event:superfan`     | Un espectador se hace Super Fan                |
| `SUPER_FAN_BOX`  | `tokio:event:superfanbox`  | Alguien envía una Caja de Super Fan            |
| `SUPER_FAN_JOIN` | `tokio:event:superfanjoin` | Un Super Fan entra al LIVE                     |
| `MEMBER_JOIN`    | `tokio:event:memberjoin`   | Un espectador entra al LIVE                    |
| `ROOM_USER`      | `tokio:event:roomuser`     | Cambian el número de espectadores o el ranking |
| `MUSIC_CHANGE`   | `tokio:event:music:change` | Cambia la cola de pedidos de canciones         |

## Configuración

Tokio envía `CONFIG` (`tokio:config`) con la configuración del overlay cuando el streamer la guarda, y con cada cambio mientras la edita en la vista previa. Más detalles en [Configuración](/es/docs/developers/building-an-overlay/#configuración).

## Fans

Tokio envía `FANS` (`tokio:fans`) con los fans que el perfil del streamer vio en sus LIVEs, cuando el overlay se conecta y otra vez cuando la lista cambia, como mucho cada 5 segundos. Las vistas previas de Tokio no lo envían.

TikTok solo envía el nivel de fan de un espectador cuando hace algo en el LIVE, así que esta lista trae fans que tu overlay todavía no vio. Tiene hasta 100, del nivel de fan más alto al más bajo y, con el mismo nivel, primero los que se vieron más recientemente.

## Eventos de conexión

Estos los envía el propio `@tokioapp/overlay` e informan sobre su WebSocket. No se disparan en las vistas previas de Tokio, que no usan WebSocket, así que no esperes a `OPEN` para mostrar el overlay.

| Constante | Nombre del evento | Datos                        |
| --------- | ----------------- | ---------------------------- |
| `OPEN`    | `tokio:open`      | ninguno                      |
| `CLOSE`   | `tokio:close`     | `{ code, reason, wasClean }` |
| `ERROR`   | `tokio:error`     | `{ type, message?, error? }` |

## Datos

La mayoría de los eventos incluyen al espectador que los provocó:

```ts
interface User {
  username: string; // nombre visible
  handle: string; // @usuario
  profilePictures: string[];
  superfan?: boolean;
  follower?: boolean;
  moderator?: boolean;
  fanLevel?: number;
  fanBadge?: string; // la imagen de la insignia del nivel de fan
  userId?: string; // id de TikTok, que no cambia cuando cambia el @usuario
}
```

`fanBadge` es la imagen que TikTok muestra para el nivel de fan: un corazón que cambia cada 10 niveles, sin el número, así que dibuja `fanLevel` al lado. Está vacío para un espectador que no es fan.

| Evento                                                 | Datos                                                                     |
| ------------------------------------------------------ | ------------------------------------------------------------------------- |
| `CHAT`                                                 | `{ user, comment: { content, emotes, lang } }`                            |
| `FOLLOW`, `SUPER_FAN`, `SUPER_FAN_JOIN`, `MEMBER_JOIN` | `{ user }`                                                                |
| `SHARE`                                                | `{ user, shareCount }`                                                    |
| `LIKE`                                                 | `{ user, likeCount, totalLikes }`                                         |
| `GIFT`                                                 | `{ user, gift: { id, name, coins, type, comboCount, repeatEnd, image } }` |
| `ENVELOPE`, `SUPER_FAN_BOX`                            | ninguno                                                                   |
| `ROOM_USER`                                            | `{ views, viewers, ranks: (User & { score, position })[] }`               |
| `MUSIC_CHANGE`                                         | La cola: `{ title, thumbnail, playing, played }[]`                        |
| `FANS`                                                 | `{ fans: Fan[] }`                                                         |

Cada emote del chat es `{ emoteID, index, images }`. El `image` de un regalo es la URL de su imagen.

:::tip[Combos de regalos]
Un combo envía varios eventos `GIFT` con un `comboCount` que va creciendo. El último trae `repeatEnd: true`: reacciona a ese si quieres una sola reacción por combo.
:::

Cada fan de `FANS`:

```ts
interface Fan {
  userId: string;
  username: string; // nombre visible
  handle: string; // @usuario
  fanLevel: number;
  fanBadge: string; // la imagen de la insignia del nivel de fan
  seenAt: number; // cuándo lo vio Tokio por última vez, en ms desde 1970
}
```

Los fans no traen foto de perfil, porque los enlaces de TikTok a esas fotos vencen en un par de días. Para un fan que está en el LIVE, tómala del `user` de sus eventos. Los enlaces de la insignia no vencen.
