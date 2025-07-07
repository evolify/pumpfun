import Percent from "@/components/percent"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GlowCard } from "@/components/ui/spotlight-card"
import { Durations } from "@/hooks/duration"
import type { PoolInfo, PoolStats, TokenInfo } from "@/types"
import { copy, getAxiomLink, getGmgnLink, getTokenStats } from "@/utils"
import { formatAddress, formatNumber, formatTime } from "@/utils/format"
import { Copy, Twitter } from "lucide-react"

interface Props {
  data: PoolInfo
}

function renderDurationValue(
  token: TokenInfo,
  key: keyof PoolStats,
  render: (value: number) => React.ReactNode = value => <span>{value}</span>
) {
  return Durations.map(t => {
    const stat = getTokenStats(token, t)
    if (stat?.[key]) {
      return (
        <div className="flex flex-row items-center gap-1">
          <span className="text-sm text-gray-400">{t}</span>
          {render(stat[key])}
        </div>
      )
    }
  })
}

export default function Item({ data }: Props) {
  const { baseAsset } = data
  function copyAddr() {
    copy(baseAsset.id)
  }
  function to(link: string) {
    window.open(link)
  }
  return (
    <GlowCard customSize className="px-0 py-0 gap-0">
      <div className="flex flex-row items-center gap-2 px-3 py-2">
        <img src={data.baseAsset.icon} className="w-8 h-8 rounded-sm" />
        <div className="flex-1">
          <div className="flex flex-row items-center gap-4">
            <span> {data.baseAsset.symbol} </span>
            <div
              className="flex flex-row items-center gap-1 text-sm text-gray-400"
              onClick={copyAddr}
            >
              {formatAddress(data.baseAsset.id)}
              <Copy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm text-gray-400">{data.baseAsset.name}</div>
        </div>
        <div className="self-start px-2">{formatTime(data.createdAt)}</div>
      </div>
      <div className="p-3 flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <div>
            <span className="text-sm text-gray-400">MC</span>
            <span className="ml-1">{formatNumber(baseAsset.mcap)}</span>
          </div>
          <Separator orientation="vertical" className="min-h-4" />
          <div>
            <span className="text-sm text-gray-400">Liquidity</span>
            <span className="ml-1">{formatNumber(baseAsset.liquidity)}</span>
          </div>
          <Separator orientation="vertical" className="min-h-4" />
          <div>
            <span className="text-sm text-gray-400">Holders</span>
            <span className="ml-1">{formatNumber(baseAsset.holderCount)}</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm text-gray-400">Price</span>
          {renderDurationValue(baseAsset, "priceChange", val => (
            <Percent value={val} />
          ))}
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm text-gray-400">Volume</span>
          {renderDurationValue(baseAsset, "volumeChange", val => (
            <Percent value={val} />
          ))}
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm text-gray-400">Holder</span>
          {renderDurationValue(baseAsset, "holderChange", val => (
            <Percent value={val} />
          ))}
        </div>
      </div>
      <Separator />
      <div className="flex flex-row items-center gap-2 px-2 py-1">
        {baseAsset.twitter && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => to(baseAsset.twitter)}
          >
            <Twitter className="w-4 h-4 text-blue-500" />
          </Button>
        )}

        <Button
          variant="secondary"
          size="sm"
          className="ml-auto"
          onClick={() => to(getGmgnLink(baseAsset.id))}
        >
          GMGN
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => to(getAxiomLink(baseAsset.id))}
        >
          Axiom
        </Button>
      </div>
    </GlowCard>
  )
}
