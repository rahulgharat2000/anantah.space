import { LogOut, ShoppingBag, UserRound } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button, IconButton } from "../../design-system";
import { useAuth } from "../providers/AuthProvider";

export function FashionLayout() {
  const location = useLocation();
  const fashionRoot = location.pathname.startsWith("/fashion") ? "/fashion" : "";
  const catalogPath = `${fashionRoot}/catalog`;
  const { session, signOut } = useAuth();
  const returnTo = `${location.pathname}${location.search}`;

  return (
    <div className="fashion-page">
      <header className="fashion-topbar">
        <Link className="fashion-topbar__brand" to={fashionRoot || "/"} aria-label="Anantah Space Fashion home">
          <span className="fashion-topbar__logo" aria-hidden="true">A</span>
          <div>
            <strong>ANANTAH SPACE FASHION</strong>
            <span>Interstellar edit</span>
          </div>
        </Link>

        <nav aria-label="Fashion sections" className="fashion-topbar__nav">
          <Link to={`${catalogPath}?for=men`}>Men</Link>
          <Link to={`${catalogPath}?for=women`}>Women</Link>
          <Link to={`${catalogPath}?edit=studio`}>Studio</Link>
          <Link to={`${catalogPath}?edit=premium`}>Premium</Link>
        </nav>

        <div className="fashion-topbar__actions">
          <Button
            className="fashion-topbar__cart"
            type="button"
            variant="secondary"
            icon={<ShoppingBag size={16} />}
            aria-label="Open shopping bag"
          >
            Bag
          </Button>
          {session ? (
            <div className="fashion-account" aria-label={`Signed in as ${session.user.displayName}`}>
              <span className="fashion-account__avatar" aria-hidden="true">
                {session.user.displayName.charAt(0).toUpperCase()}
              </span>
              <span className="fashion-account__name">{session.user.displayName}</span>
              <IconButton
                className="fashion-account__signout"
                icon={<LogOut size={16} aria-hidden="true" />}
                label="Sign out"
                type="button"
                onClick={signOut}
              />
            </div>
          ) : (
            <Link className="fashion-account__signin" to={`/auth/login?returnTo=${encodeURIComponent(returnTo)}`}>
              <UserRound size={16} aria-hidden="true" />
              Sign in
            </Link>
          )}
        </div>
      </header>

      <Outlet />

      <footer className="fashion-footer">
        <div>
          <h3>ANANTAH SPACE FASHION</h3>
          <p>Original collections selected for considered everyday wardrobes.</p>
        </div>
        <span>© 2026 Anantah.space</span>
      </footer>
    </div>
  );
}