import Loading from "@/components/loading"
import { useLaunchpadsStats } from "@/hooks/api"
import { getLaunchpad } from "@/utils"
import { launchpad } from "../utils"
import Empty from "@/components/empty"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function renderItem(label: string, value: number) {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="text-sm text-gray-300">{label}</div>
      <div className="">{value}</div>
    </div>
  )
}
export default function Basic() {
  const { isLoading, data: launchpads } = useLaunchpadsStats()
  const data = getLaunchpad(launchpads, launchpad!)
  if (isLoading) {
    return <Loading />
  }
  if (!data) {
    return <Empty />
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{data.launchpad}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row flex-wrap gap-4 items-center">
          {renderItem("Liquidity", data.liquidity)}
          {renderItem("24h volume", data.stats24h.volume)}
          {renderItem("24h traders", data.stats24h.traders)}
        </CardContent>
      </Card>
    </div>
  )
}
