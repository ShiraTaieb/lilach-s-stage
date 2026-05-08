import React, { useEffect, useState } from "react";
import { Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { telHref, waHref, PHONE_PRIMARY } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface ContactButtonsProps {
  phone?: string;
  email?: string;
  variant?: "solid" | "ghost"; // שליטה על סגנון הכפתור
  className?: string;
}

export function ContactButtons({ 
  phone = PHONE_PRIMARY, 
  email = "office@lilachtayeb.co.il",
  variant = "solid",
  className 
}: ContactButtonsProps) {
  const [currentPath, setCurrentPath] = useState("");

  // זיהוי העמוד הנוכחי לצורך הודעה מובנית חכמה
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const pageName = path === "/" ? "דף הבית" : path.split("/").pop()?.replace(/-/g, " ") || "";
      setCurrentPath(pageName);
    }
  }, []);

  // הגדרת הודעות מובנות חכמות
  const whatsappMessage = `היי לילך, הגעתי מהאתר (מעמוד: ${currentPath || 'כללי'}), אשמח לקבל פרטים בנושא: `;
  const emailSubject = encodeURIComponent(`פנייה חדשה מהאתר - ${currentPath || 'כללי'}`);
  const emailBody = encodeURIComponent(`היי לילך,\nהגעתי מהאתר דרך עמוד ${currentPath},\nאשמח לקבל פרטים לגבי:\n\n`);

  // עיצובים מותנים לפי Variant
  const isGhost = variant === "ghost";
  
  const containerStyles = isGhost 
    ? "border border-[#FCF6BA]/40 bg-transparent shadow-sm" 
    : "border-[1.5px] border-[#FCF6BA]/60 shadow-[0_12px_25px_rgba(0,0,0,0.4)] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]";

  const textStyles = isGhost ? "text-[#FCF6BA]" : "text-[#402012]";
  const iconFill = isGhost ? "#FCF6BA" : "#402012";

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      
      {/* הכפתור המאוחד: WhatsApp + חיוג */}
      <div className={cn(
        "relative flex items-center rounded-full transition-all duration-500 overflow-hidden",
        containerStyles
      )}>
        
        {/* צד WhatsApp */}
        <a
          href={waHref(phone, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-2.5 px-6 py-3.5 hover:bg-white/10 transition-colors border-l",
            isGhost ? "border-[#FCF6BA]/20" : "border-[#402012]/20"
          )}
        >
          <WhatsAppIcon className="h-5 w-5" style={{ fill: iconFill }} />
          <span className={cn("font-bold tracking-wide", textStyles)}
            style={!isGhost ? { textShadow: "0px 1px 0px rgba(252,246,186,0.8)" } : {}}>
            WhatsApp
          </span>
        </a>

        {/* צד חיוג */}
        <a
          href={telHref(phone)}
          className="flex items-center gap-2.5 px-6 py-3.5 hover:bg-white/10 transition-colors"
        >
          <Phone className="h-4 w-4" style={{ color: iconFill }} strokeWidth={2.5} />
          <span className={cn("font-bold tracking-wide", textStyles)}
            style={!isGhost ? { textShadow: "0px 1px 1px rgba(252,246,186,0.8)" } : {}}>
            חיוג מהיר
          </span>
        </a>
      </div>

      {/* כפתור מייל עדין */}
      <a
        href={`mailto:${email}?subject=${emailSubject}&body=${emailBody}`}
        className="group flex items-center gap-2 text-[#FCF6BA]/70 hover:text-[#FCF6BA] transition-all text-xs tracking-[0.2em] uppercase"
      >
        <Mail className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
        <span className="border-b border-transparent group-hover:border-[#FCF6BA]/50">
          Send Email
        </span>
      </a>

    </div>
  );
}
