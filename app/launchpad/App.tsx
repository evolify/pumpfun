import { useLaunchpadsStats } from "@/hooks/api"
import Header from "@/components/header"
import Loading from "@/components/loading"
import Empty from "@/components/empty"
import { Separator } from "@/components/ui/separator"
import { getQuery } from "@/utils"
import Basic from "./modules/basic"
import List from "./modules/list"

const launchpad = getQuery("launchpad")

console.log(launchpad)

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
        <Basic />
        <List />
      </div>
    </div>
  )
}
