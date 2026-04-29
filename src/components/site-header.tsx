import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const NAV = [
  { to: "/", label: "בית" },
  { to: "/events", label: "אירועים פרטיים" },
  { to: "/shows", label: "מופעי נשים" },
  { to: "/studio", label: "אולפן הקלטות" },
  { to: "/sound", label: "הגברה" },
  { to: "/playbacks", label: "פלייבקים" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      setHasSession(!!session);
    });
    supabase.auth.getSession().then(({ data: s }) => setHasSession(!!s.session));
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-500",
      scrolled ? "glass shadow-elegant" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="group flex items-center gap-2">
          <span className="font-display text-2xl italic tracking-tight text-gradient-gold md:text-3xl">
            לילך טייב
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                path === item.to ? "text-primary" : "text-foreground/80"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to={hasSession ? "/admin" : "/login"}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
          >
            <LogIn className="h-4 w-4" />
            {hasSession ? "אזור ניהול" : "התחברות"}
          </Link>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="פתח תפריט"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="glass border-t border-border/50 lg:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  path === item.to ? "bg-primary/10 text-primary" : "text-foreground/90 hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={hasSession ? "/admin" : "/login"}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 px-4 py-3 text-sm font-medium text-primary"
            >
              <LogIn className="h-4 w-4" />
              {hasSession ? "אזור ניהול" : "התחברות"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
