import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  server: { host: true, port: 5173, strictPort: true },
  // De SSR-build (voor het prerenderen) heeft de foto's in public/ niet nodig.
  build: { copyPublicDir: !isSsrBuild },
}));
