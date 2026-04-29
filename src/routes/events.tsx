import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import batMitzvahImg from "@/assets/event-batmitzvah.jpg";
import challahImg from "@/assets/event-challah.jpg";
import brideImg from "@/assets/event-bride.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "אירועים פרטיים - לילך טייב" },
      { name: "description", content: "הופעות לאירועים פרטיים: בת מצווה, הפרשת חלה וערב כלה. הזמנת זמרת לנשים לאירוע פרטי." },
    ],
  }),
  component: EventsPage,
});

const FALLBACK_IMG: Record<string, string> = {
  "bat-mitzvah": batMitzvahImg,
  "hafrashat-challah": challahImg,
  "brides-evening": brideImg,
};

interface PrivateEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  sort_order: number;
}

function EventsPage() {
  const [items, setItems] = useState<PrivateEvent[]>([]);

  useEffect(() => {
    supabase
      .from("private_events")
      .select("*")
      .order("sort_order")
      .then(({ data }) => setItems(data ?? []));
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs tracking-display text-primary">PRIVATE EVENTS</p>
        <h1 className="font-display text-5xl md:text-6xl">
          <span className="text-gradient-gold italic">אירועים פרטיים</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          כל אירוע מקבל את הליווי המוסיקלי המתאים לו - מהפרשת חלה אינטימית ועד ערב כלה סוחף.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((ev) => (
          <Link
            key={ev.id}
            to="/events/$slug"
            params={{ slug: ev.slug }}
            className="group bg-gradient-card relative overflow-hidden rounded-3xl border border-border/60 transition hover:border-primary/50 hover:shadow-glow"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={ev.image_url || FALLBACK_IMG[ev.slug] || batMitzvahImg}
                alt={ev.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80" />
            </div>
            <div className="relative -mt-20 p-6">
              <h3 className="font-display text-3xl italic text-foreground">{ev.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {ev.description}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-sm font-medium text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                לפרטים נוספים
                <ChevronLeft className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
