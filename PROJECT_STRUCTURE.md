# SSL 2026 Overlay - Project Structure

## 📁 Directory Structure

```
ssl-overlay-v3/
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore file
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
│
├── public/                      # Static assets
│   └── assets/
│       └── logo/
│           └── SSL.png          # SSL Logo (place here)
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home/redirect page
│   │   │
│   │   ├── live-overlay/        # Scene 1: Live match overlay (no auth)
│   │   │   └── page.tsx
│   │   │
│   │   ├── winner-overlay/      # Scene 2: Winner announcement (no auth)
│   │   │   └── page.tsx
│   │   │
│   │   ├── game-pause/          # Scene 3: Game pause screen (no auth)
│   │   │   └── page.tsx
│   │   │
│   │   ├── game-break/          # Scene 4: Game break screen (no auth)
│   │   │   └── page.tsx
│   │   │
│   │   ├── control-panel/       # Control panel (requires auth)
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── login/               # Login page
│   │   │   └── page.tsx
│   │   │
│   │   └── api/                 # API Routes
│   │       ├── overlay/
│   │       │   └── route.ts     # GET overlay data
│   │       ├── update/
│   │       │   └── route.ts     # POST update overlay
│   │       └── auth/
│   │           ├── login/
│   │           │   └── route.ts
│   │           └── logout/
│   │               └── route.ts
│   │
│   ├── components/              # React components
│   │   ├── LiveOverlay.tsx      # Scene 1: Main live overlay
│   │   ├── WinnerOverlay.tsx    # Scene 2: Winner announcement
│   │   ├── GamePauseOverlay.tsx # Scene 3: Game pause screen
│   │   ├── GameBreakOverlay.tsx # Scene 4: Game break screen
│   │   └── ControlPanel.tsx     # Control panel component
│   │
│   ├── lib/                     # Utilities
│   │   ├── supabase.ts          # Supabase client
│   │   └── auth.ts              # Auth utilities
│   │
│   └── types/                   # TypeScript types
│       └── overlay.ts
│
└── database.sql                 # Supabase schema & setup

```

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Deployment**: Vercel
- **Real-time**: Supabase Realtime

## 📝 Features

1. **Live Overlay** (`/live-overlay`) - Scene 1
   - Real-time updates via API polling
   - No authentication required
   - Ready for OBS Browser Source
   - Scalable zoom (controlled from panel)
   - Team scores, match info, running text

2. **Winner Overlay** (`/winner-overlay`) - Scene 2
   - Dynamic winner announcement
   - Customizable title (MATCH WINNER, GAME WINNER, etc.)
   - Large team name display
   - Animated effects and particles
   - Controlled from panel

3. **Game Pause** (`/game-pause`) - Scene 3
   - Static pause screen
   - "GAME PAUSED" display
   - "Match in Progress" indicator
   - No control panel updates needed

4. **Game Break** (`/game-break`) - Scene 4
   - Static standby screen
   - "GAME BREAK" display
   - "STANDBY" with animated indicators
   - No control panel updates needed

5. **Control Panel** (`/control-panel`)
   - Requires authentication
   - Update all overlay data
   - Real-time preview
   - Clean, minimal dashboard design
   - Winner scene configuration

3. **Authentication**
   - Email/Password login
   - Session-based auth
   - Protected routes
   - Secure API endpoints

## 🔐 Security Features

- Environment variables for credentials
- Row Level Security (RLS) in Supabase
- Auth-protected control panel
- API route protection
- CORS configuration

## 🎨 Design Philosophy

- **Overlay**: Cyberpunk/neon aesthetic (unchanged from original)
- **Control Panel**: Clean, minimal, professional dashboard
- **Typography**: Orbitron & Rajdhani for overlay
- **Colors**: Neon purple accent, dark theme
