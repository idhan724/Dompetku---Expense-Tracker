import { currentMonth, monthlyData } from "@/data/staticData";
import type { ChangeMonthProps } from "@/types";

export function isCurrentMonth(current: number) {
  return currentMonth.month === monthlyData[current].month;
}

export function changeMonth({ current, offset }: ChangeMonthProps) {
  const next = current + offset;
  return Math.max(0, Math.min(monthlyData.length - 1, next));
}
