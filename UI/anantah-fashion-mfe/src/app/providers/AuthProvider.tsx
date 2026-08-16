import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import {
  authChangeEvent,
  authSessionKey,
  clearStoredSession,
  getStoredSession,
  type AuthSession,
} from "../../shared/auth/session";

type AuthContextValue = {
  session: AuthSession | null;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => getStoredSession());

  useEffect(() => {
    const refreshSession = () => setSession(getStoredSession());
    const refreshStoredSession = (event: StorageEvent) => {
      if (event.key === authSessionKey || event.key === null) refreshSession();
    };

    window.addEventListener(authChangeEvent, refreshSession);
    window.addEventListener("storage", refreshStoredSession);
    return () => {
      window.removeEventListener(authChangeEvent, refreshSession);
      window.removeEventListener("storage", refreshStoredSession);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, signOut: clearStoredSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider.");
  return context;
}