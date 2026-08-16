import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import IntelligenceApp from "./IntelligenceApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <IntelligenceApp />
    </BrowserRouter>
  </StrictMode>,
);
