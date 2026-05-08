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
    <div className={cn("flex flex-wrap gap-6 p-6", className)}>
      
      {/* כפתור WhatsApp - סגול חציל מתכתי */}
      <a
        href={waHref(phone, message)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative inline-flex items-center gap-3 rounded-full transition-all duration-300 whitespace-nowrap",
          "border-[1.5px] border-white/40 shadow-[0_0_15px_rgba(168,152,217,0.4)]",
          "bg-gradient-to-r from-[#2A1045] via-[#A898D9] to-[#1F0835]",
          "hover:scale-105 active:scale-95",
          sizes
        )}
        dir="ltr"
      >
        <WhatsAppIcon className="h-5 w-5 fill-white drop-shadow-md" />
        <span className="font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          style={{
            backgroundImage: "linear-gradient(to bottom, #FFFFFF, #D1D1D1, #A898D9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block" // מבטיח שהגרדיאנט יחול על הטקסט
          }}
        >
          {showNumber ? formatPhone(phone) : "WhatsApp"}
        </span>
      </a>

      {/* כפתור התקשרי - זהב תלת-מימד */}
      <a
        href={telHref(phone)}
        className={cn(
          "relative inline-flex items-center gap-3 rounded-full transition-all duration-300 whitespace-nowrap",
          "border-[1.5px] border-[#FCF6BA]/60 shadow-[0_0_15px_rgba(191,149,63,0.4)]",
          "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]",
          "hover:scale-105 active:scale-95",
          sizes
        )}
        dir="ltr"
      >
        <Phone className="h-5 w-5 text-[#402012] drop-shadow-sm" strokeWidth={2.5} />
        <span className="font-bold text-[#402012] drop-shadow-[0_1px_2px_rgba(252,246,186,0.5)]"
          style={{
            backgroundImage: "linear-gradient(to bottom, #512D18, #8B6508, #402012)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block"
          }}
        >
          {showNumber ? formatPhone(phone) : "התקשרי"}
        </span>
      </a>

    </div>
  );
}
