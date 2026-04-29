import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          <h1 className="text-8xl font-bold text-gradient-gold">404</h1>
          <h2 className="mt-4 text-2xl font-semibold">העמוד לא נמצא</h2>
          <p className="mt-2 text-sm text-muted-foreground">העמוד שחיפשת לא קיים או הועבר.</p>
          <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">חזרה לעמוד הבית</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "לילך טייב - זמרת לנשים | הופעות, אירועים ומופעים" },
      { name: "description", content: "לילך טייב - זמרת לנשים מקצועית. הופעות לאירועים פרטיים, בת מצווה, הפרשת חלה, ערב כלה, מופעי נשים, אולפן הקלטות והשכרת ציוד הגברה." },
      { name: "author", content: "לילך טייב" },
      { property: "og:title", content: "לילך טייב - זמרת לנשים" },
      { property: "og:description", content: "הופעות מקצועיות לאירועי נשים, הפקות מוסיקליות והשכרת ציוד" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "לילך טייב - זמרת לנשים" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster richColors position="top-center" />
    </div>
  );
}
