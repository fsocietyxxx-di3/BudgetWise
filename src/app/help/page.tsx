import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
                    <CardTitle>How to Use BudgetWise</CardTitle>
                    <CardDescription>A quick guide to get you started on managing your finances.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Step 1: Adding an Expense</AccordionTrigger>
                      <AccordionContent>
                        Click the &quot;Add Expense&quot; button in the header. A dialog will appear where you can enter the description, amount, category, and date of your expense. Click &quot;Save Expense&quot; when you&apos;re done.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Step 2: Viewing Your Dashboard</AccordionTrigger>
                      <AccordionContent>
                        The main dashboard gives you a complete overview of your finances. You can see your total spending, remaining budget, and top spending category at a glance. It also features charts for your spending overview and category breakdown.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Step 3: Checking Transactions</AccordionTrigger>
                      <AccordionContent>
                        Navigate to the &quot;Transactions&quot; page from the sidebar to see a detailed list of all the expenses you have added.
                      </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                      <AccordionTrigger>Step 4: Managing Budgets</AccordionTrigger>
                      <AccordionContent>
                        The &quot;Budgets&quot; page shows you how you are tracking against your monthly budget for each category. The progress bars make it easy to see where your money is going.
                      </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-5">
                      <AccordionTrigger>Step 5: Analyzing Reports</AccordionTrigger>
                      <AccordionContent>
                        Go to the &quot;Reports&quot; page to get a more in-depth look at your spending habits over time with detailed charts and graphs.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                      <AccordionTrigger>Step 6: Getting Expense Predictions</AccordionTrigger>
                      <AccordionContent>
                        On the main dashboard, find the &quot;Expense Prediction&quot; card. Enter your Gemini API key and click the button to get an AI-powered forecast of your spending for the next 30 days. You can get a free API key from Google AI Studio.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-7">
                      <AccordionTrigger>Step 7: Customizing Settings</AccordionTrigger>
                      <AccordionContent>
                        Go to the &quot;Settings&quot; page to manage your spending categories and customize your monthly budgets for each category. This allows you to tailor the app to your personal financial goals.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
