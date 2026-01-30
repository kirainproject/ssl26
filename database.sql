-- SSL 2026 Overlay Database Schema
-- Execute this SQL in Supabase SQL Editor

-- ============================================
-- 1. OVERLAY DATA TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS overlay_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team1_name VARCHAR(100) NOT NULL DEFAULT 'TEAM 1',
    team1_score INTEGER NOT NULL DEFAULT 0,
    team2_name VARCHAR(100) NOT NULL DEFAULT 'TEAM 2',
    team2_score INTEGER NOT NULL DEFAULT 0,
    best_of INTEGER NOT NULL DEFAULT 3,
    match_stage VARCHAR(100) NOT NULL DEFAULT 'GRAND FINAL',
    current_map VARCHAR(100) NOT NULL DEFAULT 'LAND OF DAWN',
    running_text TEXT NOT NULL DEFAULT 'Selamat Datang di SIJA Super League 2026',
    organizer_name VARCHAR(100) NOT NULL DEFAULT 'SIJA SMKN 1 CIMAHI',
    organizer_logo VARCHAR(255) DEFAULT 'SIJA.png',
    ssl_logo VARCHAR(255) DEFAULT 'SSL.png',
    overlay_scale INTEGER NOT NULL DEFAULT 100,
    
    -- Winner Scene Data
    winner_title VARCHAR(100) NOT NULL DEFAULT 'MATCH WINNER',
    winner_team_name VARCHAR(100) NOT NULL DEFAULT 'SMKN 1 CIMAHI',
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- 2. INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_overlay_data_active ON overlay_data(is_active);
CREATE INDEX IF NOT EXISTS idx_overlay_data_updated ON overlay_data(updated_at DESC);

-- ============================================
-- 3. AUTO-UPDATE TIMESTAMP FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- 4. TRIGGER FOR AUTO-UPDATE
-- ============================================

DROP TRIGGER IF EXISTS update_overlay_data_updated_at ON overlay_data;

CREATE TRIGGER update_overlay_data_updated_at 
    BEFORE UPDATE ON overlay_data 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. INSERT DEFAULT DATA
-- ============================================

INSERT INTO overlay_data (
    team1_name, team1_score, 
    team2_name, team2_score, 
    best_of, match_stage, 
    current_map, running_text, 
    organizer_name, overlay_scale,
    winner_title, winner_team_name
) VALUES (
    'SMKN 1 CIMAHI', 0,
    'PANGRANGO', 0,
    3, 'GRAND FINAL',
    'LAND OF DAWN', 
    'Selamat Datang di SIJA Super League 2026 - Junjung Tinggi Sportivitas - Stay Connected Beyond Competition',
    'SIJA SMKN 1 CIMAHI',
    100,
    'MATCH WINNER', 'SMKN 1 CIMAHI'
) ON CONFLICT DO NOTHING;

-- ============================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE overlay_data ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON overlay_data;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON overlay_data;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON overlay_data;

-- Allow everyone to READ (for the overlay)
CREATE POLICY "Enable read access for all users" ON overlay_data
    FOR SELECT 
    USING (true);

-- Only authenticated users can UPDATE
CREATE POLICY "Enable update for authenticated users only" ON overlay_data
    FOR UPDATE 
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can INSERT
CREATE POLICY "Enable insert for authenticated users only" ON overlay_data
    FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 7. GRANT PERMISSIONS
-- ============================================

GRANT SELECT ON overlay_data TO anon, authenticated;
GRANT INSERT, UPDATE ON overlay_data TO authenticated;

-- ============================================
-- 8. CREATE ADMIN USER
-- ============================================

-- IMPORTANT: Run this separately in Supabase Dashboard → Authentication → Users
-- Or use the Supabase Auth API to create the user

-- Manual steps:
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Click "Add User" → "Create new user"
-- 3. Email: admin@sija.sch.id
-- 4. Password: [your-secure-password]
-- 5. Check "Auto Confirm User"

-- Or use SQL (if you have service_role access):
-- SELECT auth.create_user(
--     email := 'admin@sija.sch.id',
--     password := 'your-secure-password-here',
--     email_confirm := true
-- );

-- ============================================
-- 9. OPTIONAL: VIEW FOR ACTIVE OVERLAY
-- ============================================

CREATE OR REPLACE VIEW active_overlay AS
SELECT * FROM overlay_data
WHERE is_active = true
ORDER BY updated_at DESC
LIMIT 1;

GRANT SELECT ON active_overlay TO anon, authenticated;

-- ============================================
-- 10. VERIFICATION QUERIES
-- ============================================

-- Check if data exists
SELECT * FROM overlay_data;

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'overlay_data';

-- Check policies
SELECT * FROM pg_policies 
WHERE tablename = 'overlay_data';

-- ============================================
-- SETUP COMPLETE! 
-- ============================================

-- Next steps:
-- 1. Create admin user in Supabase Authentication
-- 2. Copy NEXT_PUBLIC_SUPABASE_URL from Settings → API
-- 3. Copy NEXT_PUBLIC_SUPABASE_ANON_KEY from Settings → API
-- 4. Update .env file in your project
-- 5. Deploy to Vercel!
