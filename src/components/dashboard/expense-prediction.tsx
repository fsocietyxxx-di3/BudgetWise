import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { WandSparkles } from "lucide-react"

export function ExpensePrediction() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <WandSparkles className="h-5 w-5 text-accent" />
            Expense Prediction
        </CardTitle>
        <CardDescription>
          AI-powered predictions for your upcoming expenses.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center h-full min-h-[160px]">
        <div className="text-sm text-muted-foreground space-y-2">
        <p>This feature is coming soon!</p>
        <p>Our AI will analyze your past behavior to predict your future spending, helping you plan ahead.</p>
        </div>
      </CardContent>
    </Card>
  )
}
