---
title: Eventos
description: Todos los eventos que Tokio envía a los overlays, con sus datos.
---

Suscríbete con `tokio.on(TOKIO_EVENTS.<NAME>, callback)`. Con un WebSocket directo, el `type` de cada mensaje es el nombre del evento que aparece en la tabla.

## Eventos del LIVE

| Constante        | Nombre del evento          | Se envía cuando                                             |
| ---------------- | -------------------------- | ----------------------------------------------------------- |
| `CHAT`           | `tokio:event:chat`         | Un espectador escribe en el chat                            |
| `FOLLOW`         | `tokio:event:follow`       | Un espectador te sigue                                      |
| `SHARE`          | `tokio:event:share`        | Un espectador comparte el LIVE                              |
| `LIKE`           | `tokio:event:like`         | Un espectador le da Me gusta al LIVE                        |
| `GIFT`           | `tokio:event:gift`         | Un espectador envía un regalo                               |
| `ENVELOPE`       | `tokio:event:envelope`     | Alguien envía un cofre o una Caja de Super Fan              |
| `SUPER_FAN`      | `tokio:event:superfan`     | Un espectador se hace Super Fan                             |
| `SUPER_FAN_BOX`  | `tokio:event:superfanbox`  | Alguien envía una Caja de Super Fan, antes de su `ENVELOPE` |
| `SUPER_FAN_JOIN` | `tokio:event:superfanjoin` | Un Super Fan entra al LIVE                                  |
| `MEMBER_JOIN`    | `tokio:event:memberjoin`   | Un espectador entra al LIVE                                 |
| `ROOM_USER`      | `tokio:event:roomuser`     | Cambian el número de espectadores y el ranking              |
| `SUBSCRIBE`      | `tokio:event:subscribe`    | Un espectador se suscribe o renueva en Twitch               |
| `GIFT_SUB`       | `tokio:event:giftsub`      | Un espectador regala suscripciones en Twitch                |
| `CHEER`          | `tokio:event:cheer`        | Un espectador gasta Bits en Twitch                          |
| `RAID`           | `tokio:event:raid`         | Otro canal de Twitch te hace un raid                        |
| `REDEEM`         | `tokio:event:redeem`       | Un espectador canjea una recompensa de puntos del canal     |
| `MUSIC_CHANGE`   | `tokio:event:music:change` | Cambia la cola de pedidos de canciones                      |

## Plataformas

Tokio se conecta a TikTok y a Twitch, por separado o en el mismo LIVE. Cada plataforma envía algunos de los eventos:

| Eventos                                                                                            | Vienen de        |
| -------------------------------------------------------------------------------------------------- | ---------------- |
| `CHAT`, `FOLLOW` y los emotes del chat                                                             | TikTok y Twitch  |
| `SHARE`, `LIKE`, `GIFT`, `ENVELOPE`, `SUPER_FAN`, `SUPER_FAN_BOX`, `SUPER_FAN_JOIN`, `MEMBER_JOIN` | TikTok           |
| `SUBSCRIBE`, `GIFT_SUB`, `CHEER`, `RAID`, `REDEEM`                                                 | Twitch           |
| `ROOM_USER`                                                                                        | Las dos, sumadas |

Un overlay recibe los eventos de todas las plataformas a las que se conecta el perfil, así que revisa `user.platform` para distinguirlos. `ROOM_USER` suma `viewers` y `views` de las plataformas, que son solo los de TikTok cuando Twitch no está conectado. Twitch no tiene `views`, así que suma 0, y `ranks` es el de TikTok. La cantidad de espectadores de Twitch se actualiza cada 30 segundos.

En las vistas previas de Tokio, los eventos de Twitch llegan como muestras cuando haces clic en **Probar**. Twitch solo tiene Bits y puntos del canal en los canales Afiliados y Socios.

## Configuración

Tokio envía `CONFIG` (`tokio:config`) con la configuración del overlay cuando el streamer la guarda, y con cada cambio mientras la edita en la vista previa. Más detalles en [Configuración](/es/docs/developers/building-an-overlay/#configuración).

## Fans

Tokio envía `FANS` (`tokio:fans`) con los fans que el perfil del streamer vio en sus LIVEs, cuando el overlay se conecta, después de cambiar de perfil y otra vez cuando la lista cambia, como mucho cada 5 segundos. En las vistas previas de Tokio llega como muestra cuando haces clic en **Probar**.

TikTok solo envía el nivel de fan de un espectador cuando hace algo en el LIVE, así que esta lista trae fans que tu overlay todavía no vio. Tiene hasta 100, del nivel de fan más alto al más bajo y, con el mismo nivel, primero los que se vieron más recientemente.

## Quienes más regalan

Tokio envía `GIFTERS` (`tokio:gifters`) con quienes más regalan, como mucho una vez por segundo: cuando el overlay se conecta, después de cargar un perfil, cuando un LIVE empieza, termina o se elimina, cuando se borra el historial y con cada regalo.

`live` es el top 10 de este LIVE por monedas, vacío mientras Tokio no está conectado. `allTime` es el top 10 de todos los LIVEs que guardó el perfil, este incluido.

Si hay un empate, gana quien llegó primero. Solo los regalos cuentan como monedas: los cofres y las suscripciones de Super Fan no.

En las vistas previas de Tokio llega como muestra cuando haces clic en **Probar**.

## Música

Tokio envía `MUSIC_CHANGE` con toda la cola de pedidos de canciones cada vez que cambia y cuando termina su última canción. Un overlay también la recibe al conectarse, mientras la cola tenga canciones.

En las vistas previas de Tokio llega como muestra cuando haces clic en **Probar**.

La cola va en orden: las canciones que ya sonaron, la que está sonando (`playing: true`) y luego las que esperan. Si ninguna está sonando, la cola está vacía o ya terminó su última canción.

`title` es la canción y sus artistas, como `Canción - Artista`. Tokio no sabe cuándo se pausa una canción, así que `playing` solo marca en qué punto va la cola.

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
interface UserData {
  username: string; // nombre visible
  handle: string; // @usuario
  profilePictures: string[];
  superfan?: boolean;
  follower?: boolean;
  moderator?: boolean;
  fanLevel?: number;
  fanBadge?: string; // la imagen de la insignia del nivel de fan
  userId?: string; // id de la plataforma, que no cambia cuando cambia el @usuario
  platform?: "tiktok" | "twitch"; // si falta, es TikTok
}
```

`platform` dice dónde está el espectador, y si falta, es TikTok. El `userId` de un espectador de Twitch empieza con `twitch:`, como `twitch:1234`, así que nunca coincide con uno de TikTok.

`fanBadge` es la imagen que TikTok muestra para el nivel de fan: un corazón que cambia cada 10 niveles, sin el número, así que dibuja `fanLevel` al lado. Está vacío para un espectador que no es fan.

`follower`, `moderator` y `superfan` solo traen su valor real en `CHAT` y `GIFT`. Los demás eventos de TikTok envían `false`, incluso `FOLLOW`.

El chat de Twitch dice quién modera y quién está suscrito, pero no quién sigue. En un `CHAT` de Twitch, `moderator` es verdadero para tus moderadores y para ti, `superfan` para tus suscriptores, y `follower` siempre es `false`. Un espectador de Twitch no tiene `fanLevel` ni `fanBadge`, ni fotos de perfil, salvo el streamer de un raid. Sus otros eventos no traen `moderator` ni `superfan`. Un cheer, una suscripción o un regalo de un espectador anónimo llega con el nombre `Anonymous` y sin `userId`.

| Evento                                                 | Datos                                                                     |
| ------------------------------------------------------ | ------------------------------------------------------------------------- |
| `CHAT`                                                 | `{ user, comment: { content, emotes, lang, translation? } }`              |
| `FOLLOW`, `SUPER_FAN`, `SUPER_FAN_JOIN`, `MEMBER_JOIN` | `{ user }`                                                                |
| `SHARE`                                                | `{ user, shareCount }`                                                    |
| `LIKE`                                                 | `{ user, likeCount, totalLikes }`                                         |
| `GIFT`                                                 | `{ user, gift: { id, name, coins, type, comboCount, repeatEnd, image } }` |
| `ENVELOPE`, `SUPER_FAN_BOX`                            | ninguno                                                                   |
| `SUBSCRIBE`                                            | `{ user, tier, months, message }`                                         |
| `GIFT_SUB`                                             | `{ user, count, tier }`                                                   |
| `CHEER`                                                | `{ user, bits, message }`                                                 |
| `RAID`                                                 | `{ user, viewers }`                                                       |
| `REDEEM`                                               | `{ user, reward: { id, title, cost }, input }`                            |
| `ROOM_USER`                                            | `{ views, viewers, ranks }`                                               |
| `MUSIC_CHANGE`                                         | La cola: `{ title, thumbnail, playing, played }[]`                        |
| `FANS`                                                 | `{ fans: Fan[] }`                                                         |
| `GIFTERS`                                              | `{ live: TopGifter[], allTime: TopGifter[] }`                             |

Cada emote del chat es `{ emoteID, index, images }`, y un comentario hecho solo de emotes tiene el `content` vacío. El `image` de un regalo es la URL de su imagen.

El `content` de un chat es lo que escribió el espectador, y `lang` es el idioma con que TikTok lo marcó, vacío cuando no lo marcó. El chat de Twitch no marca el idioma, así que su `lang` siempre está vacío y nunca trae `translation`. Su `content` no incluye los códigos de los emotes ni los cheermotes, y el `emoteID` de cada emote es `twitch:` y su id, con la imagen de Twitch en `images`. Con la [Traducción del chat](/es/docs/features/chat-translation/) activada, un mensaje marcado con otro idioma que el del streamer trae `translation`: `{ text, from, to }`, el texto traducido y los dos idiomas como códigos en minúsculas, como `en` y `es`. Los mensajes que ya están en el idioma del streamer, los comandos del chat y los que Tokio no pudo traducir llegan sin ella, así que usa `content` en su lugar. El `index` de un emote apunta a `content`, no a la traducción.

En Twitch, `tier` es `"1000"`, `"2000"` o `"3000"`, o `"prime"` para una suscripción Prime, y el `months` de `SUBSCRIBE` es cuántos meses lleva suscrito el espectador, 1 si es nueva. `message` es lo que el espectador escribió con una suscripción o un cheer, sin cheermotes, y vacío si no escribió nada. El `count` de `GIFT_SUB` es cuántas suscripciones regaló de una vez. El `user` de `RAID` es el streamer del canal que hace el raid, y `viewers` la gente que trae. El `input` de `REDEEM` es lo que la recompensa le pidió escribir al espectador, vacío si no pidió nada.

`gift.id` es un texto, mientras que el valor de un campo `gifts` es un número, así que compáralos con `Number(gift.id)`. `coins` es el precio de un regalo, así que un combo vale `coins × comboCount`.

`totalLikes` puede bajar por un rato, así que quédate con el más alto que hayas visto. En `ROOM_USER`, `viewers` es cuántos miran ahora y `views` el total del LIVE, y cada elemento de `ranks` es `{ username, handle, profilePictures, userId, score, position }`.

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
  superfan: boolean; // Super Fan, según su último chat, regalo o evento de Super Fan
  seenAt: number; // cuándo lo vio Tokio por última vez, en ms desde 1970
}
```

Los fans no traen foto de perfil, porque los enlaces de TikTok a esas fotos vencen en un par de días. Para un fan que está en el LIVE, tómala del `user` de sus eventos. Los enlaces de la insignia no vencen.

Cada espectador de `GIFTERS`:

```ts
interface TopGifter {
  userId: string;
  username: string; // nombre visible
  handle: string; // @usuario
  picture: string; // su foto de perfil, de su último regalo
  live: { coins: number; gifts: number }; // en este LIVE, 0 si no envió ninguno
  allTime: { coins: number; gifts: number }; // en todos los LIVEs que guardó el perfil
  giftedAt: number; // cuándo llegó su último regalo, en ms desde 1970
  platform?: "tiktok" | "twitch"; // si falta, es TikTok
}
```

`picture` está vacío cuando TikTok no envió ninguna. Los enlaces de TikTok vencen unos 2 días después de que los envía, así que, si uno no carga, muestra otra cosa, como su inicial.
