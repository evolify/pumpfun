import type { Duration, LaunchpadsInfo, LaunchpadsStats } from "@/types"

export function getStats(data: LaunchpadsInfo, duration: Duration) {
  return data[`stats${duration}`] as LaunchpadsStats
}
