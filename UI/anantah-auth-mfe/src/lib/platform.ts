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

export type LoginInput = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignUpInput = {
  displayName: string;
  email: string;
  password: string;
};

export interface AuthClient {
  forgotPassword(email: string): Promise<void>;
  getSession(): AuthSession | null;
  login(input: LoginInput): Promise<AuthSession>;
  logout(): Promise<void>;
  signUp(input: SignUpInput): Promise<AuthSession>;
}

const sessionKey = "anantah.auth.session";
const wait = (duration = 650) => new Promise<void>((resolve) => window.setTimeout(resolve, duration));

const createSession = (email: string, displayName: string): AuthSession => ({
  accessToken: `demo_${crypto.randomUUID()}`,
  expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  user: {
    id: crypto.randomUUID(),
    email,
    displayName,
    roles: ["member"],
  },
});

class MockAuthClient implements AuthClient {
  async forgotPassword(email: string) {
    await wait();
    if (!email.includes("@")) {
      throw new Error("Enter a valid email address.");
    }
  }

  getSession() {
    const value = window.localStorage.getItem(sessionKey);
    return value ? (JSON.parse(value) as AuthSession) : null;
  }

  async login(input: LoginInput) {
    await wait();
    if (input.email !== "hello@anantah.dev" || input.password !== "anantah123") {
      throw new Error("Email or password is incorrect. Try the demo account below.");
    }

    const session = createSession(input.email, "Anantah Member");
    window.localStorage.setItem(sessionKey, JSON.stringify(session));
    return session;
  }

  async logout() {
    await wait(250);
    window.localStorage.removeItem(sessionKey);
  }

  async signUp(input: SignUpInput) {
    await wait();
    const session = createSession(input.email, input.displayName);
    window.localStorage.setItem(sessionKey, JSON.stringify(session));
    return session;
  }
}

export const authClient: AuthClient = new MockAuthClient();

export const labels = {
  auth: {
    common: {
      email: "Email address",
      password: "Password",
      continue: "Continue",
      backToLogin: "Back to sign in",
    },
    login: {
      eyebrow: "Welcome back",
      title: "Step into your world.",
      description: "Use one Anantah identity across every product and experience.",
      rememberMe: "Keep me signed in",
      forgotPassword: "Forgot password?",
      submit: "Sign in",
      noAccount: "New to Anantah?",
      createAccount: "Create an account",
      demoLabel: "Demo access",
    },
    signUp: {
      eyebrow: "Your journey starts here",
      title: "Create your Anantah ID.",
      description: "A single account for everything we build next.",
      name: "Full name",
      confirmPassword: "Confirm password",
      terms: "I agree to the Terms and Privacy Policy",
      submit: "Create account",
      hasAccount: "Already have an account?",
      signIn: "Sign in",
    },
    forgot: {
      eyebrow: "Account recovery",
      title: "Find your way back.",
      description: "Enter your account email and we will send a secure reset link.",
      submit: "Send reset link",
      successTitle: "Check your inbox",
      successBody: "A password reset link is on its way. In this demo, no email is actually sent.",
    },
  },
} as const;