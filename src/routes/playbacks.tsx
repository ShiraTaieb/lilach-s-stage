import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Music, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ContactButtons } from "@/components/contact-buttons";

export const Route = createFileRoute("/playbacks")({
  head: () => ({
    meta: [
      { title: "חנות פלייבקים - לילך טייב" },
      { name: "description", content: "חנות פלייבקים - מבחר שירים ופלייבקים מקוריים לרכישה." },
    ],
  }),
  component: PlaybacksPage,
});

interface Playback { id: string; song_name: string; artist_name: string; price: number; image_url: string | null }

function PlaybacksPage() {
  const [items, setItems] = useState<Playback[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    supabase.from("playbacks").select("*").order("song_name").then(({ data }) => setItems(data ?? []));
  }, []);

  const filtered = items.filter(
    (p) =>
      p.song_name.toLowerCase().includes(q.toLowerCase()) ||
      p.artist_name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs tracking-display text-primary">PLAYBACK STORE</p>
        <h1 className="font-display text-5xl italic md:text-6xl">
          <span className="text-gradient-gold">חנות פלייבקים</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          מבחר פלייבקים איכותיים לזמרות, אירועים ולמורי הרקדה. לרכישה - צרי קשר ואני אדאג לשלוח אלייך.
        </p>
      </div>

      <div className="mx-auto mb-8 flex max-w-md items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2.5">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="חפשי שיר או אמן..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="bg-gradient-card overflow-hidden rounded-3xl border border-border/60 shadow-elegant">
        <div className="grid grid-cols-[60px_1fr_1fr_auto] items-center gap-4 border-b border-border/60 bg-card/60 px-6 py-3 text-xs uppercase tracking-widest text-muted-foreground">
          <div></div>
          <div>שם השיר</div>
          <div className="hidden sm:block">אמן</div>
          <div className="text-end">מחיר</div>
        </div>
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">לא נמצאו תוצאות</div>
        ) : (
          filtered.map((p) => (
            <div key={p.id} className="grid grid-cols-[60px_1fr_1fr_auto] items-center gap-4 border-b border-border/40 px-6 py-4 transition hover:bg-primary/5 last:border-0">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.song_name} className="h-full w-full object-cover" />
                ) : (
                  <Music className="h-5 w-5 text-primary" />
                )}
              </div>
              <div>
                <p className="font-semibold">{p.song_name}</p>
                <p className="text-xs text-muted-foreground sm:hidden">{p.artist_name}</p>
              </div>
              <div className="hidden text-sm text-muted-foreground sm:block">{p.artist_name}</div>
              <div className="font-display text-lg font-bold text-gradient-gold tabular-nums">
                ₪{Number(p.price).toFixed(0)}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-gradient-card mt-10 rounded-3xl border border-primary/20 p-8 text-center">
        <h2 className="font-display text-2xl italic">לרכישת פלייבק</h2>
        <p className="mt-2 text-muted-foreground">צרי איתי קשר עם שם השיר שמעניין אותך</p>
        <div className="mt-5 flex justify-center">
          {/* עדכון הקומפוננטה לדינמית - שינוי variant וטקסט הכפתור */}
          <ContactButtons 
            variant="expandable" 
            label="לרכישת פלייבק"
            message="שלום לילך, אשמח לרכוש פלייבק מהאתר" 
          />
        </div>
      </div>
    </div>
  );
}
