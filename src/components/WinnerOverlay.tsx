'use client';

import { useEffect, useState } from 'react';
import type { OverlayData } from '@/types/overlay';

export default function WinnerOverlay() {
  const [data, setData] = useState<OverlayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('/api/overlay', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data);
        setLoading(false);
        // Trigger animation after data loads
        setTimeout(() => setShowAnimation(true), 100);
      }
    } catch (error) {
      console.error('Failed to fetch overlay data:', error);
    }
  }

  if (loading || !data) {
    return (
      <div className="bg-transparent h-screen w-full flex items-center justify-center">
        <div className="text-white font-cyber text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  const scale = (data.overlay_scale || 100) / 100;

  return (
    <div className="bg-transparent h-screen w-full flex items-center justify-center overflow-hidden font-cyber text-white">
      <div
        className="w-full h-full flex flex-col items-center justify-center smooth-transition"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        {/* Glowing background effect */}
        <div 
          className={`absolute inset-0 bg-gradient-radial from-neon-purple/20 via-transparent to-transparent transition-opacity duration-1000 ${
            showAnimation ? 'opacity-50' : 'opacity-0'
          }`}
        ></div>
        
        {/* Animated grid background */}
        <div 
          className={`absolute inset-0 bg-grid-pattern transition-opacity duration-1000 delay-300 ${
            showAnimation ? 'opacity-10' : 'opacity-0'
          }`}
        ></div>

        {/* Main winner card */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* SSL Logo with glow - scales in */}
          <div 
            className={`relative mb-8 transition-all duration-700 ${
              showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-neon-purple/30 blur-3xl rounded-full animate-pulse"></div>
            <img
              src="/assets/logo/SSL.png"
              alt="SSL"
              className="relative w-48 h-48 object-contain drop-shadow-[0_0_30px_rgba(217,70,239,1)] z-20"
            />
          </div>

          {/* Winner title with cyber shape - slides from left */}
          <div 
            className={`relative mb-6 transition-all duration-700 delay-300 ${
              showAnimation ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/80 cyber-shape border-2 border-neon-purple shadow-neon blur-sm"></div>
            <div className="relative px-32 py-6 bg-gradient-to-b from-neon-dark/95 to-black/95 cyber-shape border-2 border-neon-purple">
              <h1 className="text-3xl font-bold tracking-[0.3em] text-neon-purple uppercase text-center drop-shadow-glow">
                {data.winner_title}
              </h1>
            </div>
          </div>

          {/* Winner team name - BIG - slides from bottom with bounce */}
          <div 
            className={`relative transition-all duration-1000 delay-500 ${
              showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{
              transitionTimingFunction: showAnimation ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'ease'
            }}
          >
            <div className="absolute inset-0 bg-black/90 cyber-shape border-4 border-neon-purple shadow-neon blur-md"></div>
            <div className="relative px-40 py-12 bg-gradient-to-b from-cyber-black to-neon-dark/80 cyber-shape border-4 border-neon-purple">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-neon-purple/70"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-neon-purple/70"></div>
              
              <h2 className="text-7xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-fuchsia-200 to-neon-purple drop-shadow-[0_0_30px_rgba(217,70,239,1)] text-center uppercase">
                {data.winner_team_name}
              </h2>
            </div>
          </div>

          {/* Decorative corner elements - fade and expand from corners */}
          <div 
            className={`absolute top-1/4 left-20 w-24 h-24 border-l-2 border-t-2 border-neon-purple transition-all duration-700 delay-700 ${
              showAnimation ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{ transformOrigin: 'top left' }}
          ></div>
          <div 
            className={`absolute top-1/4 right-20 w-24 h-24 border-r-2 border-t-2 border-neon-purple transition-all duration-700 delay-700 ${
              showAnimation ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{ transformOrigin: 'top right' }}
          ></div>
          <div 
            className={`absolute bottom-1/4 left-20 w-24 h-24 border-l-2 border-b-2 border-neon-purple transition-all duration-700 delay-700 ${
              showAnimation ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{ transformOrigin: 'bottom left' }}
          ></div>
          <div 
            className={`absolute bottom-1/4 right-20 w-24 h-24 border-r-2 border-b-2 border-neon-purple transition-all duration-700 delay-700 ${
              showAnimation ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{ transformOrigin: 'bottom right' }}
          ></div>

          {/* Subtitle - fades in last */}
          <div 
            className={`mt-12 text-center transition-all duration-700 delay-1000 ${
              showAnimation ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-lg tracking-[0.5em] text-fuchsia-300 uppercase font-tech">
              SIJA SUPER LEAGUE 2026
            </p>
          </div>
        </div>

        {/* Animated particles effect - particles fade in gradually */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-neon-purple rounded-full transition-opacity duration-1000 ${
                showAnimation ? 'opacity-30' : 'opacity-0'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: showAnimation ? `float ${5 + Math.random() * 10}s ease-in-out infinite` : 'none',
                animationDelay: `${Math.random() * 5 + 1}s`,
                transitionDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}