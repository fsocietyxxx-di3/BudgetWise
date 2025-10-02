'use client';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';
import { RecentSpending } from '@/components/dashboard/recent-spending';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function TransactionsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background/60">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>View and manage all your transactions.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                    <RecentSpending />
                </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
