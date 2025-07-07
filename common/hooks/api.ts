import { LaunchpadConfig } from "@/constants"
import type { Duration, Launchpad, LaunchpadsInfo, PoolInfo } from "@/types"
import useSWR from "swr"

const LaunchpadsStatsUrl = "https://datapi.jup.ag/v1/launchpads/stats"
const LaunchpadDetailUrl = "https://datapi.jup.ag/v1/pools/toptraded"

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

async function getLaunchpadDetail(url: string) {
  const res = await fetch(url)
  const data = await res.json()
  return (data?.pools as PoolInfo[]) || []
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

export function useLaunchpadDetail(launchpad: Launchpad, duration: Duration) {
  const config = LaunchpadConfig[launchpad]
  const url = `${LaunchpadDetailUrl}/${duration}?launchpads=${config.launchpad}`
  const { data, isLoading, error, mutate } = useSWR(url, getLaunchpadDetail)

  return {
    data,
    isLoading,
    error,
    mutate,
  }
}
