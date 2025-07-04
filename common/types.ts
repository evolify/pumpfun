export enum Launchpad {
  PumpFun = "pump_fun",
  BonkFun = "letsbonk_fun",
  JupStudio = "jup_studio",
  Believe = "Believe",
  Moonshot = "moonshot",
}
export interface LaunchpadsStats {
  graduates: number
  marketShare: number
  mints: number
  traders: number
  volume: number
}

export interface LaunchpadsInfo {
  id: string
  launchpad: string
  liquidity: number
  stats5m: LaunchpadsStats
  stats1h: LaunchpadsStats
  stats6h: LaunchpadsStats
  stats24h: LaunchpadsStats
}

export type Duration = "5m" | "1h" | "6h" | "24h"
