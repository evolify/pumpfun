"use client"

import { LaunchpadConfig } from "@/constants"
import { use, useMemo } from "react"
import { launchpad } from "../utils"
import { formatNumber } from "@/utils/format"
import { LaunchpadsInfo } from "@/types"

interface Props {
  data: Promise<LaunchpadsInfo[]>
}

export default function SubTitle(props: Props) {
  const data = use(props.data)
  const launchpadConfig = useMemo(() => LaunchpadConfig[launchpad!], [])

  const launchpadInfo = useMemo(() => {
    return data?.find(t => t.id === launchpad)
  }, [data])

  return (
    <div>
      {launchpadConfig?.name + " " + formatNumber(launchpadInfo?.liquidity)}
    </div>
  )
}
