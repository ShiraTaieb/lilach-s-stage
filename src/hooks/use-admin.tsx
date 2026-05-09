import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const ADMIN_EMAIL = "lilachtaieb@gmail.com";

type AdminContextValue = {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
};

const AdminContext = createContext<AdminContextValue>({
  session: null,
  isAdmin: false,
  loading: true,
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: s }) => {
      setSession(s.session);
      setLoading(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const isAdmin =
    !!session?.user?.email &&
    session.user.email.toLowerCase() === ADMIN_EMAIL;

  return (
    <AdminContext.Provider value={{ session, isAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useIsAdmin() {
  return useContext(AdminContext).isAdmin;
}

export function useAdminContext() {
  return useContext(AdminContext);
}