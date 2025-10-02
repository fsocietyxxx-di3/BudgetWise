"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
  ChartConfig,
} from "@/components/ui/chart"
import { useMemo } from "react"
import { useExpenses } from "@/contexts/expense-context"

export function SpendingChart() {
    const { expenses, categories } = useExpenses();
    
    const chartConfig = useMemo(() => {
        const config: ChartConfig = {
            spending: {
                label: "Spending",
            },
        };
        categories.forEach(category => {
            config[category.id] = {
                label: category.name,
                color: category.color,
            }
        });
        return config;
    }, [categories]);

    const monthlySpending = useMemo(() => {
        const data: Record<string, Record<string, any>> = {};
        
        expenses.forEach(expense => {
            const expenseDate = new Date(expense.date);
            const month = expenseDate.toLocaleString('default', { month: 'short' });
            if (!data[month]) {
                data[month] = { month, date: new Date(expenseDate.getFullYear(), expenseDate.getMonth(), 1), ...categories.reduce((acc, cat) => ({...acc, [cat.id]: 0}), {}) };
            }
            if (!data[month][expense.categoryId]) {
                data[month][expense.categoryId] = 0;
            }
            data[month][expense.categoryId] += expense.amount;
        });

        return Object.values(data).sort((a,b) => a.date.getTime() - b.date.getTime());
    }, [expenses, categories]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Overview</CardTitle>
        <CardDescription>An overview of your spending for the last few months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={monthlySpending}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `₱${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {categories.map(category => (
                 <Bar key={category.id} dataKey={category.id} stackId="a" fill={category.color} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
