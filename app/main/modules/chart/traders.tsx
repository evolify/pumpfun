import { Pie, PieChart } from "recharts"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { LaunchpadsInfo } from "@/types"
import { useMemo } from "react"
import { useDuration } from "@/hooks/duration"
import DurationFilter from "@/components/duration-filter"
import { getLaunchpadStats } from "@/utils"
import { formatNumber } from "@/utils/format"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  pump_fun: {
    label: "pump.fun",
  },
  letsbonk_fun: {
    label: "letsbonk.fun",
  },
  jup_studio: {
    label: "jup.ag",
  },
  Believe: {
    label: "Believe",
  },
  moonshot: {
    label: "Moonshot",
  },
} satisfies ChartConfig

interface Props {
  data: LaunchpadsInfo[]
}

export function Traders({ data }: Props) {
  const { duration, onChange } = useDuration()
  const chartData = useMemo(() => {
    return data.slice(0, 5).map(item => ({
      label: item.id,
      value: getLaunchpadStats(item, duration).traders,
      fill: `var(--chart-${item.id})`,
    }))
  }, [data, duration])
  return (
    <Card className="flex flex-col flex-1 gap-0">
      <CardHeader className="items-center pb-0 h-9">
        <CardTitle>Traders</CardTitle>
        <CardAction>
          <DurationFilter value={duration} onChange={onChange} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  valueFormatter={val => formatNumber(val)}
                />
              }
            />
            <Pie data={chartData} dataKey="value" nameKey="label" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
