import * as React from "react";
import MonthSlider from "@/components/dashboard/MonthSlider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import StatsCards from "@/components/dashboard/StatsCards";
import ChartCard from "@/components/dashboard/ChartCard";
import { monthlyData } from "@/data/staticData";
import { isCurrentMonth } from "@/lib/month";

function Dashboard() {
  const [currentMonth, setCurrentMonth] = React.useState(
    monthlyData.length - 1
  );

  const { year } = monthlyData[currentMonth];
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-1">
          <span className="text-foreground text-md font-medium">{year}</span>

          <div className="flex flex-col items-center gap-2 lg:relative lg:block">
            <MonthSlider value={currentMonth} onChange={setCurrentMonth} />

            {isCurrentMonth(currentMonth) && (
              <Badge className="text-income-deep bg-income-light p-3 text-sm lg:absolute lg:top-1/2 lg:left-full lg:ml-4 lg:-translate-y-1/2">
                This Month
              </Badge>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 lg:flex-row">
          <Button variant="secondary" className="w-full lg:w-auto">
            <Download />
            Export CSV
          </Button>
          <Button className="w-full lg:w-auto">
            <Plus />
            Add Transaction
          </Button>
        </div>
      </div>
      <StatsCards month={currentMonth} />
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard />
      </div>
    </>
  );
}

export default Dashboard;
