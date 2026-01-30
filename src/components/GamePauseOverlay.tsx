'use client';

import { useEffect, useState } from 'react';

export default function GamePauseOverlay() {
  const [dots, setDots] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setShowAnimation(true), 100);

    // Dots animation
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-transparent h-screen w-full flex items-center justify-center overflow-hidden font-cyber text-white">
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        {/* Animated grid background - fades in */}
        <div 
          className={`absolute inset-0 bg-grid-pattern transition-opacity duration-1000 ${
            showAnimation ? 'opacity-20' : 'opacity-0'
          }`}
        ></div>
        
        {/* Pulsing glow effect - expands from center */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          <div className="w-[600px] h-[600px] bg-neon-purple/20 blur-[100px] rounded-full animate-pulse"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* SSL Logo - scales in with rotation */}
          <div 
            className={`relative mb-12 transition-all duration-700 ${
              showAnimation ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-180 opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-neon-purple/30 blur-2xl rounded-full animate-pulse"></div>
            <img
              src="/assets/logo/SSL.png"
              alt="SSL"
              className="relative w-40 h-40 object-contain drop-shadow-[0_0_30px_rgba(217,70,239,1)]"
            />
          </div>

          {/* Pause icon cyber style - slides from top */}
          <div 
            className={`relative mb-8 transition-all duration-700 delay-300 ${
              showAnimation ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/80 cyber-shape border-2 border-neon-purple shadow-neon blur-sm"></div>
            <div className="relative px-20 py-12 bg-gradient-to-b from-neon-dark/95 to-black/95 cyber-shape border-2 border-neon-purple flex gap-6">
              {/* Left pause bar - slides from left */}
              <div 
                className={`w-6 h-24 bg-gradient-to-b from-white to-neon-purple shadow-neon transition-all duration-500 delay-500 ${
                  showAnimation ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}
              ></div>
              {/* Right pause bar - slides from right */}
              <div 
                className={`w-6 h-24 bg-gradient-to-b from-white to-neon-purple shadow-neon transition-all duration-500 delay-500 ${
                  showAnimation ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
              ></div>
            </div>
          </div>

          {/* Game Paused text - glitch effect entrance */}
          <div 
            className={`relative mb-4 transition-all duration-700 delay-700 ${
              showAnimation ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
            style={{
              transitionTimingFunction: showAnimation ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'ease'
            }}
          >
            <div className="absolute inset-0 bg-black/90 cyber-shape border-2 border-neon-purple shadow-neon blur-sm"></div>
            <div className="relative px-32 py-8 bg-gradient-to-r from-cyber-black via-neon-dark/50 to-cyber-black cyber-shape border-2 border-neon-purple">
              <h1 className="text-6xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white to-neon-purple drop-shadow-[0_0_20px_rgba(217,70,239,1)] uppercase">
                GAME PAUSED
              </h1>
            </div>
          </div>

          {/* In progress indicator - fades in with stagger */}
          <div 
            className={`flex items-center gap-3 transition-all duration-700 delay-1000 ${
              showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div 
              className={`w-3 h-3 bg-neon-purple rounded-full shadow-glow transition-all duration-500 delay-1000 ${
                showAnimation ? 'scale-100 animate-pulse' : 'scale-0'
              }`}
            ></div>
            <p className="text-xl tracking-[0.3em] text-fuchsia-300 uppercase font-tech">
              Match in Progress{dots}
            </p>
            <div 
              className={`w-3 h-3 bg-neon-purple rounded-full shadow-glow transition-all duration-500 delay-1100 ${
                showAnimation ? 'scale-100 animate-pulse' : 'scale-0'
              }`}
            ></div>
          </div>

          {/* Subtitle - fades in last */}
          <div 
            className={`mt-12 transition-all duration-700 delay-1200 ${
              showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-sm tracking-[0.5em] text-gray-400 uppercase font-tech">
              SIJA SUPER LEAGUE 2026
            </p>
          </div>
        </div>

        {/* Corner decorations - expand from corners with stagger */}
        <div 
          className={`absolute top-20 left-20 w-32 h-32 border-l-2 border-t-2 border-neon-purple/40 transition-all duration-700 delay-300 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          style={{ transformOrigin: 'top left' }}
        ></div>
        <div 
          className={`absolute top-20 right-20 w-32 h-32 border-r-2 border-t-2 border-neon-purple/40 transition-all duration-700 delay-400 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          style={{ transformOrigin: 'top right' }}
        ></div>
        <div 
          className={`absolute bottom-20 left-20 w-32 h-32 border-l-2 border-b-2 border-neon-purple/40 transition-all duration-700 delay-500 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          style={{ transformOrigin: 'bottom left' }}
        ></div>
        <div 
          className={`absolute bottom-20 right-20 w-32 h-32 border-r-2 border-b-2 border-neon-purple/40 transition-all duration-700 delay-600 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          style={{ transformOrigin: 'bottom right' }}
        ></div>

        {/* Scanning line effect - starts after initial animation */}
        <div 
          className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 delay-1000 ${
            showAnimation ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-30 animate-scan"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: -10%;
          }
          100% {
            top: 110%;
          }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
}