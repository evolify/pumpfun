import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"
import { resolve } from "path"

function getInput(...dirs: string[]) {
  const input = {
    main: "app/index.html",
  }
  dirs.forEach(t => {
    input[t] = `app/${t}/index.html`
  })
  return input
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      common: resolve("common/"),
    },
  },
  publicDir: resolve("public"),
  root: "app/",
  server: {
    port: 3000,
  },
  build: {
    outDir: resolve("dist"),
    rollupOptions: {
      input: getInput(),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Pump fun",
        short_name: "Pump",
        description: "Pump fun tools",
        theme_color: "#1976d2",
        start_url: "index.html",
        icons: [
          {
            src: "/icon.jpeg",
            sizes: "120x120",
            type: "image/png",
          },
        ],
      },
    }),
  ],
})
