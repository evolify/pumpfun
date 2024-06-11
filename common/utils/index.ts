"use client"
import { info } from "common/ui/popover/notify"
import { createRoot } from "react-dom/client"

export function copy(str: string, notify = true) {
  navigator.clipboard.writeText(str)
  if(notify){
    info("Copy to clipboard")
  }
}

export function render(children: React.ReactNode) {
  const container = document.querySelector("#app")
  const root = createRoot(container!)
  root.render(children)
}

export function toFixed(num: number, n = 4) {
  if (!num) {
    return 0
  }
  return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
}

export function ellipsisAddr(addr = "") {
  return addr.substring(0, 5) + "..." + addr.substr(-4)
}

export function pumpill(addr = ""){
  return "tg://resolve?domain=pump_fun_bot&start=r_1657098026"
}

export function bonkbot(addr = ""){
  return `tg://resolve?domain=bonkbot_bot&start=ref_e0crb_ca_${addr}` 
}

export function pepeboost(addr = ""){
  return `tg://resolve?domain=pepeboost_sol05_bot&start=ref_0h70jz_ca_${addr}`
}

export function gmgnbot(addr = ""){
  return `tg://resolve?domain=GMGN_sol_bot&start=i_XqhPEmrY_ca_${addr}`
}

export function pumpFun(mint: string){
  return `https://pump.fun/${mint}`
}
