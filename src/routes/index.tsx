import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, Music, Mic2, Speaker, Calendar, Heart, ChevronLeft } from "lucide-react";
import heroImg from "@/assets/hero-singer.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import { ContactButtons } from "@/components/contact-buttons";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "לילך טייב - זמרת לנשים | הופעות חיות ומופעים" },
      { name: "description", content: "לילך טייב - זמרת מקצועית לנשים. הופעות לאירועים פרטיים, בת מצווה, הפרשת חלה, ערבי כלות, מופעי נשים ואולפן הקלטות." },
    ],
  }),
  component: Home,
});

const GALLERY = [g1, g2, g3, heroImg, g1, g2];

const HIGHLIGHTS = [
  { icon: Heart, title: "אירועים פרטיים", to: "/events", desc: "בת מצווה, הפרשת חלה וערב כלה" },
  { icon: Calendar, title: "מופעי נשים", to: "/shows", desc: "מופעים קרובים והזמנות" },
  { icon: Mic2, title: "אולפן הקלטות", to: "/studio", desc: "הפקה מקצועית בסטודיו" },
  { icon: Speaker, title: "השכרת הגברה", to: "/sound", desc: "ציוד מקצועי לכל אירוע" },
  { icon: Music, title: "פלייבקים", to: "/playbacks", desc: "חנות שירים ופלייבקים" },
];

function Home() {
  const [upcoming, setUpcoming] = useState<{ id: string; title: string; event_date: string }[]>([]);

  useEffect(() => {
    supabase
      .from("upcoming_shows")
      .select("id,title,event_date")
      .gte("event_date", new Date().toISOString())
      .order("event_date")
      .limit(1)
      .then(({ data }) => setUpcoming(data ?? []));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto grid gap-12 px-4 py-12 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-24">
          <div className="order-2 lg:order-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs tracking-display text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>ZONE FOR WOMEN ONLY</span>
            </div>
            <h1 className="font-display text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
              <span className="block italic text-foreground/90">לילך טייב</span>
              <span className="block text-gradient-gold">זמרת לנשים</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              קול מרגש, נשמה אמיתית והופעה בלתי נשכחת. מתמחה באירועי נשים, ערבי כלות,
              הפרשות חלה ובת מצווה - כדי שהאירוע שלך יהיה מיוחד באמת.
            </p>
            <div className="mt-8">
              <ContactButtons message="שלום לילך, אשמח לקבל פרטים והצעת מחיר" />
            </div>

            {upcoming[0] && (
              <Link
                to="/shows"
                className="glass mt-8 inline-flex items-center gap-3 rounded-2xl border-primary/20 px-5 py-3 text-sm transition hover:border-primary/50"
              >
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">המופע הבא</span>
                <span className="font-medium">{upcoming[0].title}</span>
                <ChevronLeft className="h-4 w-4 text-primary" />
              </Link>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/30 via-rose-400/20 to-burgundy/30 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-primary/30 shadow-elegant">
                <img
                  src={heroImg}
                  alt="לילך טייב - זמרת לנשים"
                  width={1080}
                  height={1620}
                  className="h-[520px] w-full object-cover md:h-[640px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 right-0 p-6">
                  <p className="font-display text-2xl italic text-cream">"שירה היא שפת הנשמה"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {HIGHLIGHTS.map((h) => (
            <Link
              key={h.to}
              to={h.to}
              className="group bg-gradient-card relative overflow-hidden rounded-2xl border border-border/60 p-6 transition hover:border-primary/50 hover:shadow-glow"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <h.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold">{h.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs tracking-display text-primary">PHOTO GALLERY</p>
          <h2 className="font-display text-4xl md:text-5xl">
            <span className="text-gradient-gold italic">גלריית הופעות</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            רגעים מהבמה, מהאירועים ומהמופעים החיים
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {GALLERY.map((src, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-border/40 ${
                i === 0 ? "row-span-2 md:col-span-2" : ""
              }`}
            >
              <img
                src={src}
                alt={`הופעה ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 transition group-hover:opacity-30" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-card relative overflow-hidden rounded-3xl border border-primary/20 p-10 text-center md:p-16">
          <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          <h2 className="font-display text-3xl italic md:text-5xl">
            רוצה להזמין את <span className="text-gradient-gold">לילך</span> לאירוע שלך?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            אני כאן לכל שאלה, בקשה והצעת מחיר - מוזמנת להתקשר או לכתוב לי בוואטסאפ
          </p>
          <div className="mt-8 flex justify-center">
            <ContactButtons />
          </div>
        </div>
      </section>
    </>
  );
}
