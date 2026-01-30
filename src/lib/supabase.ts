'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { OverlayData } from '@/types/overlay';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Client for browser/client-side operations - use SSR browser client
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Database types
export interface Database {
  public: {
    Tables: {
      overlay_data: {
        Row: OverlayData;
        Insert: Omit<OverlayData, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<OverlayData, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}