import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import tailwindcss from "@tailwindcss/vite"

function getInput(...dirs: string[]) {
  const input: Record<string, string> = {
    main: "app/index.html",
  }
  dirs.forEach(t => {
    input[t] = `app/${t}/index.html`
  })
  return input
}

// https://vite.dev/config/
export default defineConfig({
  root: "app/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./common"),
    },
  },
  build: {
    rollupOptions: {
      input: getInput("launchpad"),
    },
  },
})
