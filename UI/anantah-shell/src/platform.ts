export type AuthSession = {
  accessToken: string;
  expiresAt: string;
  user: {
    id: string;
    email: string;
    displayName: string;
    roles: string[];
  };
};

const sessionKey = "anantah.auth.session";

function parseSession(value: string | null): AuthSession | null {
  if (!value) return null;

  try {
    const session = JSON.parse(value) as Partial<AuthSession>;
    if (
      typeof session.accessToken !== "string"
      || typeof session.expiresAt !== "string"
      || Date.parse(session.expiresAt) <= Date.now()
      || !session.user
      || typeof session.user.id !== "string"
      || typeof session.user.email !== "string"
      || typeof session.user.displayName !== "string"
      || !Array.isArray(session.user.roles)
    ) {
      window.localStorage.removeItem(sessionKey);
      return null;
    }

    return session as AuthSession;
  } catch {
    window.localStorage.removeItem(sessionKey);
    return null;
  }
}

export const authClient = {
  getSession(): AuthSession | null {
    return parseSession(window.localStorage.getItem(sessionKey));
  },
  async logout() {
    window.localStorage.removeItem(sessionKey);
  },
};

export const labels = {
  navigation: {
    home: "Home",
    fashion: "Fashion",
    intelligence: "Intelligence",
    play: "Play",
    signIn: "Sign in",
  },
} as const;