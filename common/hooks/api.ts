import type { LaunchpadsInfo } from "@/types"
import useSWR from "swr"

const LaunchpadsStatsUrl = "https://datapi.jup.ag/v1/launchpads/stats"

async function getLaunchpadsStats() {
  const res = await fetch(LaunchpadsStatsUrl)
  const data = await res.json()
  return (
    data?.launchpads.map((t: LaunchpadsInfo) => ({
      ...t,
      id: t.launchpad.replaceAll(".", "_").replaceAll("-", "_"),
    })) || []
  )
}

export function useLaunchpadsStats() {
  const { data, isLoading, error, mutate } = useSWR(
    LaunchpadsStatsUrl,
    getLaunchpadsStats
  )

  return {
    data,
    isLoading,
    error,
    mutate,
  }
}
