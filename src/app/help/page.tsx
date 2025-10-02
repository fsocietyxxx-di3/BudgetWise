import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function HelpPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background/60">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Help</CardTitle>
                    <CardDescription>Get help and support for BudgetWise.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>If you need help or have any questions, please feel free to reach out.</p>
                  <div>
                    <p className="font-semibold">Contact Information:</p>
                    <p>Jemrex Estrellado</p>
                    <p>Phone: +63 9935961796</p>
                    <a
                      href="https://www.facebook.com/share/1GyG2P8SN7/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      Facebook Profile
                    </a>
                  </div>
                </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
