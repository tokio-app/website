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
| `SUBSCRIBE`      | `tokio:event:subscribe`    | Un espectador se suscribe, renueva o se hace miembro        |
| `GIFT_SUB`       | `tokio:event:giftsub`      | Un espectador regala suscripciones o membresías             |
| `CHEER`          | `tokio:event:cheer`        | Un espectador gasta Bits en Twitch                          |
| `RAID`           | `tokio:event:raid`         | Otro canal te hace un raid o un host                        |
| `REDEEM`         | `tokio:event:redeem`       | Un espectador canjea una recompensa de puntos del canal     |
| `SUPER_CHAT`     | `tokio:event:superchat`    | Un espectador envía un Super Chat o un Super Sticker        |
| `KICKS`          | `tokio:event:kicks`        | Un espectador envía Kicks en Kick                           |
| `MUSIC_CHANGE`   | `tokio:event:music:change` | Cambia la cola de pedidos de canciones                      |

## Plataformas

Tokio se conecta a TikTok, Twitch, YouTube y Kick, a uno solo o a varios en el mismo LIVE. Cada plataforma envía algunos de los eventos:

| Eventos                                                                                    | Vienen de                      |
| ------------------------------------------------------------------------------------------ | ------------------------------ |
| `CHAT` y los emotes del chat                                                               | TikTok, Twitch, YouTube y Kick |
| `FOLLOW`                                                                                   | TikTok y Twitch                |
| `GIFT`                                                                                     | TikTok y YouTube               |
| `SUBSCRIBE`, `GIFT_SUB`                                                                    | Twitch, YouTube y Kick         |
| `RAID`, `REDEEM`                                                                           | Twitch y Kick                  |
| `SHARE`, `LIKE`, `ENVELOPE`, `SUPER_FAN`, `SUPER_FAN_BOX`, `SUPER_FAN_JOIN`, `MEMBER_JOIN` | TikTok                         |
| `CHEER`                                                                                    | Twitch                         |
| `SUPER_CHAT`                                                                               | YouTube                        |
| `KICKS`                                                                                    | Kick                           |
| `ROOM_USER`                                                                                | Todas, sumadas                 |

Un overlay recibe los eventos de todas las plataformas a las que se conecta el perfil, así que revisa `user.platform` para distinguirlos. `ROOM_USER` suma `viewers` y `views` de las plataformas, que son solo los de TikTok cuando no hay otra conectada. Twitch, YouTube y Kick no tienen `views`, así que suman 0, y `ranks` es el de TikTok. La cantidad de espectadores de Twitch y la de YouTube se actualizan cada 30 segundos, y la de Kick cada 60.

En las vistas previas de Tokio, **Probar** envía los eventos de las plataformas del perfil, cada uno como lo envía su plataforma. Twitch solo tiene Bits y puntos del canal en los canales Afiliados y Socios.

## Configuración

Tokio envía `CONFIG` (`tokio:config`) con la configuración del overlay cuando el streamer la guarda, y con cada cambio mientras la edita en la vista previa. Más detalles en [Configuración](/es/docs/developers/building-an-overlay/#configuración).

## Fans

Tokio envía `FANS` (`tokio:fans`) con los fans de TikTok que el perfil del streamer vio en sus LIVEs, cuando el overlay se conecta, después de cambiar de perfil y otra vez cuando la lista cambia, como mucho cada 5 segundos. En las vistas previas de Tokio llega como muestra cuando haces clic en **Probar**.

TikTok solo envía el nivel de fan de un espectador cuando hace algo en el LIVE, así que esta lista trae fans que tu overlay todavía no vio. Tiene hasta 100, del nivel de fan más alto al más bajo y, con el mismo nivel, primero los que se vieron más recientemente. Los suscriptores de Twitch y de Kick y los miembros de YouTube no entran en ella.

## Quienes más regalan

Tokio envía `GIFTERS` (`tokio:gifters`) con quienes más regalan, como mucho una vez por segundo: cuando el overlay se conecta, después de cargar un perfil, cuando un LIVE empieza, termina o se elimina, cuando se borra el historial y con cada regalo.

`live` es el top 10 de este LIVE de quienes más regalan en TikTok, por monedas, vacío mientras Tokio no está conectado. `allTime` es el top 10 de todos los LIVEs que guardó el perfil, este incluido. Solo cuentan las monedas de TikTok, así que los Bits de Twitch, los Super Chats y los Regalos de YouTube y los Kicks de Kick nunca ponen a nadie aquí, y el dinero de una plataforma nunca se compara con el de otra.

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
  vip?: boolean; // VIP en Twitch o Kick
  fanLevel?: number;
  fanBadge?: string; // la imagen de la insignia del nivel de fan
  userId?: string; // id de la plataforma, que no cambia cuando cambia el @usuario
  platform?: "tiktok" | "twitch" | "youtube" | "kick"; // si falta, es TikTok
  subMonths?: number; // meses de suscripción o de membresía, según su insignia del chat
}
```

`platform` dice dónde está el espectador, y si falta, es TikTok. El `userId` de un espectador de Twitch empieza con `twitch:`, como `twitch:1234`, y el de uno de YouTube es `youtube:` y el id de su canal, como `youtube:UC…`, así que nunca coinciden con uno de TikTok. Tokio toma el id del canal de quien envía un Regalo de YouTube de la tarjeta que YouTube muestra con el Regalo o de sus otros eventos del LIVE y, si no lo encuentra, usa `youtube:` y su @handle, como `youtube:@tokio`. El `userId` de un espectador de Kick es `kick:` y su id de Kick, como `kick:1234`. Las suscripciones y las suscripciones regaladas de Kick nombran a las personas solo por su nombre de usuario, así que Tokio busca su id en el chat del LIVE o consulta su canal, y envía el evento sin él cuando eso falla. Los hosts y las recompensas del canal de Kick llegan sin `userId`.

`fanBadge` es la imagen que TikTok muestra para el nivel de fan: un corazón que cambia cada 10 niveles, sin el número, así que dibuja `fanLevel` al lado. Está vacío para un espectador que no es fan.

`follower`, `moderator` y `superfan` solo traen su valor real en `CHAT` y `GIFT`. Los demás eventos de TikTok envían `false`, incluso `FOLLOW`.

El chat de Twitch dice quién modera y quién está suscrito, pero no quién sigue. En un `CHAT` de Twitch, `moderator` es verdadero para tus moderadores y para ti, `superfan` para tus suscriptores, `vip` para tus VIPs, y `follower` siempre es `false`. Un espectador de Twitch no tiene `fanLevel` ni `fanBadge`, ni fotos de perfil, salvo el streamer de un raid. Sus otros eventos no traen `moderator`, `superfan` ni `vip`. Un cheer, una suscripción o un regalo de un espectador anónimo llega con el nombre `Anonymous` y sin `userId`.

En un `CHAT` de YouTube, `moderator` es verdadero para los moderadores de tu canal y para ti, `superfan` para sus miembros, y `follower` siempre es `false`, porque YouTube no tiene seguidores. Un espectador de YouTube no tiene `fanLevel` ni `fanBadge`, pero quienes escriben en el chat sí tienen fotos de perfil.

En un `CHAT` de Kick, `moderator` es verdadero para tus moderadores y para ti, `superfan` para tus suscriptores y fundadores, `vip` para tus VIPs, y `follower` siempre es `false`, porque el chat de Kick no dice nada de los seguimientos. Un espectador de Kick no tiene `fanLevel` ni `fanBadge`. Quienes escriben en el chat no tienen fotos de perfil, pero quien envía Kicks sí.

`subMonths` es cuántos meses lleva un suscriptor de Twitch o de Kick, o un miembro de YouTube, cuando su insignia del chat lo dice. La insignia de YouTube muestra solo un hito, así que un miembro de un año tiene 12, y uno nuevo no lo trae. Falta en TikTok, y en los eventos de Twitch y de Kick que no son `CHAT`.

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
| `SUPER_CHAT`                                           | `{ user, amount, usd, message, sticker }`                                 |
| `KICKS`                                                | `{ user, kicks, message }`                                                |
| `ROOM_USER`                                            | `{ views, viewers, ranks }`                                               |
| `MUSIC_CHANGE`                                         | La cola: `{ title, thumbnail, playing, played }[]`                        |
| `FANS`                                                 | `{ fans: Fan[] }`                                                         |
| `GIFTERS`                                              | `{ live: TopGifter[], allTime: TopGifter[] }`                             |

Cada emote del chat es `{ emoteID, index, images }`, y un comentario hecho solo de emotes tiene el `content` vacío. El `image` de un regalo es la URL de su imagen.

El `content` de un chat es lo que escribió el espectador, y `lang` es el idioma con que TikTok lo marcó, vacío cuando no lo marcó. El chat de Twitch, el de YouTube y el de Kick no marcan el idioma, así que su `lang` siempre está vacío y nunca traen `translation`. El `content` de Twitch no incluye los códigos de los emotes ni los cheermotes, y el `emoteID` de cada emote es `twitch:` y su id, con la imagen de Twitch en `images`. El `emoteID` de un emote de Kick es `kick:` y su id, con su imagen en files.kick.com. Con la [Traducción del chat](/es/docs/features/chat-translation/) activada, un mensaje marcado con otro idioma que el del streamer trae `translation`: `{ text, from, to }`, el texto traducido y los dos idiomas como códigos en minúsculas, como `en` y `es`. Los mensajes que ya están en el idioma del streamer, los comandos del chat y los que Tokio no pudo traducir llegan sin ella, así que usa `content` en su lugar. El `index` de un emote apunta a `content`, no a la traducción.

En Twitch, `tier` es `"1000"`, `"2000"` o `"3000"`, o `"prime"` para una suscripción Prime, y el `months` de `SUBSCRIBE` es cuántos meses lleva suscrito el espectador, 1 si es nueva. `message` es lo que el espectador escribió con una suscripción o un cheer, sin cheermotes, y vacío si no escribió nada. El `count` de `GIFT_SUB` es cuántas suscripciones regaló de una vez. El `user` de `RAID` es el streamer del canal que hace el raid, y `viewers` la gente que trae. El `input` de `REDEEM` es lo que la recompensa le pidió escribir al espectador, vacío si no pidió nada.

En YouTube, `SUBSCRIBE` es una membresía: un miembro nuevo, o un aniversario con sus `months`. Cada canal les pone nombre a sus propios niveles de membresía, así que `tier` siempre está vacío, igual que el de `GIFT_SUB`, y un `GIFT_SUB` llega una sola vez por todo el regalo. Un emote de YouTube es un emoji personalizado de los miembros; los emojis estándar se quedan en `content`.

En Kick, el `months` de `SUBSCRIBE` es cuántos meses lleva suscrito el espectador, `tier` siempre está vacío, igual que el de `GIFT_SUB`, y un `GIFT_SUB` llega una sola vez por todo el regalo. Un `RAID` es un host: su `user` es el streamer que hace el host, por su nombre de usuario, y `viewers` la gente que trae.

El `amount` de `SUPER_CHAT` es lo que pagó el espectador, como lo muestra YouTube, por ejemplo `"$4.99"`, así que no sumes montos: pueden estar en divisas distintas. Suma `usd`, el monto en dólares estadounidenses con los tipos de cambio del día. Es `null` cuando Tokio no pudo leer el monto, antes de que carguen los tipos de cambio o con una divisa que no tienen. `message` es lo que escribió, vacío en un Super Sticker, y `sticker` es la URL de la imagen del Super Sticker, vacía en un Super Chat.

Un Regalo de YouTube, que se compra con gemas, llega como `GIFT` con un `id` que es `youtube:` y el nombre del archivo de su imagen, como `youtube:vicecity_heart_v2`, y `coins: 0`, porque YouTube no dice cuánto cuesta. Un combo, el mismo Regalo enviado varias veces seguidas, llega como un solo `GIFT` con `comboCount` en cuántos fueron. Quien lo envía nunca entra en `GIFTERS`.

`KICKS` es el dinero de Kick, como los Bits de `CHEER`: `kicks` es cuántos envió el espectador, y `message` lo que fijó con ellos, vacío si no fijó nada. Kick no envía `GIFT`.

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
  platform?: "tiktok" | "twitch" | "youtube" | "kick"; // si falta, es TikTok
}
```

`picture` está vacío cuando TikTok no envió ninguna. Los enlaces de TikTok vencen unos 2 días después de que los envía, así que, si uno no carga, muestra otra cosa, como su inicial.
