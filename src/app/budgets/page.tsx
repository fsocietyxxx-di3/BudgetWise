import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';
import { BudgetGoals } from '@/components/dashboard/budget-goals';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function BudgetsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background/60">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Budgets</CardTitle>
                        <CardDescription>Manage your monthly budgets for each category.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BudgetGoals />
                    </CardContent>
                </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
