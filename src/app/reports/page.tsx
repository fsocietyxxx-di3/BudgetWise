import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { CategoryChart } from '@/components/dashboard/category-chart';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ReportsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background/60">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>Analyze your spending habits over time.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                      <div className="col-span-12 lg:col-span-8">
                          <SpendingChart />
                      </div>
                      <div className="col-span-12 lg:col-span-4">
                          <CategoryChart />
                      </div>
                  </div>
                </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
