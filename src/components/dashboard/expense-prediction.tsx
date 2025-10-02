'use client';

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ExpensePrediction() {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSaveKey = () => {
    // In a real app, you'd want to store this securely, maybe in localStorage
    // and use it to initialize the Genkit AI object.
    if (apiKey) {
        // For this demo, we'll just show a toast.
        toast({
            title: "API Key Saved",
            description: "Your Gemini API key has been saved locally.",
        });
    } else {
        toast({
            variant: "destructive",
            title: "Invalid API Key",
            description: "Please enter a valid Gemini API key.",
        });
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
          To enable AI-powered predictions, please provide your Gemini API key.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">Gemini API Key</label>
            <Input 
                id="apiKey"
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
            />
        </div>
        <Button onClick={handleSaveKey} className="w-full bg-accent hover:bg-accent/90">
            Save Key &amp; Predict
        </Button>
        <p className="text-xs text-muted-foreground text-center">
            You can get a free API key from Google AI Studio.
        </p>
      </CardContent>
    </Card>
  );
}