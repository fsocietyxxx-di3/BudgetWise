import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { categories } from '@/lib/data';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';

export default function SettingsPage() {
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
                        <div className="space-y-2">
                            <Label htmlFor="budget-food">Food</Label>
                            <Input id="budget-food" type="number" defaultValue="500" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="budget-shopping">Shopping</Label>
                            <Input id="budget-shopping" type="number" defaultValue="300" />
                        </div>
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
