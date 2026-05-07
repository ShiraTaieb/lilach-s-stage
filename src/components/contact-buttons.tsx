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

export function ContactButtons({ phone = PHONE_PRIMARY, message, variant = "default", className, showNumber = false }: Props) {
  const sizes = variant === "compact" ? "px-4 py-2 text-sm" : "px-6 py-3 text-sm";
  return (
  <div className={cn("flex flex-wrap gap-3", className)}>
    {/* כפתור התקשרי - זהב יוקרתי */}
    <a
      href={telHref(phone)}
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-bold transition hover:opacity-90 hover:shadow-glow whitespace-nowrap",
        "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#512D18]", // שינוי הצבע כאן
        sizes
      )}
      dir="ltr"
    >
      <Phone className="h-4 w-4" strokeWidth={2.5} />
      <span>{showNumber ? formatPhone(phone) : "התקשרי"}</span>
    </a>

    {/* כפתור וואטסאפ - ברונזה/פנינה עמוק */}
    <a
      href={waHref(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-bold transition hover:opacity-90 whitespace-nowrap",
        "bg-gradient-to-r from-[#512D18] via-[#F2EBDC] to-[#402012] text-[#F2EBDC]", // שינוי הצבע כאן
        sizes
      )}
      dir="ltr"
    >
      <WhatsAppIcon className="h-4 w-4" />
      <span>{showNumber ? formatPhone(phone) : "WhatsApp"}</span>
    </a>
  </div>
);
}
