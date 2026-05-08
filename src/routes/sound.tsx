import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Headphones } from "lucide-react";
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

interface Service { id: string; title: string; description: string }

function SoundPage() {
  const [items, setItems] = useState<Service[]>([]);
  useEffect(() => {
    supabase.from("services").select("id,title,description").order("sort_order")
      .then(({ data }) => setItems((data ?? []) as Service[]));
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* צד ימין - תוכן ושירותים */}
        <div className="space-y-10">
          <div>
            <p className="mb-3 text-xs tracking-display text-primary">SOUND & PA</p>
            <h1 className="font-display text-5xl italic leading-tight md:text-6xl">
              <span className="text-gradient-gold">שירותי ציוד מקצועי</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/90">
              ציוד הגברה איכותי ומקצועי לכל אירוע - מאירוע אינטימי ועד מופע גדול.
              ליווי טכני מלא, התקנה במקום והפעלה ע״י סאונדמן מנוסה.
            </p>
          </div>

          {/* רשימת השירותים - עברה לפה! */}
          <div className="bg-gradient-card rounded-3xl border border-border/60 p-8 shadow-sm">
            <h2 className="mb-6 font-display text-2xl italic text-primary">השירותים והציוד שלנו</h2>
            <ul className="grid gap-4 sm:grid-cols-1">
              {items.map((eq) => (
                <li key={eq.id} className="flex gap-4 border-b border-border/20 pb-4 last:border-0 last:pb-0">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{eq.title}</p>
                    {eq.description && <p className="text-sm text-muted-foreground">{eq.description}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* יצירת קשר - עברה לסוף התור */}
          <div className="overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/10 to-transparent p-8 shadow-glow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Headphones className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl italic">לתיאום והצעות מחיר</h3>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {/* קו ראשי */}
              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4 transition-colors hover:bg-white/10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">קו ראשי</p>
                  <p className="font-display text-lg text-[#FCF6BA]">{PHONE_PRIMARY}</p>
                </div>
                <ContactButtons 
                  phone={PHONE_PRIMARY} 
                  variant="minimal" 
                  message="שלום, אשמח להצעת מחיר על ציוד הגברה" 
                />
              </div>

              {/* קו נוסף */}
              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4 transition-colors hover:bg-white/10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">קו נוסף</p>
                  <p className="font-display text-lg text-[#FCF6BA]">{PHONE_SECONDARY}</p>
                </div>
                <ContactButtons 
                  phone={PHONE_SECONDARY} 
                  variant="minimal" 
                  message="שלום, אשמח להצעת מחיר על ציוד הגברה" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* צד שמאל - תמונה */}
        <div className="sticky top-24">
          <div className="overflow-hidden rounded-[2rem] border border-primary/20 shadow-elegant">
            <img 
              src={soundImg} 
              alt="ציוד הגברה מקצועי" 
              className="aspect-[4/5] w-full object-cover grayscale-[0.2] transition-all hover:grayscale-0" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
