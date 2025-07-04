import { useLaunchpadsStats } from "@/hooks/api"
import LaunchpadsTable from "./modules/table"
import Loading from "@/components/loading"
import Empty from "@/components/empty"
import Chart from "./modules/chart"
import Basic from "./modules/basic"
import { Separator } from "@/components/ui/separator"
import Header from "./modules/header"

export default function App() {
  const { data, isLoading } = useLaunchpadsStats()

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Empty />
  }

  return (
    <div className="app">
      <Header />
      <Separator />
      <div className="p-5">
        <Basic data={data} />
        <Chart data={data} />
      </div>
      <LaunchpadsTable data={data} />
    </div>
  )
}
