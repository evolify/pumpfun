import Header from "@/components/header"
import { Separator } from "@/components/ui/separator"
import { getLaunchpadsStats } from "@/utils/api"
import Basic from "./modules/basic"
import Chart from "./modules/chart"
import { Suspense } from "react"
import LaunchpadsTable from "./modules/table"

export default function Home() {
  const data = getLaunchpadsStats()
  return (
    <div>
      <Header />
      <Separator />
      <div className="p-5">
        <Suspense>
          <Basic data={data} />
          <Chart data={data} />
          <LaunchpadsTable data={data} />
        </Suspense>
      </div>
    </div>
  )
}
