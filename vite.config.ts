import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      server: { entry: "./src/server.ts" },
    }),
    viteReact(),
    tailwindcss(),
    nitro({
      config: {
        output: {
          dir: "dist",
          serverDir: "dist/server",
          publicDir: "dist/client",
        },
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
