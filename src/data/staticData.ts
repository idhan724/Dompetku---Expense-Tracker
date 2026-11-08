import { getLastMonth } from "@/lib/date";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, type MonthBase } from "@/types";
import { buildCategoryAmounts } from "@/lib/category";
import { pctChange, sumRecord } from "@/lib/finance";

const BUDGET_CAP = 49_800_000;

const rawMonthlyData: MonthBase[] = [
  {
    income: {
      salary: 58_500_000,
      freelance: 13_500_000,
      investment: 4_500_000,
    },
    expense: {
      housing: 21_000_000,
      groceries: 8_700_000,
      utilities: 4_650_000,
      transport: 3_900_000,
      leisure: 2_850_000,
      other: 4_211_250,
    },
    transactions: [
      {
        id: "t1",
        name: "Stripe Payout - Engineering Retainer",
        day: 30,
        meta: "Checking • Completed",
        amount: 48_000_000,
        status: "Direct Deposit",
      },
      {
        id: "t2",
        name: "Highland Lofts Rent",
        day: 28,
        meta: "Housing • Auto-pay",
        amount: -21_000_000,
        status: "Wire Transfer",
      },
      {
        id: "t3",
        name: "Whole Foods Market",
        day: 27,
        meta: "Groceries • Card •• 4921",
        amount: -2_134_500,
        status: "Settled",
      },
      {
        id: "t4",
        name: "Vercel Inc - Pro Subscription",
        day: 26,
        meta: "Software & Tech • Card •• 8012",
        amount: -300_000,
        status: "Recurring",
      },
    ],
  },
  {
    income: {
      salary: 60_000_000,
      freelance: 15_000_000,
      investment: 4_807_500,
    },
    expense: {
      housing: 21_000_000,
      groceries: 9_150_000,
      utilities: 5_325_000,
      transport: 4_125_000,
      leisure: 3_075_000,
      other: 3_978_000,
    },
    transactions: [
      {
        id: "t1",
        name: "Stripe Payout - Engineering Retainer",
        day: 30,
        meta: "Checking • Completed",
        amount: 52_000_000,
        status: "Direct Deposit",
      },
      {
        id: "t2",
        name: "Highland Lofts Rent",
        day: 28,
        meta: "Housing • Auto-pay",
        amount: -21_000_000,
        status: "Wire Transfer",
      },
      {
        id: "t3",
        name: "Whole Foods Market",
        day: 25,
        meta: "Groceries • Card •• 4921",
        amount: -2_200_000,
        status: "Settled",
      },
      {
        id: "t4",
        name: "Vercel Inc - Pro Subscription",
        day: 24,
        meta: "Software & Tech • Card •• 8012",
        amount: -300_000,
        status: "Recurring",
      },
    ],
  },
  {
    income: {
      salary: 63_000_000,
      freelance: 17_250_000,
      investment: 4_950_000,
    },
    expense: {
      housing: 21_000_000,
      groceries: 8_400_000,
      utilities: 4_500_000,
      transport: 3_750_000,
      leisure: 2_700_000,
      other: 4_509_000,
    },
    transactions: [
      {
        id: "t1",
        name: "Stripe Payout - Engineering Retainer",
        day: 30,
        meta: "Checking • Completed",
        amount: 49_500_000,
        status: "Direct Deposit",
      },
      {
        id: "t2",
        name: "Highland Lofts Rent",
        day: 28,
        meta: "Housing • Auto-pay",
        amount: -21_000_000,
        status: "Wire Transfer",
      },
      {
        id: "t3",
        name: "Whole Foods Market",
        day: 25,
        meta: "Groceries • Card •• 4921",
        amount: -2_450_000,
        status: "Settled",
      },
      {
        id: "t4",
        name: "Vercel Inc - Pro Subscription",
        day: 24,
        meta: "Software & Tech • Card •• 8012",
        amount: -300_000,
        status: "Recurring",
      },
    ],
  },
  {
    income: {
      salary: 60_750_000,
      freelance: 15_750_000,
      investment: 5_261_250,
    },
    expense: {
      housing: 21_000_000,
      groceries: 9_600_000,
      utilities: 5_475_000,
      transport: 4_500_000,
      leisure: 3_300_000,
      other: 4_281_000,
    },
    transactions: [
      {
        id: "t1",
        name: "Stripe Payout - Engineering Retainer",
        day: 30,
        meta: "Checking • Completed",
        amount: 50_500_000,
        status: "Direct Deposit",
      },
      {
        id: "t2",
        name: "Highland Lofts Rent",
        day: 28,
        meta: "Housing • Auto-pay",
        amount: -21_000_000,
        status: "Wire Transfer",
      },
      {
        id: "t3",
        name: "Whole Foods Market",
        day: 25,
        meta: "Groceries • Card •• 4921",
        amount: -2_650_000,
        status: "Settled",
      },
      {
        id: "t4",
        name: "Vercel Inc - Pro Subscription",
        day: 24,
        meta: "Software & Tech • Card •• 8012",
        amount: -300_000,
        status: "Recurring",
      },
    ],
  },
  {
    income: {
      salary: 64_500_000,
      freelance: 18_000_000,
      investment: 6_330_000,
    },
    expense: {
      housing: 21_000_000,
      groceries: 9_000_000,
      utilities: 4_800_000,
      transport: 4_050_000,
      leisure: 3_000_000,
      other: 3_151_500,
    },
    transactions: [
      {
        id: "t1",
        name: "Stripe Payout - Engineering Retainer",
        day: 30,
        meta: "Checking • Completed",
        amount: 54_000_000,
        status: "Direct Deposit",
      },
      {
        id: "t2",
        name: "Highland Lofts Rent",
        day: 28,
        meta: "Housing • Auto-pay",
        amount: -21_000_000,
        status: "Wire Transfer",
      },
      {
        id: "t3",
        name: "Whole Foods Market",
        day: 25,
        meta: "Groceries • Card •• 4921",
        amount: -2_350_000,
        status: "Settled",
      },
      {
        id: "t4",
        name: "Vercel Inc - Pro Subscription",
        day: 24,
        meta: "Software & Tech • Card •• 8012",
        amount: -300_000,
        status: "Recurring",
      },
    ],
  },
  {
    // Current / active month
    income: {
      salary: 72_300_000,
      freelance: 16_500_000,
      investment: 7_500_000,
    },
    expense: {
      housing: 21_000_000,
      groceries: 9_300_000,
      utilities: 5_100_000,
      transport: 4_200_000,
      leisure: 3_150_000,
      other: 4_957_500,
    },
    transactions: [
      {
        id: "t1",
        name: "Stripe Payout - Engineering Retainer",
        day: 5,
        meta: "Checking • Completed",
        amount: 48_000_000,
        status: "Direct Deposit",
      },
      {
        id: "t2",
        name: "Highland Lofts Rent",
        day: 3,
        meta: "Housing • Auto-pay",
        amount: -21_000_000,
        status: "Wire Transfer",
      },
      {
        id: "t3",
        name: "Whole Foods Market",
        day: 2,
        meta: "Groceries • Card •• 4921",
        amount: -2_134_500,
        status: "Settled",
      },
      {
        id: "t4",
        name: "Vercel Inc - Pro Subscription",
        day: 1,
        meta: "Software & Tech • Card •• 8012",
        amount: -300_000,
        status: "Recurring",
      },
    ],
  },
];

const monthLabels = getLastMonth();

export const monthlyData = rawMonthlyData.map((m, i) => {
  const prev = rawMonthlyData[i - 1];
  const { month, year } = monthLabels[i];

  const totalIncome = rawMonthlyData
    .slice(0, i + 1)
    .reduce((total, month) => total + sumRecord(month.income), 0);
  const totalExpenses = rawMonthlyData
    .slice(0, i + 1)
    .reduce((total, month) => total + sumRecord(month.expense), 0);
  const earnedThisMonth = sumRecord(m.income);
  const spentThisMonth = sumRecord(m.expense);
  const netBalance = totalIncome - totalExpenses;

  return {
    month,
    year,
    incomeCategories: buildCategoryAmounts(
      INCOME_CATEGORIES,
      m.income,
      earnedThisMonth
    ),
    expenseCategories: buildCategoryAmounts(
      EXPENSE_CATEGORIES,
      m.expense,
      spentThisMonth
    ),
    totalIncome,
    totalExpenses,
    earnedThisMonth,
    spentThisMonth,
    incomeChangePct: prev
      ? pctChange(earnedThisMonth, sumRecord(prev.income))
      : null,
    expenseChangePct: prev
      ? pctChange(spentThisMonth, sumRecord(prev.expense))
      : null,
    netBalance,
    savingsRatePct: Number(((netBalance / totalIncome) * 100).toFixed(1)),
    budgetCap: BUDGET_CAP,
    budgetCapPct: Number(((totalExpenses / BUDGET_CAP) * 100).toFixed(1)),
    inflowCount: INCOME_CATEGORIES.length,
    transactions: m.transactions.map(({ day, ...transaction }) => ({
      ...transaction,
      date: `${day} ${month} ${year}`,
    })),
  };
});

export const currentMonth = monthlyData[monthlyData.length - 1];
export const trendChart = monthlyData.map((m) => ({
  month: m.month,
  income: m.totalIncome,
  expenses: m.totalExpenses,
}));
