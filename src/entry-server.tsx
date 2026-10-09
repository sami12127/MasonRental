import { StaticRouter } from "react-router-dom";
import App from "./App";

/**
 * Server-ingang voor het prerenderen (zie scripts/prerender.mjs): geeft de app
 * voor één URL terug, die het script naar HTML rendert.
 */
export function renderApp(url: string) {
  return (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}

export { PRERENDER_ROUTES, SITE_URL, getPageMeta, renderHead } from "./data/seo";
