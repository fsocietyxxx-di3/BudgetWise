import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { getSpendingInsights } from "@/ai/flows/spending-insights-dashboard";
import { expenses, budgets } from "@/lib/data";

export default async function KeyInsights() {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const categorySpending = expenses.reduce((acc, expense) => {
    acc[expense.categoryId] = (acc[expense.categoryId] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categorySpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(item => item[0]);

  let insights = "No insights available.";
  try {
    const spendingInsights = await getSpendingInsights({
      totalExpenses,
      budget: totalBudget,
      topCategories,
    });
    insights = spendingInsights.insights;
  } catch (e) {
    console.error(e);
    insights = "Could not generate insights at this time.";
  }


  return (
    <Card className="h-full bg-primary/20 border-primary/40">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/50">
          <Lightbulb className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>AI-powered analysis of your spending habits.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/80 leading-relaxed">
            {insights}
        </p>
      </CardContent>
    </Card>
  );
}