export interface WeeklyActivity {
  labels: string[];
  deposit: number[];
  withdraw: number[];
}

export interface BalanceHistory {
  labels: string[];
  balances: number[];
}

export interface ExpenseCategory {
  label: string;
  value: number;
  color: string;
}

export interface ChartData {
  weeklyActivity: WeeklyActivity;
  balanceHistory: BalanceHistory;
  expenseStatistics: ExpenseCategory[];
}
