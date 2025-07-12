"use client"
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
import { getAxiomLink, getGmgnLink, getTokenStats } from "@/utils"
import Item from "./item"
import { LayoutGrid, RotateCcw, Rows3 } from "lucide-react"
import { useState } from "react"
import type { Duration, PoolInfo } from "@/types"
import Empty from "@/components/empty"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { NavLink } from "@/components/nav-link"
import { TrackLabel } from "@/utils/track"

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
        <TableHeader className="sticky top-0 bg-background">
          <TableRow className="text-sm text-gray-400">
            <TableHead>Name / Age</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Liquidity</TableHead>
            <TableHead>Holders</TableHead>
            <TableHead>{duration} Volume</TableHead>
            <TableHead>Buys / Sells</TableHead>
            <TableHead>Traders</TableHead>
            <TableHead></TableHead>
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
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Trade</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuItem className="p-0">
                        <NavLink
                          className="w-full"
                          label="Axiom"
                          value={getAxiomLink(item.baseAsset.id)}
                          trackLabel={TrackLabel.AXIOM}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="p-0">
                        <NavLink
                          className="w-full"
                          label="Gmgn"
                          value={getGmgnLink(item.baseAsset.id)}
                          trackLabel={TrackLabel.GMGN}
                        />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
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
  const { isLoading, data, mutate } = useLaunchpadDetail(launchpad!, duration)


  function refresh() {
    mutate(data)
  }

  function renderContent() {
    if (isLoading) {
      return <Loading />
    }

    if (!data) {
      return <Empty />
    }

    if (layout === "grid") {
      return renderGrid(data)
    }
    
    return renderTable(data, duration)
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
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

        <Button onClick={refresh} variant="outline">
          <RotateCcw />
        </Button>
      </div>
      { renderContent() }
    </div>
  )
}
