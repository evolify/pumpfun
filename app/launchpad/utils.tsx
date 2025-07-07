import { Launchpad } from "@/types"
import { getQuery } from "@/utils"

export const launchpad = getQuery<Launchpad>("launchpad", Launchpad.BonkFun)
