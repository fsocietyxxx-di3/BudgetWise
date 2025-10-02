import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default async function KeyInsights() {
  const insights = "You're on track with your budget this month. Your top spending categories are Food and Transportation, which is typical. Consider looking for ways to save on groceries to free up more of your budget.";

  return (
    <Card className="h-full bg-primary/20 border-primary/40">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/50">
          <Lightbulb className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>AI-powered analysis of your spending habits.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/80 leading-relaxed">
            {insights}
        </p>
      </CardContent>
    </Card>
  );
}
