import { Link } from "@tanstack/react-router";
import { ContactButtons } from "./contact-buttons";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-card/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-gradient-gold mb-3 font-display text-2xl italic">לילך טייב</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              זמרת לנשים | הופעות חיות, מופעי נשים, אולפן הקלטות והשכרת ציוד הגברה מקצועי.
            </p>
          </div>
          
          <div>
            <h4 className="mb-3 font-semibold text-primary">ניווט</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li><Link to="/events" className="hover:text-primary">אירועים פרטיים</Link></li>
              <li><Link to="/shows" className="hover:text-primary">מופעי נשים</Link></li>
              <li><Link to="/studio" className="hover:text-primary">אולפן הקלטות</Link></li>
              <li><Link to="/sound" className="hover:text-primary">השכרת הגברה</Link></li>
              <li><Link to="/playbacks" className="hover:text-primary">פלייבקים</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-primary">יצירת קשר</h4>
            <p className="mb-6 text-sm text-muted-foreground">
              לכל שאלה, בקשה או הזמנה - אני כאן בשבילך, מוזמנת ליצור קשר בכל אמצעי שנוח לך.
            </p>
            {/* שימוש בגרסה המפוארת והמאוחדת לסיום חוויית המשתמש */}
            <ContactButtons variant="solid" className="items-start" />
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          <p>לילך טייב - זמרת לנשים | כל הזכויות שמורות © {new Date().getFullYear()}</p>
          <p className="mt-2">
            האתר עוצב ופותח ע״י שירה טייב |{" "}
            <a href="mailto:shirataieb26@gmail.com" className="text-primary hover:underline">
              shirataieb26@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
