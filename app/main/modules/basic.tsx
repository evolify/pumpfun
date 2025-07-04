import { Card } from "@/components/ui/card"
import type { LaunchpadsInfo } from "@/types"
import { formatNumber } from "@/utils/format"
import { useMemo } from "react"

interface Props {
  data: LaunchpadsInfo[]
}

function renderItem(label: string, value: number) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="text-sm text-gray-300">{label}</div>
      <div className="">{formatNumber(value)}</div>
    </div>
  )
}
export default function Basic({ data }: Props) {
  const list = useMemo(() => data.slice(0, 5), [data])
  return (
    <div className="flex flex-row gap-4">
      {list.map(item => (
        <Card key={item.id} className="flex-1 px-3 py-2 gap-0">
          <div className="text-sm text-gray-300">{item.launchpad}</div>
          <div className="flex flex-row items-baseline justify-between mb-2">
            <div className="text-sm text-gray-300">Liquidity</div>
            <div className="text-4xl">{formatNumber(item.liquidity)}</div>
          </div>
          {renderItem("24h volume", item.stats24h.volume)}
          {renderItem("24h traders", item.stats24h.traders)}
        </Card>
      ))}
    </div>
  )
}
