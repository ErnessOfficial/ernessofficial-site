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

import { useState } from 'react';
import {
  Music,
  Play,
  Pause,
  Youtube,
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
} from 'lucide-react';

// Import the hero background image. The build tool will resolve the correct
// path and handle optimisation automatically.
import heroBg from './bannermermusicwebpng.png';

const ImprovedApp = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);

  /**
   * Data definitions remain unchanged from the original version. Keeping them
   * here makes it easy to swap in real data later without refactoring the
   * presentation logic. Each array describes either original tracks, cover
   * versions, beats, videos or news items.
   */
  const originals = [
    {
      id: 1,
      title: 'Midnight Echoes',
      artist: 'Erness',
      album: 'Whispers in the Dark',
      cover: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Midnight+Echoes',
      audioUrl: '#',
      platforms: ['Spotify', 'Apple Music', 'YouTube Music'],
      releaseDate: '2024-03-15',
      genre: 'Indie Pop',
    },
    {
      id: 2,
      title: 'Ocean of Dreams',
      artist: 'Erness',
      album: 'Whispers in the Dark',
      cover: 'https://placehold.co/400x400/16213e/ffffff?text=Ocean+of+Dreams',
      audioUrl: '#',
      platforms: ['Spotify', 'Apple Music', 'Amazon Music'],
      releaseDate: '2024-02-28',
      genre: 'Alternative',
    },
    {
      id: 3,
      title: 'Neon Streets',
      artist: 'Erness',
      album: 'Urban Nightlights',
      cover: 'https://placehold.co/400x400/0f3460/ffffff?text=Neon+Streets',
      audioUrl: '#',
      platforms: ['Spotify', 'YouTube Music', 'Tidal'],
      releaseDate: '2023-11-10',
      genre: 'Synthwave',
    },
  ];

  const covers = [
    {
      id: 1,
      title: 'Bohemian Rhapsody (Erness Cover)',
      artist: 'Erness',
      originalArtist: 'Queen',
      cover: 'https://placehold.co/400x400/533483/ffffff?text=Bohemian+Rhapsody',
      audioUrl: '#',
      platform: 'SoundCloud',
      releaseDate: '2024-04-05',
      genre: 'Rock',
    },
    {
      id: 2,
      title: 'Shape of You (Erness Remix)',
      artist: 'Erness',
      originalArtist: 'Ed Sheeran',
      cover: 'https://placehold.co/400x400/6a4c93/ffffff?text=Shape+of+You',
      audioUrl: '#',
      platform: 'SoundCloud',
      releaseDate: '2024-02-15',
      genre: 'Pop/R&B',
    },
    {
      id: 3,
      title: 'Creep (Erness Version)',
      artist: 'Erness',
      originalArtist: 'Radiohead',
      cover: 'https://placehold.co/400x400/7d5a5a/ffffff?text=Creep',
      audioUrl: '#',
      platform: 'SoundCloud',
      releaseDate: '2023-12-20',
      genre: 'Alternative',
    },
  ];

  const mermusicBeats = [
    {
      id: 1,
      title: 'Digital Pulse',
      artist: 'MerMusic Beats',
      album: 'Neon Circuit',
      cover: 'https://placehold.co/400x400/000000/ffffff?text=Digital+Pulse',
      audioUrl: '#',
      platforms: ['SoundCloud', 'Bandcamp'],
      releaseDate: '2024-03-22',
      genre: 'EDM/House',
    },
    {
      id: 2,
      title: 'Midnight Groove',
      artist: 'MerMusic Beats',
      album: 'Neon Circuit',
      cover: 'https://placehold.co/400x400/121212/ffffff?text=Midnight+Groove',
      audioUrl: '#',
      platforms: ['SoundCloud', 'Beatport'],
      releaseDate: '2024-01-18',
      genre: 'Deep House',
    },
    {
      id: 3,
      title: 'Electric Horizon',
      artist: 'MerMusic Beats',
      album: 'Neon Circuit',
      cover: 'https://placehold.co/400x400/2d2d2d/ffffff?text=Electric+Horizon',
      audioUrl: '#',
      platforms: ['SoundCloud', 'Spotify'],
      releaseDate: '2023-10-30',
      genre: 'Techno',
    },
  ];

  const videos = [
    {
      id: 1,
      title: '4 veces 10',
      songwriter: 'Ernesto Mendoza Maldonado',
      producer: 'Ernesto Mendoza Maldonado',
      originals: 'Originals by Erness 2024',
      channel: '@ErnessOfficial',
      youtubeId: 'kP4-ySjTokE',
    },
    {
      id: 2,
      title: 'Vamos a Decirnos la Verdad',
      songwriter: 'Ernesto Mendoza Maldonado',
      producer: 'Ernesto Mendoza Maldonado',
      originals: 'Originals by Erness 2024',
      channel: '@ErnessOfficial',
      youtubeId: 'zlCiYrK6ivQ',
    },
    {
      id: 3,
      title: 'Por Una Vez',
      songwriter: 'Ernesto Mendoza Maldonado',
      producer: 'Ernesto Mendoza Maldonado',
      originals: 'Originals by Erness 2023',
      channel: '@ErnessOfficial',
      youtubeId: '1xNBW5IozfU',
    },
    {
      id: 4,
      title: 'Bailar Pegados',
      original: 'Sergio Dalma',
      covers: 'Covers by Erness',
      channel: '@ErnessOfficial',
      youtubeId: 'myZvojdZ2BU',
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
  const handlePlayPause = (audioId) => {
    if (currentAudio === audioId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentAudio(audioId);
      setIsPlaying(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  /**
   * Simple audio card component. The design is more spacious than the
   * original and uses a vertical layout to prioritise cover art and
   * metadata. A progress bar and play/pause button are provided; they
   * change colour when active to hint at interaction. On hover the card
   * casts a deeper shadow and lifts slightly to invite clicks.
   */
  const AudioCard = ({ track }) => (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
    >
      <img
        src={track.cover}
        alt={track.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-indigo-700 transition-colors">
          {track.title}
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          {track.artist} • {track.album}
        </p>
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
          {track.platform && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {track.platform} Exclusive
            </span>
          )}
        </div>
        <div className="flex items-center mt-4">
          <button
            onClick={() => handlePlayPause(track.id)}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors bg-indigo-600 text-white hover:bg-indigo-700 ${
              currentAudio === track.id && isPlaying
                ? 'ring-2 ring-indigo-300'
                : ''
            }`}
          >
            {currentAudio === track.id && isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          {/* Progress bar (static placeholder) */}
          <div className="flex-grow h-1 bg-gray-200 rounded-full ml-3">
            <div
              className="h-1 bg-indigo-600 rounded-full"
              style={{ width: `${currentAudio === track.id ? '50%' : '0%'}` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  const VideoPlayer = ({ video, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg overflow-hidden w-full max-w-3xl">
        <button onClick={onClose} className="absolute top-2 right-2 text-white z-10">
          <X size={24} />
        </button>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
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
  const VideoCard = ({ video, onSelect }) => (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onSelect(video)}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Play
            size={36}
            className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-indigo-700 transition-colors mb-1">
          {video.title}
        </h3>
        <p className="text-gray-500 text-sm mb-2">Channel: {video.channel}</p>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            <Youtube size={16} /> <span>Watch</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 text-sm font-medium">
            <Share2 size={16} /> <span>Share</span>
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
          <Calendar size={14} className="mr-1" /> {newsItem.date}
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
      <nav
        className="backdrop-blur-md bg-white/70 dark:bg-black/40 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <Music size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800">Erness</span>
          </div>
          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6 font-medium">
            {['home', 'originals', 'covers', 'beats', 'videos', 'news'].map((section) => (
              <li key={section}>
                  <button
                    onClick={() => setActiveSection(section)}
                    className={`group relative inline-block py-2 px-1 transition-colors ${
                      activeSection === section
                        ? 'text-indigo-600'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    {/* Label */}
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    {/* Underline animation */}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-0.5 bg-indigo-600 transition-all ${
                        activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    ></span>
                  </button>
              </li>
            ))}
          </ul>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/90 dark:bg-black/70 backdrop-blur-lg shadow-md">
            <ul className="flex flex-col space-y-1 py-2 px-4">
              {['home', 'originals', 'covers', 'beats', 'videos', 'news'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => {
                      setActiveSection(section);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full py-2 text-left font-medium ${
                      activeSection === section ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
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
      className="relative h-screen flex items-center justify-center text-center text-white bg-no-repeat bg-contain bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Erness Official
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Cantautor, productor y fundador de MerMusic. Explora un universo
          musical de originales, covers y beats electrónicos.
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
            className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-700 font-semibold py-3 px-6 rounded-full shadow-lg transition-colors transition-transform transform hover:scale-105"
          >
            Ver Videos
          </button>
        </div>
        <div className="mt-12 flex justify-center">
          <ArrowDown size={32} className="animate-bounce" />
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
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <Music size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl text-white">Erness</span>
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
                MerMusic Beats
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
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
              <div className="max-w-6xl mx-auto px-4 text-center mb-12">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
                  <Album size={24} className="text-indigo-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Últimos Lanzamientos
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Descubre mis más recientes trabajos musicales
                </p>
              </div>
              <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {originals.map((track) => (
                  <AudioCard key={track.id} track={track} />
                ))}
              </div>
            </section>
            {/* Latest News */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
              <div className="max-w-6xl mx-auto px-4 text-center mb-12">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
                  <Clock size={24} className="text-indigo-600" />
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
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
                <Mic size={24} className="text-indigo-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Originals by Erness
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Mis composiciones originales donde soy el autor de la letra, melodía e intérprete. Disponibles en todas las plataformas de música principales.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">Spotify</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Apple Music</span>
                <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full">YouTube Music</span>
                <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">Amazon Music</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Tidal</span>
              </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {originals.map((track) => (
                <AudioCard key={track.id} track={track} />
              ))}
            </div>
          </section>
        );
      case 'covers':
        return (
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
                <Headphones size={24} className="text-indigo-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Covers by Erness
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Mis versiones únicas de canciones populares con un estilo diferente. Disponibles exclusivamente en SoundCloud.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">SoundCloud Exclusive</span>
                <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">Covers</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Remixes</span>
              </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {covers.map((track) => (
                <AudioCard key={track.id} track={track} />
              ))}
            </div>
          </section>
        );
      case 'beats':
        return (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
                <Disc size={24} className="text-indigo-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                MerMusic Beats
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
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {mermusicBeats.map((track) => (
                <AudioCard key={track.id} track={track} />
              ))}
            </div>
          </section>
        );
      case 'videos':
        return (
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
                <Video size={24} className="text-indigo-600" />
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
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Behind the Scenes</span>
              </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} onSelect={setSelectedVideo} />
              ))}
            </div>
          </section>
        );
      case 'news':
        return (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
                <Clock size={24} className="text-indigo-600" />
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
      {selectedVideo && <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      <Footer />
    </div>
  );
};

export default ImprovedApp;
