'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useExpenses } from "@/contexts/expense-context"

export function BudgetGoals() {
  const { budgets, getCategoryById } = useExpenses();
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Budget Goals</CardTitle>
        <CardDescription>Your spending progress for this month's budget.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.map((budget) => {
          const category = getCategoryById(budget.categoryId)
          if (!category) return null;
          const progress = budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0;
          return (
            <div key={budget.id}>
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                    <category.icon className={cn("h-4 w-4")} style={{color: category.color}}/>
                    <span className="text-sm font-medium">{category.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ₱{budget.spent.toFixed(0)} / ₱{budget.amount.toFixed(0)}
                </span>
              </div>
              <Progress value={progress} className="h-2" indicatorStyle={{ backgroundColor: category.color }} />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
