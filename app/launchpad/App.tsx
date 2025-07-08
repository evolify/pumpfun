import { useLaunchpadsStats } from "@/hooks/api"
import Header from "@/components/header"
import Loading from "@/components/loading"
import Empty from "@/components/empty"
import { Separator } from "@/components/ui/separator"
import List from "./modules/list"
import { LaunchpadConfig } from "@/constants"
import { launchpad } from "./utils"
import { useMemo } from "react"
import { formatNumber } from "@/utils/format"

export default function App() {
  const { data, isLoading } = useLaunchpadsStats()

  const launchpadConfig = useMemo(() => LaunchpadConfig[launchpad!], [])

  const launchpadInfo = useMemo(() => {
    return data?.find(t => t.id === launchpad)
  }, [data])

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Empty />
  }

  return (
    <div className="app">
      <Header
        subTitle={
          launchpadConfig.name + " " + formatNumber(launchpadInfo?.liquidity)
        }
      />
      <Separator />
      <div className="p-5">
        <List />
      </div>
    </div>
  )
}
