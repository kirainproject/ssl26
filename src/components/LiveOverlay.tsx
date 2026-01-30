'use client';

import { useEffect, useState } from 'react';
import type { OverlayData } from '@/types/overlay';

export default function LiveOverlay() {
  const [data, setData] = useState<OverlayData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load
    fetchData();

    // Poll every 2 seconds for updates
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('/api/overlay', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        setData(result.data);
        setLoading(false);
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
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center w-full pt-4 relative">
          {/* Organizer text in left */}
          <div className="absolute top-4 left-8 z-30 flex items-center gap-3 animate-fade-in">
            <div className="flex flex-col leading-none">
              <span className="text-[9px] text-gray-400 tracking-widest uppercase font-tech">
                Organized by
              </span>
              <span className="text-base font-bold text-white tracking-widest smooth-transition">
                {data.organizer_name}
              </span>
            </div>
          </div>

          {/* SSL Header */}
          <div className="relative z-20 mb-[-18px]">
            <div className="absolute inset-0 bg-black/80 header-shape border-t-4 border-neon-purple shadow-neon blur-sm"></div>

            <div className="relative px-20 py-3 flex flex-col items-center bg-gradient-to-b from-neon-dark/90 to-black/90 header-shape border-t-2 border-neon-purple">
              <h1 className="text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-fuchsia-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]">
                SSL
              </h1>
              <div className="flex items-center gap-2 mt-[-4px]">
                <div className="w-10 h-[1px] bg-neon-purple"></div>
                <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-fuchsia-200 uppercase whitespace-nowrap">
                  SIJA SUPER LEAGUE <span className="text-white">2026</span>
                </h2>
                <div className="w-10 h-[1px] bg-neon-purple"></div>
              </div>
            </div>
          </div>

          {/* Score Section */}
          <div className="flex items-start gap-5 transform scale-100 z-10 pt-5">
            {/* Team 1 Score */}
            <div className="relative group w-60 h-24 p-[2px] bg-gradient-to-b from-neon-purple to-neon-dark cyber-shape shadow-neon">
              <div className="w-full h-full bg-cyber-black cyber-shape flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 w-24 h-1 bg-neon-purple/50"></div>
                <h2 className="text-5xl font-bold tracking-widest text-white drop-shadow-md smooth-transition">
                  {data.team1_score}
                </h2>
                <span className="text-xs text-fuchsia-300 tracking-widest uppercase mt-[-2px] smooth-transition">
                  {data.team1_name}
                </span>
              </div>
            </div>

            {/* SSL Logo Center */}
            <div className="relative w-36 h-28 mt-[-12px] z-50 flex flex-col items-center justify-center">
              <div className="absolute w-full h-full bg-neon-purple/20 blur-xl rounded-full animate-pulse"></div>
              <img
                src="/assets/logo/SSL.png"
                alt="SSL Shield"
                className="w-28 h-28 object-contain drop-shadow-[0_0_15px_rgba(217,70,239,0.8)] z-20 hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 translate-y-2 bg-black/90 border border-neon-purple px-3 py-[2px] rounded text-[9px] font-bold tracking-widest text-white shadow-neon z-30">
                <span className="smooth-transition">BO {data.best_of}</span>
              </div>
            </div>

            {/* Team 2 Score */}
            <div className="relative w-60 h-24 p-[2px] bg-gradient-to-b from-neon-purple to-neon-dark cyber-shape shadow-neon">
              <div className="w-full h-full bg-cyber-black cyber-shape flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 w-24 h-1 bg-neon-purple/50"></div>
                <h2 className="text-5xl font-bold tracking-widest text-white drop-shadow-md smooth-transition">
                  {data.team2_score}
                </h2>
                <span className="text-xs text-fuchsia-300 tracking-widest uppercase mt-[-2px] smooth-transition">
                  {data.team2_name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER SECTION */}
        <div className="mb-8 w-full max-w-5xl flex flex-col items-center relative px-10">
          {/* Decorative lines */}
          <div className="absolute -top-4 left-20 w-24 h-[1px] bg-neon-purple/50"></div>
          <div className="absolute -top-4 right-20 w-24 h-[1px] bg-neon-purple/50"></div>

          {/* Info Bar */}
          <div className="w-full h-24 p-[2px] bg-gradient-to-r from-neon-dark via-neon-purple to-neon-dark cyber-shape shadow-neon backdrop-blur-sm z-20">
            <div className="w-full h-full bg-cyber-black/90 cyber-shape flex items-center justify-between px-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

              <div className="flex flex-col z-10 border-l-2 border-neon-purple pl-5">
                <span className="text-neon-purple text-xs uppercase tracking-[0.2em] font-bold">
                  MATCH UP
                </span>
                <span className="text-2xl font-bold uppercase italic text-white smooth-transition">
                  {data.match_stage}
                </span>
              </div>

              <div className="flex flex-col items-center z-10 opacity-60">
                <span className="text-sm tracking-[0.5em] font-light">SEASON 2026</span>
                <div className="w-36 h-[1px] bg-white mt-1"></div>
              </div>

              <div className="flex flex-col items-end z-10 border-r-2 border-neon-purple pr-5">
                <span className="text-neon-purple text-xs uppercase tracking-[0.2em] font-bold">
                  Current Map
                </span>
                <span className="text-2xl font-bold uppercase italic text-white smooth-transition">
                  {data.current_map}
                </span>
              </div>
            </div>
          </div>

          {/* Running Text */}
          <div className="w-[90%] mx-auto h-10 bg-black/90 border-b border-x border-neon-purple/50 transform -skew-x-12 flex items-center mt-[-2px] relative z-20">
            {/* LIVE Badge */}
            <div className="h-full bg-neon-purple px-5 flex items-center justify-center mr-2">
              <span className="text-black font-bold text-sm tracking-widest transform skew-x-12 animate-pulse">
                LIVE
              </span>
            </div>

            {/* Marquee Text */}
            <div className="flex-1 overflow-hidden transform skew-x-12 pr-4 relative">
              <div className="animate-marquee whitespace-nowrap text-white font-tech text-lg uppercase tracking-wider font-semibold">
                {data.running_text}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}