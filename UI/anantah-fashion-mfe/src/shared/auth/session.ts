export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  roles: string[];
};

export type AuthSession = {
  accessToken: string;
  expiresAt: string;
  user: AuthUser;
};

export const authChangeEvent = "anantah:auth-change";
export const authSessionKey = "anantah.auth.session";

function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== "object") return false;

  const session = value as Partial<AuthSession>;
  const user = session.user as Partial<AuthUser> | undefined;
  return typeof session.accessToken === "string"
    && typeof session.expiresAt === "string"
    && Number.isFinite(Date.parse(session.expiresAt))
    && !!user
    && typeof user.id === "string"
    && typeof user.email === "string"
    && typeof user.displayName === "string"
    && Array.isArray(user.roles)
    && user.roles.every((role) => typeof role === "string");
}

export function getStoredSession(): AuthSession | null {
  try {
    const value = window.localStorage.getItem(authSessionKey);
    if (!value) return null;

    const session: unknown = JSON.parse(value);
    if (!isAuthSession(session) || Date.parse(session.expiresAt) <= Date.now()) {
      window.localStorage.removeItem(authSessionKey);
      return null;
    }

    return session;
  } catch {
    window.localStorage.removeItem(authSessionKey);
    return null;
  }
}

export function getBearerToken(): string | null {
  const token = getStoredSession()?.accessToken;
  return token && !token.startsWith("demo_") ? token : null;
}

export function clearStoredSession() {
  window.localStorage.removeItem(authSessionKey);
  window.dispatchEvent(new CustomEvent(authChangeEvent));
}