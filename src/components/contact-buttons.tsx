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
      <a
        href={telHref(phone)}
        className={cn("inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold transition hover:opacity-90 hover:shadow-glow whitespace-nowrap", sizes)}
        dir="ltr"
      >
        <Phone className="h-4 w-4" strokeWidth={2.5} />
        <span>{showNumber ? formatPhone(phone) : "התקשרי"}</span>
      </a>
      <a
        href={waHref(phone, message)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp)] text-white font-semibold transition hover:opacity-90 whitespace-nowrap", sizes)}
        dir="ltr"
      >
        <WhatsAppIcon className="h-4 w-4" />
        <span>{showNumber ? formatPhone(phone) : "WhatsApp"}</span>
      </a>
    </div>
  );
}
