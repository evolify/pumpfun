import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { LaunchpadsInfo } from "@/types"
import { useMemo } from "react"
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

export function Liquidity({ data }: Props) {
  const chartData = useMemo(() => {
    return data.slice(0, 5).map(item => ({
      launchpad: item.id,
      liquidity: item.liquidity,
      fill: `var(--chart-${item.id})`,
    }))
  }, [data])
  return (
    <Card className="flex flex-col flex-1 gap-0 min-w-[300px] py-4">
      <CardHeader className="flex flex-row justify-between items-center pb-0 px-4 h-9">
        <CardTitle>Liquidity</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 px-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  valueFormatter={val => formatNumber(val)}
                />
              }
            />
            <Pie data={chartData} dataKey="liquidity" nameKey="launchpad" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
