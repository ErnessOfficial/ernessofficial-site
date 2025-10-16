// Improved version of the Erness/MerMusic website.
//
// This file takes the original page structure and elevates it with a modern
// look and feel. It demonstrates how the same information can be presented in
// a more polished, professional way by leveraging Tailwind CSS utilities,
// subtle animations and an immersive hero section. The provided `bannermermusicwebpng.png`
// is used as a full–screen background on the landing page to immediately
// immerse visitors in the MerMusic brand. Navigation is refactored with a
// semi–transparent backdrop and smooth underline animation. Cards for
// releases, videos and news have been redesigned to feel lighter and more
// interactive. Buttons now feature hover states and slight scaling to draw
// attention without being intrusive. A simple contact section at the end
// encourages bookings and collaboration enquiries.

import { useRef, useState } from 'react';
import {
  Music,
  Play,
  Pause,
  Youtube,
  Apple,
  Headphones,
  Album,
  Video,
  Mic,
  Disc,
  Clock,
  Calendar,
  Mail,
  Menu,
  X,
  ArrowDown,
  Share2,
  Gem,
  ChevronLeft,
  ChevronRight,
  Cloud,
} from 'lucide-react';

// Generic image icon component with fallback to Lucide icon
const IconImg = ({ name, alt = '', size = 20, className = '', fallback = null }) => {
  const candidates = Array.isArray(name)
    ? name
    : name.endsWith('.svg') || name.endsWith('.png')
    ? [name]
    : [
        `icons/${name}.svg`,
        `icons/${name}.png`,
      ];
  const [idx, setIdx] = useState(0);
  const src = candidates[idx];
  if (!src) return fallback;
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      onError={() => setIdx((i) => i + 1)}
      style={{ display: 'inline-block' }}
    />
  );
};

// Import the hero background image. The build tool will resolve the correct
// path and handle optimisation automatically.
// Using image from public folder; reference by absolute path
// '/bannermermusicwebpng.png' so bundler serves it correctly.

  const ImprovedApp = () => {
  const isDev = import.meta.env && import.meta.env.DEV;
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRefs = useRef({});
  const [progress, setProgress] = useState({}); // { [id]: { currentTime, duration } }
  const albumCarouselRef = useRef(null);

  const formatTime = (sec) => {
    if (!sec || !isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  /**
   * Data definitions remain unchanged from the original version. Keeping them
   * here makes it easy to swap in real data later without refactoring the
   * presentation logic. Each array describes either original tracks, cover
   * versions, beats, videos or news items.
   */
  const originals = [
    {
      id: 1,
      title: 'He visto a un impostor – 2025',
      artist: 'Erness',
      album: '',
      fileBase: 'hevistoaunimpostor',
      audioUrl: 'players/audios/He_visto_a_un_impostor_2025',
      subtitle: 'Songwriter (letra y música): Ernesto Mendoza M.',
      cardLabel: 'Diamond Content – Web Exclusive',
      platforms: ['Originals by Erness', 'Spotify', 'Apple Music', 'YouTube Music'],
      releaseDate: '2024-03-15',
      genre: 'Indie Pop',
    },
    {
      id: 2,
      title: 'Fotos en mi piel – 2025',
      artist: 'Erness',
      album: '',
      fileBase: 'fotosenmipiel',
      audioUrl: 'players/audios/Fotos_en_mi_piel_2025',
      subtitle: 'Songwriter (letra y música): Ernesto Mendoza M.',
      cardLabel: 'Diamond Content – Web Exclusive',
      platforms: ['Originals by Erness', 'Spotify', 'Apple Music', 'Amazon Music'],
      releaseDate: '2024-02-28',
      genre: 'Alternative',
    },
    {
      id: 3,
      title: 'Lo que guardo de ti – 2025',
      artist: 'Erness',
      album: '',
      fileBase: 'loqueguardodeti',
      audioUrl: 'players/audios/Lo_Que_Guardo_de_ti_2025',
      subtitle: 'Songwriter (letra y música): Ernesto Mendoza M.',
      cardLabel: 'Diamond Content – Web Exclusive',
      platforms: ['Originals by Erness', 'Spotify', 'YouTube Music', 'Tidal'],
      releaseDate: '2023-11-10',
      genre: 'Synthwave',
    },
    {
      id: 99,
      title: 'Nuevo Single – Título por definir',
      artist: 'Erness',
      album: '',
      fileBase: 'placeholder-original',
      audioUrl: 'players/audios/placeholder-original',
      subtitle: 'Songwriter/ Producer : Ernesto Mendoza M',
      cardLabel: 'Diamond Content – Web Exclusive',
      platforms: ['Originals by Erness'],
      releaseDate: '',
      genre: 'Pop',
    },
  ];

  const buildVimeoEmbed = (id) => `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&dnt=1`;
  const getVideoEmbedSrc = (video) => (video.vimeoId ? buildVimeoEmbed(video.vimeoId) : video.embedSrc);

  const covers = [
    {
      id: 1,
      title: 'No Es Que Te Extrañe – Symphonic Cover',
      artist: 'Erness',
      originalArtist: 'Christina Aguilera',
      fileBase: 'noesqueteextrane-coverimage',
      audioUrl: 'players/audios/cover-track1',
      audioExt: 'wav',
      subtitle: 'Cover by ERNESS – (Original de Christina Aguilera)',
      cardLabel: 'Diamond Content – Web Exclusive',
      releaseDate: '2024-04-05',
      genre: 'Rock',
    },
    {
      id: 2,
      title: 'Algo Más – Mexican Ranchera’s Cover',
      artist: 'Erness',
      originalArtist: 'La Quinta Estación',
      fileBase: 'algomas-coverimage',
      audioUrl: 'players/audios/cover-track2',
      audioExt: 'wav',
      subtitle: 'Cover by ERNESS – (Original de La Quinta Estación)',
      cardLabel: 'Diamond Content – Web Exclusive',
      releaseDate: '2024-02-15',
      genre: 'Pop/R&B',
    },
    {
      id: 3,
      title: 'Vuelvo a Verte – Piano & Vocal Cover',
      artist: 'Erness',
      originalArtist: 'Malú',
      fileBase: 'vuelvoaverte-coverimage',
      audioUrl: 'players/audios/cover-track3',
      audioExt: 'wav',
      subtitle: 'Cover by ERNESS – (Original de Malú)',
      cardLabel: 'Diamond Content – Web Exclusive',
      releaseDate: '2023-12-20',
      genre: 'Alternative',
    },
    {
      id: 99,
      title: 'Nuevo Cover – Título por definir',
      artist: 'Erness',
      originalArtist: '',
      fileBase: 'placeholder-cover',
      audioUrl: 'players/audios/placeholder-cover',
      audioExt: 'wav',
      subtitle: 'Cover by ERNESS – (Original por definir)',
      cardLabel: 'Diamond Content – Web Exclusive',
      releaseDate: '',
      genre: 'Cover',
    },
  ];

  const mermusicBeats = [
    {
      id: 1,
      title: 'Tus Ojos Me Gritan - Erness (2025)',
      artist: 'MerMusic Beats',
      album: 'Neon Circuit',
      fileBase: 'tusojosmegritan',
      audioUrl: 'players/audios/No_es_que_lo_diga_yo_2025',
      subtitle: 'MerMusic Beats & Originals by Erness',
      cardLabel: 'Diamond Content – Web Exclusive',
      platforms: ['Originals by Erness'],
      releaseDate: '2024-03-22',
      genre: 'EDM/House',
    },
    {
      id: 2,
      title: 'Que Me Estas Contando - Erness (2025)',
      artist: 'MerMusic Beats',
      album: 'Neon Circuit',
      fileBase: 'quemeestascontando',
      audioUrl: 'players/audios/Que_me_estas_contando_2025',
      subtitle: 'MerMusic Beats & Originals by Erness',
      cardLabel: 'Diamond Content – Web Exclusive',
      platforms: ['Originals by Erness'],
      releaseDate: '2024-01-18',
      genre: 'Deep House',
    },
    {
      id: 3,
      title: 'No Es Que Lo Diga Yo - Erness (2025)',
      artist: 'MerMusic Beats',
      album: 'Neon Circuit',
      fileBase: 'noesquelodigayo',
      audioUrl: 'players/audios/tus_ojos_me_gritan_2025',
      subtitle: 'MerMusic Beats & Originals by Erness',
      cardLabel: 'Diamond Content – Web Exclusive',
      platforms: ['Originals by Erness'],
      releaseDate: '2023-10-30',
      genre: 'Techno',
    },
    {
      id: 99,
      title: 'Nuevo M‑beat – Título por definir',
      artist: 'MerMusic Beats',
      album: '',
      fileBase: 'placeholder-mbeats',
      audioUrl: 'players/audios/placeholder-mbeats',
      subtitle: 'MerMusic Beats & Originals by Erness',
      cardLabel: 'Diamond Content – Web Exclusive',
      platforms: ['Originals by Erness'],
      releaseDate: '',
      genre: 'EDM/House',
    },
  ];

  const videos = [
    {
      id: 1,
      title: '4 veces 10',
      channel: '@ErnessOfficial',
      youtubeId: 'kP4-ySjTokE',
      embedSrc: 'https://www.youtube.com/embed/kP4-ySjTokE',
      thumbnail: 'https://img.youtube.com/vi/kP4-ySjTokE/hqdefault.jpg',
      subtitles: [
        'Songwriter - Producer: Ernesto Mendoza Maldonado',
        'Originals by Erness 2024',
        'YouTube Channel: @ErnessOfficial',
      ],
      tags: ['Originals by Erness', 'YouTube', 'Music Video', '2024'],
      views: '—',
      uploadDate: '2024',
      duration: '',
    },
    {
      id: 2,
      title: 'Vamos a Decirnos la Verdad',
      channel: '@ErnessOfficial',
      youtubeId: 'zlCiYrK6ivQ',
      embedSrc: 'https://www.youtube.com/embed/zlCiYrK6ivQ',
      thumbnail: 'https://img.youtube.com/vi/zlCiYrK6ivQ/hqdefault.jpg',
      subtitles: [
        'Songwriter - Producer: Ernesto Mendoza Maldonado',
        'Originals by Erness 2024',
        'YouTube Channel: @ErnessOfficial',
      ],
      tags: ['Originals by Erness', 'YouTube', 'Music Video', '2024'],
      views: '—',
      uploadDate: '2024',
      duration: '',
    },
    {
      id: 3,
      title: 'Por Una Vez',
      channel: '@ErnessOfficial',
      youtubeId: '1xNBW5IozfU',
      embedSrc: 'https://www.youtube.com/embed/1xNBW5IozfU',
      thumbnail: 'https://img.youtube.com/vi/1xNBW5IozfU/hqdefault.jpg',
      subtitles: [
        'Songwriter - Producer: Ernesto Mendoza Maldonado',
        'Originals by Erness 2023',
        'YouTube Channel: @ErnessOfficial',
      ],
      tags: ['Originals by Erness', 'YouTube', 'Music Video', '2023'],
      views: '—',
      uploadDate: '2023',
      duration: '',
    },
    {
      id: 4,
      title: 'Bailar Pegados',
      channel: '@ErnessOfficial',
      youtubeId: 'myZvojdZ2BU',
      embedSrc: 'https://www.youtube.com/embed/myZvojdZ2BU',
      thumbnail: 'https://img.youtube.com/vi/myZvojdZ2BU/hqdefault.jpg',
      subtitles: [
        'Original de: Sergio Dalma',
        'Covers by Erness',
        'YouTube Channel: @ErnessOfficial',
      ],
      tags: ['Covers by Erness', 'YouTube', 'Cover'],
      views: '—',
      uploadDate: '',
      duration: '',
    },
  ];

  // Upcoming exclusive videos for the Home section
  const upcomingVideos = [
    {
      id: 'up1',
      title: 'Acaríciame',
      channel: '@ErnessOfficial',
      // ScreenPal embed for "Acaríciame"
      embedSrc: 'https://go.screenpal.com/player/cT621nnbFJ8?width=100%&height=100%&ff=1&title=0',
      screenpalId: 'cT621nnbFJ8',
      vimeoId: '',
      subtitles: [
        'Original de: Maria Conchita Alonso',
        'Covers by Erness 2025',
        'YouTube Channel: @ErnessOfficial',
      ],
      tags: ['Diamond Content – Web Exclusive'],
      uploadDate: '2025',
      duration: '',
    },
    {
      id: 'up2',
      title: 'Contradicción Andante - New Video 2025',
      channel: '@ErnessOfficial',
      // ScreenPal embed for "Contradicción Andante"
      embedSrc: 'https://go.screenpal.com/player/cT62innbqcm?width=100%&height=100%&ff=1&title=0',
      screenpalId: 'cT62innbqcm',
      vimeoId: '',
      subtitles: [
        'Diamond Content',
        'Lanzamiento próximamente',
        'Songwriter - Producer: Ernesto Mendoza Maldonado',
      ],
      tags: ['Diamond Content – Web Exclusive'],
      uploadDate: '2025',
      duration: '',
    },
    {
      id: 'up3',
      title: 'Las Cosas que no Debemos Olvidar - New Video 2025',
      channel: '@ErnessOfficial',
      // ScreenPal embed for "Las Cosas que no Debemos Olvidar"
      embedSrc: 'https://go.screenpal.com/player/cT62iYnbqfE?width=100%&height=100%&ff=1&title=0',
      screenpalId: 'cT62iYnbqfE',
      vimeoId: '',
      subtitles: [
        'Diamond Content',
        'Lanzamiento en YouTube próximamente',
        'Songwriter - Producer: Ernesto Mendoza Maldonado',
      ],
      tags: ['Diamond Content – Web Exclusive'],
      uploadDate: '2025',
      duration: '',
    },
  ];

  const news = [
    {
      id: 1,
      title: "New Single 'Midnight Echoes' Out Now!",
      excerpt: 'My latest original track is now available on all major streaming platforms. Check out the official video too!',
      date: '2024-03-15',
      category: 'Release',
    },
    {
      id: 2,
      title: 'Upcoming Tour Dates Announced',
      excerpt: "I'll be hitting the road this summer with shows across Europe and North America. Get your tickets now!",
      date: '2024-04-01',
      category: 'Tour',
    },
    {
      id: 3,
      title: 'Collaboration with Producer DJ Nova',
      excerpt: "Exciting news! I'm working on a new EP with electronic producer DJ Nova. Stay tuned for more updates.",
      date: '2024-03-28',
      category: 'Collaboration',
    },
    {
      id: 4,
      title: 'MerMusic Beats Returns with New Sound',
      excerpt: 'After a brief hiatus, MerMusic Beats is back with a fresh direction and new tracks coming soon.',
      date: '2024-02-15',
      category: 'News',
    },
  ];

  /**
   * Event handlers for audio controls. These manage which track is active,
   * whether it is playing and update the progress bar. In a real
   * application you would connect these to actual audio elements or use
   * a dedicated media player library.
   */
  const handlePlayPause = (audioKey) => {
    const targetAudio = audioRefs.current[audioKey];
    if (!targetAudio) return;
    // Pause any other audio
    Object.entries(audioRefs.current).forEach(([id, el]) => {
      if (id !== String(audioKey) && el && !el.paused) {
        el.pause();
      }
    });
    if (currentAudio === audioKey && isPlaying) {
      targetAudio.pause();
      setIsPlaying(false);
    } else {
      try {
        // Asegura metadatos listos antes de reproducir
        targetAudio.load();
        targetAudio.volume = 1;
        targetAudio.play().catch((e) => {
          // Si falla, intenta forzar focus/interaction en dev
          // y vuelve a probar una vez
          setTimeout(() => {
            targetAudio.play().catch(() => {});
          }, 50);
        });
      } catch {}
      setCurrentAudio(audioKey);
      setIsPlaying(true);
    }
  };

  const handleLoadedMetadata = (id) => {
    const el = audioRefs.current[id];
    if (!el) return;
    setProgress((prev) => ({
      ...prev,
      [id]: { currentTime: el.currentTime || 0, duration: el.duration || 0 },
    }));
    if (currentAudio === id) {
      setDuration(el.duration || 0);
    }
  };

  const handleTimeUpdate = (id) => {
    const el = audioRefs.current[id];
    if (!el) return;
    // Solo actualiza progreso global para el reproductor activo
    if (currentAudio !== id) return;
    const ct = Math.floor(el.currentTime || 0);
    const dur = el.duration || 0;
    setProgress((prev) => ({
      ...prev,
      [id]: { currentTime: ct, duration: dur || prev[id]?.duration || 0 },
    }));
    setCurrentTime(ct);
    setDuration(dur);
  };

  const handleEnded = (id) => {
    if (currentAudio === id) {
      setIsPlaying(false);
    }
  };

  const TrackImage = ({ fileBase, alt }) => {
    const [idx, setIdx] = useState(0);
    const sources = [
      `players/image/${fileBase}.png`,
      `players/image/${fileBase}.webp`,
      `players/images/${fileBase}.png`,
      `players/images/${fileBase}.webp`,
    ];
    const src = sources[idx];
    return (
      <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover"
        onError={() => setIdx((i) => (i + 1 < sources.length ? i + 1 : i))}
      />
    );
  };

  const AlbumImage = ({ fileBase, alt }) => {
    const [idx, setIdx] = useState(0);
    const sources = [
      `${fileBase}.png`,
      `${fileBase}.jpg`,
      `${fileBase}.jpeg`,
      `${fileBase}.webp`,
    ];
    const src = sources[idx];
    return (
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover rounded-xl shadow"
        onError={() => setIdx((i) => (i + 1 < sources.length ? i + 1 : i))}
      />
    );
  };

  const albumSlides = [
    { id: 'al1', fileBase: 'album-home01', alt: 'Álbum 1' },
    { id: 'al2', fileBase: 'album-home02', alt: 'Álbum 2' },
    { id: 'al3', fileBase: 'album-home03', alt: 'Álbum 3' },
  ];

  const scrollAlbum = (dir) => {
    const el = albumCarouselRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  

  /**
   * Simple audio card component. The design is more spacious than the
   * original and uses a vertical layout to prioritise cover art and
   * metadata. A progress bar and play/pause button are provided; they
   * change colour when active to hint at interaction. On hover the card
   * casts a deeper shadow and lifts slightly to invite clicks.
   */
  const AudioCard = ({ track, audioId, variant }) => (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <TrackImage fileBase={track.fileBase} alt={track.title} />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-indigo-700 transition-colors">
          {track.title}
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          {track.subtitle || `${track.artist}${track.album ? ` • ${track.album}` : ''}`}
        </p>
        <p className="text-gray-500 text-xs mt-1">Songwriter/ Producer : Ernesto Mendoza M</p>
        {variant === 'originals' ? (
          <div className="mt-3">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Originals by Erness</span>
              {track.cardLabel && (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-slate-300 bg-gradient-to-r from-slate-50 to-slate-200 text-slate-800 shadow-sm ring-1 ring-inset ring-white/50">
                  <Gem size={14} className="text-slate-700" /> {track.cardLabel}
                </span>
              )}
            </div>
            <div className="mt-2 text-xs text-gray-600">Próximamente en:</div>
            <div className="mt-1 flex items-center gap-4">
              <a href="https://open.spotify.com/artist/0ZSkMQRAxtOUca0wbAInJR?si=yd2vozqLRtyP_rzyt8aTfg" target="_blank" rel="noreferrer" aria-label="Spotify – Erness">
                <img src="icons/spotify.svg" alt="Spotify" className="h-5 w-auto hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://music.apple.com/gb/artist/erness/1511155802" target="_blank" rel="noreferrer" aria-label="Apple Music – Erness">
                <img src="icons/apple-music.svg" alt="Apple Music" className="h-5 w-auto hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://youtube.com/@ernessofficial" target="_blank" rel="noreferrer" aria-label="YouTube – @ErnessOfficial">
                <img src="icons/youtube.svg" alt="YouTube" className="h-5 w-auto hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://on.soundcloud.com/WAPyquNhRPxdmTxE7" target="_blank" rel="noreferrer" aria-label="SoundCloud – Erness">
                <img src="icons/soundcloud.svg" alt="SoundCloud" className="h-5 w-auto hover:opacity-80 transition-opacity" />
              </a>
            </div>
          </div>
        ) : variant === 'mbeats' ? (
          <div className="mt-3">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Originals by Erness</span>
              {track.cardLabel && (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-slate-300 bg-gradient-to-r from-slate-50 to-slate-200 text-slate-800 shadow-sm ring-1 ring-inset ring-white/50">
                  <Gem size={14} className="text-slate-700" /> {track.cardLabel}
                </span>
              )}
            </div>
            <div className="mt-2 text-xs text-gray-600">Disponible próximamente:</div>
            <div className="mt-1 flex items-center gap-4">
              <a href="https://open.spotify.com/artist/0ZSkMQRAxtOUca0wbAInJR?si=yd2vozqLRtyP_rzyt8aTfg" target="_blank" rel="noreferrer" aria-label="Spotify – Erness">
                <img src="icons/spotify.svg" alt="Spotify" className="h-5 w-auto hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://music.apple.com/gb/artist/erness/1511155802" target="_blank" rel="noreferrer" aria-label="Apple Music – Erness">
                <img src="icons/apple-music.svg" alt="Apple Music" className="h-5 w-auto hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://youtube.com/@ernessofficial" target="_blank" rel="noreferrer" aria-label="YouTube – @ErnessOfficial">
                <img src="icons/youtube.svg" alt="YouTube" className="h-5 w-auto hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://on.soundcloud.com/WAPyquNhRPxdmTxE7" target="_blank" rel="noreferrer" aria-label="SoundCloud – Erness">
                <img src="icons/soundcloud.svg" alt="SoundCloud" className="h-5 w-auto hover:opacity-80 transition-opacity" />
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mt-3">
            {track.platforms &&
              track.platforms.map((platform, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {platform}
                </span>
              ))}
            {track.cardLabel && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-slate-300 bg-gradient-to-r from-slate-50 to-slate-200 text-slate-800 shadow-sm ring-1 ring-inset ring-white/50">
                <Gem size={14} className="text-slate-700" /> {track.cardLabel}
              </span>
            )}
          </div>
        )}
        <div className="mt-4">
          <audio
            preload="metadata"
            className="w-full"
            controls
            playsInline
          >
            <source src={`${track.audioUrl}.wav`} type="audio/wav" />
            <source src={`${track.audioUrl}.mp3`} type="audio/mpeg" />
            Tu navegador no soporta la reproducción de audio.
          </audio>
        </div>
      </div>
    </div>
  );

  /**
   * Redesigned video card. Rather than using a simple rectangle, this card
   * includes a play overlay icon to make it clear that the thumbnail
   * represents a video. The bottom section holds metadata and call–to–action
   * buttons. Hovering reveals a subtle zoom on the thumbnail.
   */
  const VideoCard = ({ video }) => (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <IconImg
            name="play"
            alt="Play"
            size={36}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            fallback={<Play size={36} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
          />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-indigo-700 transition-colors mb-1">
          {video.title}
        </h3>
        <p className="text-gray-500 text-sm mb-2">Channel: {video.channel}</p>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <span>{video.views} views</span>
          <span>{video.uploadDate}</span>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            <IconImg name="youtube" alt="YouTube" size={16} fallback={<Youtube size={16} />} />
            <span>Watch</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 text-sm font-medium">
            <IconImg name="share" alt="Share" size={16} fallback={<Share2 size={16} />} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );

  /**
   * Timeline style card for news. A coloured bar on the left indicates the
   * category and draws the eye down the column as visitors scroll. Dates
   * are emphasised with icons and muted text.
   */
  const NewsCard = ({ newsItem }) => (
    <div className="relative pl-6 pr-4 py-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-tl-2xl rounded-bl-2xl ${
          newsItem.category === 'Release'
            ? 'bg-green-500'
            : newsItem.category === 'Tour'
            ? 'bg-blue-500'
            : newsItem.category === 'Collaboration'
            ? 'bg-purple-500'
            : 'bg-gray-400'
        }`}
      ></div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg text-gray-800 mb-1">
          {newsItem.title}
        </h3>
        <p className="text-gray-600 mb-3 text-sm">{newsItem.excerpt}</p>
        <div className="flex items-center text-xs text-gray-500">
          <IconImg name="calendar" alt="Calendar" size={14} className="mr-1" fallback={<Calendar size={14} className="mr-1" />} /> {newsItem.date}
        </div>
      </div>
    </div>
  );

  /**
   * Header component with glassmorphic navigation bar. The active link
   * underlines smoothly on hover and remains highlighted when selected.
   */
  const Navigation = () => (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-[#0c2647] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setActiveSection('home')}
          >
            <img
              src="mermusic-icon.png"
              alt="MerMusic Icon"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-bold text-[1.35rem] text-white">MerMusic P. by Erness</span>
          </div>
          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6 font-bold text-white">
            {['home', 'originals', 'covers', 'beats', 'videos', 'news'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => setActiveSection(section)}
                  className={`group relative inline-block py-2 px-1 transition-colors ${
                    activeSection === section
                      ? 'text-white'
                      : 'text-white/90 hover:text-white'
                  } text-[1.05rem]`}
                >
                  {/* Label */}
                  {section === 'beats' ? 'M-beats' : section.charAt(0).toUpperCase() + section.slice(1)}
                  {/* Underline animation */}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-0.5 bg-white transition-all ${
                      activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </button>
              </li>
            ))}
          </ul>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <IconImg name="close" alt="Close" size={24} fallback={<X size={24} />} />
            ) : (
              <IconImg name="menu" alt="Menu" size={24} fallback={<Menu size={24} />} />
            )}
          </button>
        </div>
        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0c2647] shadow-md">
            <ul className="flex flex-col space-y-1 py-2 px-4">
              {['home', 'originals', 'covers', 'beats', 'videos', 'news'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => {
                      setActiveSection(section);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full py-2 text-left font-bold ${
                      activeSection === section ? 'text-white' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {section === 'beats' ? 'M-beats' : section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );

  /**
   * Full–screen landing section. The background image covers the entire
   * viewport and is darkened via an overlay for legibility. A down arrow
   * encourages visitors to scroll. Buttons invite users to explore originals
   * and videos and scale on hover for a tactile feel.
   */
  const HeroSection = () => (
    <section
      className="relative h-screen flex items-end justify-center text-center text-white bg-no-repeat bg-contain bg-center"
      style={{ backgroundImage: 'url(bannermermusicwebpng.png)' }}
    >
      <div className="relative z-10 mb-8">
        <div className="inline-flex items-center justify-center p-4 md:p-5 rounded-full bg-white/90 shadow-2xl ring-2 ring-[#0c2647]/50 backdrop-blur-sm">
          <ArrowDown size={44} className="text-[#0c2647] animate-bounce drop-shadow" />
        </div>
      </div>
    </section>
  );

  /**
   * Footer with three columns: about, quick links and contact. The dark
   * backdrop ties the page together and the call–to–action invites
   * visitors to reach out for collaboration.
   */
  const Footer = () => (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src="avatarweb.png" alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-bold text-xl text-white">Ernesto Mendoza M - Erness</span>
          </div>
          <p className="text-sm leading-relaxed">
            Cantautor y productor con una pasión por crear experiencias
            sonoras únicas. Conecta con emociones profundas a través de
            originales, covers y beats electrónicos.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-white mb-3">Secciones</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection('originals')}
                className="hover:text-white transition-colors"
              >
                Originals
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('covers')}
                className="hover:text-white transition-colors"
              >
                Covers
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('beats')}
                className="hover:text-white transition-colors"
              >
                M-beats
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('videos')}
                className="hover:text-white transition-colors"
              >
                Videos
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('news')}
                className="hover:text-white transition-colors"
              >
                Noticias
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-white mb-3">Contacto</h3>
          <p className="text-sm mb-4">¿Te interesa colaborar, contratar o simplemente saludar? Escríbenos:</p>
          <a
            href="mailto:contacto@mermusic.com"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-5 rounded-full transition-colors"
          >
            <Mail size={18} /> contact@mermusic.com
          </a>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Erness | MerMusic Productions. Todos los derechos reservados.
      </div>
    </footer>
  );

  /**
   * Function to render the appropriate section based on the user's navigation
   * choice. Each section begins with a tailored header and then uses the
   * redesigned cards from above. Animations are kept light-weight to ensure
   * responsiveness on mobile devices.
   */
  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <HeroSection />
            {/* Featured Originals */}
            {/* Texto y botones trasladados debajo del banner principal */}
            <section className="py-10 bg-white dark:bg-gray-900">
              <div className="max-w-3xl mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
                  Erness Official
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300">
                  Cantautor, productor y fundador de MerMusic. Explora un universo musical de originales, covers y beats electrónicos.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => setActiveSection('originals')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                  >
                    Escuchar Originales
                  </button>
                  <button
                    onClick={() => setActiveSection('videos')}
                    className="bg-transparent border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors transition-transform transform hover:scale-105"
                  >
                    Ver Videos
                  </button>
                </div>
              </div>
            </section>
            {/* Álbumes publicados - new section */}
            <section className="py-16 bg-white dark:bg-gray-900">
              <div className="max-w-6xl mx-auto px-4 text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  álbumes publicados
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                  estos son algunos de los álbumes y EP´s que ya están disponibles en las diferentes plataformas de música como Apple Music, Spotify, Amazon Music, YouTube Music, y muchas otras. Solo tienes que buscar mi artist channel qué es ERNESS y podrás conocer toda la música original que he ido quedando produciendo y lanzando las diferentes plataformas.
                </p>
                <div className="flex items-center justify-center gap-6 mt-6 opacity-100">
                  <a href="https://music.apple.com/gb/artist/erness/1511155802" target="_blank" rel="noreferrer" aria-label="Apple Music – Erness">
                    <IconImg name="apple-music" alt="Apple Music" size={36} className="hover:opacity-80 transition-opacity" fallback={<Apple size={32} className="text-gray-700" />} />
                  </a>
                  <a href="https://open.spotify.com/artist/0ZSkMQRAxtOUca0wbAInJR?si=yd2vozqLRtyP_rzyt8aTfg" target="_blank" rel="noreferrer" aria-label="Spotify – Erness">
                    <IconImg name="spotify" alt="Spotify" size={36} className="hover:opacity-80 transition-opacity" fallback={<Headphones size={32} className="text-green-600" />} />
                  </a>
                  <a href="https://music.amazon.co.uk/artists/B087YJ8HQ2?ref=dm_sh_TyphJgMOcKLrRikoGbmxHpNUS" target="_blank" rel="noreferrer" aria-label="Amazon Music – Erness">
                    <IconImg name="amazon-music" alt="Amazon Music" size={36} className="hover:opacity-80 transition-opacity" fallback={<Music size={32} className="text-amber-600" />} />
                  </a>
                  <a href="https://on.soundcloud.com/WAPyquNhRPxdmTxE7" target="_blank" rel="noreferrer" aria-label="SoundCloud – Erness">
                    <IconImg name="soundcloud" alt="SoundCloud" size={36} className="hover:opacity-80 transition-opacity" fallback={<Cloud size={32} className="text-orange-500" />} />
                  </a>
                  <a href="https://youtube.com/@ernessofficial" target="_blank" rel="noreferrer" aria-label="YouTube – @ErnessOfficial">
                    <IconImg name="youtube" alt="YouTube Music" size={36} className="hover:opacity-80 transition-opacity" fallback={<Youtube size={32} className="text-red-600" />} />
                  </a>
                </div>
              </div>
              <div className="relative max-w-6xl mx-auto px-4">
                <button
                  aria-label="Anterior"
                  onClick={() => scrollAlbum(-1)}
                  className="flex absolute left-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg ring-2 ring-white/70 dark:ring-black/40 hover:bg-indigo-700"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  aria-label="Siguiente"
                  onClick={() => scrollAlbum(1)}
                  className="flex absolute right-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg ring-2 ring-white/70 dark:ring-black/40 hover:bg-indigo-700"
                >
                  <ChevronRight size={28} />
                </button>
                <div
                  ref={albumCarouselRef}
                  className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
                >
                  {albumSlides.map((al) => (
                    <div key={al.id} className="min-w-full snap-center">
                      <AlbumImage fileBase={al.fileBase} alt={al.alt} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-16 bg-gray-50 dark:bg-gray-800">
              <div className="max-w-6xl mx-auto px-4 text-center mb-12">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
                  <IconImg name="album" alt="Álbum" size={24} fallback={<Album size={24} className="text-indigo-600" />} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Próximos Lanzamientos
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Escucha en exclusiva y antes de su lanzamiento oficial, lo más nuevo de mis creaciones musicales originales
                </p>
              </div>
              <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {originals.slice(0, 3).map((track) => (
                  <AudioCard key={`home-orig-${track.id}`} audioId={`home-orig-${track.id}`} track={track} />
                ))}
              </div>
            </section>
            {/* Recent Videos - updated to upcoming exclusive videos */}
            <section className="py-16 bg-white dark:bg-gray-900">
              <div className="max-w-6xl mx-auto px-4 text-center mb-12">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
                  <IconImg name="video" alt="Video" size={24} fallback={<Video size={24} className="text-indigo-600" />} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Próximos Lanzamientos – <span className="inline-flex items-center gap-2 align-middle"><Gem size={22} className="text-gray-800 dark:text-gray-100" /> Videos Exclusivos de la web</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Explora mis últimos videos musicales en YouTube
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-slate-300 bg-gradient-to-r from-slate-50 to-slate-200 text-slate-800 shadow-sm ring-1 ring-inset ring-white/50">
                    <Gem size={14} className="text-slate-700" /> Diamond Content – Web Exclusive
                  </span>
                </div>
              </div>
              <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {upcomingVideos.map((video) => (
                  <div key={video.id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <div className="w-full overflow-hidden">
                      <div
                        className={`relative w-full ${video.screenpalId ? 'sp-embed-player' : ''}`}
                        style={{ paddingTop: '56.25%' }}
                        {...(video.screenpalId ? { 'data-id': video.screenpalId } : {})}
                      >
                        {video.screenpalId && (
                          <script src={`https://go.screenpal.com/player/appearance/${video.screenpalId}`}></script>
                        )}
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={getVideoEmbedSrc(video)}
                          title={video.title}
                          loading="lazy"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
                        {video.title}
                      </h3>
                      {Array.isArray(video.subtitles) && (
                        <div className="space-y-1 mb-3">
                          {video.subtitles.map((line, i) => (
                            <p key={i} className="text-gray-600 dark:text-gray-300 text-sm">{line}</p>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {(video.tags || []).map((tag, i) => (
                          <span key={i} className="bg-slate-100 text-slate-800 text-xs px-3 py-1 rounded-full border border-slate-200 dark:bg-slate-800/50 dark:text-slate-200 dark:border-slate-700">
                            {tag}
                          </span>
                        ))}
                        {video.channel && (
                          <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full">{video.channel}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* Latest News */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
              <div className="max-w-6xl mx-auto px-4 text-center mb-12">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
                  <IconImg name="clock" alt="Reloj" size={24} fallback={<Clock size={24} className="text-indigo-600" />} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Últimas Noticias
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Mantente al día con las novedades de Erness
                </p>
              </div>
              <div className="max-w-4xl mx-auto px-4 space-y-6">
                {news.map((item) => (
                  <NewsCard key={item.id} newsItem={item} />
                ))}
              </div>
            </section>
          </>
        );
      case 'originals':
        return (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 text-center mb-12">
              <div className="w-full mb-4">
                <img src="originalsbanner.png" alt="Originals banner" className="w-full h-auto max-h-[420px] object-contain rounded-xl shadow" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Originals by Erness
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Mis composiciones originales donde soy el autor de la letra, melodía e intérprete. Disponibles en todas las plataformas de música principales.
              </p>
              </div>

            {/* Title bar before originals content with separators */}
            <div className="mt-10 mb-6 w-full">
              <div className="h-px w-full bg-slate-200/70"></div>
              <div className="w-full bg-white">
                <div className="max-w-6xl mx-auto px-4 py-4 text-center text-gray-800 font-semibold tracking-wide text-xl md:text-2xl">
                  Pre‑lanzamiento exclusivo <span className="inline-flex items-center gap-2"><Gem size={18} className="text-gray-800" /></span> – Próximamente en las plataformas musicales
                  <span className="inline-flex items-center gap-4 ml-3 align-middle">
                    <a href="https://music.apple.com/gb/artist/erness/1511155802" target="_blank" rel="noreferrer" aria-label="Apple Music – Erness">
                      <img src="icons/apple-music.svg" alt="Apple Music" className="h-5 w-auto hover:opacity-80 transition-opacity" />
                    </a>
                    <a href="https://youtube.com/@ernessofficial" target="_blank" rel="noreferrer" aria-label="YouTube – @ErnessOfficial">
                      <img src="icons/youtube.svg" alt="YouTube" className="h-5 w-auto hover:opacity-80 transition-opacity" />
                    </a>
                    <a href="https://open.spotify.com/artist/0ZSkMQRAxtOUca0wbAInJR?si=yd2vozqLRtyP_rzyt8aTfg" target="_blank" rel="noreferrer" aria-label="Spotify – Erness">
                      <img src="icons/spotify.svg" alt="Spotify" className="h-5 w-auto hover:opacity-80 transition-opacity" />
                    </a>
                    <a href="https://on.soundcloud.com/WAPyquNhRPxdmTxE7" target="_blank" rel="noreferrer" aria-label="SoundCloud – Erness">
                      <img src="icons/soundcloud.svg" alt="SoundCloud" className="h-5 w-auto hover:opacity-80 transition-opacity" />
                    </a>
                  </span>
                </div>
              </div>
              <div className="h-px w-full bg-slate-200/70"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
              {originals.map((track) => (
                <AudioCard
                  key={`orig-${track.id}`}
                  audioId={`orig-${track.id}`}
                  track={track}
                  variant="originals"
                />
              ))}
            </div>
          </section>
        );
      case 'covers':
        return (
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 text-center mb-12">
              <div className="w-full mb-4">
                <img src="coversbanner.png" alt="Covers banner" className="w-full h-auto max-h-[420px] object-contain rounded-xl shadow" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Covers by Erness
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Mis versiones únicas de canciones populares con un estilo diferente. Disponibles exclusivamente en SoundCloud.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <span className="inline-flex items-center gap-1 bg-slate-200 text-slate-800 text-xs px-3 py-1 rounded-full border border-slate-300 shadow-sm ring-1 ring-inset ring-white/50">
                  <Gem size={14} className="text-slate-700" /> Diamond Content – Web Exclusive
                </span>
                <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">Covers by Erness</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Remixes</span>
              </div>
            </div>
            {isDev ? (
              <div className="max-w-5xl mx-auto px-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                  Los reproductores embebidos de SoundCloud están deshabilitados en desarrollo para evitar errores CORS. Visualízalos en producción o haz clic en los enlaces directos:
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li><a className="text-blue-700 hover:underline" href="https://soundcloud.com/erness_official/soy-mi-destino-special-soul-cover-2025" target="_blank" rel="noreferrer">Soy Mi Destino – SoundCloud</a></li>
                    <li><a className="text-blue-700 hover:underline" href="https://soundcloud.com/erness_official/simplemente-amigos-original-de-ana-gabriel-cover-guitarra-voz" target="_blank" rel="noreferrer">Simplemente Amigos – SoundCloud</a></li>
                    <li><a className="text-blue-700 hover:underline" href="https://soundcloud.com/erness_official/acariciame-edm-cover-by-erness-original-maria-conchita-alonso" target="_blank" rel="noreferrer">Acaríciame – SoundCloud</a></li>
                    <li><a className="text-blue-700 hover:underline" href="https://soundcloud.com/erness_official/el-nudo-vanesa-martin-edm-house-cover-by-erness" target="_blank" rel="noreferrer">El Nudo – SoundCloud</a></li>
                    <li><a className="text-blue-700 hover:underline" href="https://soundcloud.com/erness_official/cristian-castro-caballito-de-mar-pianovocal-cover-by-erness" target="_blank" rel="noreferrer">Caballito de Mar – SoundCloud</a></li>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <div className="max-w-5xl mx-auto px-4 text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Contenido Exclusivo para SoundCloud</h3>
                </div>
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    `<iframe loading=\"lazy\" width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2176151289&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe>`,
                    `<iframe loading=\"lazy\" width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2169848451&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe>`,
                    `<iframe loading=\"lazy\" width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2147801955&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe>`,
                    `<iframe loading=\"lazy\" width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2139000255&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe>`,
                    `<iframe loading=\"lazy\" width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2104066530&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe>`
                  ].map((html, i) => (
                    <div key={i} className="rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow w-full">
                      <div dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
                  ))}
                </div>
              </>
            )}
            {/* Title bar before local web content with separators */}
            <div className="mt-10 mb-6 w-full">
              <div className="h-px w-full bg-slate-200/70"></div>
              <div className="w-full bg-white">
                <div className="max-w-6xl mx-auto px-4 py-4 text-center text-gray-800 font-semibold tracking-wide text-xl md:text-2xl">
                  Contenido Exclusivo de la Web – <span className="inline-flex items-center gap-2"><Gem size={18} className="text-gray-800" /> Diamond Content</span>
                </div>
              </div>
              <div className="h-px w-full bg-slate-200/70"></div>
            </div>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
              {covers.map((track) => (
                <AudioCard key={`covers-${track.id}`} audioId={`covers-${track.id}`} track={track} />
              ))}
            </div>
          </section>
        );
      case 'beats':
        return (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 text-center mb-12">
              <div className="w-full mb-4">
                <img src="mmbeats-banner.png" alt="M-beats banner" className="w-full h-auto max-h-[420px] object-contain rounded-xl shadow" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                M-beats
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Mi proyecto de música electrónica donde exploro ritmos house, EDM y beats variados. Próximamente más lanzamientos en este género.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">House</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">EDM</span>
                <span className="bg-pink-100 text-pink-800 text-xs px-3 py-1 rounded-full">Electrónica</span>
                <span className="bg-cyan-100 text-cyan-800 text-xs px-3 py-1 rounded-full">Beats</span>
              </div>
            </div>
            {/* Title bar before M-beats content with separators */}
            <div className="mt-10 mb-6 w-full">
              <div className="h-px w-full bg-slate-200/70"></div>
              <div className="w-full bg-white">
                <div className="max-w-6xl mx-auto px-4 py-4 text-center text-gray-800 font-semibold tracking-wide text-xl md:text-2xl">
                  Pre‑lanzamiento exclusivo <span className="inline-flex items-center gap-2"><Gem size={18} className="text-gray-800" /></span> – Próximamente en las plataformas musicales
                  <span className="inline-flex items-center gap-4 ml-3 align-middle">
                    <a href="https://music.apple.com/gb/artist/erness/1511155802" target="_blank" rel="noreferrer" aria-label="Apple Music – Erness">
                      <img src="icons/apple-music.svg" alt="Apple Music" className="h-5 w-auto hover:opacity-80 transition-opacity" />
                    </a>
                    <a href="https://youtube.com/@ernessofficial" target="_blank" rel="noreferrer" aria-label="YouTube – @ErnessOfficial">
                      <img src="icons/youtube.svg" alt="YouTube" className="h-5 w-auto hover:opacity-80 transition-opacity" />
                    </a>
                    <a href="https://open.spotify.com/artist/0ZSkMQRAxtOUca0wbAInJR?si=yd2vozqLRtyP_rzyt8aTfg" target="_blank" rel="noreferrer" aria-label="Spotify – Erness">
                      <img src="icons/spotify.svg" alt="Spotify" className="h-5 w-auto hover:opacity-80 transition-opacity" />
                    </a>
                    <a href="https://on.soundcloud.com/WAPyquNhRPxdmTxE7" target="_blank" rel="noreferrer" aria-label="SoundCloud – Erness">
                      <img src="icons/soundcloud.svg" alt="SoundCloud" className="h-5 w-auto hover:opacity-80 transition-opacity" />
                    </a>
                  </span>
                </div>
              </div>
              <div className="h-px w-full bg-slate-200/70"></div>
            </div>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {mermusicBeats.map((track) => (
                <AudioCard key={`beats-${track.id}`} audioId={`beats-${track.id}`} track={track} variant="mbeats" />
              ))}
            </div>
          </section>
        );
      case 'videos':
        return (
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 text-center mb-12">
              <div className="w-full mb-4">
                <img src="videosweb-banner.png" alt="Videos banner" className="w-full h-auto max-h-[420px] object-contain rounded-xl shadow" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Videos Musicales
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Explora mis videos musicales en el canal YouTube @ErnessOfficial
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full">YouTube</span>
                <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">Music Videos</span>
              </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="w-full overflow-hidden">
                    <div
                      className={`relative w-full ${video.screenpalId ? 'sp-embed-player' : ''}`}
                      style={{ paddingTop: '56.25%' }}
                      {...(video.screenpalId ? { 'data-id': video.screenpalId } : {})}
                    >
                      {video.screenpalId && (
                        <script src={`https://go.screenpal.com/player/appearance/${video.screenpalId}`}></script>
                      )}
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={video.embedSrc}
                        title={video.title}
                        loading="lazy"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
                      {video.title}
                    </h3>
                    {Array.isArray(video.subtitles) && (
                      <div className="space-y-1 mb-3">
                        {video.subtitles.map((line, i) => (
                          <p key={i} className="text-gray-600 dark:text-gray-300 text-sm">{line}</p>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {(video.tags || []).map((tag, i) => (
                        <span key={i} className="bg-slate-100 text-slate-800 text-xs px-3 py-1 rounded-full border border-slate-200 dark:bg-slate-800/50 dark:text-slate-200 dark:border-slate-700">
                          {tag}
                        </span>
                      ))}
                      {video.channel && (
                        <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full">{video.channel}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'news':
        return (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
                <IconImg name="clock" alt="Reloj" size={24} fallback={<Clock size={24} className="text-indigo-600" />} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Noticias & Actualizaciones
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Mantente al día con las últimas novedades sobre Erness y MerMusic Productions
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">Lanzamientos</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Gira</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Colaboraciones</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">Actualizaciones</span>
              </div>
            </div>
            <div className="max-w-4xl mx-auto px-4 space-y-6">
              {news.map((item) => (
                <NewsCard key={item.id} newsItem={item} />
              ))}
            </div>
          </section>
        );
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main>{renderSection()}</main>
      <Footer />
    </div>
  );
};

export default ImprovedApp;
