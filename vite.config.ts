// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Keep the existing server entry for local/Lovable compatibility.
    server: { entry: "server" },

    // The public Imã website is a single public route with no runtime server dependency.
    // Prerender it so the production site can be hosted as static files on GitHub Pages.
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
      autoSubfolderIndex: true,
      crawlLinks: true,
      failOnError: true,
    },
  },
});
