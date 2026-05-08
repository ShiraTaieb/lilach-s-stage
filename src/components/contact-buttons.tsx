import { Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { telHref, waHref, formatPhone, PHONE_PRIMARY } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface Props {
  phone?: string;
  email?: string;
  message?: string;
  variant?: "default" | "compact";
  className?: string;
  showNumber?: boolean;
}

export function ContactButtons({ 
  phone = PHONE_PRIMARY, 
  email = "office@example.com",
  message, 
  variant = "default", 
  className, 
  showNumber = false 
}: Props) {
  
  const sizes = variant === "compact" ? "px-4 py-2 text-sm" : "px-7 py-3.5 text-base";

  return (
    <div className={cn("flex flex-wrap gap-5 p-4", className)}>
      
      {/* כפתור WhatsApp - כסף תלת-ממדי בולט */}
      <a
        href={waHref(phone, message)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative inline-flex items-center gap-2.5 rounded-full font-bold transition-all duration-300",
          "border-[1.5px] border-[#D1D1D1]/50 shadow-[0_0_15px_rgba(168,152,217,0.3),inset_0_1px_2px_rgba(255,255,255,0.6)]",
          "bg-gradient-to-r from-[#2A1045] via-[#A898D9] to-[#1F0835]",
          "hover:scale-105 active:scale-95",
          sizes
        )}
        dir="ltr"
      >
        <WhatsAppIcon className="h-5 w-5 fill-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]" />
        <span className="tracking-wide"
          style={{
            color: "#F2EBDC",
            textShadow: "0px 1px 0px #FFFFFF, 0px -1px 1px rgba(0,0,0,0.6), 0px 2px 4px rgba(0,0,0,0.5)"
          }}
        >
          WhatsApp
        </span>
      </a>

      {/* כפתור התקשרי - זהב חרוט בברזל */}
      <a
        href={telHref(phone)}
        className={cn(
          "relative inline-flex items-center gap-2.5 rounded-full font-bold transition-all duration-300",
          "border-[1.5px] border-[#FCF6BA]/60 shadow-[0_5px_15px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(252,246,186,0.6)]",
          "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]",
          "hover:scale-105 active:scale-95",
          sizes
        )}
        dir="ltr"
      >
        <Phone className="h-5 w-5 text-[#402012] drop-shadow-[0_1px_0px_rgba(252,246,186,0.5)]" strokeWidth={2.5} />
        <span className="tracking-wide"
          style={{
            color: "#402012",
            // אפקט חריטה: צל בהיר למטה (Highlight) וצל כהה למעלה (Depth)
            textShadow: "0px 1px 1px rgba(252,246,186,0.8), 0px -1px 1px rgba(0,0,0,0.4)"
          }}
        >
          {showNumber ? formatPhone(phone) : "התקשרי"}
        </span>
      </a>

      {/* כפתור מייל - כסף מתכתי יוקרתי */}
      <a
        href={`mailto:${email}`}
        className={cn(
          "relative inline-flex items-center gap-2.5 rounded-full font-bold transition-all duration-300",
          "border-[1.5px] border-[#D1D1D1]/40 shadow-[0_0_12px_rgba(255,255,255,0.1)]",
          "bg-gradient-to-r from-[#1a1a1a] via-[#4a4a4a] to-[#000000]",
          "hover:scale-105 active:scale-95",
          sizes
        )}
        dir="ltr"
      >
        <Mail className="h-5 w-5 text-[#F2EBDC] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
        <span className="tracking-wide"
          style={{
            color: "#F2EBDC",
            textShadow: "0px 1px 0px #FFFFFF, 0px -1px 1px rgba(0,0,0,0.6)"
          }}
        >
          E-mail
        </span>
      </a>

    </div>
  );
}
