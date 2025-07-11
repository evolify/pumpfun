"use client"
import { toast } from "sonner"

export async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  } catch (err) {
    console.error(err)
  }
}

export function getQuery<T>(key: string, defaultValue?: T) {
  if (typeof window === "undefined") {
    return defaultValue
  }
  const urlParams = new URLSearchParams(location.search)
  return (urlParams.get(key) as T) || defaultValue
}
