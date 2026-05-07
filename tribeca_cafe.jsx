import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, MapPin, Phone, Mail, Music, Play, Pause } from 'lucide-react';

const TribecaCafe = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeMenu, setActiveMenu] = useState('coffee');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
    if (audioRef.current) {
      musicPlaying ? audioRef.current.pause() : audioRef.current.play();
    }
  };

  const menuItems = {
    coffee: [
      { name: 'Espresso', price: '₹90', desc: 'Rich, intense shot' },
      { name: 'Cappuccino', price: '₹150', desc: 'Silky smooth blend' },
      { name: 'Latte', price: '₹160', desc: 'Creamy and comforting' },
      { name: 'Americano', price: '₹120', desc: 'Bold and classic' },
    ],
    desserts: [
      { name: 'Chocolate Cake', price: '₹220', desc: 'Decadent dark chocolate' },
      { name: 'Cheesecake', price: '₹240', desc: 'Creamy New York style' },
      { name: 'Tiramisu', price: '₹210', desc: 'Italian classic' },
      { name: 'Macarons', price: '₹180', desc: 'Colorful French treats' },
    ],
    snacks: [
      { name: 'Croissant', price: '₹120', desc: 'Buttery and flaky' },
      { name: 'Panini', price: '₹280', desc: 'Warm and toasted' },
      { name: 'Salad Bowl', price: '₹260', desc: 'Fresh and vibrant' },
      { name: 'Pasta', price: '₹320', desc: 'Chef\'s special blend' },
    ],
  };

  const reviews = [
    { name: 'Sarah Kapoor', text: 'The ambiance is absolutely divine. Every detail screams luxury and comfort.' },
    { name: 'Arjun Sharma', text: 'Best coffee in Hyderabad. The 3D cafe experience is mesmerizing!' },
    { name: 'Priya Nair', text: 'Instagram heaven! Every corner is perfect for photos. Worth the visit!' },
  ];

  const galleryImages = [
    { title: 'Espresso Art', color: 'from-amber-600 to-orange-600' },
    { title: 'Interior Vibes', color: 'from-pink-600 to-red-600' },
    { title: 'Dessert Display', color: 'from-yellow-600 to-amber-600' },
    { title: 'Coffee Moment', color: 'from-orange-600 to-yellow-600' },
    { title: 'Cozy Corner', color: 'from-red-600 to-pink-600' },
    { title: 'Night Ambiance', color: 'from-purple-600 to-pink-600' },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Music Toggle */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/50"
      >
        {musicPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <audio ref={audioRef} loop src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-amber-950/30 via-black to-black" />
        
        {/* 3D Coffee Cup Animation */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `perspective(1000px) rotateX(${scrollY * 0.05}deg) rotateY(${Math.sin(scrollY * 0.01) * 10}deg)`,
          }}
        >
          <div className="relative w-48 h-64">
            {/* Cup */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-amber-50 rounded-2xl shadow-2xl shadow-amber-600/50 opacity-80" />
            
            {/* Coffee Inside */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-amber-900 to-amber-950 rounded-2xl opacity-90" />
            
            {/* Steam Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-32">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute w-6 h-16 bg-gradient-to-t from-white/30 to-transparent rounded-full"
                  style={{
                    left: `${i * 20}px`,
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>

            {/* Light Reflection */}
            <div className="absolute top-8 left-8 w-16 h-24 bg-gradient-to-b from-white/40 to-transparent rounded-lg blur-lg" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
            Welcome to Tribeca Cafe
          </h1>
          <p className="text-2xl md:text-3xl text-amber-100/80 mb-8 font-light">
            Where Every Sip Feels Like Home
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
              View Menu
            </button>
            <button className="px-8 py-4 border-2 border-amber-400 text-amber-300 rounded-lg font-semibold hover:bg-amber-400/10 transition-all duration-300 backdrop-blur-sm">
              Reserve a Table
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-amber-400" size={32} />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 md:px-12 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className="text-amber-100/70 text-lg leading-relaxed mb-6">
                Tribeca Cafe is more than just a café—it's a sanctuary for coffee lovers. Nestled in the heart of Kompally, we've crafted a space where luxury meets coziness, and every visit becomes a memory.
              </p>
              <p className="text-amber-100/70 text-lg leading-relaxed">
                From our carefully selected beans to our exquisite ambiance, every element is designed to elevate your experience. Welcome to your new favorite place.
              </p>
            </div>
            <div
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl shadow-amber-600/30"
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-orange-600 to-red-600 opacity-80" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">☕</div>
                  <p className="text-2xl font-bold text-amber-100">Est. 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 px-6 md:px-12 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            Our Menu
          </h2>

          {/* Menu Tabs */}
          <div className="flex gap-4 justify-center mb-12 flex-wrap">
            {['coffee', 'desserts', 'snacks'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMenu(tab)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeMenu === tab
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/50'
                    : 'border border-amber-500/30 text-amber-300 hover:border-amber-500/60 backdrop-blur-sm'
                }`}
              >
                {tab === 'coffee' && '☕ Coffee'}
                {tab === 'desserts' && '🍰 Desserts'}
                {tab === 'snacks' && '🍕 Snacks'}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {menuItems[activeMenu].map((item, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/20 to-orange-950/20 backdrop-blur-md hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-600/30 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/10 group-hover:to-orange-500/10 rounded-2xl transition-all duration-300" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-amber-100">{item.name}</h3>
                    <span className="text-2xl font-bold text-amber-400">{item.price}</span>
                  </div>
                  <p className="text-amber-100/60 text-sm">{item.desc}</p>
                </div>

                {/* 3D Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-amber-400/0 via-amber-300/0 to-amber-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            Gallery
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Coffee Art */}
            <div
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01) * 20}px)`,
              }}
            >
              <svg viewBox="0 0 400 320" className="w-full h-full">
                {/* Background */}
                <defs>
                  <linearGradient id="coffeeBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#8B6914', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#3E2723', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FFF8DC', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#F5DEB3', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect width="400" height="320" fill="url(#coffeeBg)" />
                
                {/* Wood Table */}
                <rect y="180" width="400" height="140" fill="#5D4037" />
                <line x1="0" y1="190" x2="400" y2="190" stroke="#4E342E" strokeWidth="2" />
                
                {/* Coffee Cup */}
                <ellipse cx="200" cy="140" rx="60" ry="80" fill="url(#cupGrad)" stroke="#D2A679" strokeWidth="2" />
                <ellipse cx="200" cy="55" rx="58" ry="20" fill="#FFE4B5" stroke="#D2A679" strokeWidth="2" />
                
                {/* Coffee Inside */}
                <ellipse cx="200" cy="130" rx="50" ry="65" fill="#6F4E37" opacity="0.9" />
                <ellipse cx="200" cy="60" rx="48" ry="15" fill="#8B5A3C" opacity="0.8" />
                
                {/* Latte Art */}
                <circle cx="185" cy="65" r="8" fill="#FFE4B5" opacity="0.7" />
                <circle cx="215" cy="65" r="8" fill="#FFE4B5" opacity="0.7" />
                <path d="M 180 75 Q 200 70 220 75" stroke="#FFE4B5" strokeWidth="2" fill="none" opacity="0.7" />
                
                {/* Cup Handle */}
                <path d="M 260 100 Q 300 100 300 140" stroke="#D2A679" strokeWidth="4" fill="none" />
                
                {/* Saucer */}
                <ellipse cx="200" cy="220" rx="90" ry="25" fill="#E8D7C3" stroke="#D2A679" strokeWidth="2" />
                
                {/* Light Reflection */}
                <ellipse cx="170" cy="80" rx="15" ry="25" fill="#FFFFFF" opacity="0.3" />
              </svg>
              
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <p className="text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Espresso Art
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>

            {/* Interior Vibes */}
            <div
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01 + 1) * 20}px)`,
              }}
            >
              <svg viewBox="0 0 400 320" className="w-full h-full">
                <defs>
                  <linearGradient id="interiorBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#1a1410', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#2d1f1a', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect width="400" height="320" fill="url(#interiorBg)" />
                
                {/* Wall */}
                <rect width="400" height="200" fill="#3E2723" />
                
                {/* Floor */}
                <rect y="200" width="400" height="120" fill="#4E342E" />
                
                {/* Table */}
                <rect x="80" y="180" width="120" height="100" fill="#5D4037" stroke="#8D6E63" strokeWidth="2" />
                <rect x="200" y="180" width="120" height="100" fill="#5D4037" stroke="#8D6E63" strokeWidth="2" />
                
                {/* Chairs */}
                <rect x="90" y="160" width="40" height="50" fill="#6D4C41" stroke="#795548" strokeWidth="2" />
                <rect x="210" y="160" width="40" height="50" fill="#6D4C41" stroke="#795548" strokeWidth="2" />
                
                {/* Windows - Warm Glow */}
                <rect x="20" y="40" width="80" height="80" fill="#FDB913" opacity="0.6" stroke="#D97706" strokeWidth="2" />
                <rect x="300" y="40" width="80" height="80" fill="#FDB913" opacity="0.6" stroke="#D97706" strokeWidth="2" />
                
                {/* Lights */}
                <circle cx="100" cy="20" r="8" fill="#FFD700" />
                <circle cx="300" cy="20" r="8" fill="#FFD700" />
                
                {/* Light Rays */}
                <circle cx="100" cy="20" r="15" fill="none" stroke="#FDB913" strokeWidth="1" opacity="0.4" />
                <circle cx="300" cy="20" r="15" fill="none" stroke="#FDB913" strokeWidth="1" opacity="0.4" />
              </svg>
              
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <p className="text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Cozy Interior
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>

            {/* Dessert Display */}
            <div
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01 + 2) * 20}px)`,
              }}
            >
              <svg viewBox="0 0 400 320" className="w-full h-full">
                <defs>
                  <linearGradient id="dessertBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#9D4C1C', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#4A251A', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect width="400" height="320" fill="url(#dessertBg)" />
                
                {/* Plate */}
                <circle cx="200" cy="180" r="110" fill="#E8D7C3" stroke="#D2A679" strokeWidth="3" />
                <circle cx="200" cy="180" r="100" fill="#F5E6D3" />
                
                {/* Cake Slice */}
                <path d="M 200 80 L 140 180 L 260 180 Z" fill="#6F4E37" stroke="#4A2511" strokeWidth="2" />
                <path d="M 200 90 L 145 175 L 255 175 Z" fill="#8B5A3C" />
                
                {/* Frosting Drip */}
                <path d="M 200 80 Q 190 120 185 180" stroke="#D2691E" strokeWidth="4" fill="none" />
                <path d="M 200 80 Q 210 120 215 180" stroke="#D2691E" strokeWidth="4" fill="none" />
                
                {/* Whipped Cream */}
                <circle cx="200" cy="70" r="12" fill="#FFFAF0" />
                <circle cx="185" cy="75" r="10" fill="#FFFAF0" />
                <circle cx="215" cy="75" r="10" fill="#FFFAF0" />
                
                {/* Chocolate Shavings */}
                <line x1="160" y1="110" x2="155" y2="125" stroke="#3E2723" strokeWidth="2" />
                <line x1="180" y1="105" x2="172" y2="125" stroke="#3E2723" strokeWidth="2" />
                <line x1="220" y1="105" x2="228" y2="125" stroke="#3E2723" strokeWidth="2" />
                <line x1="240" y1="110" x2="245" y2="125" stroke="#3E2723" strokeWidth="2" />
                
                {/* Fork */}
                <line x1="100" y1="220" x2="130" y2="180" stroke="#C0C0C0" strokeWidth="3" />
                <line x1="110" y1="220" x2="135" y2="175" stroke="#C0C0C0" strokeWidth="3" />
                <line x1="120" y1="220" x2="140" y2="170" stroke="#C0C0C0" strokeWidth="3" />
              </svg>
              
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <p className="text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Decadent Desserts
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>

            {/* Coffee Moment */}
            <div
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01 + 3) * 20}px)`,
              }}
            >
              <svg viewBox="0 0 400 320" className="w-full h-full">
                <defs>
                  <radialGradient id="warmLight" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#8B6914', stopOpacity: 0.3 }} />
                  </radialGradient>
                </defs>
                <rect width="400" height="320" fill="#2C1810" />
                <rect width="400" height="320" fill="url(#warmLight)" opacity="0.6" />
                
                {/* Book */}
                <rect x="50" y="120" width="100" height="140" fill="#8B4513" stroke="#654321" strokeWidth="2" />
                <line x1="60" y1="130" x2="140" y2="130" stroke="#A0522D" strokeWidth="1" />
                <line x1="60" y1="145" x2="140" y2="145" stroke="#A0522D" strokeWidth="1" />
                
                {/* Cup on Book */}
                <ellipse cx="200" cy="160" rx="50" ry="70" fill="#FFE4B5" stroke="#D2A679" strokeWidth="2" />
                <ellipse cx="200" cy="90" rx="48" ry="18" fill="#F5DEB3" stroke="#D2A679" strokeWidth="2" />
                <ellipse cx="200" cy="155" rx="42" ry="60" fill="#8B5A3C" />
                
                {/* Steam */}
                <path d="M 185 85 Q 180 60 185 40" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.6" />
                <path d="M 215 85 Q 220 60 215 40" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.6" />
                
                {/* Notebook Page */}
                <rect x="260" y="140" width="100" height="120" fill="#FFFAF0" stroke="#D2B48C" strokeWidth="2" />
                <line x1="270" y1="160" x2="350" y2="160" stroke="#CCCCCC" strokeWidth="1" />
                <line x1="270" y1="180" x2="350" y2="180" stroke="#CCCCCC" strokeWidth="1" />
                <line x1="270" y1="200" x2="350" y2="200" stroke="#CCCCCC" strokeWidth="1" />
                
                {/* Pen */}
                <rect x="355" y="155" width="30" height="4" fill="#DC143C" stroke="#8B0000" strokeWidth="1" />
              </svg>
              
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <p className="text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Coffee & Reading
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>

            {/* Cozy Corner */}
            <div
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01 + 4) * 20}px)`,
              }}
            >
              <svg viewBox="0 0 400 320" className="w-full h-full">
                <rect width="400" height="320" fill="#1a1410" />
                
                {/* Sofa */}
                <rect x="80" y="140" width="240" height="100" fill="#8B4513" stroke="#654321" strokeWidth="2" rx="10" />
                <rect x="85" y="145" width="230" height="30" fill="#A0522D" />
                
                {/* Cushions */}
                <circle cx="120" cy="160" r="20" fill="#D2691E" />
                <circle cx="200" cy="160" r="25" fill="#D2691E" />
                <circle cx="280" cy="160" r="20" fill="#D2691E" />
                
                {/* Coffee Table */}
                <rect x="120" y="260" width="160" height="40" fill="#654321" stroke="#3E2723" strokeWidth="2" />
                <rect x="125" y="265" width="150" height="25" fill="#8B4513" />
                
                {/* Cup on Table */}
                <ellipse cx="160" cy="270" rx="20" ry="25" fill="#FFE4B5" stroke="#D2A679" strokeWidth="1" />
                <ellipse cx="160" cy="250" rx="18" ry="12" fill="#8B5A3C" />
                
                {/* Lamp */}
                <line x1="340" y1="280" x2="340" y2="100" stroke="#8B7355" strokeWidth="4" />
                <ellipse cx="340" cy="90" rx="30" ry="20" fill="#FFD700" stroke="#FF8C00" strokeWidth="2" />
                <path d="M 315 85 L 310 75 M 340 85 L 340 70 M 365 85 L 370 75" stroke="#FF8C00" strokeWidth="2" />
                
                {/* Light Glow */}
                <circle cx="340" cy="90" r="50" fill="url(#warmLight)" opacity="0.3" />
                
                {/* Wall Art */}
                <rect x="20" y="40" width="60" height="80" fill="#8B6914" stroke="#D4AF37" strokeWidth="2" />
                <line x1="30" y1="55" x2="70" y2="95" stroke="#D4AF37" strokeWidth="2" />
                <line x1="70" y1="55" x2="30" y2="95" stroke="#D4AF37" strokeWidth="2" />
              </svg>
              
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <p className="text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Relaxation Zone
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>

            {/* Night Ambiance */}
            <div
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01 + 5) * 20}px)`,
              }}
            >
              <svg viewBox="0 0 400 320" className="w-full h-full">
                <defs>
                  <radialGradient id="moonLight" cx="80%" cy="20%" r="40%">
                    <stop offset="0%" style={{ stopColor: '#FFFACD', stopOpacity: 0.7 }} />
                    <stop offset="100%" style={{ stopColor: '#191970', stopOpacity: 0.2 }} />
                  </radialGradient>
                </defs>
                <rect width="400" height="320" fill="#0a0805" />
                <rect width="400" height="320" fill="url(#moonLight)" opacity="0.8" />
                
                {/* Moon */}
                <circle cx="340" cy="40" r="35" fill="#FFFACD" opacity="0.9" />
                
                {/* Stars */}
                <circle cx="50" cy="30" r="1.5" fill="#FFFFFF" opacity="0.8" />
                <circle cx="100" cy="20" r="1.5" fill="#FFFFFF" opacity="0.7" />
                <circle cx="80" cy="50" r="1" fill="#FFFFFF" opacity="0.6" />
                <circle cx="120" cy="45" r="1.5" fill="#FFFFFF" opacity="0.8" />
                <circle cx="70" cy="80" r="1" fill="#FFFFFF" opacity="0.6" />
                
                {/* Café Front */}
                <rect x="80" y="150" width="240" height="150" fill="#1a1410" stroke="#D4AF37" strokeWidth="2" />
                
                {/* Windows with Warm Light */}
                <rect x="100" y="170" width="50" height="50" fill="#FFA500" opacity="0.8" />
                <line x1="125" y1="170" x2="125" y2="220" stroke="#8B4513" strokeWidth="1" />
                <line x1="100" y1="195" x2="150" y2="195" stroke="#8B4513" strokeWidth="1" />
                
                <rect x="175" y="170" width="50" height="50" fill="#FFA500" opacity="0.8" />
                <line x1="200" y1="170" x2="200" y2="220" stroke="#8B4513" strokeWidth="1" />
                <line x1="175" y1="195" x2="225" y2="195" stroke="#8B4513" strokeWidth="1" />
                
                <rect x="250" y="170" width="50" height="50" fill="#FFA500" opacity="0.8" />
                <line x1="275" y1="170" x2="275" y2="220" stroke="#8B4513" strokeWidth="1" />
                <line x1="250" y1="195" x2="300" y2="195" stroke="#8B4513" strokeWidth="1" />
                
                {/* Door */}
                <rect x="195" y="250" width="40" height="50" fill="#654321" stroke="#3E2723" strokeWidth="2" />
                <circle cx="232" cy="275" r="3" fill="#D4AF37" />
                
                {/* Sign */}
                <rect x="140" y="100" width="120" height="40" fill="#D4AF37" stroke="#8B6914" strokeWidth="2" rx="5" />
                <text x="200" y="128" textAnchor="middle" fill="#1a1410" fontSize="20" fontWeight="bold">TRIBECA</text>
              </svg>
              
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <p className="text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Evening Glow
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            What Our Guests Say
          </h2>

          <div className="grid md:grid-cols-1 gap-6">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-950/20 to-orange-950/20 backdrop-blur-md hover:border-amber-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-600/30"
                style={{
                  animation: `slideIn 0.6s ease-out ${idx * 0.1}s both`,
                }}
              >
                <p className="text-amber-100/80 text-lg mb-4 italic">"{review.text}"</p>
                <p className="text-amber-300 font-semibold">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/20 to-orange-950/20 backdrop-blur-md hover:border-amber-400/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <MapPin className="text-amber-400" size={24} />
                  <h3 className="text-xl font-bold text-amber-100">Location</h3>
                </div>
                <p className="text-amber-100/70">
                  1st floor, 2, Medchal Rd, Ruby Block,<br />
                  Sri Ganesh Nagar, Kompally,<br />
                  Hyderabad, Secunderabad,<br />
                  Telangana 500100
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/20 to-orange-950/20 backdrop-blur-md hover:border-amber-400/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <Phone className="text-amber-400" size={24} />
                  <h3 className="text-xl font-bold text-amber-100">Phone</h3>
                </div>
                <p className="text-amber-100/70">080088 88988</p>
              </div>

              <div className="p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/20 to-orange-950/20 backdrop-blur-md hover:border-amber-400/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <Mail className="text-amber-400" size={24} />
                  <h3 className="text-xl font-bold text-amber-100">Hours</h3>
                </div>
                <p className="text-amber-100/70">
                  Thursday – Wednesday<br />
                  9:00 AM – 11:00 PM
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative h-80 rounded-2xl overflow-hidden border border-amber-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-md" />
              <iframe
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4566857943836!2d78.35829!3d17.5196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91abc92a1234%3A0x12345!2sKompally!5e0!3m2!1sen!2sin!4v1234567890"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-500/20 py-8 px-6 text-center text-amber-100/60">
        <p>© 2024 Tribeca Cafe. Crafted with ☕ and love.</p>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-80px) translateX(10px); opacity: 0; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(217, 119, 6, 0.3); }
          50% { box-shadow: 0 0 40px rgba(217, 119, 6, 0.6); }
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1410;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #d97706, #dc2626);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f59e0b, #ef4444);
        }
      `}</style>
    </div>
  );
};

export default TribecaCafe;
