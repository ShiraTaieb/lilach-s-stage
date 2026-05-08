import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mic2, Music, Sparkles } from "lucide-react";
import studioImg from "@/assets/studio.jpg";
import { ContactButtons } from "@/components/contact-buttons";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "אולפני קולות - לילך טייב" },
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
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* תמונה בצד שמאל (או ימין ב-LTR) */}
        <div className="overflow-hidden rounded-[2.5rem] border border-primary/20 shadow-elegant">
          <img src={studioImg} alt="אולפני קולות" className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105" />
        </div>

        {/* תוכן */}
        <div>
          <p className="mb-3 text-xs tracking-[0.2em] uppercase text-primary">RECORDING STUDIO</p>
          
          <div className="mb-8">
            <h1 className="font-display text-6xl italic leading-tight md:text-7xl">
              <span className="text-gradient-gold">אולפני "קולות"</span>
            </h1>
            {/* הסלוגן החדש עם הריווח היוקרתי */}
            <p className="mt-2 text-sm font-light uppercase tracking-[0.3em] text-[#FCF6BA]/80">
              הקול שלך באפקט של לילך
            </p>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-foreground/90 italic">
            אולפן הקלטות ביתי, מקצועי וחם - מקום שבו קמים שירים. 
            אני מקליטה ומפיקה שירים, פלייבקים, דמואים ויצירות מוסיקליות לזמרות ולאמנים.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/5 bg-white/5 p-5 transition-colors hover:bg-white/10">
                <f.icon className="mb-3 h-5 w-5 text-primary" />
                <h3 className="text-sm font-bold tracking-wide">{f.title}</h3>
                <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* הכפתור המרשים (Variant Solid) כפי שהמלצתי ב-Hero */}
          <div className="mt-12 flex justify-start">
            <ContactButtons 
              variant="solid" 
              label="תיאום סשן הקלטה" 
              message="שלום לילך, אשמח לקבל פרטים ולתאם הקלטה באולפני קולות"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
