import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AuthApp from "./AuthApp";

function StandaloneAuth() {
  const navigate = useNavigate();
  return <AuthApp onAuthenticated={() => navigate("/signed-in")} />;
}

function SignedIn() {
  return (
    <main className="standalone-success">
      <span>Authentication complete</span>
      <h1>You are signed in.</h1>
      <p>The auth MFE is running independently. In the composed application, the shell displays the next product screen.</p>
      <a href="/auth/login">Return to sign in</a>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<StandaloneAuth />} />
        <Route path="/signed-in" element={<SignedIn />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);