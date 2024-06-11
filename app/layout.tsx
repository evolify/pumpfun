import { PropsWithChildren } from "react"
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { GoogleTagManager } from '@next/third-parties/google'
import Theme from "common/ui/theme/index"

const APP_NAME = "Dump Fun";
const APP_DEFAULT_TITLE = "Dump Fun";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Dump Fun for pumpfun";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#2D2D2D" },
    { media: "(prefers-color-scheme: light)", color: "#1976d2" }
   ],
};

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
      <GoogleTagManager gtmId="GTM-WM9RJCSR" />
    </html>
  )
}
