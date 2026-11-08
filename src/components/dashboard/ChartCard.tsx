import { motion } from "motion/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { formatRupiah } from "@/lib/currency";
import { Button } from "../ui/button";

export const description = "An area chart with gradient fill";

const chartData = [
  { month: "April", income: 186000, expense: 80000 },
  { month: "May", income: 305000, expense: 200000 },
  { month: "June", income: 237000, expense: 120000 },
  { month: "July", income: 73000, expense: 190000 },
  { month: "August", income: 209000, expense: 130000 },
  { month: "September", income: 214000, expense: 140000 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--income)",
  },
  expense: {
    label: "Expense",
    color: "var(--expense)",
  },
} satisfies ChartConfig;

function ChartCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      className="col-span-2"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Income vs Expense Trend</h2>
              <span className="text-muted-foreground">
                6-month rolling variance comparison
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-income-deep h-3 w-3 rounded-full" />
                <span className="text-muted-foreground">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-expense-deep h-3 w-3 rounded-full" />
                <span className="text-muted-foreground">Expense</span>
              </div>
            </div>
          </div>
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
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name, item) => (
                      <>
                        <div
                          className="5 h-2 w-2.5 shrink-0 rounded-[2px]"
                          style={{
                            backgroundColor: item.color,
                          }}
                        />
                        <div className="flex flex-1 justify-between gap-2 leading-none">
                          <span className="text-muted-foreground">
                            {chartConfig[name as keyof typeof chartConfig]
                              ?.label ?? name}
                          </span>
                          <span className="text-foreground font-mono font-medium tabular-nums">
                            : {formatRupiah(Number(value))}
                          </span>
                        </div>
                      </>
                    )}
                  />
                }
              />
              <defs>
                <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-income)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-income)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-expense)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-expense)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="expense"
                type="natural"
                fill="url(#fillExpense)"
                fillOpacity={0.4}
                stroke="var(--color-expense)"
                stackId="a"
              />
              <Area
                dataKey="income"
                type="natural"
                fill="url(#fillIncome)"
                fillOpacity={0.4}
                stroke="var(--color-income)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <div className="flex items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-income-deep" />
            <p>Income grew by 12.3% across the last 90 days.</p>
          </div>
          <Button variant="ghost">
            Detailed Analytics <ArrowRight />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

export default ChartCard;
