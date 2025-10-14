# MerMusic Website – Guía de edición (audio y video)

Este proyecto se ejecuta con Vite + React. La página principal y casi toda la lógica vive en `src/Ap.jsx`.

## Ejecutar el proyecto

- `npm install`
- Desarrollo: `npm run dev` (abre `http://localhost:5173`)
- Build producción: `npm run build`
- Previsualizar build: `npm run preview`

Notas:
- En desarrollo, los reproductores embebidos de SoundCloud se ocultan para evitar errores CORS. En producción se muestran con `loading="lazy"`.

## Estructura relevante

- `src/Ap.jsx` – Página principal. Aquí se editan:
  - Listas de reproductores de audio: `originals`, `covers`, `mermusicBeats`.
  - Lista de videos: `videos`.
  - Componentes de tarjeta: `AudioCard`, `VideoCard`.
  - Barras/banner de sección y chips/etiquetas.
- Archivos estáticos públicos (sirven directo):
  - Audios: `public/players/audios/<nombre_base>.(wav|mp3)`
  - Imágenes de reproductores: `public/players/image/<fileBase>.(png|webp)` o `public/players/images/<fileBase>.(png|webp)`
  - Iconos de plataformas: `public/icons/spotify.svg`, `public/icons/apple-music.svg`, `public/icons/youtube.svg`
  - Banners de sección: `public/originalsbanner.png`, `public/coversbanner.png`, `public/videosweb-banner.png`, `public/mmbeats-banner.png`

El componente `TrackImage` intenta cargar imágenes en este orden:
1) `/players/image/<fileBase>.png` → 2) `.webp` → 3) `/players/images/<fileBase>.png` → 4) `.webp`.

## Editar reproductores de música existentes

1) Coloca los archivos necesarios:
   - Audio(s) en: `public/players/audios/` con nombre base (sin extensión) que vayas a usar.
   - Imagen de la tarjeta en: `public/players/image/` o `public/players/images/` con nombre base `fileBase` y extensión `.png` (ideal) o `.webp`.
2) Abre `src/Ap.jsx` y busca la lista de la sección:
   - Home/Originals: array `originals`
   - Covers: array `covers` (debajo además hay embeds de SoundCloud)
   - M‑beats: array `mermusicBeats`
3) Edita el objeto del track (ejemplo de campos útiles):
   - `title`: Título que se muestra en la tarjeta.
   - `subtitle`: Texto corto bajo el título (por ejemplo créditos).
   - `fileBase`: base del archivo de imagen de la tarjeta (sin extensión).
   - `audioUrl`: base del archivo de audio (sin extensión). El reproductor nativo intentará `.wav` y luego `.mp3`.
   - `cardLabel`: para mostrar el badge “Diamond Content – Web Exclusive”.
   - `platforms`: para chips/etiquetas. En Originals/M‑beats se muestra “Originals by Erness” y/o chips según el `variant`.
4) Guarda y verifica en `npm run dev`.

Consejos:
- Verifica las rutas de audio abriéndolas en el navegador, por ejemplo: `http://localhost:5173/players/audios/mi_tema.wav`.
- Usa nombres base “kebab_case” o “snake_case” sin espacios para evitar errores.

## Agregar nuevos reproductores de música (nuevas canciones)

1) Copia los archivos:
   - Audio(s): `public/players/audios/nuevo_tema.(wav|mp3)`
   - Imagen: `public/players/image/nuevo_tema.png` (o en `players/images/` si prefieres esa carpeta)
2) Abre `src/Ap.jsx` y agrega un objeto al array de la sección deseada (`originals`, `covers`, `mermusicBeats`):
   ```js
   {
     id: <número único>,
     title: 'Mi Nuevo Tema – 2025',
     artist: 'Erness',
     album: '',
     fileBase: 'nuevo_tema', // coincide con la imagen
     audioUrl: '/players/audios/nuevo_tema', // coincide con los audios
     subtitle: 'Songwriter/ Producer : Ernesto Mendoza M',
     cardLabel: 'Diamond Content – Web Exclusive',
     platforms: ['Originals by Erness']
   }
   ```
3) Guarda y verifica en `npm run dev`.

## Editar reproductores de video (tarjetas de video)

1) Abre `src/Ap.jsx` y busca el array `videos`.
2) Cada objeto usa:
   - `title`, `channel`, `thumbnail`, `views`, `uploadDate`, `duration`.
   - `thumbnail` puede ser una URL externa o un archivo en `public/` (por ejemplo `/thumbnails/mi_video.jpg`).
3) (Opcional) Para enlazar un video externo, puedes añadir un campo `url` y convertir el botón “Watch” del `VideoCard` en un enlace (`<a href={video.url} target="_blank" ...>`). Actualmente el botón es demostrativo.

## Embeds de SoundCloud (sección Covers)

- En desarrollo (npm run dev), los iframes de SoundCloud están deshabilitados para evitar flicker/errores CORS. Se muestran enlaces directos.
- En producción, los iframes se renderizan con `loading="lazy"`.
- Para añadir/editar embeds, busca el bloque comentado “SoundCloud Embeds” en `src/Ap.jsx` (sección Covers) y actualiza las cadenas HTML de los iframes o añade nuevas entradas al arreglo.

## Resolución de problemas

- Audio no reproduce:
  - Asegura que el archivo existe en `public/players/audios/` y que `audioUrl` apunta al nombre base correcto.
  - Prueba la URL directa del archivo en el navegador para confirmar que carga.
- Imagen de tarjeta no se ve:
  - Verifica `fileBase` y que exista `png` o `webp` en `public/players/image/` o `public/players/images/`.
  - `TrackImage` probará varias rutas y extensiones.
- Iconos de plataformas no se muestran:
  - Asegura que existen en `public/icons/` los archivos `spotify.svg`, `apple-music.svg`, `youtube.svg`.

---

## Apéndice: scripts disponibles (Vite)

- `npm run dev` – Ejecuta el servidor de desarrollo en `http://localhost:5173`.
- `npm run build` – Genera la build de producción en `dist/`.
- `npm run preview` – Sirve la build de producción.
