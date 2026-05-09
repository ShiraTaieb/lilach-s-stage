import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogIn, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { verifyAdminPin } from "@/lib/admin-pin.functions";
import { ADMIN_EMAIL, useAdminContext } from "@/hooks/use-admin";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "התחברות - לילך טייב" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const verifyPin = useServerFn(verifyAdminPin);
  const { session, isAdmin } = useAdminContext();
  const [step, setStep] = useState<"google" | "pin">(() =>
    typeof window !== "undefined" && sessionStorage.getItem("admin_email_ok") === "1" ? "pin" : "google"
  );
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // After Google OAuth redirect back, validate the email and advance to PIN.
  useEffect(() => {
    if (!session) return;
    const email = session.user.email?.toLowerCase();
    if (email !== ADMIN_EMAIL) {
      supabase.auth.signOut().then(() => {
        toast.error("אין הרשאה לגישה לאזור הניהול");
      });
      sessionStorage.removeItem("admin_email_ok");
      setStep("google");
      return;
    }
    sessionStorage.setItem("admin_email_ok", "1");
    if (sessionStorage.getItem("admin_code_ok") !== "1") {
      setStep("pin");
    }
  }, [session]);

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/admin",
        },
      });
      if (error) {
        toast.error("שגיאה בהתחברות");
      }
    } finally {
      setLoading(false);
    }
  };

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error("יש להתחבר תחילה עם חשבון Google המורשה");
      setStep("google");
      return;
    }
    setLoading(true);
    try {
      const res = await verifyPin({ data: { pin: code } });
      if (res.ok) {
        sessionStorage.setItem("admin_code_ok", "1");
        toast.success("ברוכה הבאה לאזור הניהול");
        navigate({ to: "/admin" });
      } else {
        toast.error("קוד שגוי");
      }
    } catch {
      toast.error("שגיאה באימות");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="bg-gradient-card w-full max-w-md rounded-3xl border border-primary/20 p-8 shadow-elegant">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {step === "google" ? <LogIn className="h-6 w-6" /> : <KeyRound className="h-6 w-6" />}
          </div>
          <h1 className="font-display text-3xl italic text-gradient-gold">
            {step === "google" ? "כניסה לניהול" : "אימות אבטחה"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {step === "google" ? "התחברי עם חשבון Google של לילך" : "הזיני את הקוד הסודי כדי להמשיך"}
          </p>
        </div>

        {step === "google" ? (
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-background py-3 font-semibold text-foreground transition hover:border-primary disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            {loading ? "..." : "התחברי עם Google"}
          </button>
        ) : (
          <form onSubmit={submitCode} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted-foreground">קוד בן 4 ספרות</span>
              <input type="text" required pattern="[0-9]{4}" maxLength={4} value={code} onChange={(e) => setCode(e.target.value)} dir="ltr" className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-center font-display text-2xl tracking-[0.5em] outline-none focus:border-primary" />
            </label>
            <button type="submit" disabled={loading} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
              אשרי כניסה
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">חזרה לאתר</Link>
        </div>
      </div>
    </div>
  );
}
