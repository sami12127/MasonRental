/**
 * Rendert elke pagina na de build naar een eigen HTML-bestand, zodat Google
 * (en social media) direct de inhoud, titel, beschrijving en gestructureerde
 * data zien zonder eerst JavaScript uit te voeren. In de browser neemt React
 * de HTML over (hydrateRoot in src/main.tsx).
 *
 * Draait als laatste stap van `npm run build`.
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Writable } from "node:stream";

// React en de router in productiemodus laden (sneller, geen dev-waarschuwingen).
process.env.NODE_ENV = "production";
const { renderToPipeableStream } = await import("react-dom/server");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const { renderApp, PRERENDER_ROUTES, SITE_URL, getPageMeta, renderHead } = await import(
  pathToFileURL(join(ssrDir, "entry-server.js")).href
);

const template = await readFile(join(dist, "index.html"), "utf8");
const SEO_BLOCK = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;
if (!SEO_BLOCK.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error("index.html mist het seo-blok of <div id=\"root\"></div>");
}

/** Rendert de app naar een string en wacht tot alle lazy pagina's geladen zijn. */
function renderToString(url) {
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
      final(callback) {
        resolve(html);
        callback();
      },
    });
    const stream = renderToPipeableStream(renderApp(url), {
      onAllReady() {
        stream.pipe(sink);
      },
      onShellError: reject,
      onError(error) {
        reject(error);
      },
    });
  });
}

/** "/" → index.html, "/aanbod" → aanbod.html, "/auto/x" → auto/x.html */
function outputFile(route) {
  return route === "/" ? "index.html" : `${route.slice(1)}.html`;
}

for (const route of PRERENDER_ROUTES) {
  const appHtml = await renderToString(route);
  const html = template
    .replace(SEO_BLOCK, renderHead(getPageMeta(route)))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const file = join(dist, outputFile(route));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log(`prerender  ${route.padEnd(24)} → dist/${outputFile(route)}`);
}

// Sitemap uit dezelfde routelijst, zodat hij altijd klopt met de site.
const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...PRERENDER_ROUTES.map(
    (route) => `  <url><loc>${SITE_URL}${route}</loc><lastmod>${today}</lastmod></url>`
  ),
  "</urlset>",
  "",
].join("\n");
await writeFile(join(dist, "sitemap.xml"), sitemap);
console.log("prerender  sitemap.xml");

await rm(ssrDir, { recursive: true, force: true });
