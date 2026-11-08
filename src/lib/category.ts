import type { CategoryAmount } from "@/types";
import type { LucideIcon } from "lucide-react";

export function createCustomCategory(
  label: string,
  icon: LucideIcon,
  amount = 0
): CategoryAmount<string> {
  return {
    id: `custom-${label.toLowerCase().trim().replace(/\s+/g, "-")}`,
    label,
    icon,
    amount,
    percent: 0,
    isCustom: true,
  };
}

export function buildCategoryAmounts<TId extends string>(
  defs: readonly { id: TId; label: string; icon: LucideIcon }[],
  amounts: Record<TId, number>,
  total: number
): CategoryAmount<TId>[] {
  return defs.map((def) => ({
    ...def,
    amount: amounts[def.id],
    percent: Number(((amounts[def.id] / total) * 100).toFixed(1)),
  }));
}
