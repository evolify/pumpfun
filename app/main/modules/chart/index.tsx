import type { LaunchpadsInfo } from "@/types"
import Stats from "./stats"
import { Liquidity } from "./liquidity"
import { Volume } from "./volume"
import { Traders } from "./traders"

interface Props {
  data: LaunchpadsInfo[]
}

export default function Chart({ data }: Props) {
  return (
    <div className="mt-4">
      <Stats data={data} />
      <div className="flex flex-row flex-wrap gap-4 mt-4">
        <Liquidity data={data} />
        <Volume data={data} />
        <Traders data={data} />
      </div>
    </div>
  )
}
