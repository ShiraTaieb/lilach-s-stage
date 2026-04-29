import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, Mail, Lock, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "התחברות - לילך טייב" }] }),
  component: LoginPage,
});

const ADMIN_EMAIL = "lilachtaieb@gmail.com";
const ADMIN_CODE = "1234";

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [step, setStep] = useState<"auth" | "code">("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/login" },
        });
        if (error) throw error;
        toast.success("נרשמת בהצלחה! התחברי כעת.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (email.toLowerCase() === ADMIN_EMAIL) {
          setStep("code");
          toast.success("התחברת. נא להזין קוד אבטחה.");
        } else {
          toast.success("התחברת בהצלחה");
          navigate({ to: "/" });
        }
      }
    } catch (err: any) {
      toast.error(err.message ?? "אירעה שגיאה");
    } finally {
      setLoading(false);
    }
  };

  const submitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      sessionStorage.setItem("admin_code_ok", "1");
      toast.success("ברוכה הבאה לאזור הניהול");
      navigate({ to: "/admin" });
    } else {
      toast.error("קוד שגוי");
    }
  };

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="bg-gradient-card w-full max-w-md rounded-3xl border border-primary/20 p-8 shadow-elegant">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {step === "auth" ? <LogIn className="h-6 w-6" /> : <KeyRound className="h-6 w-6" />}
          </div>
          <h1 className="font-display text-3xl italic text-gradient-gold">
            {step === "code" ? "אימות אבטחה" : mode === "login" ? "התחברות" : "הרשמה"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {step === "code" ? "הזיני את הקוד הסודי כדי להמשיך" : "אזור אישי לניהול האתר"}
          </p>
        </div>

        {step === "auth" ? (
          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-sm text-muted-foreground"><Mail className="h-4 w-4" /> אימייל</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" className="w-full rounded-xl border border-input bg-background/60 px-4 py-2.5 outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-sm text-muted-foreground"><Lock className="h-4 w-4" /> סיסמה</span>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} dir="ltr" className="w-full rounded-xl border border-input bg-background/60 px-4 py-2.5 outline-none focus:border-primary" />
            </label>
            <button type="submit" disabled={loading} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
              {loading ? "..." : mode === "login" ? "התחברי" : "הרשמי"}
            </button>
            <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="w-full text-sm text-muted-foreground hover:text-primary">
              {mode === "login" ? "אין לך חשבון? להרשמה" : "כבר יש לך חשבון? להתחברות"}
            </button>
          </form>
        ) : (
          <form onSubmit={submitCode} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted-foreground">קוד בן 4 ספרות</span>
              <input type="text" required pattern="[0-9]{4}" maxLength={4} value={code} onChange={(e) => setCode(e.target.value)} dir="ltr" className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-center font-display text-2xl tracking-[0.5em] outline-none focus:border-primary" />
            </label>
            <button type="submit" className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90">
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
