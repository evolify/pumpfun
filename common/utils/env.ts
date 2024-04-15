export function runInBrowser(cb: Function) {
  if (typeof window !== "undefined") {
    cb()
  }
}
