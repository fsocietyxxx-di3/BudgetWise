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
import { Textarea } from "../ui/textarea";
import { setGeminiApiKey } from "@/ai/flows/expense-prediction-flow";

export function ExpensePrediction() {
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const { expenses } = useExpenses();
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');

  const handlePrediction = async () => {
    if (!apiKey) {
      toast({
        variant: "destructive",
        title: "Missing API Key",
        description: "Please enter your Gemini API key to get a prediction.",
      });
      return;
    }
    setLoading(true);
    setPrediction("");
    try {
      // Set the key on the server for the flow to use
      await setGeminiApiKey(apiKey);

      const recentExpenses = expenses.slice(-10).map(e => ({
        description: e.description,
        amount: e.amount,
        date: e.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
        category: e.categoryId
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
          Get an AI-powered forecast of your spending for the next 30 days. Enter your Gemini API key to begin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">Gemini API Key</label>
            <Textarea
                id="apiKey"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="min-h-[60px]"
            />
        </div>

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

        <p className="text-xs text-muted-foreground text-center pt-2">
            You can get a free API key from Google AI Studio. The key is only used for this session.
        </p>
      </CardContent>
    </Card>
  );
}
