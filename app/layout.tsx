import { PropsWithChildren } from "react"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import Theme from "common/ui/theme/index"
import "common/styles/global.css"

type Props = PropsWithChildren

export default function MyApp({ children }: Props) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <Theme>{children}</Theme>
        </AppRouterCacheProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}

export const revalidate = 60
