"use client"

import * as React from "react"
import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { expenses, categories } from "@/lib/data"
import type { ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  spending: {
    label: "Spending",
  },
  ...categories.reduce((acc, category) => {
    acc[category.id] = {
      label: category.name,
      color: category.color,
    }
    return acc;
  }, {} as Record<string, { label: string; color: string }>)
} satisfies ChartConfig;


export function CategoryChart() {
  const categorySpending = React.useMemo(() => {
    const data: Record<string, number> = {};
    expenses.forEach(expense => {
      if (!data[expense.categoryId]) {
        data[expense.categoryId] = 0;
      }
      data[expense.categoryId] += expense.amount;
    });
    return Object.entries(data).map(([categoryId, amount]) => ({
      category: categoryId,
      amount,
      fill: chartConfig[categoryId]?.color,
    }));
  }, []);

  const totalAmount = React.useMemo(() => {
    return categorySpending.reduce((acc, curr) => acc + curr.amount, 0)
  }, [categorySpending])

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>Spending distribution by category for this month.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={categorySpending}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
                {categorySpending.map((entry) => (
                    <Cell key={`cell-${entry.category}`} fill={entry.fill} />
                ))}
            </Pie>
             <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
