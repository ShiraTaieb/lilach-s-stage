import React, { useEffect, useState } from "react";
import { Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { telHref, waHref, PHONE_PRIMARY } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface Props {
  phone?: string;
  email?: string;
  className?: string;
}

export function ContactButtons({ 
  phone = PHONE_PRIMARY, 
  email = "office@lilachtayeb.co.il",
  className 
}: Props) {
  const [currentPath, setCurrentPath] = useState("");

  // זיהוי העמוד הנוכחי לצורך הודעה מובנית חכמה
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const pageName = path === "/" ? "דף הבית" : path.split("/").pop()?.replace(/-/g, " ") || "";
      setCurrentPath(pageName);
    }
  }, []);

  // הגדרת הודעות מובנות
  const whatsappMessage = `היי לילך, הגעתי מהאתר (מעמוד: ${currentPath || 'כללי'}), אשמח לקבל פרטים בנושא: `;
  const emailSubject = encodeURIComponent(`פנייה חדשה מהאתר - ${currentPath || 'כללי'}`);
  const emailBody = encodeURIComponent(`היי לילך,\nהגעתי מהאתר דרך עמוד ${currentPath},\nאשמח לקבל פרטים לגבי:\n\n`);

  return (
    <div className={cn("flex flex-col items-center gap-6 p-4", className)}>
      
      {/* הכפתור המאוחד: WhatsApp + חיוג (זהב פנינה תלת-ממדי) */}
      <div className={cn(
        "relative flex items-center rounded-full transition-all duration-300",
        "border-[1.5px] border-[#FCF6BA]/60 shadow-[0_12px_25px_rgba(0,0,0,0.4)]",
        "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] overflow-hidden"
      )}>
        
        {/* צד א': WhatsApp (אפקט כסוף בולט על רקע זהב) */}
        <a
          href={waHref(phone, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 hover:bg-white/20 transition-colors border-l border-[#402012]/20"
        >
          <WhatsAppIcon className="h-6 w-6 fill-[#402012] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]" />
          <span className="font-bold text-[#402012] tracking-wide"
            style={{ textShadow: "0px 1px 0px rgba(252,246,186,0.8)" }}>
            WhatsApp
          </span>
        </a>

        {/* צד ב': חיוג (אפקט חרוט בברזל) */}
        <a
          href={telHref(phone)}
          className="flex items-center gap-3 px-8 py-4 hover:bg-white/20 transition-colors"
        >
          <Phone className="h-5 w-5 text-[#402012]" strokeWidth={2.5} />
          <span className="font-bold text-[#402012] tracking-wide"
            style={{ textShadow: "0px 1px 1px rgba(252,246,186,0.8), 0px -1px 0px rgba(0,0,0,0.2)" }}>
            חיוג מהיר
          </span>
        </a>
      </div>

      {/* כפתור מייל (מתכת כהה יוקרתית) */}
      <a
        href={`mailto:${email}?subject=${emailSubject}&body=${emailBody}`}
        className="group flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#FCF6BA]/30 hover:border-[#FCF6BA]/80 transition-all bg-black/20"
      >
        <Mail className="h-4 w-4 text-[#FCF6BA] group-hover:scale-110 transition-transform" />
        <span className="text-[#FCF6BA] text-sm font-medium tracking-widest uppercase">
          Send Email
        </span>
      </a>

    </div>
  );
}
