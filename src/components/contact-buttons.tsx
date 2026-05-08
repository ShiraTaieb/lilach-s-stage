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
    <div className={cn("flex flex-wrap gap-6 p-4", className)}>
      
      {/* כפתור WhatsApp - "יציקת" סגול-כסוף מבריקה (אפקט בולט) */}
      <a
        href={waHref(phone, message)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative inline-flex items-center gap-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap",
          // מסגרת מתכתית מבריקה מסביב לכפתור
          "border-[1.5px] border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)]",
          // גרדיאנט כפתור (סגול עמוק-כסוף לילך)
          "bg-gradient-to-r from-[#2A1045] via-[#A898D9] to-[#1F0835]",
          // צבע טקסט בסיס (כסוף בוהק) ואפקט בולט
          "text-[#F2EBDC] overflow-hidden",
          "hover:scale-105 active:scale-95",
          sizes
        )}
        dir="ltr"
      >
        {/* אייקון WhatsApp עם סימן הטלפון בפנים - כסוף תלת-ממדי */}
        <WhatsAppIcon className="h-5 w-5 fill-[#F2EBDC] drop-shadow-[0_0_3px_rgba(255,255,255,0.8),inset_0_1px_1px_rgba(0,0,0,0.5)]" />
        
        {/* טקסט WhatsApp - אפקט מתכתי בולט (תלת-ממדי) */}
        <span className="font-bold"
          style={{
            backgroundImage: "linear-gradient(to bottom, #FFFFFF, #D1D1D1, #A898D9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            // אפקט עומק (בולט) - drop-shadow כסוף בוהק
            filter: "drop-shadow(0px 1px 1px rgba(255,255,255,1)) drop-shadow(0px 2px 3px rgba(0,0,0,0.5))"
          }}
        >
          {showNumber ? formatPhone(phone) : "WhatsApp"}
        </span>
      </a>

      {/* כפתור התקשרי - "יציקת" זהב מבריקה (אפקט חרוט) */}
      <a
        href={telHref(phone)}
        className={cn(
          "relative inline-flex items-center gap-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap",
          // מסגרת מתכתית זהב מבריקה מסביב לכפתור
          "border-[1.5px] border-[#FCF6BA]/60 shadow-[0_0_15px_rgba(252,246,186,0.4),inset_0_1px_2px_rgba(252,246,186,0.5)]",
          // גרדיאנט כפתור (זהב עמוק)
          "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]",
          // צבע טקסט בסיס (חום עמוק) ואפקט חרוט
          "text-[#402012] overflow-hidden",
          "hover:scale-105 active:scale-95",
          sizes
        )}
        dir="ltr"
      >
        {/* אייקון Phone - זהב תלת-ממדי */}
        <Phone className="h-5 w-5 text-[#FCF6BA] drop-shadow-[0_0_3px_rgba(252,246,186,0.7),inset_0_1px_1px_rgba(0,0,0,0.5)]" strokeWidth={2.5} />
        
        {/* טקסט התקשרי - אפקט חרוט עמוק (Bevel) */}
        <span className="font-bold"
          style={{
            backgroundImage: "linear-gradient(to bottom, #BF953F, #FCF6BA, #402012)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            // אפקט חריטה (חתוך) - drop-shadow כהה פנימי
            filter: "drop-shadow(0px 1px 0px rgba(0,0,0,0.3))"
          }}
        >
          {showNumber ? formatPhone(phone) : "התקשרי"}
        </span>
      </a>

    </div>
  );
}
