'use client';
import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useExpenses } from "@/contexts/expense-context";

export function RecentSpending() {
    const { expenses, searchTerm, getCategoryById } = useExpenses();

    const filteredExpenses = useMemo(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        return expenses.filter(expense => 
            expense.description.toLowerCase().includes(lowercasedTerm) ||
            getCategoryById(expense.categoryId)?.name.toLowerCase().includes(lowercasedTerm)
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [expenses, searchTerm, getCategoryById]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Spending</CardTitle>
        <CardDescription>A list of your most recent transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mobile View */}
        <div className="md:hidden">
          <div className="space-y-4">
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => {
                const category = getCategoryById(expense.categoryId);
                return (
                  <div key={expense.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col space-y-1.5">
                        <p className="font-semibold">{expense.description}</p>
                        {category && (
                          <Badge variant="outline" className="w-fit flex items-center gap-2">
                             <category.icon className={cn("h-3 w-3")} style={{ color: category.color }}/>
                             {category.name}
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₱{expense.amount.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{new Date(expense.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No transactions found.
              </div>
            )}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => {
                  const category = getCategoryById(expense.categoryId)
                  return (
                      <TableRow key={expense.id}>
                      <TableCell>
                          {category && (
                          <Badge variant="outline" className="flex items-center gap-2 w-fit">
                              <category.icon className={cn("h-3 w-3")} style={{ color: category.color }}/>
                              {category.name}
                          </Badge>
                          )}
                      </TableCell>
                      <TableCell>
                          <div className="font-medium">{expense.description}</div>
                      </TableCell>
                      <TableCell className="text-right">₱{expense.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{new Date(expense.date).toLocaleDateString()}</TableCell>
                      </TableRow>
                  )
                  })
              ) : (
                  <TableRow>
                      <TableCell colSpan={4} className="text-center">
                          No transactions found.
                      </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
