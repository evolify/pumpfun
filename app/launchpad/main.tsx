import App from "./App"
import { render, fetcher } from "@/utils"
import { SWRConfig } from "swr"
import "@/styles/common.css"
import "./styles.css"
import { Toaster } from "sonner"

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
    <Toaster position="top-center" richColors theme="dark" duration={1500} />
  </SWRConfig>
)
