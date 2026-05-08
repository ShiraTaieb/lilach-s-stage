import { Phone, Mail, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { telHref, waHref, PHONE_PRIMARY } from "@/lib/contact";
import { cn } from "@/lib/utils";

export function UnifiedContactButton({ phone = PHONE_PRIMARY, email = "office@example.com" }) {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      
      {/* כפתור מאוחד: וואטסאפ וחיוג */}
      <div className={cn(
        "relative flex items-center rounded-full transition-all duration-300 overflow-hidden",
        "border-[1.5px] border-[#FCF6BA]/60 shadow-[0_10px_20px_rgba(0,0,0,0.4)]",
        "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]"
      )}>
        
        {/* צד א': וואטסאפ */}
        <a
          href={waHref(phone, "היי, אשמח לקבל פרטים נוספים...")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-4 hover:bg-white/10 transition-colors border-l border-[#402012]/20"
        >
          <WhatsAppIcon className="h-6 w-6 fill-[#402012] drop-shadow-sm" />
          <span className="font-bold text-[#402012] text-shadow-sm">הודעה</span>
        </a>

        {/* צד ב': חיוג מהיר */}
        <a
          href={telHref(phone)}
          className="flex items-center gap-2 px-6 py-4 hover:bg-white/10 transition-colors"
        >
          <Phone className="h-5 w-5 text-[#402012]" strokeWidth={2.5} />
          <span className="font-bold text-[#402012]">חיוג</span>
        </a>
      </div>

      {/* כפתור מייל עדין וקטן יותר מתחת */}
      <a
        href={`mailto:${email}`}
        className="flex items-center gap-2 text-[#FCF6BA]/80 hover:text-[#FCF6BA] transition-colors text-sm font-medium"
      >
        <Mail className="h-4 w-4" />
        <span className="underline underline-offset-4">או שלחי לנו מייל</span>
      </a>
    </div>
  );
}
