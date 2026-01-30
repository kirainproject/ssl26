# SSL 2026 Overlay System

Real-time OBS overlay system built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Live Overlay** - Real-time streaming overlay for OBS (Scene 1)
- **Winner Overlay** - Dramatic winner announcement with effects (Scene 2)
- **Game Pause** - Static pause screen for technical breaks (Scene 3)
- **Game Break** - Standby screen between matches (Scene 4)
- **Control Panel** - Secure dashboard to manage overlay data
- **Authentication** - Email/password login protection
- **API-First** - RESTful API approach with automatic updates
- **Scalable** - Adjustable zoom level for OBS integration
- **Real-time** - Changes reflect instantly on the overlay (2-second polling)

## 📋 Prerequisites

- Node.js 18.17 or higher
- npm 9.0 or higher
- Supabase account (free tier works)
- Vercel account (free tier works)

## 🛠️ Setup Instructions

### 1. Clone/Download the Project

```bash
cd ssl-overlay-v3
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

#### a. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for database to initialize

#### b. Run Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `database.sql`
4. Click **Run** to execute

#### c. Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Email: `admin@sija.sch.id` (or your preferred email)
4. Password: Create a strong password
5. Check **Auto Confirm User**
6. Click **Create User**

#### d. Get API Credentials

1. Go to **Settings** → **API**
2. Copy **Project URL** (looks like: `https://xxxxx.supabase.co`)
3. Copy **anon public** key (starts with `eyJ...`)

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Edit `.env` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Add SSL Logo

1. Create folder: `public/assets/logo/`
2. Place your `SSL.png` logo file there
3. Recommended size: 512x512px (transparent background)

## 🚀 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Routes

- `/` - Redirects to control panel
- `/login` - Admin login page
- `/control-panel` - Dashboard to manage overlay (requires auth)
- `/live-overlay` - Public overlay for OBS (Scene 1 - Live Match)
- `/winner-overlay` - Winner announcement (Scene 2 - Dynamic)
- `/game-pause` - Game pause screen (Scene 3 - Static)
- `/game-break` - Game break/standby (Scene 4 - Static)

## 📦 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **New Project**
4. Import your GitHub repository
5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy**

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts and add your environment variables.

## 🎮 Using with OBS

### Quick Setup

1. Deploy your app to Vercel (e.g., `https://your-app.vercel.app`)
2. Create 4 scenes in OBS with Browser Sources:

#### Scene 1: Live Match
- URL: `https://your-app.vercel.app/live-overlay`
- Width: `1920`, Height: `1080`
- ✅ Check "Refresh browser when scene becomes active"

#### Scene 2: Winner Announcement
- URL: `https://your-app.vercel.app/winner-overlay`
- Width: `1920`, Height: `1080`
- ✅ Check "Refresh browser when scene becomes active"

#### Scene 3: Game Pause
- URL: `https://your-app.vercel.app/game-pause`
- Width: `1920`, Height: `1080`
- Static overlay (no updates needed)

#### Scene 4: Game Break
- URL: `https://your-app.vercel.app/game-break`
- Width: `1920`, Height: `1080`
- Static overlay (no updates needed)

### Scene Usage

- **Scene 1**: Main overlay during matches (scores, teams, info)
- **Scene 2**: Switch here to show winner after match ends
- **Scene 3**: Switch here during technical pauses
- **Scene 4**: Switch here between matches/during breaks

See `OBS_SETUP_GUIDE.md` for detailed instructions and workflows!

### Recommended OBS Settings

- **Width**: 1920
- **Height**: 1080
- **FPS**: 30
- **Custom CSS**: (none needed)

## 🎨 Customization

### Adjust Overlay Scale

In the control panel, use the **Overlay Scale (%)** field to adjust the size:
- `90%` - Slightly smaller
- `100%` - Default size (recommended)
- `110%` - Slightly larger

This is useful for fine-tuning the overlay position in OBS.

### Change Organizer Name

Update the **Organizer Name** field in the control panel to change the text that appears in the top-left corner of the overlay (e.g., "SIJA SMKN 1 CIMAHI").

## 🔐 Security

- Control panel requires authentication
- Overlay is public (no auth) for OBS access
- Row Level Security (RLS) enabled in Supabase
- Environment variables protect credentials
- API routes validate authentication

## 🐛 Troubleshooting

### Overlay not updating in OBS

1. Right-click the Browser Source in OBS
2. Click **Interact**
3. Press **Ctrl+F5** (or Cmd+F5 on Mac) to hard refresh
4. Or check "Refresh browser when scene becomes active" in source settings

### Can't login to control panel

1. Verify you created the admin user in Supabase Authentication
2. Check that email is confirmed (check "Auto Confirm User")
3. Verify environment variables are correct

### Database errors

1. Make sure you ran the entire `database.sql` script
2. Check Supabase Dashboard → Database → Tables to verify `overlay_data` exists
3. Verify RLS policies are enabled

### Build errors

1. Delete `node_modules` and `.next` folders
2. Run `npm install` again
3. Make sure Node.js version is 18.17 or higher

## 📚 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Deployment**: Vercel

## 🤝 Support

For issues or questions:
1. Check this README thoroughly
2. Review Supabase Dashboard for errors
3. Check browser console for errors (F12)
4. Verify all environment variables

## 📄 License

MIT License - feel free to use and modify for your tournaments!

---

Made with ❤️ for SIJA Super League 2026
