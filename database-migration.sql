-- Add session support to existing tables

-- 1. Create sessions table
CREATE TABLE IF NOT EXISTS public.sessions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  game_type TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Add session columns to overlay_data table
ALTER TABLE public.overlay_data 
ADD COLUMN IF NOT EXISTS session_id TEXT DEFAULT 'default',
ADD COLUMN IF NOT EXISTS session_name TEXT DEFAULT 'Default Session';

-- 3. Create index for better performance
CREATE INDEX IF NOT EXISTS idx_overlay_data_session_id ON public.overlay_data(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_is_active ON public.sessions(is_active);

-- 4. Insert default session if not exists
INSERT INTO public.sessions (id, name, game_type, is_active)
VALUES ('default', 'Default Session', 'SSL 2026', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Update existing overlay_data rows to use default session
UPDATE public.overlay_data
SET session_id = 'default', session_name = 'Default Session'
WHERE session_id IS NULL OR session_id = '';

-- 6. Enable Row Level Security
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- 7. Create policies for sessions table
CREATE POLICY "Enable read access for authenticated users" ON public.sessions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON public.sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON public.sessions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users" ON public.sessions
  FOR DELETE
  TO authenticated
  USING (true);

-- 8. Grant permissions
GRANT ALL ON public.sessions TO authenticated;
GRANT ALL ON public.sessions TO service_role;

-- 9. Comments for documentation
COMMENT ON TABLE public.sessions IS 'Stores different game sessions/instances for multi-game support';
COMMENT ON COLUMN public.sessions.id IS 'Unique session identifier (slug)';
COMMENT ON COLUMN public.sessions.name IS 'Human-readable session name';
COMMENT ON COLUMN public.sessions.game_type IS 'Type of game (e.g., Mobile Legends, PUBG Mobile)';
COMMENT ON COLUMN public.overlay_data.session_id IS 'Links overlay data to a specific session';