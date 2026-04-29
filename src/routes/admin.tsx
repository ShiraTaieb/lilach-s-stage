import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminSection } from "@/components/admin/admin-section";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "ניהול - לילך טייב" }] }),
  component: AdminPage,
});

const ADMIN_EMAIL = "lilachtaieb@gmail.com";

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const userEmail = data.session?.user.email ?? null;
      const codeOk = sessionStorage.getItem("admin_code_ok") === "1";
      if (!userEmail || userEmail.toLowerCase() !== ADMIN_EMAIL || !codeOk) {
        navigate({ to: "/login" });
        return;
      }
      setEmail(userEmail);
      setReady(true);
    })();
  }, [navigate]);

  const logout = async () => {
    sessionStorage.removeItem("admin_code_ok");
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  if (!ready) return <div className="container mx-auto px-4 py-24 text-center text-muted-foreground">טוען...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-3xl italic text-gradient-gold">אזור ניהול</h1>
            <p className="text-sm text-muted-foreground" dir="ltr">{email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-card">חזרה לאתר</Link>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-destructive/40 px-4 py-2 text-sm text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" /> התנתקות
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminSection
          table="private_events"
          title="אירועים פרטיים"
          orderBy="sort_order"
          fields={[
            { name: "title", label: "כותרת", required: true },
            { name: "slug", label: "מזהה (slug באנגלית)", required: true },
            { name: "description", label: "תיאור", type: "textarea", required: true },
            { name: "image_url", label: "תמונה (URL)", type: "url" },
            { name: "sort_order", label: "סדר", type: "number" },
          ]}
          display={(r) => <span><b>{String(r.title)}</b> · {String(r.slug)}</span>}
        />

        <AdminSection
          table="upcoming_shows"
          title="מופעים קרובים"
          orderBy="event_date"
          fields={[
            { name: "title", label: "כותרת", required: true },
            { name: "event_date", label: "תאריך", type: "datetime-local", required: true },
            { name: "venue", label: "מקום" },
            { name: "description", label: "תיאור", type: "textarea" },
            { name: "image_url", label: "תמונה (URL)", type: "url" },
          ]}
          display={(r) => <span><b>{String(r.title)}</b> · {new Date(String(r.event_date)).toLocaleDateString("he-IL")}</span>}
        />

        <AdminSection
          table="booking_shows"
          title="מופעים להזמנה"
          orderBy="sort_order"
          fields={[
            { name: "title", label: "כותרת", required: true },
            { name: "description", label: "תיאור", type: "textarea", required: true },
            { name: "image_url", label: "תמונה (URL)", type: "url" },
            { name: "sort_order", label: "סדר", type: "number" },
          ]}
          display={(r) => <b>{String(r.title)}</b>}
        />

        <AdminSection
          table="equipment"
          title="ציוד הגברה"
          orderBy="sort_order"
          fields={[
            { name: "name", label: "שם", required: true },
            { name: "description", label: "תיאור", type: "textarea" },
            { name: "sort_order", label: "סדר", type: "number" },
          ]}
          display={(r) => <b>{String(r.name)}</b>}
        />

        <AdminSection
          table="playbacks"
          title="פלייבקים"
          orderBy="song_name"
          fields={[
            { name: "song_name", label: "שם השיר", required: true },
            { name: "artist_name", label: "שם האמן", required: true },
            { name: "price", label: "מחיר (₪)", type: "number", required: true },
            { name: "image_url", label: "תמונה (URL)", type: "url" },
          ]}
          display={(r) => <span><b>{String(r.song_name)}</b> · {String(r.artist_name)} · ₪{String(r.price)}</span>}
        />
      </div>
    </div>
  );
}
