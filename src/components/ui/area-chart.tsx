import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Reports } from "@/views/DrawerTable";

const chartConfig = {
  missed: {
    label: "Missed",
    color: "hsl(var(--chart-1))",
  },
  addressed: {
    label: "Addressed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CustomChart(report: Reports) {
  console.log(report);
  if (!report) return null;
  const chartData = [
    {
      severity: "Low",
      missed: report.severity_counts_delayed?.low,
      addressed: report.severity_counts_addressed?.low,
    },
    {
      severity: "Medium",
      missed: report.severity_counts_delayed?.medium,
      addressed: report.severity_counts_addressed?.medium,
    },
    {
      severity: "High",
      missed: report.severity_counts_delayed?.high,
      addressed: report.severity_counts_addressed?.high,
    },
  ];
  console.log(chartData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          number of fires addressed and missed for each severity level
        </CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="severity"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="missed"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="addressed"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
