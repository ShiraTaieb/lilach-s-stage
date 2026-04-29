
-- Helper function to check if current user is admin
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.admin_users (email) VALUES ('lilachtaieb@gmail.com');

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users a
    JOIN auth.users u ON lower(u.email) = lower(a.email)
    WHERE u.id = auth.uid()
  );
$$;

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read admin_users" ON public.admin_users FOR SELECT USING (public.is_admin());

-- Private Events
CREATE TABLE public.private_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.private_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read private_events" ON public.private_events FOR SELECT USING (true);
CREATE POLICY "admin write private_events" ON public.private_events FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Upcoming Shows
CREATE TABLE public.upcoming_shows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  venue TEXT,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.upcoming_shows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read upcoming_shows" ON public.upcoming_shows FOR SELECT USING (true);
CREATE POLICY "admin write upcoming_shows" ON public.upcoming_shows FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Booking Shows
CREATE TABLE public.booking_shows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.booking_shows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read booking_shows" ON public.booking_shows FOR SELECT USING (true);
CREATE POLICY "admin write booking_shows" ON public.booking_shows FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Equipment
CREATE TABLE public.equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read equipment" ON public.equipment FOR SELECT USING (true);
CREATE POLICY "admin write equipment" ON public.equipment FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Playbacks
CREATE TABLE public.playbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  song_name TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.playbacks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read playbacks" ON public.playbacks FOR SELECT USING (true);
CREATE POLICY "admin write playbacks" ON public.playbacks FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_pe_uat BEFORE UPDATE ON public.private_events FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_us_uat BEFORE UPDATE ON public.upcoming_shows FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_bs_uat BEFORE UPDATE ON public.booking_shows FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_eq_uat BEFORE UPDATE ON public.equipment FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_pb_uat BEFORE UPDATE ON public.playbacks FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
