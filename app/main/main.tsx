import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import Theme from "common/ui/theme/index"
import { render } from "common/utils"
import App from "./App"
import "./style.scss"

render(
  <Theme>
    <App />
    <Analytics />
    <SpeedInsights />
  </Theme>
)
