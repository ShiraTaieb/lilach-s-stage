import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Countdown } from "@/components/countdown";
import { ContactButtons } from "@/components/contact-buttons";

export const Route = createFileRoute("/shows")({
  head: () => ({
    meta: [
      { title: "מופעי נשים - לילך טייב" },
      { name: "description", content: "מופעי נשים קרובים והזמנת מופעים. ערבי שירה ומוסיקה לנשים בלבד." },
    ],
  }),
  component: ShowsPage,
});

interface UpcomingShow { id: string; title: string; event_date: string | null; venue: string | null; description: string; image_url: string | null }
interface BookingShow { id: string; title: string; description: string; image_url: string | null }

function ShowsPage() {
  const [upcoming, setUpcoming] = useState<UpcomingShow[]>([]);
  const [booking, setBooking] = useState<BookingShow[]>([]);

  useEffect(() => {
    supabase.from("events").select("id,title,event_date,venue,description,image_url").eq("kind", "upcoming").order("event_date")
      .then(({ data }) => setUpcoming((data ?? []) as UpcomingShow[]));
    supabase.from("events").select("id,title,description,image_url").eq("kind", "booking").order("sort_order")
      .then(({ data }) => setBooking((data ?? []) as BookingShow[]));
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs tracking-display text-primary">WOMEN'S SHOWS</p>
        <h1 className="font-display text-5xl md:text-6xl">
          <span className="text-gradient-gold italic">מופעי נשים</span>
        </h1>
      </div>

      <section className="mb-20">
        <div className="mb-8 flex items-center gap-3">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="font-display text-3xl italic">מופעים קרובים והזמנת מופעים</h2>
        </div>
        {upcoming.length === 0 ? (
          <p className="text-muted-foreground">אין מופעים קרובים כרגע. עקבי אחרי ההודעות לעדכונים!</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {upcoming.map((s) => (
              <div key={s.id} className="bg-gradient-card overflow-hidden rounded-3xl border border-primary/20 shadow-elegant">
                {s.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img src={s.image_url} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display text-2xl italic text-gradient-gold">{s.title}</h3>
                  {s.venue && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" /> {s.venue}
                    </div>
                  )}
                  {s.event_date && (
                    <p className="mt-2 text-sm text-foreground/80">
                      {new Date(s.event_date).toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  )}
                  {s.event_date && (
                    <div className="mt-5">
                      <Countdown date={s.event_date} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-8 flex items-center gap-3">
          <h2 className="font-display text-3xl italic">מופעים להזמנה</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {booking.map((s) => (
            <div key={s.id} className="bg-gradient-card overflow-hidden rounded-3xl border border-border/60">
              {s.image_url && (
                <div className="aspect-video overflow-hidden">
                  <img src={s.image_url} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-display text-2xl italic">{s.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{s.description}</p>
                <div className="mt-5">
                  <ContactButtons variant="compact" message={`שלום לילך, אשמח לפרטים על ${s.title}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
