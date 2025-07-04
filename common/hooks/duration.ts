import type { Duration } from "@/types"
import { useState } from "react"

export const Durations: Duration[] = ["24h", "6h", "1h", "5m"]

export function useDuration(defaultValue = "24h") {
  const [duration, setDuration] = useState<Duration>(defaultValue as Duration)

  function onChange(value: string) {
    setDuration(value as Duration)
  }

  return {
    duration,
    setDuration,
    onChange,
  }
}
