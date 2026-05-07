import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { telHref, waHref, formatPhone, PHONE_PRIMARY } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface Props {
  phone?: string;
  message?: string;
  variant?: "default" | "compact";
  className?: string;
  showNumber?: boolean;
}

export function ContactButtons({ 
  phone = PHONE_PRIMARY, 
  message, 
  variant = "default", 
  className, 
  showNumber = false 
}: Props) {
  
  const sizes = variant === "compact" ? "px-4 py-2 text-sm" : "px-8 py-3.5 text-base";

  return (
    <div className={cn("flex flex-wrap gap-5", className)}>
      {/* כפתור התקשרי - זהב יוקרתי תלת-ממדי */}
      <a
        href={telHref(phone)}
        className={cn(
          "inline-flex items-center gap-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap",
          "border-[1.5px] border-[#FCF6BA]/50", // מסגרת עדינה ובהירה
          "bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#B38728]", // גרדיאנט מלמעלה למטה לעומק
          "text-[#402012] shadow-[0_4px_15px_rgba(191,149,63,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)]", // צל חיצוני ופנימי
          "hover:scale-105 hover:shadow-[0_6px_20px_rgba(191,149,63,0.6)]",
          sizes
        )}
        dir="ltr"
      >
        <Phone className="h-5 w-5 drop-shadow-sm" strokeWidth={2.5} />
        <span className="drop-shadow-sm">{showNumber ? formatPhone(phone) : "התקשרי"}</span>
      </a>

      {/* כפתור WhatsApp - סגול כסוף תלת-ממדי */}
      <a
        href={waHref(phone, message)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap",
          "border-[1.5px] border-[#A898D9]/50", // מסגרת סגולה בהירה
          "bg-gradient-to-b from-[#2A1045] via-[#A898D9] to-[#1F0835]", // גרדיאנט מתכתי
          "text-white shadow-[0_4px_15px_rgba(168,152,217,0.3),inset_0_2px_4px_rgba(255,255,255,0.2)]", // הילה סגולה וברק פנימי
          "hover:scale-105 hover:shadow-[0_6px_20px_rgba(168,152,217,0.5)]",
          sizes
        )}
        dir="ltr"
      >
        <WhatsAppIcon className="h-5 w-5 drop-shadow-sm fill-white" />
        <span className="drop-shadow-sm">{showNumber ? formatPhone(phone) : "WhatsApp"}</span>
      </a>
    </div>
  );
}
