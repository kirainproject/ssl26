'use client';

import { useEffect, useState } from 'react';
import type { OverlayData } from '@/types/overlay';

export default function LiveOverlay() {
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
        id="overlayContainer"
        className="w-full h-full flex flex-col justify-between items-center smooth-transition"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        
        {/* =========================================
            TOP SECTION: SCOREBOARD (SPLIT WING)
            Tengah dibiarkan kosong untuk Timer Game
           ========================================= */}
        <div className="w-full flex justify-between items-start px-10 pt-6 relative z-50">
          
          {/* --- LEFT WING (TEAM 1) --- */}
          <div className={`flex items-start gap-2 transition-all duration-700 ${showAnimation ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            {/* Team Name Box (Skewed) */}
            <div className="h-16 px-6 bg-gradient-to-r from-black/90 to-neon-dark/80 border-l-4 border-neon-purple skew-x-12 flex flex-col justify-center items-end mr-[-15px] z-10 shadow-neon">
               <span className="text-[10px] text-gray-400 -skew-x-12 uppercase tracking-widest">Team Blue</span>
               <span className="text-xl font-bold text-white -skew-x-12 uppercase tracking-widest whitespace-nowrap">{data.team1_name}</span>
            </div>
            
            {/* Score Box (Square) */}
            <div className="relative w-24 h-24 p-[2px] bg-gradient-to-b from-neon-purple to-neon-dark cyber-shape shadow-[0_0_15px_rgba(192,38,211,0.6)] z-20">
              <div className="w-full h-full bg-cyber-black cyber-shape flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 w-full h-[2px] bg-neon-purple/50 animate-pulse"></div>
                <h2 className="text-6xl font-black tracking-widest text-white drop-shadow-md">
                  {data.team1_score}
                </h2>
              </div>
            </div>
          </div>

          {/* --- CENTER HOLE (SAFE ZONE) --- */}
          {/* Area ini sengaja kosong lebar sekitar 400px-500px agar tidak menutupi Timer/Kills */}
          <div className="flex-1"></div>

          {/* --- RIGHT WING (TEAM 2) --- */}
          <div className={`flex items-start gap-2 flex-row-reverse transition-all duration-700 ${showAnimation ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
             {/* Team Name Box (Skewed) */}
             <div className="h-16 px-6 bg-gradient-to-l from-black/90 to-neon-dark/80 border-r-4 border-neon-purple -skew-x-12 flex flex-col justify-center items-start ml-[-15px] z-10 shadow-neon">
               <span className="text-[10px] text-gray-400 skew-x-12 uppercase tracking-widest">Team Red</span>
               <span className="text-xl font-bold text-white skew-x-12 uppercase tracking-widest whitespace-nowrap">{data.team2_name}</span>
            </div>

            {/* Score Box (Square) */}
            <div className="relative w-24 h-24 p-[2px] bg-gradient-to-b from-neon-purple to-neon-dark cyber-shape shadow-[0_0_15px_rgba(192,38,211,0.6)] z-20">
              <div className="w-full h-full bg-cyber-black cyber-shape flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 w-full h-[2px] bg-neon-purple/50 animate-pulse"></div>
                <h2 className="text-6xl font-black tracking-widest text-white drop-shadow-md">
                  {data.team2_score}
                </h2>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================
            BOTTOM SECTION: BRANDING & INFO
            Semua elemen "berat" dipindah kesini
           ========================================= */}
        <div className="mb-6 w-full max-w-[95%] flex flex-col items-center relative">
          
          {/* Main Footer Dashboard (Organizer, Logo, Title, Match Info) */}
          <div className={`w-full flex items-end justify-between px-12 pb-2 transition-all duration-700 delay-200 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            
            {/* LEFT: Organizer Info */}
            <div className="flex flex-col items-start mb-2">
               <div className="flex items-center gap-3">
                  <div className="w-1 h-10 bg-neon-purple shadow-[0_0_10px_rgba(217,70,239,0.8)]"></div>
                  <div>
                    <span className="text-[10px] text-fuchsia-300 tracking-[0.2em] uppercase font-tech block">Organized by</span>
                    <span className="text-xl font-bold text-white tracking-widest uppercase text-shadow-sm">{data.organizer_name}</span>
                  </div>
               </div>
            </div>

            {/* CENTER: Logo & Title (Dipindah dari Header Atas) */}
            <div className="flex flex-col items-center absolute left-1/2 transform -translate-x-1/2 bottom-12">
               {/* Logo Floating */}
               <div className="w-24 h-24 mb-[-10px] relative z-20 drop-shadow-[0_0_20px_rgba(217,70,239,0.6)] hover:scale-110 transition-transform duration-300">
                  <img src="/assets/logo/SSL.png" alt="Logo" className="w-full h-full object-contain" />
               </div>
               
               {/* Title Plate */}
               <div className="bg-black/90 border-x-2 border-t border-neon-purple px-10 py-1 cyber-shape shadow-neon z-10 flex flex-col items-center">
                  <h1 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-fuchsia-400">
                    SSL <span className="text-white">2026</span>
                  </h1>
                  <span className="text-[9px] font-bold tracking-[0.3em] text-fuchsia-200 uppercase mt-[-2px]">
                    SIJA SUPER LEAGUE
                  </span>
               </div>
            </div>

            {/* RIGHT: Match Info */}
            <div className="flex flex-col items-end mb-2 text-right">
               <div className="flex items-center gap-3">
                  <div>
                    <span className="text-[10px] text-fuchsia-300 tracking-[0.2em] uppercase font-tech block">Match Stage</span>
                    <span className="text-xl font-bold text-white tracking-widest uppercase italic">{data.match_stage}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-neon-purple/20 border border-neon-purple px-2 py-1 rounded">
                     <span className="text-[8px] text-white font-bold">FORMAT</span>
                     <span className="text-lg font-black text-white leading-none">BO{data.best_of}</span>
                  </div>
               </div>
            </div>

          </div>

          {/* Running Text Bar (Full Width) */}
          <div 
            className={`w-full h-10 bg-black/95 border-y border-neon-purple/50 flex items-center relative z-20 shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-all duration-700 delay-500 ${
              showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Live Badge */}
            <div className="h-full bg-neon-purple px-6 flex items-center justify-center relative z-30">
              <span className="text-black font-extrabold text-sm tracking-widest animate-pulse">
                LIVE
              </span>
              {/* Decorative triangle */}
              <div className="absolute -right-4 top-0 border-l-[16px] border-l-neon-purple border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent h-full"></div>
            </div>

            {/* Map Info */}
            <div className="px-8 flex items-center h-full border-r border-gray-700 bg-gray-900/50 ml-4 skew-x-12">
               <span className="text-gray-400 text-xs font-mono -skew-x-12 mr-2">MAP:</span>
               <span className="text-white font-bold text-sm uppercase -skew-x-12 tracking-wider text-fuchsia-200">{data.current_map}</span>
            </div>

            {/* Marquee */}
            <div className="flex-1 overflow-hidden relative h-full flex items-center">
              <div className="whitespace-nowrap text-white font-tech text-lg uppercase tracking-wider font-semibold animate-marquee pl-4">
                {data.running_text}
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}