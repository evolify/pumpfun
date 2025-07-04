import type { Duration, LaunchpadsInfo, LaunchpadsStats } from "@/types"
import { createRoot } from "react-dom/client"

export function render(children: React.ReactNode, el = "#app") {
  const container = document.querySelector(el)
  const root = createRoot(container!)
  root.render(children)
}

export function fetcher(url: string, init?: RequestInit) {
  return fetch(url, init).then(res => res.json())
}

export function getLaunchpad(data: LaunchpadsInfo[], launchpad: string) {
  return data.find(item => item.id === launchpad)
}

export function getLaunchpadStats(data?: LaunchpadsInfo, duration?: Duration) {
  if (!data) return {} as LaunchpadsStats
  return data[`stats${duration}` as keyof LaunchpadsInfo] as LaunchpadsStats
}

export function getAxiomLink(addr = "") {
  if (addr) {
    return `https://axiom.trade/t/${addr}/@gmail`
  }
  return "https://axiom.trade/@gmail"
}

export function getGmgnLink(addr = "") {
  if (addr) {
    return `https://gmgn.ai/sol/token/XqhPEmrY_${addr}`
  }
  return `https://gmgn.ai/?ref=XqhPEmrY`
}

export function getBonkbotLink(addr = "") {
  return `tg://resolve?domain=bonkbot_bot&start=ref_e0crb_ca_${addr}`
}

export function getPepeboostLink(addr = "") {
  return `tg://resolve?domain=pepeboost_sol05_bot&start=ref_0h70jz_ca_${addr}`
}

export function getGmgnbotLink(addr = "") {
  // return `tg://resolve?domain=GMGN_sol_bot&start=i_XqhPEmrY_ca_${addr}`
  return `https://t.me/gmgnaibot?start=i_XqhPEmrY_sol_${addr}`
}
