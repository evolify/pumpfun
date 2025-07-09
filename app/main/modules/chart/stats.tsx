import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Launchpad,
  type Duration,
  type LaunchpadsInfo,
  type LaunchpadsStats,
} from "@/types"
import { useMemo, useState } from "react"
import { getLaunchpad, getLaunchpadStats } from "@/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartConfig = {
  pump_fun: {
    label: "PumpFun",
    color: "var(--chart-pump_fun)",
  },
  letsbonk_fun: {
    label: "BonkFun",
    color: "var(--chart-letsbonk_fun)",
  },
  jup_studio: {
    label: "JupStudio",
    color: "var(--chart-jup_studio)",
  },
  believe: {
    label: "Believe",
    color: "var(--chart-Believe)",
  },
  moonshot: {
    label: "Moonshot",
    color: "var(--chart-moonshot)",
  },
} satisfies ChartConfig

interface Props {
  data: LaunchpadsInfo[]
}

const durations: Duration[] = ["24h", "6h", "1h", "5m"]

const options = [
  {
    label: "Market Share",
    value: "marketShare",
  },
  {
    label: "Volume",
    value: "volume",
  },
  {
    label: "Traders",
    value: "traders",
  },
  {
    label: "Mints",
    value: "mints",
  },
  {
    label: "Graduates",
    value: "graduates",
  },
]

export default function Stats({ data }: Props) {
  const [type, setType] = useState<keyof LaunchpadsStats>("marketShare")
  const chartData = useMemo(() => {
    return durations.map(duration => {
      const pumpfun = getLaunchpad(data, Launchpad.PumpFun)
      const bonkfun = getLaunchpad(data, Launchpad.BonkFun)
      const jupstudio = getLaunchpad(data, Launchpad.JupStudio)
      const believe = getLaunchpad(data, Launchpad.Believe)
      const moonshot = getLaunchpad(data, Launchpad.Moonshot)
      const pumpfunValue = getLaunchpadStats(pumpfun, duration)[type]
      const bonkfunValue = getLaunchpadStats(bonkfun, duration)[type]
      const jupstudioValue = getLaunchpadStats(jupstudio, duration)[type]
      const believeValue = getLaunchpadStats(believe, duration)[type]
      const moonshotValue = getLaunchpadStats(moonshot, duration)[type]
      const total =
        pumpfunValue +
        bonkfunValue +
        jupstudioValue +
        believeValue +
        moonshotValue
      return {
        duration,
        pump_fun: (pumpfunValue / total) * 100,
        letsbonk_fun: (bonkfunValue / total) * 100,
        jup_studio: (jupstudioValue / total) * 100,
        believe: (believeValue / total) * 100,
        moonshot: (moonshotValue / total) * 100,
      }
    })
  }, [data, type])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp />
          Launchpad Analytics
        </CardTitle>
        <CardDescription>24h / 6h / 1h / 5m</CardDescription>
        <CardAction className="col-start-2">
          <Select
            value={type}
            onValueChange={value => setType(value as keyof LaunchpadsStats)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          height={300}
          style={{ aspectRatio: "unset" }}
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            height={300}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="duration"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  valueFormatter={value => value.toFixed(2) + " %"}
                />
              }
            />
            {Object.entries(chartConfig).map(([key, value]) => (
              <Line
                key={key}
                dataKey={key}
                type="monotone"
                stroke={value.color}
                fillOpacity={1}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
