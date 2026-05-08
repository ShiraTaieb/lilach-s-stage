import React, { useEffect, useState } from "react";
import { Phone, Mail, ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { telHref, waHref, PHONE_PRIMARY } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface ContactButtonsProps {
  phone?: string;
  email?: string;
  variant?: "solid" | "minimal" | "expandable"; // הוספנו expandable לכרטיסים
  className?: string;
}

export function ContactButtons({ 
  phone = PHONE_PRIMARY, 
  email = "office@lilachtayeb.co.il",
  variant = "solid",
  className 
}: ContactButtonsProps) {
  const [currentPath, setCurrentPath] = useState("");
  const [isOpen, setIsOpen] = useState(false); // מצב פתיחה לכפתור הכרטיס

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const pageName = path === "/" ? "דף הבית" : path.split("/").pop()?.replace(/-/g, " ") || "";
      setCurrentPath(pageName);
    }
  }, []);

  const whatsappMessage = `היי לילך, הגעתי מהאתר (מעמוד: ${currentPath || 'כללי'}), אשמח לפרטים: `;

  // --- אפשרות 1: המצב המינימלי (3 עיגולים - פוטר/Hero) ---
  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <a href={waHref(phone, whatsappMessage)} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FCF6BA]/30 bg-white/5 transition-all hover:scale-110 hover:bg-white/10">
          <WhatsAppIcon className="h-5 w-5 fill-[#FCF6BA]" />
        </a>
        <a href={telHref(phone)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FCF6BA]/30 bg-white/5 transition-all hover:scale-110 hover:bg-white/10">
          <Phone className="h-5 w-5 text-[#FCF6BA]" strokeWidth={1.5} />
        </a>
        <a href={`mailto:${email}`} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FCF6BA]/30 bg-white/5 transition-all hover:scale-110 hover:bg-white/10">
          <Mail className="h-5 w-5 text-[#FCF6BA]" strokeWidth={1.5} />
        </a>
      </div>
    );
  }

  // --- אפשרות 2: המצב המתנפח (לכרטיסי מופעים) ---
  if (variant === "expandable") {
    return (
      <div className={cn("flex flex-col items-center w-full", className)}>
        {!isOpen ? (
          <button 
            onClick={() => setIsOpen(true)}
            className="group flex w-full max-w-[200px] items-center justify-center gap-2 rounded-full border border-[#FCF6BA]/50 bg-gradient-to-r from-[#BF953F]/20 to-[#B38728]/20 py-2.5 text-sm font-medium text-[#FCF6BA] transition-all hover:bg-[#FCF6BA]/20"
          >
            להזמנת המופע
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        ) : (
          <div className="flex items-center gap-3 animate-in fade-in zoom-in duration-300">
            <a href={waHref(phone, whatsappMessage)} target="_blank" className="flex items-center gap-2 rounded-full bg-[#FCF6BA] px-4 py-2 text-xs font-bold text-[#402012] transition-transform hover:scale-105">
              <WhatsAppIcon className="h-4 w-4 fill-[#402012]" />
              וואטסאפ
            </a>
            <a href={telHref(phone)} className="flex items-center gap-2 rounded-full border border-[#FCF6BA] px-4 py-2 text-xs font-bold text-[#FCF6BA] transition-transform hover:scale-105">
              <Phone className="h-3.5 w-3.5" />
              חיוג
            </a>
            <button onClick={() => setIsOpen(false)} className="text-[10px] text-[#FCF6BA]/50 underline underline-offset-4">סגור</button>
          </div>
        )}
      </div>
    );
  }

  // --- אפשרות 3: המצב המאוחד (ה"וואו" המקורי) ---
  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <div className="relative flex items-center overflow-hidden rounded-full border-[1.5px] border-[#FCF6BA]/60 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] shadow-[0_12px_25px_rgba(0,0,0,0.4)] transition-all duration-500">
        <a href={waHref(phone, whatsappMessage)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 border-l border-[#402012]/20 px-6 py-3.5 transition-colors hover:bg-white/10">
          <WhatsAppIcon className="h-5 w-5 fill-[#402012]" />
          <span className="font-bold tracking-wide text-[#402012]" style={{ textShadow: "0px 1px 0px rgba(252,246,186,0.8)" }}>WhatsApp</span>
        </a>
        <a href={telHref(phone)} className="flex items-center gap-2.5 px-6 py-3.5 transition-colors hover:bg-white/10">
          <Phone className="h-4 w-4 text-[#402012]" strokeWidth={2.5} />
          <span className="font-bold tracking-wide text-[#402012]" style={{ textShadow: "0px 1px 1px rgba(252,246,186,0.8)" }}>חיוג מהיר</span>
        </a>
      </div>
      <a href={`mailto:${email}`} className="group flex items-center gap-2 text-[#FCF6BA]/70 transition-all hover:text-[#FCF6BA] text-xs tracking-[0.2em] uppercase">
        <Mail className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
        <span className="border-b border-transparent group-hover:border-[#FCF6BA]/50">Send Email</span>
      </a>
    </div>
  );
}
