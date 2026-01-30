# Quick Start - Deploy to Vercel

Follow these steps to get your overlay live in minutes!

## ⚡ Fast Track (5 minutes)

### Step 1: Setup Supabase (2 min)

1. Go to [supabase.com](https://supabase.com) → Sign up/Login
2. Click **New Project**
3. Name: `ssl-overlay`, Password: (any), Region: (closest to you)
4. Wait ~2 minutes for database to initialize
5. Go to **SQL Editor** → Click **New Query**
6. Copy ALL contents from `database.sql` and paste
7. Click **RUN** ✓

### Step 2: Create Admin User (1 min)

1. In Supabase, go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Email: `admin@sija.sch.id`
4. Password: (create a strong one - save it!)
5. ✓ Check **Auto Confirm User**
6. Click **Create User**

### Step 3: Get Your Keys (30 sec)

1. In Supabase, go to **Settings** → **API**
2. Copy these two things:
   - **Project URL** (e.g., `https://abc123.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### Step 4: Deploy to Vercel (1 min)

1. Push this folder to GitHub (or use Vercel CLI)
2. Go to [vercel.com](https://vercel.com) → Sign up/Login
3. Click **New Project**
4. Import from GitHub
5. Add these **Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL = [paste your Project URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [paste your anon key]
   ```
6. Click **Deploy** 🚀

### Step 5: Add Your Logo (30 sec)

1. After deployment, go to your Vercel project
2. Upload `SSL.png` to `public/assets/logo/`
3. Or redeploy with logo included

### Step 6: Use in OBS (1 min)

1. Your overlay URL: `https://your-app.vercel.app/live-overlay`
2. In OBS: **Add** → **Browser Source**
3. URL: (paste your overlay URL)
4. Width: `1920`, Height: `1080`
5. Done! ✓

### Step 7: Control Panel (30 sec)

1. Go to: `https://your-app.vercel.app/control-panel`
2. Login with:
   - Email: `admin@sija.sch.id`
   - Password: (the one you created)
3. Update teams, scores, etc.
4. Changes appear instantly in OBS!

## 🎉 You're Live!

That's it! Your overlay system is now running.

## 🔧 Common URLs

Replace `your-app` with your actual Vercel app name:

- **Overlay**: `https://your-app.vercel.app/live-overlay`
- **Control Panel**: `https://your-app.vercel.app/control-panel`
- **Login**: `https://your-app.vercel.app/login`

## 💡 Tips

- **Bookmark** your control panel URL
- **Save** your login credentials securely
- **Test** the overlay before going live
- **Adjust** scale in control panel if needed (90-110%)

## 📞 Need Help?

1. Check the main `README.md` for detailed docs
2. Verify all environment variables in Vercel
3. Check Supabase logs for errors
4. Press F12 in browser to see console errors

---

**Pro Tip**: Keep your Supabase and Vercel dashboards bookmarked for quick access!
