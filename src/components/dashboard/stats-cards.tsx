import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DollarSign, Wallet, ShoppingCart, ArrowUp } from "lucide-react"
import { budgets, expenses, getCategoryById } from "@/lib/data"

export function StatsCards() {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const budgetRemaining = totalBudget - totalExpenses;

  const categorySpending = expenses.reduce((acc, expense) => {
    acc[expense.categoryId] = (acc[expense.categoryId] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];
  const topCategoryInfo = getCategoryById(topCategory[0]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${budgetRemaining.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {((budgetRemaining / totalBudget) * 100).toFixed(1)}% of budget left
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Spending Category</CardTitle>
          {topCategoryInfo && <topCategoryInfo.icon className="h-4 w-4 text-muted-foreground" />}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topCategoryInfo?.name}</div>
          <p className="text-xs text-muted-foreground">
            ${topCategory[1].toFixed(2)} spent in this category
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
