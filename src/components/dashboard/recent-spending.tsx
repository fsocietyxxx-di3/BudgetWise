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
import { expenses, getCategoryById } from "@/lib/data"
import { cn } from "@/lib/utils"

export function RecentSpending() {
    const recentExpenses = [...expenses].sort((a,b) => b.date.getTime() - a.date.getTime()).slice(0, 7);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Spending</CardTitle>
        <CardDescription>A list of your most recent transactions.</CardDescription>
      </CardHeader>
      <CardContent>
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
            {recentExpenses.map((expense) => {
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
                  <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{expense.date.toLocaleDateString()}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
