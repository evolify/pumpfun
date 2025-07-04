import App from "./App"
import { render, fetcher } from "@/utils"
import { SWRConfig } from "swr"
import "@/styles/common.css"

render(
  <SWRConfig
    value={{
      fetcher: fetcher,
    }}
  >
    <App />
  </SWRConfig>
)
