import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path, { resolve } from "path"
import tailwindcss from "@tailwindcss/vite"
import glob from "fast-glob"

const appDir = resolve(__dirname, "app")

function getInput() {
  const dirs = glob.sync(`${appDir}/**/index.html`, { cwd: appDir })
  const input: Record<string, string> = {
    main: "app/index.html",
  }
  dirs.forEach(t => {
    const name = path.relative(appDir, path.dirname(t)) || "main"
    input[name] = t
  })
  return input
}

// https://vite.dev/config/
export default defineConfig({
  root: "app",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./common"),
    },
  },
  build: {
    outDir: resolve("dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: getInput(),
    },
  },
})
