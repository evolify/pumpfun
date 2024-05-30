import { Stack } from "@mui/material"
import List from "./modules/list"
import Header from "./modules/header"
import { getPumpList } from "common/api"
import "./style.scss"
import Detail from "./modules/list/detail"

export default async function App() {
  const data = await getPumpList()
  return (
      <Stack className="app" pt={7}>
        <Header />
        <List data={data} />
        <Detail />
      </Stack>
  )
}
