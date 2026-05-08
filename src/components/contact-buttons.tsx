import React, { useEffect, useState } from "react";
import { Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { telHref, waHref, PHONE_PRIMARY } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface ContactButtonsProps {
  phone?: string;
  email?: string;
  variant?: "solid" | "minimal";
  className?: string;
}

export function ContactButtons({ 
  phone = PHONE_PRIMARY, 
  email = "office@lilachtayeb.co.il",
  variant = "solid",
  className 
}: ContactButtonsProps) {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const pageName = path === "/" ? "דף הבית" : path.split("/").pop()?.replace(/-/g, " ") || "";
      setCurrentPath(pageName);
    }
  }, []);

  const whatsappMessage = `היי לילך, הגעתי מהאתר (מעמוד: ${currentPath || 'כללי'}), אשמח לפרטים: `;

  // אפשרות 1: המצב המינימלי - שלושה עיגולים נקיים (וואטסאפ, טלפון, מייל)
  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        {/* וואטסאפ */}
        <a
          href={waHref(phone, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FCF6BA]/30 bg-white/5 transition-all hover:scale-110 hover:bg-white/10"
        >
          <WhatsAppIcon className="h-5 w-5 fill-[#FCF6BA]" />
        </a>

        {/* טלפון */}
        <a
          href={telHref(phone)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FCF6BA]/30 bg-white/5 transition-all hover:scale-110 hover:bg-white/10"
        >
          <Phone className="h-5 w-5 text-[#FCF6BA]" strokeWidth={1.5} />
        </a>

        {/* מייל - עכשיו גם הוא כפתור עיגול תואם */}
        <a
          href={`mailto:${email}`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FCF6BA]/30 bg-white/5 transition-all hover:scale-110 hover:bg-white/10"
        >
          <Mail className="h-5 w-5 text-[#FCF6BA]" strokeWidth={1.5} />
        </a>
      </div>
    );
  }

  // אפשרות 2: המצב המאוחד (ה"וואו" למרכז הדף) - נשאר ללא שינוי
  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <div className="relative flex items-center overflow-hidden rounded-full border-[1.5px] border-[#FCF6BA]/60 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] shadow-[0_12px_25 tax_rgba(0,0,0,0.4)] transition-all duration-500">
        <a
          href={waHref(phone, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 border-l border-[#402012]/20 px-6 py-3.5 transition-colors hover:bg-white/10"
        >
          <WhatsAppIcon className="h-5 w-5 fill-[#402012]" />
          <span className="font-bold tracking-wide text-[#402012]" style={{ textShadow: "0px 1px 0px rgba(252,246,186,0.8)" }}>
            WhatsApp
          </span>
        </a>

        <a
          href={telHref(phone)}
          className="flex items-center gap-2.5 px-6 py-3.5 transition-colors hover:bg-white/10"
        >
          <Phone className="h-4 w-4 text-[#402012]" strokeWidth={2.5} />
          <span className="font-bold tracking-wide text-[#402012]" style={{ textShadow: "0px 1px 1px rgba(252,246,186,0.8)" }}>
            חיוג מהיר
          </span>
        </a>
      </div>

      <a
        href={`mailto:${email}`}
        className="group flex items-center gap-2 text-[#FCF6BA]/70 transition-all hover:text-[#FCF6BA] text-xs tracking-[0.2em] uppercase"
      >
        <Mail className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
        <span className="border-b border-transparent group-hover:border-[#FCF6BA]/50">
          Send Email
        </span>
      </a>
    </div>
  );
}
