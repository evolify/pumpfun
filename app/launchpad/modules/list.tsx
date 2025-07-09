import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useLaunchpadDetail } from "@/hooks/api"
import { useDuration } from "@/hooks/duration"
import { launchpad } from "../utils"
import Loading from "@/components/loading"
import { formatNumber, formatTime } from "@/utils/format"
import { getTokenStats } from "@/utils"
import Item from "./item"
import { LayoutGrid, Rows3 } from "lucide-react"
import { useState } from "react"
import type { Duration, PoolInfo } from "@/types"
import Empty from "@/components/empty"

function renderGrid(data: PoolInfo[]) {
  return (
    <div className="grid grid-cols-3 gap-4 token-list">
      {data?.map(item => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  )
}

function renderTable(data: PoolInfo[], duration: Duration) {
  return (
    <Card className="p-0">
      <Table>
        <TableHeader>
          <TableRow className="text-sm text-gray-400">
            <TableHead>Name / Age</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Liquidity</TableHead>
            <TableHead>Holders</TableHead>
            <TableHead>{duration} Volume</TableHead>
            <TableHead>Buys / Sells</TableHead>
            <TableHead>Traders</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(item => {
            const stats = getTokenStats(item.baseAsset, duration)
            return (
              <TableRow key={item.id}>
                <TableCell className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-sm overflow-hidden">
                    <img src={item.baseAsset.icon} />
                  </div>
                  <div>
                    <div> {item.baseAsset.symbol} </div>
                    <div>{formatTime(item.createdAt)}</div>
                  </div>
                </TableCell>
                <TableCell>{formatNumber(item.baseAsset.mcap)}</TableCell>
                <TableCell>{formatNumber(item.liquidity)}</TableCell>
                <TableCell>
                  {formatNumber(item.baseAsset.holderCount)}
                </TableCell>
                <TableCell>
                  {formatNumber(stats.buyVolume + stats.sellVolume)}
                </TableCell>
                <TableCell>
                  <div>{formatNumber(stats.numBuys)}</div>
                  <div>{formatNumber(stats.numSells)}</div>
                </TableCell>
                <TableCell>{formatNumber(stats.numTraders)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}

export default function List() {
  const { duration, onChange } = useDuration("24h")
  const [layout, setLayout] = useState<"grid" | "table">("grid")
  const { isLoading, data } = useLaunchpadDetail(launchpad!, duration)

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Empty />
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <ToggleGroup
          type="single"
          value={duration}
          onValueChange={onChange}
          variant="outline"
        >
          <ToggleGroupItem value="5m">5m</ToggleGroupItem>
          <ToggleGroupItem value="1h">1h</ToggleGroupItem>
          <ToggleGroupItem value="6h">6h</ToggleGroupItem>
          <ToggleGroupItem value="24h">24h</ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          className="ml-auto"
          type="single"
          value={layout}
          onValueChange={val => setLayout(val as "grid" | "table")}
          variant="outline"
        >
          <ToggleGroupItem value="grid">
            <LayoutGrid />
          </ToggleGroupItem>
          <ToggleGroupItem value="table">
            <Rows3 />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {layout === "grid" ? renderGrid(data) : renderTable(data, duration)}
    </div>
  )
}
