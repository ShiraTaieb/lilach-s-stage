import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ContactButtons } from "@/components/contact-buttons";
import { PHONE_PRIMARY, PHONE_SECONDARY } from "@/lib/contact";
import soundImg from "@/assets/sound.jpg";

export const Route = createFileRoute("/sound")({
  head: () => ({
    meta: [
      { title: "השכרת ציוד הגברה מקצועי - לילך טייב" },
      { name: "description", content: "השכרת ציוד הגברה מקצועי לאירועים. רמקולים, מיקסרים, מיקרופונים ותאורה." },
    ],
  }),
  component: SoundPage,
});

interface Equipment { id: string; name: string; description: string }

function SoundPage() {
  const [items, setItems] = useState<Equipment[]>([]);
  useEffect(() => {
    supabase.from("equipment").select("*").order("sort_order").then(({ data }) => setItems(data ?? []));
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="mb-3 text-xs tracking-display text-primary">SOUND & PA</p>
          <h1 className="font-display text-5xl italic leading-tight md:text-6xl">
            <span className="text-gradient-gold">שירותי ציוד מקצועי</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/90">
            ציוד הגברה איכותי ומקצועי לכל אירוע - מאירוע אינטימי ועד מופע גדול.
            ליווי טכני מלא, התקנה במקום והפעלה ע״י סאונדמן מנוסה.
          </p>

          <div className="mt-8 space-y-5">
            <div className="bg-gradient-card rounded-2xl border border-primary/20 p-5">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">קו ראשון</p>
              <ContactButtons phone={PHONE_PRIMARY} variant="compact" showNumber message="שלום, אשמח להצעת מחיר על ציוד הגברה" />
            </div>
            <div className="bg-gradient-card rounded-2xl border border-primary/20 p-5">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">קו שני</p>
              <ContactButtons phone={PHONE_SECONDARY} variant="compact" showNumber message="שלום, אשמח להצעת מחיר על ציוד הגברה" />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6 overflow-hidden rounded-3xl border border-primary/20 shadow-elegant">
            <img src={soundImg} alt="ציוד הגברה" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="bg-gradient-card rounded-3xl border border-border/60 p-6">
            <h2 className="mb-4 font-display text-2xl italic">הציוד שלנו</h2>
            <ul className="space-y-3">
              {items.map((eq) => (
                <li key={eq.id} className="flex gap-3 border-b border-border/40 pb-3 last:border-0 last:pb-0">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold">{eq.name}</p>
                    {eq.description && <p className="text-sm text-muted-foreground">{eq.description}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
