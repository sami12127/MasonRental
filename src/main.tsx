import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// In de build is elke pagina vooraf gerenderd (scripts/prerender.mjs): neem die
// HTML over. In de dev-server is #root leeg en renderen we gewoon.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
