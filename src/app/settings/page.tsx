'use client';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { categories, getCategoryById } from '@/lib/data';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import { useExpenses } from '@/contexts/expense-context';

export default function SettingsPage() {
  const { budgets } = useExpenses();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background/60">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Categories</CardTitle>
                        <CardDescription>Add, edit, or remove spending categories.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            {categories.map(category => (
                                <div key={category.id} className="flex items-center justify-between p-2 rounded-md border">
                                    <div className="flex items-center gap-3">
                                        <category.icon className={cn("h-5 w-5")} style={{color: category.color}} />
                                        <span>{category.name}</span>
                                    </div>
                                    <Button variant="ghost" size="sm">Edit</Button>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Category
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Customize Budgets</CardTitle>
                        <CardDescription>Set or change your monthly budget for each category.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {budgets.map(budget => {
                          const category = getCategoryById(budget.categoryId);
                          if (!category) return null;
                          const remaining = budget.amount - budget.spent;

                          return (
                            <div key={budget.id} className="space-y-2">
                              <div className="flex justify-between">
                                <Label htmlFor={`budget-${budget.categoryId}`}>{category.name}</Label>
                                <span className="text-sm text-muted-foreground">
                                  ${remaining.toFixed(2)} remaining
                                </span>
                              </div>
                              <Input id={`budget-${budget.categoryId}`} type="number" defaultValue={budget.amount} />
                            </div>
                          )
                        })}

                        <Button className="w-full bg-accent hover:bg-accent/90">Update Budgets</Button>
                    </CardContent>
                </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
