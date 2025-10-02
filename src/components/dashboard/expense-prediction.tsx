'use client';

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useExpenses } from "@/contexts/expense-context";
import { getExpensePrediction } from "@/ai/flows/expense-prediction-flow";
import { Loader2 } from "lucide-react";

export function ExpensePrediction() {
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const { expenses, getCategoryById } = useExpenses();
  const { toast } = useToast();

  const handlePrediction = async () => {
    setLoading(true);
    setPrediction("");
    try {
      const recentExpenses = expenses.slice(-10).map(e => ({
        description: e.description,
        amount: e.amount,
        date: e.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
        category: getCategoryById(e.categoryId)?.name || 'Unknown',
      }));

      const result = await getExpensePrediction({ recentExpenses });
      setPrediction(result.prediction);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      toast({
        variant: "destructive",
        title: "Prediction Failed",
        description: `Could not generate prediction. ${errorMessage}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WandSparkles className="h-5 w-5 text-accent" />
          Expense Prediction
        </CardTitle>
        <CardDescription>
          Get an AI-powered forecast of your spending for the next 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handlePrediction} className="w-full bg-accent hover:bg-accent/90" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Predicting...
            </>
          ) : (
            "Predict Next Month's Expenses"
          )}
        </Button>
        
        {prediction && (
           <div className="space-y-2 pt-2">
             <h4 className="font-semibold">Prediction Result:</h4>
             <p className="text-sm text-foreground/80 bg-primary/10 p-3 rounded-md">{prediction}</p>
           </div>
        )}
      </CardContent>
    </Card>
  );
}
