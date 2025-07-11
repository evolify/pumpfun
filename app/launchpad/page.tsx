import Header from "@/components/header"
import { Toaster } from "sonner"
import { getLaunchpadsStats } from "@/utils/api"
import SubTitle from "./modules/sub-title"
import { Separator } from "@/components/ui/separator"
import List from "./modules/list"
import "./styles.css"

export default function Launchpad() {
  const data = getLaunchpadsStats()

  return (
    <div>
      <Header subTitle={<SubTitle data={data} />} />
      <Separator />
      <div className="p-5">
        <List />
      </div>
      <Toaster position="top-center" richColors theme="dark" duration={1500} />
    </div>
  )
}
