import App from "./App"
import { render, fetcher } from "@/utils"
import { SWRConfig } from "swr"
import "@/styles/common.css"

import TagManager from "react-gtm-module"

TagManager.initialize({
  gtmId: "GTM-WM9RJCSR",
})

render(
  <SWRConfig
    value={{
      fetcher: fetcher,
    }}
  >
    <App />
  </SWRConfig>
)
