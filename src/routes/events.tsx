import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ContactButtons } from "@/components/contact-buttons";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "אירועים פרטיים - לילך טייב" },
      { name: "description", content: "הופעות לאירועים פרטיים: בת מצווה, הפרשת חלה וערב כלה. הזמנת זמרת לנשים לאירוע פרטי." },
    ],
  }),
  component: EventsPage,
});

interface PrivateEvent {
  id: string;
  title: string;
  slug: string | null;
  description: string;
  image_url: string | null;
  sort_order: number;
}

function EventsPage() {
  const [items, setItems] = useState<PrivateEvent[]>([]);

  useEffect(() => {
    supabase
      .from("events")
      .select("id,title,slug,description,image_url,sort_order")
      .eq("kind", "private")
      .order("sort_order")
      .then(({ data }) => setItems((data ?? []) as PrivateEvent[]));
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
          <div
            key={ev.id}
            className="group bg-gradient-card relative overflow-hidden rounded-3xl border border-border/60 transition hover:border-primary/50"
          >
            <Link
              to="/events/$slug"
              params={{ slug: ev.slug ?? ev.id }}
              className="block cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {ev.image_url && (
                  <img
                    src={ev.image_url}
                    alt={ev.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80" />
              </div>
            </Link>

            <div className="relative -mt-20 p-6">
              <Link to="/events/$slug" params={{ slug: ev.slug ?? ev.id }}>
                <h3 className="font-display text-3xl italic text-foreground">{ev.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{ev.description}</p>
              </Link>

              <div className="mt-6 flex flex-col gap-4">
                <Link 
                  to="/events/$slug" 
                  params={{ slug: ev.slug ?? ev.id }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 py-2 text-sm font-medium text-primary transition hover:bg-primary/20"
                >
                  לגלריית תמונות ופרטים
                  <ChevronLeft className="h-4 w-4" />
                </Link>

                {/* הכפתור המתנפח החדש - מותאם אישית לכל סוג אירוע */}
                <ContactButtons 
                  variant="expandable" 
                  label="להזמנת האירוע" 
                  message={`היי לילך, אשמח לקבל פרטים והצעת מחיר עבור: ${ev.title}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
