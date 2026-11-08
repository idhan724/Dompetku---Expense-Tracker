import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  SquareExclamationPointIcon,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import { monthlyData } from "@/data/staticData";
import { formatRupiah } from "@/lib/currency";

function StatsCards({ month }: { month: number }) {
  const cards = [
    {
      key: "income" as const,
      label: "TOTAL INCOME",
      amount: formatRupiah(monthlyData[month].totalIncome),
      earnedThisMonth: formatRupiah(monthlyData[month].earnedThisMonth),
      icon: ArrowDown,
    },
    {
      key: "expense" as const,
      label: "TOTAL EXPENSE",
      amount: formatRupiah(monthlyData[month].totalExpenses),
      spentThisMonth: formatRupiah(monthlyData[month].spentThisMonth),
      icon: ArrowUp,
    },
    {
      key: "balance" as const,
      label: "NET BALANCE",
      amount: formatRupiah(monthlyData[month].netBalance),
      savingRate: monthlyData[month].savingsRatePct,
      icon: Wallet,
    },
  ];

  return (
    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map(
        (
          {
            key,
            label,
            amount,
            earnedThisMonth,
            spentThisMonth,
            savingRate,
            icon: Icon,
          },
          i
        ) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card
              className={cn(
                "transition-shadow hover:shadow-md",
                key === "income" && "border-t-income-deep",
                key === "expense" && "border-t-expense-deep",
                key === "balance" && "border-t-primary",
                "border-t-5"
              )}
            >
              <CardContent className="space-y-7 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl",
                        key === "income" && "bg-income-light",
                        key === "expense" && "bg-expense-light",
                        key === "balance" && "bg-muted"
                      )}
                    >
                      <Icon
                        size={18}
                        className={cn(
                          key === "income" && "text-income-deep",
                          key === "expense" && "text-expense-deep",
                          key === "balance" && "text-primary"
                        )}
                      />
                    </div>
                    <p className="text-muted-foreground font-medium">{label}</p>
                  </div>
                  <Badge
                    className={cn(
                      key === "expense"
                        ? "bg-expense-light text-expense-deep"
                        : "bg-income-light text-income-deep"
                    )}
                  >
                    {key === "income" && (
                      <>
                        <TrendingUp />
                        <span>+8.4%</span>
                      </>
                    )}
                    {key === "expense" && (
                      <>
                        <TrendingDown />
                        <span>-4.2%</span>
                      </>
                    )}
                    {key === "balance" && (
                      <>
                        <div className="bg-income-deep h-3 w-3 rounded-full" />
                        <span>Surplus</span>
                      </>
                    )}
                  </Badge>
                </div>
                <p
                  className={cn(
                    "text-primary text-5xl font-bold md:text-[clamp(1.25rem,2vw,2.25rem)]",
                    key === "balance" && "text-income-deep"
                  )}
                >
                  {amount}
                </p>
                <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center lg:gap-2">
                  {key === "income" && (
                    <>
                      <span>Earned This Month:</span>
                      <span className="text-income-deep">
                        {earnedThisMonth}
                      </span>
                    </>
                  )}
                  {key === "expense" && (
                    <>
                      <span>Spent This Month:</span>
                      <span className="text-expense-deep">
                        {spentThisMonth}
                      </span>
                    </>
                  )}
                  {key === "balance" && (
                    <>
                      <span>Savings Rate: {savingRate}%</span>
                      {savingRate < 10 && (
                        <div className="text-expense-deep flex items-center gap-2">
                          <span>Critical Zone</span>
                          <TrendingDown />
                        </div>
                      )}
                      {savingRate <= 20 && savingRate >= 10 && (
                        <div className="flex items-center gap-2 text-yellow-500">
                          <span>Warning Zone</span>
                          <SquareExclamationPointIcon />
                        </div>
                      )}
                      {savingRate > 20 && (
                        <div className="text-income-deep flex items-center gap-2">
                          <span>Optimal Zone</span>
                          <CheckCircle2 />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      )}
    </div>
  );
}

export default StatsCards;
