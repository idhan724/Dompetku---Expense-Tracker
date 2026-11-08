import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { monthlyData } from "@/data/staticData";
import { changeMonth, isCurrentMonth } from "@/lib/month";

interface MonthSliderProps {
  value: number;
  onChange: (index: number) => void;
}

function MonthSlider({ value, onChange }: MonthSliderProps) {
  const { month } = monthlyData[value];
  const handleChangeMonth = (offset: number) => {
    const newIndex = changeMonth({ current: value, offset });
    onChange(newIndex);
  };

  return (
    <div className="bg-secondary flex items-center justify-center gap-2 rounded-lg py-2">
      <Button
        variant="ghost"
        onClick={() => handleChangeMonth(-1)}
        disabled={value === 0}
      >
        <ChevronLeft />
      </Button>
      <div>
        <span className="min-w-[30px] text-center text-lg font-medium md:text-sm">
          {month}
        </span>
      </div>
      <Button
        variant="ghost"
        onClick={() => handleChangeMonth(1)}
        disabled={isCurrentMonth(value)}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}

export default MonthSlider;
