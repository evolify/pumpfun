import { runInBrowser } from "./env"

const THEME_KEY = "theme-preference"

type Theme = "light" | "dark"

let theme: Theme = getTheme()

function getTheme() {
  if (typeof window === "undefined") {
    return "light"
  }
  const val = window.localStorage.getItem(THEME_KEY)
  if (val) {
    return val === "dark" ? "dark" : "light"
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }
}

export function setTheme(value: Theme) {
  theme = value
  localStorage.setItem(THEME_KEY, value)
  reflectPreference()
}

export function toggleTheme() {
  setTheme(theme === "dark" ? "light" : "dark")
}

const reflectPreference = () => {
  runInBrowser(() => {
    document.firstElementChild!.setAttribute("data-theme", theme)
    document.querySelector("#theme-toggle")?.setAttribute("aria-label", theme)
  })
}

// set early so no page flashes / CSS is made aware
reflectPreference()

runInBrowser(() => {
  window.onload = () => {
    reflectPreference()
  }

  // sync with system changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches: isDark }) => {
      theme = isDark ? "dark" : "light"
      setTheme(isDark ? "dark" : "light")
    })
})
