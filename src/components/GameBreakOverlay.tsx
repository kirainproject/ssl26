'use client';

import { useEffect, useState } from 'react';

export default function GameBreakOverlay() {
  const [pulse, setPulse] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setShowAnimation(true), 100);

    // Pulse animation for standby dots
    const interval = setInterval(() => {
      setPulse((prev) => (prev + 1) % 3);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-transparent h-screen w-full flex items-center justify-center overflow-hidden font-cyber text-white">
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        {/* Animated background layers - fades in */}
        <div 
          className={`absolute inset-0 bg-grid-pattern transition-opacity duration-1000 ${
            showAnimation ? 'opacity-15' : 'opacity-0'
          }`}
        ></div>
        <div 
          className={`absolute inset-0 bg-gradient-radial from-neon-purple/10 via-transparent to-transparent transition-opacity duration-1000 delay-200 ${
            showAnimation ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>

        {/* Multiple pulsing glows - expands from center */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          <div className="w-[800px] h-[800px] bg-neon-purple/10 blur-[120px] rounded-full animate-pulse"></div>
        </div>

        {/* Main content container */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* SSL Logo with enhanced glow - scales and rotates in */}
          <div 
            className={`relative mb-16 transition-all duration-800 ${
              showAnimation ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-neon-purple/40 blur-3xl rounded-full animate-pulse"></div>
            <img
              src="/assets/logo/SSL.png"
              alt="SSL"
              className="relative w-56 h-56 object-contain drop-shadow-[0_0_40px_rgba(217,70,239,1)]"
            />
          </div>

          {/* Game Break main title - slides from bottom with bounce */}
          <div 
            className={`relative mb-6 transition-all duration-900 delay-400 ${
              showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{
              transitionTimingFunction: showAnimation ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'ease'
            }}
          >
            <div className="absolute inset-0 bg-black/90 cyber-shape border-4 border-neon-purple shadow-neon blur-md"></div>
            <div className="relative px-40 py-10 bg-gradient-to-b from-neon-dark/90 to-black/90 cyber-shape border-4 border-neon-purple">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-2 bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-2 bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>
              
              <h1 className="text-7xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-b from-white via-fuchsia-200 to-neon-purple drop-shadow-[0_0_30px_rgba(217,70,239,1)] uppercase text-center">
                GAME BREAK
              </h1>
            </div>
          </div>

          {/* Standby indicator with dots animation - slides from left */}
          <div 
            className={`relative mb-12 transition-all duration-700 delay-700 ${
              showAnimation ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/80 cyber-shape border-2 border-neon-purple/60 shadow-glow blur-sm"></div>
            <div className="relative px-24 py-6 bg-gradient-to-r from-cyber-black via-neon-dark/40 to-cyber-black cyber-shape border-2 border-neon-purple/60">
              <div className="flex items-center gap-4">
                <p className="text-2xl tracking-[0.4em] text-fuchsia-300 uppercase font-tech">
                  STANDBY
                </p>
                <div className="flex gap-2">
                  <div 
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      pulse === 0 ? 'bg-neon-purple shadow-glow' : 'bg-neon-purple/30'
                    } ${showAnimation ? 'scale-100' : 'scale-0'}`}
                    style={{ transitionDelay: '1000ms' }}
                  ></div>
                  <div 
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      pulse === 1 ? 'bg-neon-purple shadow-glow' : 'bg-neon-purple/30'
                    } ${showAnimation ? 'scale-100' : 'scale-0'}`}
                    style={{ transitionDelay: '1100ms' }}
                  ></div>
                  <div 
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      pulse === 2 ? 'bg-neon-purple shadow-glow' : 'bg-neon-purple/30'
                    } ${showAnimation ? 'scale-100' : 'scale-0'}`}
                    style={{ transitionDelay: '1200ms' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Next match info - fades in from bottom */}
          <div 
            className={`text-center space-y-3 transition-all duration-700 delay-1000 ${
              showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <p className="text-lg tracking-[0.5em] text-gray-400 uppercase font-tech">
              SIJA SUPER LEAGUE 2026
            </p>
            <div className="flex items-center gap-4 justify-center">
              <div 
                className={`h-[1px] bg-neon-purple/50 transition-all duration-700 delay-1200 ${
                  showAnimation ? 'w-20' : 'w-0'
                }`}
              ></div>
              <p className="text-sm tracking-[0.3em] text-fuchsia-400/80 uppercase font-tech">
                NEXT MATCH STARTING SOON
              </p>
              <div 
                className={`h-[1px] bg-neon-purple/50 transition-all duration-700 delay-1200 ${
                  showAnimation ? 'w-20' : 'w-0'
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Decorative corner frames - expand from corners with cascade */}
        <div 
          className={`absolute top-16 left-16 w-40 h-40 border-l-4 border-t-4 border-neon-purple/30 transition-all duration-700 delay-300 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          style={{ transformOrigin: 'top left' }}
        ></div>
        <div 
          className={`absolute top-16 right-16 w-40 h-40 border-r-4 border-t-4 border-neon-purple/30 transition-all duration-700 delay-400 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          style={{ transformOrigin: 'top right' }}
        ></div>
        <div 
          className={`absolute bottom-16 left-16 w-40 h-40 border-l-4 border-b-4 border-neon-purple/30 transition-all duration-700 delay-500 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          style={{ transformOrigin: 'bottom left' }}
        ></div>
        <div 
          className={`absolute bottom-16 right-16 w-40 h-40 border-r-4 border-b-4 border-neon-purple/30 transition-all duration-700 delay-600 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          style={{ transformOrigin: 'bottom right' }}
        ></div>

        {/* Inner corner accents - smaller cascade after outer corners */}
        <div 
          className={`absolute top-32 left-32 w-16 h-16 border-l-2 border-t-2 border-neon-purple/50 transition-all duration-500 delay-700 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
          style={{ transformOrigin: 'top left' }}
        ></div>
        <div 
          className={`absolute top-32 right-32 w-16 h-16 border-r-2 border-t-2 border-neon-purple/50 transition-all duration-500 delay-750 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
          style={{ transformOrigin: 'top right' }}
        ></div>
        <div 
          className={`absolute bottom-32 left-32 w-16 h-16 border-l-2 border-b-2 border-neon-purple/50 transition-all duration-500 delay-800 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
          style={{ transformOrigin: 'bottom left' }}
        ></div>
        <div 
          className={`absolute bottom-32 right-32 w-16 h-16 border-r-2 border-b-2 border-neon-purple/50 transition-all duration-500 delay-850 ${
            showAnimation ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
          style={{ transformOrigin: 'bottom right' }}
        ></div>

        {/* Floating particles - fade in with stagger */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-neon-purple/40 rounded-full transition-opacity duration-1000 ${
                showAnimation ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: showAnimation ? `float ${8 + Math.random() * 12}s ease-in-out infinite` : 'none',
                animationDelay: `${Math.random() * 5 + 1}s`,
                transitionDelay: `${800 + i * 50}ms`,
              }}
            />
          ))}
        </div>

        {/* Horizontal scanning lines - starts after main animation */}
        <div 
          className={`absolute inset-0 overflow-hidden pointer-events-none opacity-20 transition-opacity duration-1000 delay-1000 ${
            showAnimation ? 'opacity-20' : 'opacity-0'
          }`}
        >
          <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-neon-purple to-transparent animate-scan-slow"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-50px) translateX(30px) scale(1.5);
            opacity: 0.6;
          }
        }
        @keyframes scan-slow {
          0% {
            top: -5%;
          }
          100% {
            top: 105%;
          }
        }
        .animate-scan-slow {
          animation: scan-slow 5s linear infinite;
        }
      `}</style>
    </div>
  );
}