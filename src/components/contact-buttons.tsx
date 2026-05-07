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
  
  const sizes = variant === "compact" ? "px-5 py-2" : "px-8 py-3.5";

  return (
    <div className={cn("flex flex-wrap gap-6 p-4 bg-black/10 rounded-xl", className)}>
      
      {/* כפתור התקשרי - זהב יוקרתי (טקסט ומסגרת זהב) */}
      <a
        href={telHref(phone)}
        className={cn(
          "relative inline-flex items-center gap-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap",
          "border-[1.5px] border-[#FCF6BA]/60", // מסגרת זהב בהיר מבריקה
          "bg-gradient-to-b from-[#C5A028] via-[#F2EBDC] to-[#8B6508]", // גרדיאנט כפתור זהב
          "text-[#402012] shadow-[0_10px_20px_rgba(0,0,0,0.4),inset_0_2px_3px_rgba(255,255,255,0.7)]",
          "hover:scale-105 active:scale-95",
          sizes
        )}
        dir="ltr"
      >
        {/* אייקון וטקסט עם צל שנותן להם מראה חרוט בזהב */}
        <Phone className="h-5 w-5 drop-shadow-[0_1px_1px_rgba(252,246,186,1)]" strokeWidth={2.5} />
        <span className="drop-shadow-[0_1px_1px_rgba(252,246,186,0.8)]">
          {showNumber ? formatPhone(phone) : "התקשרי"}
        </span>
      </a>

      {/* כפתור WhatsApp - כסף/סגול (טקסט ומסגרת כסף) */}
      <a
        href={waHref(phone, message)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative inline-flex items-center gap-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap",
          "border-[1.5px] border-[#D1D1D1]/60", // מסגרת כסופה מבריקה
          "bg-gradient-to-b from-[#4A1D75] via-[#A898D9] to-[#1A052D]", // גרדיאנט סגול-כסוף
          "text-[#F2EBDC] shadow-[0_0_25px_rgba(168,152,217,0.4),inset_0_3px_5px_rgba(255,255,255,0.4)]",
          "hover:scale-105 active:scale-95",
          sizes
        )}
        dir="ltr"
      >
        {/* אייקון וטקסט עם צל כסוף בוהק (כמו בתמונה) */}
        <WhatsAppIcon className="h-5 w-5 fill-[#F2EBDC] drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
        <span className="drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]">
          {showNumber ? formatPhone(phone) : "WhatsApp"}
        </span>
      </a>

    </div>
  );
}
