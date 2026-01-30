# OBS Setup Guide - Multiple Scenes

Complete guide for setting up all 4 overlay scenes in OBS.

## 📋 Overview

Your SSL 2026 system now has **4 different overlay scenes**:

1. **Scene 1**: Live Match Overlay (scores, teams, info)
2. **Scene 2**: Winner Overlay (match/game winner announcement)
3. **Scene 3**: Game Pause (match in progress, paused)
4. **Scene 4**: Game Break (standby between matches)

## 🎮 OBS Scene Setup

### General Settings (All Scenes)

For each Browser Source:
- **Width**: `1920`
- **Height**: `1080`
- **FPS**: `30`
- ✅ Check: **Shutdown source when not visible**
- ✅ Check: **Refresh browser when scene becomes active**

---

### Scene 1: Live Match Overlay

**Purpose**: Main overlay showing live match scores and info

**Setup**:
1. Create new scene: `SSL - Live Match`
2. Add **Browser Source**
3. Name: `SSL Live Overlay`
4. URL: `https://your-app.vercel.app/live-overlay`
5. Size: 1920x1080
6. Apply settings above

**Features**:
- Real-time team scores
- Match stage & map info
- Running text/marquee
- Organizer name
- Adjustable scale

**Control Panel Updates**:
- Team names & scores
- Match info (BO, stage, map)
- Running text
- Organizer name

---

### Scene 2: Winner Overlay

**Purpose**: Announce match/game winner with dramatic effect

**Setup**:
1. Create new scene: `SSL - Winner`
2. Add **Browser Source**
3. Name: `SSL Winner Overlay`
4. URL: `https://your-app.vercel.app/winner-overlay`
5. Size: 1920x1080
6. Apply settings above

**Features**:
- Large SSL logo with glow
- Customizable winner title (MATCH WINNER, GAME WINNER, etc.)
- Winner team name in huge text
- Animated particles & effects

**Control Panel Updates**:
- Winner Title (e.g., "MATCH WINNER", "GAME WINNER")
- Winner Team Name (e.g., "SMKN 1 CIMAHI")

**Usage Flow**:
```
1. Match ends
2. Go to Control Panel
3. Set "Winner Title" → "MATCH WINNER"
4. Set "Winner Team Name" → winning team
5. Click "Update Overlay"
6. Switch to "SSL - Winner" scene in OBS
7. Winner overlay appears instantly!
```

---

### Scene 3: Game Pause

**Purpose**: Show during technical pauses or breaks in gameplay

**Setup**:
1. Create new scene: `SSL - Game Pause`
2. Add **Browser Source**
3. Name: `SSL Pause Overlay`
4. URL: `https://your-app.vercel.app/game-pause`
5. Size: 1920x1080
6. Apply settings above

**Features**:
- Pause icon (two bars)
- "GAME PAUSED" text
- "Match in Progress..." indicator
- Animated effects
- **Static overlay** (no control panel updates needed)

**Usage**:
- Switch to this scene during technical issues
- Player disconnects
- Referee calls
- Any mid-game pause

---

### Scene 4: Game Break

**Purpose**: Standby screen between matches or during longer breaks

**Setup**:
1. Create new scene: `SSL - Game Break`
2. Add **Browser Source**
3. Name: `SSL Break Overlay`
4. URL: `https://your-app.vercel.app/game-break`
5. Size: 1920x1080
6. Apply settings above

**Features**:
- Large SSL logo
- "GAME BREAK" text
- "STANDBY" with animated dots
- "Next match starting soon" message
- **Static overlay** (no control panel updates needed)

**Usage**:
- Between matches
- During longer breaks
- Setup time for next game
- Team preparation time

---

## 🎯 Scene Switching Workflow

### Typical Tournament Flow:

```
START
  ↓
[Scene 4] Game Break
"Next match starting soon"
  ↓
[Scene 1] Live Match
Teams playing, scores updating
  ↓
[Scene 3] Game Pause (if needed)
Technical pause, player DC
  ↓
[Scene 1] Live Match
Resume game
  ↓
[Scene 2] Winner Overlay
Announce winner!
  ↓
[Scene 4] Game Break
Prepare for next match
  ↓
REPEAT
```

---

## ⚡ Quick Reference

| Scene | URL Path | Dynamic? | Updates From |
|-------|----------|----------|--------------|
| Live Match | `/live-overlay` | ✅ Yes | Control Panel |
| Winner | `/winner-overlay` | ✅ Yes | Control Panel |
| Game Pause | `/game-pause` | ❌ Static | None |
| Game Break | `/game-break` | ❌ Static | None |

---

## 🔄 Updating Overlays

### For Dynamic Scenes (1 & 2):

1. Keep scene active in OBS (optional)
2. Go to Control Panel
3. Update relevant fields
4. Click "Update Overlay"
5. Changes appear within 2 seconds
6. No manual refresh needed!

### For Static Scenes (3 & 4):

- No updates needed
- Just switch to the scene
- Works immediately

---

## 💡 Pro Tips

### Scene Transitions

Add smooth transitions in OBS:
1. Settings → Video → Scene Transition
2. Fade: 300-500ms duration
3. Makes scene switches look professional

### Hotkeys

Set up hotkeys for quick switching:
- F1: Live Match
- F2: Winner
- F3: Game Pause
- F4: Game Break

### Scene Collection

Save as Scene Collection:
1. Scene Collection → New
2. Name: "SSL 2026 Tournament"
3. All scenes saved together

### Testing Before Live

1. Set up all 4 scenes
2. Add Control Panel to browser
3. Test switching between scenes
4. Update data and verify it appears
5. Check all overlays load correctly

---

## 🐛 Troubleshooting

### Overlay not updating?

1. Right-click Browser Source
2. Interact
3. Press F5 to refresh
4. Or enable "Refresh when scene becomes active"

### Overlay looks wrong?

1. Check URL is correct
2. Verify 1920x1080 resolution
3. Check scale setting in Control Panel (100% default)

### Scene is blank?

1. Check internet connection
2. Verify Vercel deployment is live
3. Check browser console (Interact → F12)

---

## 📱 All URLs

Replace `your-app.vercel.app` with your actual Vercel URL:

```
Scene 1: https://your-app.vercel.app/live-overlay
Scene 2: https://your-app.vercel.app/winner-overlay
Scene 3: https://your-app.vercel.app/game-pause
Scene 4: https://your-app.vercel.app/game-break

Control: https://your-app.vercel.app/control-panel
```

---

## ✅ Setup Checklist

- [ ] All 4 scenes created in OBS
- [ ] All Browser Sources added (1920x1080)
- [ ] "Refresh when scene active" enabled
- [ ] Control Panel bookmarked
- [ ] Tested all scene switches
- [ ] Tested updating live overlay
- [ ] Tested updating winner overlay
- [ ] Tested game pause display
- [ ] Tested game break display
- [ ] Hotkeys configured (optional)
- [ ] Scene transitions added (optional)

---

**Ready to stream!** 🚀

Your SSL 2026 overlay system is now complete with all scenes ready for professional tournament streaming.
