import { Launchpad } from "./types"
import { getLaunchpadLink } from "./utils"

const { PumpFun, BonkFun, JupStudio, Believe, Moonshot } = Launchpad
export const LaunchpadConfig = {
  [PumpFun]: {
    launchpad: "pump.fun",
    name: "Pumpfun",
    url: getLaunchpadLink(PumpFun),
  },
  [BonkFun]: {
    launchpad: "letsbonk.fun",
    name: "Letsbonk",
    url: getLaunchpadLink(BonkFun),
  },
  [JupStudio]: {
    launchpad: "jup-studio",
    name: "Jup studio",
    url: getLaunchpadLink(JupStudio),
  },
  [Believe]: {
    launchpad: "believe",
    name: "Believe",
    url: getLaunchpadLink(Believe),
  },
  [Moonshot]: {
    launchpad: "moonshot",
    name: "Moonshot",
    url: getLaunchpadLink(Moonshot),
  },
}
