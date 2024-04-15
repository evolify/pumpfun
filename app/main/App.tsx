import { AppBar, Stack } from "@mui/material"
import List from "./modules/list"
import Header from "./modules/header"

export default function App() {

  return (
    <Stack className="app" pt={7}>
      <Header />
      <List />
    </Stack>
  )
}
