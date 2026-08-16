import { ArrowLeft, Check, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { BrandMark, Button } from "./components/Ui";
import { authClient, labels } from "./lib/platform";
import "./auth.css";
import "./styles.css";

type FieldProps = {
  autoComplete?: string;
  icon: ReactNode;
  label: string;
  name: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
};

function Field({ icon, label, name, onChange, type = "text", ...props }: FieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && visible ? "text" : type;
  const inputId = `auth-${name}`;

  return (
    <div className="field">
      <label className="field__label" htmlFor={inputId}>{label}</label>
      <span className="field__control">
        <span className="field__icon" aria-hidden="true">{icon}</span>
        <input
          id={inputId}
          name={name}
          type={inputType}
          onChange={(event) => onChange?.(event.target.value)}
          {...props}
        />
        {isPassword && (
          <button
            className="field__reveal"
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            title={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible((current) => !current)}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </span>
    </div>
  );
}

function AuthFrame({ children }: { children: ReactNode }) {
  return (
    <main className="auth-page">
      <section className="auth-visual" aria-label="Anantah identity">
        <div className="auth-visual__shade" />
        <Link className="auth-visual__brand" to="/">
          <BrandMark />
        </Link>
        <blockquote>
          <p>“The horizon is not a boundary. It is an invitation.”</p>
          <footer>Anantah / Infinite possibility</footer>
        </blockquote>
      </section>
      <section className="auth-content">
        <Link className="auth-content__mobile-brand" to="/" aria-label="Go to Anantah home">
          <BrandMark />
        </Link>
        <div className="auth-content__inner">{children}</div>
        <p className="auth-content__legal">© 2026 Anantah · Privacy · Terms</p>
      </section>
    </main>
  );
}

function FormHeading({ description, eyebrow, title }: { description: string; eyebrow: string; title: string }) {
  return (
    <header className="form-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

function LoginPage({ onAuthenticated }: { onAuthenticated?: () => void }) {
  const copy = labels.auth.login;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const data = new FormData(event.currentTarget);

    try {
      await authClient.login({
        email: String(data.get("email")),
        password: String(data.get("password")),
        rememberMe: data.get("rememberMe") === "on",
      });
      window.dispatchEvent(new CustomEvent("anantah:auth-change"));
      if (onAuthenticated) {
        onAuthenticated();
      } else {
        navigate("/");
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthFrame>
      <FormHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <form className="auth-form" onSubmit={submit}>
        <Field
          autoComplete="email"
          icon={<Mail size={18} />}
          label={labels.auth.common.email}
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
        <Field
          autoComplete="current-password"
          icon={<LockKeyhole size={18} />}
          label={labels.auth.common.password}
          name="password"
          placeholder="Enter your password"
          required
          type="password"
        />
        <div className="form-options">
          <label className="check-control">
            <input name="rememberMe" type="checkbox" />
            <span>{copy.rememberMe}</span>
          </label>
          <Link to="../forgot-password">{copy.forgotPassword}</Link>
        </div>
        {error && <p className="form-message form-message--error" role="alert">{error}</p>}
        <Button busy={busy} type="submit">{copy.submit}</Button>
      </form>
      <aside className="demo-note">
        <span>{copy.demoLabel}</span>
        <code>hello@anantah.dev</code>
        <code>anantah123</code>
      </aside>
      <p className="auth-switch">{copy.noAccount} <Link to="../signup">{copy.createAccount}</Link></p>
    </AuthFrame>
  );
}

function SignUpPage({ onAuthenticated }: { onAuthenticated?: () => void }) {
  const copy = labels.auth.signUp;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password") !== data.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);
    setError("");
    try {
      await authClient.signUp({
        displayName: String(data.get("displayName")),
        email: String(data.get("email")),
        password: String(data.get("password")),
      });
      window.dispatchEvent(new CustomEvent("anantah:auth-change"));
      if (onAuthenticated) {
        onAuthenticated();
      } else {
        navigate("/");
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to create your account.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthFrame>
      <FormHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <form className="auth-form" onSubmit={submit}>
        <Field autoComplete="name" icon={<UserRound size={18} />} label={copy.name} name="displayName" placeholder="Your name" required />
        <Field autoComplete="email" icon={<Mail size={18} />} label={labels.auth.common.email} name="email" placeholder="you@example.com" required type="email" />
        <div className="field-pair">
          <Field autoComplete="new-password" icon={<LockKeyhole size={18} />} label={labels.auth.common.password} name="password" placeholder="8+ characters" required type="password" />
          <Field autoComplete="new-password" icon={<LockKeyhole size={18} />} label={copy.confirmPassword} name="confirmPassword" placeholder="Repeat password" required type="password" />
        </div>
        <label className="check-control check-control--terms">
          <input name="terms" type="checkbox" required />
          <span>{copy.terms}</span>
        </label>
        {error && <p className="form-message form-message--error" role="alert">{error}</p>}
        <Button busy={busy} type="submit">{copy.submit}</Button>
      </form>
      <p className="auth-switch">{copy.hasAccount} <Link to="../login">{copy.signIn}</Link></p>
    </AuthFrame>
  );
}

function ForgotPasswordPage() {
  const copy = labels.auth.forgot;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await authClient.forgotPassword(email);
      setSent(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to send a reset link.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthFrame>
      {sent ? (
        <div className="success-state">
          <span className="success-state__icon"><Check size={30} /></span>
          <h1>{copy.successTitle}</h1>
          <p>{copy.successBody}</p>
          <Link className="back-link" to="../login"><ArrowLeft size={17} />{labels.auth.common.backToLogin}</Link>
        </div>
      ) : (
        <>
          <FormHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
          <form className="auth-form" onSubmit={submit}>
            <Field autoComplete="email" icon={<Mail size={18} />} label={labels.auth.common.email} name="email" onChange={setEmail} placeholder="you@example.com" required type="email" />
            {error && <p className="form-message form-message--error" role="alert">{error}</p>}
            <Button busy={busy} type="submit">{copy.submit}</Button>
          </form>
          <Link className="back-link" to="../login"><ArrowLeft size={17} />{labels.auth.common.backToLogin}</Link>
        </>
      )}
    </AuthFrame>
  );
}

export default function AuthApp({ onAuthenticated }: { onAuthenticated?: () => void }) {
  return (
    <Routes>
      <Route path="login" element={<LoginPage onAuthenticated={onAuthenticated} />} />
      <Route path="signup" element={<SignUpPage onAuthenticated={onAuthenticated} />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
}