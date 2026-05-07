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
    <div className={cn("flex flex-wrap gap-6 p-6 bg-black/5 rounded-xl", className)}>
      
      {/* כפתור WhatsApp - סגול חציל-פנינה-סגול (קריא ויוקרתי) */}
      <a
        href={waHref(phone, message)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative inline-flex items-center gap-3 rounded-full transition-all duration-300 whitespace-nowrap",
          // מסגרת מתכתית כסופה מבריקה (מסביב לכפתור)
          "border-[1.5px] border-[#D1D1D1]/60 shadow-[0_0_8px_rgba(255,255,255,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)]",
          // גרדיאנט כפתור: סגול חציל עמוק -> שילוב פנינה בהיר (התבנית ששלחת) -> סגול עמוק
          "bg-gradient-to-r from-[#2A1045] via-[#A898D9] to-[#1F0835]",
          // הילה סגולה מסביב לכפתור (Glow)
          "shadow-[0_0_20px_10px_rgba(42,16,69,0.3)]",
          // צבע טקסט בסיס (לגיבוי) ואפקט מתכתי תלת-ממדי
          "text-[#F2EBDC] overflow-hidden",
          "hover:scale-105 active:scale-95",
          sizes
        )}
        dir="ltr"
      >
        {/* אייקון WhatsApp - מתכתי תלת-ממדי כסוף */}
        <WhatsAppIcon className="h-5 w-5 fill-white drop-shadow-[0_0_3px_rgba(255,255,255,0.7),inset_0_1px_1px_rgba(0,0,0,0.5)]" />
        
        {/* טקסט WhatsApp - מתכתי תלת-ממדי כסוף (שילוב כסוף בוהק מהפנינה) */}
        <span className="font-bold font-metallic-silver"
          style={{
            background: "linear-gradient(to b, #A898D9, #F2EBDC, #2A1045)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0px 1px 0px rgba(255,255,255,1)) drop-shadow(0px 2px 3px rgba(0,0,0,0.5))"
          }}
        >
          {showNumber ? formatPhone(phone) : "WhatsApp"}
        </span>
      </a>

      {/* כפתור התקשרי - זהב-פנינה-זהב (תלת-ממדי) */}
      <a
        href={telHref(phone)}
        className={cn(
          "relative inline-flex items-center gap-3 rounded-full transition-all duration-300 whitespace-nowrap",
          // מסגרת מתכתית זהב מבריקה (מסביב לכפתור)
          "border-[1.5px] border-[#FCF6BA]/60 shadow-[0_0_8px_rgba(252,246,186,0.4),inset_0_1px_2px_rgba(252,246,186,0.5)]",
          // גרדיאנט כפתור: זהב עמוק -> שילוב פנינה בהיר (התבנית ששלחת) -> זהב עמוק
          "bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]",
          // הילה זהב מסביב לכפתור (Glow)
          "shadow-[0_0_20px_10px_rgba(191,149,63,0.3)]",
          // צבע טקסט בסיס (לגיבוי) ואפקט מתכתי תלת-ממדי
          "text-[#402012] overflow-hidden",
          "hover:scale-105 active:scale-95",
          sizes
        )}
        dir="ltr"
      >
        {/* אייקון Phone - מתכתי תלת-ממדי זהב */}
        <Phone className="h-5 w-5 drop-shadow-[0_0_3px_rgba(252,246,186,0.7),inset_0_1px_1px_rgba(0,0,0,0.5)] text-[#FCF6BA]" strokeWidth={2.5} />
        
        {/* טקסט התקשרי - מתכתי תלת-ממדי זהב (שילוב זהב בוהק מהפנינה) */}
        <span className="font-bold"
          style={{
            background: "linear-gradient(to b, #BF953F, #FCF6BA, #402012)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0px 1px 0px rgba(252,246,186,1)) drop-shadow(0px 2px 3px rgba(0,0,0,0.5))"
          }}
        >
          {showNumber ? formatPhone(phone) : "התקשרי"}
        </span>
      </a>

    </div>
  );
}
