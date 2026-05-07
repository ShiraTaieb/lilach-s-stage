
-- Drop old tables
DROP TABLE IF EXISTS public.private_events CASCADE;
DROP TABLE IF EXISTS public.upcoming_shows CASCADE;
DROP TABLE IF EXISTS public.booking_shows CASCADE;
DROP TABLE IF EXISTS public.equipment CASCADE;
DROP TABLE IF EXISTS public.playbacks CASCADE;

-- Events (unified)
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('private','upcoming','booking')),
  title text NOT NULL,
  slug text,
  description text NOT NULL DEFAULT '',
  image_url text,
  event_date timestamptz,
  venue text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX events_kind_slug_uniq ON public.events(kind, slug) WHERE slug IS NOT NULL;

-- Services
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Gallery
CREATE TABLE public.gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  alt text DEFAULT '',
  span_class text DEFAULT 'col-span-1 row-span-1',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Playbacks
CREATE TABLE public.playbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  song_name text NOT NULL,
  artist_name text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playbacks ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "public read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "public read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "public read playbacks" ON public.playbacks FOR SELECT USING (true);

-- Admin write
CREATE POLICY "admin write events" ON public.events FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin write services" ON public.services FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin write gallery" ON public.gallery FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "admin write playbacks" ON public.playbacks FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- updated_at triggers
CREATE TRIGGER events_touch BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER services_touch BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER gallery_touch BEFORE UPDATE ON public.gallery FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER playbacks_touch BEFORE UPDATE ON public.playbacks FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Seed admin email
INSERT INTO public.admin_users (email)
VALUES ('lilachtaieb@gmail.com')
ON CONFLICT DO NOTHING;

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-media', 'site-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies
DROP POLICY IF EXISTS "site-media public read" ON storage.objects;
DROP POLICY IF EXISTS "site-media admin write" ON storage.objects;
DROP POLICY IF EXISTS "site-media admin update" ON storage.objects;
DROP POLICY IF EXISTS "site-media admin delete" ON storage.objects;

CREATE POLICY "site-media public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-media');
CREATE POLICY "site-media admin write" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'site-media' AND is_admin());
CREATE POLICY "site-media admin update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'site-media' AND is_admin());
CREATE POLICY "site-media admin delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'site-media' AND is_admin());
