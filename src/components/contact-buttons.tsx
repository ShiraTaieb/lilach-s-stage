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
  
  const sizes = variant === "compact" ? "px-4 py-2 text-sm" : "px-6 py-3 text-sm";

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {/* כפתור התקשרי - גרדיאנט זהב יוקרתי */}
      <a
        href={telHref(phone)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full font-bold transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_15px_rgba(191,149,63,0.4)] whitespace-nowrap",
          "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#512D18]",
          sizes
        )}
        dir="ltr"
      >
        <Phone className="h-4 w-4" strokeWidth={2.5} />
        <span>{showNumber ? formatPhone(phone) : "התקשרי"}</span>
      </a>

      {/* כפתור WhatsApp - גרדיאנט סגול-פנינה כסוף (קריא ויוקרתי) */}
      <a
        href={waHref(phone, message)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2 rounded-full font-bold transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_15px_rgba(168,152,217,0.3)] whitespace-nowrap",
          "bg-gradient-to-r from-[#2A1045] via-[#A898D9] to-[#1F0835] text-white",
          sizes
        )}
        dir="ltr"
      >
        <WhatsAppIcon className="h-4 w-4 text-white" />
        <span>{showNumber ? formatPhone(phone) : "WhatsApp"}</span>
      </a>
    </div>
  );
}
