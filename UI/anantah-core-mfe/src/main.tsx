import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CoreApp from "./CoreApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CoreApp />
    </BrowserRouter>
  </StrictMode>,
);