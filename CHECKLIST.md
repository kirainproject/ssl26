# Deployment Checklist ✓

Use this checklist to ensure everything is set up correctly.

## 📋 Pre-Deployment

- [ ] Node.js 18.17+ installed (`node --version`)
- [ ] npm 9.0+ installed (`npm --version`)
- [ ] Git initialized (if deploying via GitHub)
- [ ] Supabase account created
- [ ] Vercel account created

## 🗄️ Supabase Setup

- [ ] Created new Supabase project
- [ ] Waited for database to initialize
- [ ] Ran complete `database.sql` in SQL Editor
- [ ] Verified `overlay_data` table exists (Database → Tables)
- [ ] Created admin user in Authentication
- [ ] Confirmed admin email (Auto Confirm checked)
- [ ] Copied Project URL from Settings → API
- [ ] Copied anon public key from Settings → API
- [ ] Verified RLS is enabled (see policies in Database)

## 🔧 Project Configuration

- [ ] Ran `npm install` successfully
- [ ] Created `.env` file from `.env.example`
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL` to `.env`
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env`
- [ ] Placed `SSL.png` in `public/assets/logo/`
- [ ] Tested locally with `npm run dev`
- [ ] Verified `/login` page works
- [ ] Verified `/control-panel` requires auth
- [ ] Verified `/live-overlay` loads

## 🚀 Vercel Deployment

- [ ] Pushed code to GitHub (or prepared for Vercel CLI)
- [ ] Created new Vercel project
- [ ] Connected GitHub repository (or deployed via CLI)
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL` environment variable
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variable
- [ ] Deployed successfully (no build errors)
- [ ] Visited deployment URL
- [ ] Tested login functionality
- [ ] Tested overlay display
- [ ] Tested control panel updates

## 🎮 OBS Integration

- [ ] Copied live overlay URL (`https://your-app.vercel.app/live-overlay`)
- [ ] Added Browser Source in OBS
- [ ] Set width to 1920
- [ ] Set height to 1080
- [ ] Enabled "Shutdown source when not visible"
- [ ] Enabled "Refresh browser when scene becomes active"
- [ ] Tested overlay appears in OBS
- [ ] Made test update from control panel
- [ ] Verified update appears in OBS

## 🎨 Customization

- [ ] Updated team names in control panel
- [ ] Set initial scores
- [ ] Configured Best Of value
- [ ] Set match stage text
- [ ] Set current map name
- [ ] Customized running text
- [ ] Set organizer name
- [ ] Adjusted overlay scale if needed
- [ ] Verified all changes reflect in overlay

## 🔐 Security Check

- [ ] Admin password is strong and saved securely
- [ ] Environment variables are set in Vercel
- [ ] `.env` file is in `.gitignore`
- [ ] Control panel requires authentication
- [ ] Overlay is accessible without auth (for OBS)
- [ ] Supabase RLS policies are active

## ✅ Final Verification

- [ ] Overlay loads in OBS without errors
- [ ] Control panel accessible and functional
- [ ] Real-time updates work (2-second refresh)
- [ ] Styling matches original design
- [ ] SSL logo displays correctly
- [ ] Organizer name shows correctly
- [ ] All text fields update properly
- [ ] Scale adjustment works
- [ ] No console errors in browser (F12)

## 🎯 Production Ready

- [ ] Performed full end-to-end test
- [ ] Documented admin credentials securely
- [ ] Bookmarked control panel URL
- [ ] Bookmarked Supabase dashboard
- [ ] Bookmarked Vercel dashboard
- [ ] Team trained on using control panel
- [ ] Backup plan documented
- [ ] Support contact information ready

## 📝 Notes

Write any important information here:

- Admin Email: ___________________________
- Overlay URL: ___________________________
- Control Panel URL: ___________________________
- Supabase Project: ___________________________
- Vercel Project: ___________________________

---

**✅ All checked?** You're ready to go live!
