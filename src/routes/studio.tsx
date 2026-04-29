import { createFileRoute } from "@tanstack/react-router";
import { Mic2, Music, Sparkles } from "lucide-react";
import studioImg from "@/assets/studio.jpg";
import { ContactButtons } from "@/components/contact-buttons";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "אולפן הקלטות - לילך טייב" },
      { name: "description", content: "אולפן הקלטות מקצועי - הפקה מוסיקלית, הקלטות שירים ופלייבקים בסטודיו ביתי איכותי." },
    ],
  }),
  component: StudioPage,
});

const FEATURES = [
  { icon: Mic2, title: "הקלטות שירה", desc: "ציוד מיקרופונים מקצועי באיכות אולפן" },
  { icon: Music, title: "הפקה מוסיקלית", desc: "אריינז׳מנט, פלייבקים והפקה מלאה" },
  { icon: Sparkles, title: "מיקס ומאסטרינג", desc: "סיום מקצועי לקבצים מוכנים לשידור" },
];

function StudioPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="overflow-hidden rounded-3xl border border-primary/20 shadow-elegant">
          <img src={studioImg} alt="אולפן הקלטות" className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="mb-3 text-xs tracking-display text-primary">RECORDING STUDIO</p>
          <h1 className="font-display text-5xl italic leading-tight md:text-6xl">
            <span className="text-gradient-gold">אולפן הקלטות אולפני "קולות"</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/90">
            אולפן הקלטות ביתי, מקצועי וחם - מקום שבו קמים שירים. אני מקליטה ומפיקה שירים, פלייבקים,
            דמואים ויצירות מוסיקליות לזמרות ולאמנים. הסטודיו מצויד בכל מה שצריך כדי לקבל איכות גבוהה,
            עם תשומת לב לכל פרט קטן בצליל ובאווירה.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border/60 bg-card/40 p-4">
                <f.icon className="mb-2 h-5 w-5 text-primary" />
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <ContactButtons message="שלום לילך, אשמח לפרטים על אולפן ההקלטות" showNumber />
          </div>
        </div>
      </div>
    </div>
  );
}
