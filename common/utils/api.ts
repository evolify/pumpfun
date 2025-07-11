import { LaunchpadsInfo } from "@/types"

const LaunchpadsStatsUrl = "https://datapi.jup.ag/v1/launchpads/stats"
const LaunchpadDetailUrl = "https://datapi.jup.ag/v1/pools/toptraded"

import { ProxyAgent } from "undici"

export const isServer = typeof window === "undefined"

export const isDev = process.env.NODE_ENV === "development"

export function runInBrowser(cb: Function) {
  if (!isServer) {
    cb()
  }
}

const proxy = process.env.PROXY

const options = {
  next: {
    revalidate: 10,
  },
  dispatcher: isServer && proxy ? new ProxyAgent(proxy) : undefined,
}

console.log("---- proxy ----", proxy, options.dispatcher)

export async function getLaunchpadsStats() {
  const res = await fetch(LaunchpadsStatsUrl, options)
  const data = await res.json()
  return (
    data?.launchpads.map((t: LaunchpadsInfo) => ({
      ...t,
      id: t.launchpad.replaceAll(".", "_").replaceAll("-", "_"),
    })) || []
  )
}
