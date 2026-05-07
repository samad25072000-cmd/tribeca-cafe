import React, { useState, useEffect, useRef, Suspense } from 'react';
import { ChevronDown, MapPin, Phone, Mail, Music, Play, Pause } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Coffee Cup Component
const Coffee3D = () => {
  return (
    <group>
      {/* Cup Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 2, 32]} />
        <meshPhongMaterial color="#FFE4B5" shininess={100} />
      </mesh>

      {/* Coffee Inside */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 1.6, 32]} />
        <meshPhongMaterial color="#6F4E37" />
      </mesh>

      {/* Cup Rim */}
      <mesh position={[0, 1.05, 0]}>
        <torusGeometry args={[0.8, 0.08, 16, 32]} />
        <meshPhongMaterial color="#D2A679" />
      </mesh>

      {/* Handle */}
      <mesh position={[1.2, 0.3, 0]}>
        <torusGeometry args={[0.5, 0.12, 16, 32, Math.PI]} />
        <meshPhongMaterial color="#D2A679" />
      </mesh>

      {/* Steam Particles */}
      {[0, 1, 2].map((i) => (
        <Float key={i} speed={2 + i * 0.5} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[i * 0.4 - 0.4, 1.8 + i * 0.3, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshPhongMaterial
              color="#FFFFFF"
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      ))}

      {/* Light Reflection */}
      <mesh position={[-0.3, 0.5, 0.7]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhongMaterial
          color="#FFFFFF"
          transparent
          opacity={0.4}
          emissive="#FFFACD"
        />
      </mesh>
    </group>
  );
};

// 3D Rotating Dessert Component
const Dessert3D = () => {
  const groupRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.01;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <group ref={groupRef}>
      {/* Plate */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshPhongMaterial color="#E8D7C3" />
      </mesh>

      {/* Cake Slice */}
      <mesh position={[0, 0.4, 0]}>
        <coneGeometry args={[0.8, 1, 16]} />
        <meshPhongMaterial color="#6F4E37" />
      </mesh>

      {/* Frosting */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshPhongMaterial color="#D2691E" />
      </mesh>

      {/* Whipped Cream */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI * 0.7) * 0.4, 1.1, Math.sin(i * Math.PI * 0.7) * 0.4]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshPhongMaterial color="#FFFAF0" />
        </mesh>
      ))}
    </group>
  );
};

// 3D Floating Coffee Beans
const CoffeeBeans = () => {
  const beans = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.cos((i / 8) * Math.PI * 2) * 1.5,
    z: Math.sin((i / 8) * Math.PI * 2) * 1.5,
  }));

  return (
    <group>
      {beans.map((bean) => (
        <Float key={bean.id} speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
          <mesh position={[bean.x, 0, bean.z]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshPhongMaterial color="#4A2511" />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const TribecaCafe = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeMenu, setActiveMenu] = useState('coffee');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
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
    { name: 'Sarah Kapoor', text: 'The ambiance is absolutely divine. Every detail screams luxury and comfort. I\'ve been here three times and it keeps getting better!' },
    { name: 'Arjun Sharma', text: 'Best coffee in Hyderabad. The 3D cafe experience is mesmerizing! Worth every rupee spent.' },
    { name: 'Priya Nair', text: 'Instagram heaven! Every corner is perfect for photos. The desserts are out of this world. Highly recommended!' },
    { name: 'Vikram Singh', text: 'Perfect place for work and relaxation. The ambiance, coffee quality, and service are all top-notch.' },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Music Toggle */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/50"
        title={musicPlaying ? 'Pause music' : 'Play music'}
      >
        {musicPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <audio ref={audioRef} loop src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" />

      {/* Hero Section with 3D Coffee */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-amber-950/30 via-black to-black" />
        
        {/* 3D Canvas */}
        <div className="absolute inset-0 w-full h-full">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, -5, 5]} intensity={0.5} color="#FFD700" />
            
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Coffee3D />
              </Float>
              <CoffeeBeans />
            </Suspense>
            
            <OrbitControls autoRotate autoRotateSpeed={4} enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        {/* Content Overlay */}
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
              <div className="absolute inset-0 flex items-center justify-center">
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 0, 3]} />
                  <ambientLight intensity={0.8} />
                  <pointLight position={[5, 5, 5]} intensity={1} />
                  <Suspense fallback={null}>
                    <Dessert3D />
                  </Suspense>
                </Canvas>
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
                <defs>
                  <linearGradient id="coffeeBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#8B6914', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#3E2723', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect width="400" height="320" fill="url(#coffeeBg)" />
                <rect y="180" width="400" height="140" fill="#5D4037" />
                <ellipse cx="200" cy="140" rx="60" ry="80" fill="#FFE4B5" stroke="#D2A679" strokeWidth="2" />
                <ellipse cx="200" cy="130" rx="50" ry="65" fill="#6F4E37" opacity="0.9" />
                <circle cx="185" cy="65" r="8" fill="#FFE4B5" opacity="0.7" />
                <circle cx="215" cy="65" r="8" fill="#FFE4B5" opacity="0.7" />
                <ellipse cx="200" cy="220" rx="90" ry="25" fill="#E8D7C3" stroke="#D2A679" strokeWidth="2" />
              </svg>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <p className="text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Espresso Art
                </p>
              </div>
            </div>

            {/* Interior Vibes */}
            <div
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01 + 1) * 20}px)`,
              }}
            >
              <svg viewBox="0 0 400 320" className="w-full h-full">
                <rect width="400" height="320" fill="#1a1410" />
                <rect width="400" height="200" fill="#3E2723" />
                <rect y="200" width="400" height="120" fill="#4E342E" />
                <rect x="80" y="180" width="120" height="100" fill="#5D4037" stroke="#8D6E63" strokeWidth="2" />
                <rect x="200" y="180" width="120" height="100" fill="#5D4037" stroke="#8D6E63" strokeWidth="2" />
                <rect x="20" y="40" width="80" height="80" fill="#FDB913" opacity="0.6" stroke="#D97706" strokeWidth="2" />
                <rect x="300" y="40" width="80" height="80" fill="#FDB913" opacity="0.6" stroke="#D97706" strokeWidth="2" />
              </svg>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <p className="text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Cozy Interior
                </p>
              </div>
            </div>

            {/* Dessert Display */}
            <div
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01 + 2) * 20}px)`,
              }}
            >
              <svg viewBox="0 0 400 320" className="w-full h-full">
                <rect width="400" height="320" fill="#9D4C1C" />
                <circle cx="200" cy="180" r="110" fill="#E8D7C3" stroke="#D2A679" strokeWidth="3" />
                <circle cx="200" cy="180" r="100" fill="#F5E6D3" />
                <path d="M 200 80 L 140 180 L 260 180 Z" fill="#6F4E37" stroke="#4A2511" strokeWidth="2" />
                <circle cx="200" cy="70" r="12" fill="#FFFAF0" />
                <circle cx="185" cy="75" r="10" fill="#FFFAF0" />
                <circle cx="215" cy="75" r="10" fill="#FFFAF0" />
              </svg>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <p className="text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Decadent Desserts
                </p>
              </div>
            </div>

            {/* Coffee Moment */}
            <div
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01 + 3) * 20}px)`,
              }}
            >
              <svg viewBox="0 0 400 320" className="w-full h-full">
                <rect width="400" height="320" fill="#2C1810" />
                <rect x="50" y="120" width="100" height="140" fill="#8B4513" stroke="#654321" strokeWidth="2" />
                <ellipse cx="200" cy="160" rx="50" ry="70" fill="#FFE4B5" stroke="#D2A679" strokeWidth="2" />
                <ellipse cx="200" cy="155" rx="42" ry="60" fill="#8B5A3C" />
                <rect x="260" y="140" width="100" height="120" fill="#FFFAF0" stroke="#D2B48C" strokeWidth="2" />
              </svg>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <p className="text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Coffee & Reading
                </p>
              </div>
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
                <rect x="80" y="140" width="240" height="100" fill="#8B4513" stroke="#654321" strokeWidth="2" rx="10" />
                <circle cx="120" cy="160" r="20" fill="#D2691E" />
                <circle cx="200" cy="160" r="25" fill="#D2691E" />
                <circle cx="280" cy="160" r="20" fill="#D2691E" />
                <rect x="120" y="260" width="160" height="40" fill="#654321" stroke="#3E2723" strokeWidth="2" />
              </svg>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <p className="text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Relaxation Zone
                </p>
              </div>
            </div>

            {/* Night Ambiance */}
            <div
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01 + 5) * 20}px)`,
              }}
            >
              <svg viewBox="0 0 400 320" className="w-full h-full">
                <rect width="400" height="320" fill="#0a0805" />
                <circle cx="340" cy="40" r="35" fill="#FFFACD" opacity="0.9" />
                <rect x="80" y="150" width="240" height="150" fill="#1a1410" stroke="#D4AF37" strokeWidth="2" />
                <rect x="100" y="170" width="50" height="50" fill="#FFA500" opacity="0.8" />
                <rect x="175" y="170" width="50" height="50" fill="#FFA500" opacity="0.8" />
                <rect x="250" y="170" width="50" height="50" fill="#FFA500" opacity="0.8" />
              </svg>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <p className="text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Evening Glow
                </p>
              </div>
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

          <div className="relative">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-500 ${
                  idx === activeReview ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <div className="p-8 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-950/20 to-orange-950/20 backdrop-blur-md hover:border-amber-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-600/30 min-h-48">
                  <p className="text-amber-100/80 text-lg mb-4 italic">"{review.text}"</p>
                  <p className="text-amber-300 font-semibold">— {review.name}</p>
                </div>
              </div>
            ))}

            {/* Navigation */}
            <div className="mt-64 flex justify-center gap-3">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReview(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === activeReview
                      ? 'bg-amber-400 w-8'
                      : 'bg-amber-400/40 hover:bg-amber-400/60'
                  }`}
                />
              ))}
            </div>
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
