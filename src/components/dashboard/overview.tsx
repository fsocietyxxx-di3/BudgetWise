'use client';
import { StatsCards } from './stats-cards';
import { SpendingChart } from './spending-chart';
import { CategoryChart } from './category-chart';
import { RecentSpending } from './recent-spending';
import { BudgetGoals } from './budget-goals';
import KeyInsights from './key-insights';
import { ExpensePrediction } from './expense-prediction';

export default function Overview() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="col-span-12">
        <StatsCards />
      </div>

      <div className="col-span-12 lg:col-span-8">
        <SpendingChart />
      </div>
      <div className="col-span-12 lg:col-span-4">
        <CategoryChart />
      </div>

      <div className="col-span-12 lg:col-span-5">
        <KeyInsights />
      </div>
      <div className="col-span-12 lg:col-span-7">
        <BudgetGoals />
      </div>

      <div className="col-span-12 lg:col-span-8">
        <RecentSpending />
      </div>
      <div className="col-span-12 lg:col-span-4">
        <ExpensePrediction />
      </div>
    </div>
  );
}
