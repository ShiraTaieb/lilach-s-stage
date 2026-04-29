import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ContactButtons } from "@/components/contact-buttons";
import batMitzvahImg from "@/assets/event-batmitzvah.jpg";
import challahImg from "@/assets/event-challah.jpg";
import brideImg from "@/assets/event-bride.jpg";

const FALLBACK_IMG: Record<string, string> = {
  "bat-mitzvah": batMitzvahImg,
  "hafrashat-challah": challahImg,
  "brides-evening": brideImg,
};

export const Route = createFileRoute("/events/$slug" as any)({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} - לילך טייב` },
      { name: "description", content: "פרטים מלאים על האירוע, יצירת קשר ופרטי הזמנה." },
    ],
  }),
  component: EventDetailPage,
});

interface PrivateEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
}

function EventDetailPage() {
  const { slug } = Route.useParams();
  const [ev, setEv] = useState<PrivateEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("private_events")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        setEv(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="container mx-auto px-4 py-24 text-center text-muted-foreground">טוען...</div>;
  if (!ev) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl">האירוע לא נמצא</h1>
        <Link to="/events" className="mt-4 inline-block text-primary">חזרה לכל האירועים</Link>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <Link to="/events" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        כל האירועים <ChevronRight className="h-4 w-4" />
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div className="overflow-hidden rounded-3xl border border-primary/20 shadow-elegant">
          <img
            src={ev.image_url || FALLBACK_IMG[ev.slug] || batMitzvahImg}
            alt={ev.title}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        <div>
          <p className="mb-3 text-xs tracking-display text-primary">PRIVATE EVENT</p>
          <h1 className="font-display text-5xl italic md:text-6xl">
            <span className="text-gradient-gold">{ev.title}</span>
          </h1>
          <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-foreground/90">
            {ev.description}
          </p>

          <div className="bg-gradient-card mt-8 rounded-2xl border border-primary/20 p-6">
            <p className="mb-4 font-display text-xl">לבירור פרטים והזמנה:</p>
            <ContactButtons message={`שלום לילך, אשמח לפרטים על ${ev.title}`} showNumber />
          </div>
        </div>
      </div>
    </article>
  );
}
