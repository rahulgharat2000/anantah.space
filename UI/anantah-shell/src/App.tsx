import { ArrowRight, LogOut, UserRound } from "lucide-react";
import { Component, lazy, Suspense, type ErrorInfo, type ReactNode, useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { authClient, labels, type AuthSession } from "./platform";
import { BrandMark } from "./Ui";
import "./base.css";
import "./shell.css";

const AuthApp = lazy(() => import("auth/AuthApp"));
const CoreApp = lazy(() => import("core/CoreApp"));
const FashionApp = lazy(() => import("fashion/FashionApp"));
const IntelligenceApp = lazy(() => import("intelligence/IntelligenceApp"));
const PlayApp = lazy(() => import("play/PlayApp"));

class RemoteBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, details: ErrorInfo) {
    console.error("Anantah remote failed to load", error, details);
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="remote-error">
          <span>Connection interrupted</span>
          <h1>This part of Anantah is taking a moment.</h1>
          <p>Check that all local remotes are running, then try once more.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Try again <ArrowRight size={17} />
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

function RemoteLoader() {
  return (
    <div className="remote-loader" role="status">
      <BrandMark compact />
      <span>Opening Anantah</span>
    </div>
  );
}

function SiteHeader() {
  const [session, setSession] = useState<AuthSession | null>(() => authClient.getSession());

  useEffect(() => {
    const updateSession = () => setSession(authClient.getSession());
    window.addEventListener("anantah:auth-change", updateSession);
    window.addEventListener("storage", updateSession);
    return () => {
      window.removeEventListener("anantah:auth-change", updateSession);
      window.removeEventListener("storage", updateSession);
    };
  }, []);

  async function logout() {
    await authClient.logout();
    setSession(null);
  }

  return (
    <header className="site-header">
      <Link className="site-header__brand" to="/">
        <BrandMark />
      </Link>
      <nav aria-label="Primary navigation">
        <Link to="/">{labels.navigation.home}</Link>
        <Link to="/fashion">{labels.navigation.fashion}</Link>
        <Link to="/intelligence">{labels.navigation.intelligence}</Link>
        <Link to="/play">{labels.navigation.play}</Link>
        {session ? (
          <div className="account-menu">
            <span className="account-menu__avatar" aria-hidden="true">{session.user.displayName.charAt(0)}</span>
            <span className="account-menu__name">{session.user.displayName}</span>
            <button type="button" onClick={logout} aria-label="Sign out" title="Sign out">
              <LogOut size={17} />
            </button>
          </div>
        ) : (
          <Link className="site-header__signin" to="/auth/login">
            <UserRound size={16} /> {labels.navigation.signIn}
          </Link>
        )}
      </nav>
    </header>
  );
}

function CoreRoute() {
  return (
    <>
      <SiteHeader />
      <RemoteBoundary>
        <Suspense fallback={<RemoteLoader />}>
          <CoreApp />
        </Suspense>
      </RemoteBoundary>
    </>
  );
}

function FashionRoute() {
  return (
    <RemoteBoundary>
      <Suspense fallback={<RemoteLoader />}>
        <FashionApp />
      </Suspense>
    </RemoteBoundary>
  );
}

function IntelligenceRoute() {
  return (
    <RemoteBoundary>
      <Suspense fallback={<RemoteLoader />}>
        <IntelligenceApp />
      </Suspense>
    </RemoteBoundary>
  );
}

function PlayRoute() {
  return (
    <RemoteBoundary>
      <Suspense fallback={<RemoteLoader />}>
        <PlayApp />
      </Suspense>
    </RemoteBoundary>
  );
}

function AuthRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const [returnTo] = useState(() => {
    const requestedPath = new URLSearchParams(location.search).get("returnTo");
    return requestedPath
      && requestedPath.startsWith("/")
      && !requestedPath.startsWith("//")
      && !requestedPath.startsWith("/auth")
        ? requestedPath
        : "/";
  });

  return (
    <RemoteBoundary>
      <Suspense fallback={<RemoteLoader />}>
        <AuthApp onAuthenticated={() => navigate(returnTo, { replace: true })} />
      </Suspense>
    </RemoteBoundary>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CoreRoute />} />
      <Route path="/fashion/*" element={<FashionRoute />} />
      <Route path="/intelligence/*" element={<IntelligenceRoute />} />
      <Route path="/play/*" element={<PlayRoute />} />
      <Route path="/auth/*" element={<AuthRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}