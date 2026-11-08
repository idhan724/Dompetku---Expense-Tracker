import {
  Briefcase,
  Car,
  Home,
  Landmark,
  MoreHorizontal,
  TrendingUp,
  Tv,
  Utensils,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const INCOME_CATEGORIES = [
  { id: "salary", label: "Primary Salary & Staking", icon: Landmark },
  { id: "freelance", label: "Freelance & Retainers", icon: Briefcase },
  { id: "investment", label: "Investment Dividends", icon: TrendingUp },
] as const;

export const EXPENSE_CATEGORIES = [
  { id: "housing", label: "Housing & Rent", icon: Home },
  { id: "groceries", label: "Groceries & Dining", icon: Utensils },
  { id: "utilities", label: "Utilities & Bills", icon: Zap },
  { id: "transport", label: "Transportation", icon: Car },
  { id: "leisure", label: "Leisure & Subscriptions", icon: Tv },
  { id: "other", label: "Other Outflows", icon: MoreHorizontal },
] as const;

export type IncomeCategoryId = (typeof INCOME_CATEGORIES)[number]["id"];
export type ExpenseCategoryId = (typeof EXPENSE_CATEGORIES)[number]["id"];

export type IncomeCategoryIdOrCustom = IncomeCategoryId | (string & {});
export type ExpenseCategoryIdOrCustom = ExpenseCategoryId | (string & {});

export interface MonthBase {
  income: Record<IncomeCategoryId, number>;
  expense: Record<ExpenseCategoryId, number>;
  transactions: Transaction[];
}

export interface ChangeMonthProps {
  current: number;
  offset: number;
}

export interface CategoryAmount<TId extends string = string> {
  id: TId;
  label: string;
  icon: LucideIcon;
  amount: number;
  percent: number;
  isCustom?: boolean;
}

export interface Transaction {
  id: string;
  name: string;
  day: number;
  meta: string;
  amount: number;
  status: string;
}

export interface CategoryAmount<TId extends string = string> {
  id: TId;
  label: string;
  icon: LucideIcon;
  amount: number;
  percent: number;
  isCustom?: boolean;
}

export interface MonthlyData {
  month: string;
  year: number;
  incomeCategories: CategoryAmount<IncomeCategoryId>[];
  expenseCategories: CategoryAmount<ExpenseCategoryId>[];
  totalIncome: number;
  totalExpenses: number;
  incomeChangePct: number | null;
  expenseChangePct: number | null;
  netBalance: number;
  savingsRatePct: number;
  budgetCap: number;
  budgetCapPct: number;
  inflowCount: number;
  transactions: Transaction[];
}
