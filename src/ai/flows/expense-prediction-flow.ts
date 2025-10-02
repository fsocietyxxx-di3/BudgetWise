'use server';

/**
 * @fileOverview A flow for generating expense predictions.
 *
 * - getExpensePrediction - A function that generates an expense prediction.
 * - ExpensePredictionInput - The input type for the getExpensePrediction function.
 * - ExpensePredictionOutput - The return type for the getExpensePrediction function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExpenseSchema = z.object({
  description: z.string(),
  amount: z.number(),
  date: z.string(),
  category: z.string(),
});

const ExpensePredictionInputSchema = z.object({
  recentExpenses: z.array(ExpenseSchema).describe("A list of recent expenses to base the prediction on."),
});
export type ExpensePredictionInput = z.infer<typeof ExpensePredictionInputSchema>;

const ExpensePredictionOutputSchema = z.object({
  prediction: z.string().describe("A textual prediction of total spending for the next 30 days, including a breakdown by category and some brief advice."),
});
export type ExpensePredictionOutput = z.infer<typeof ExpensePredictionOutputSchema>;

export async function getExpensePrediction(input: ExpensePredictionInput): Promise<ExpensePredictionOutput> {
  return expensePredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'expensePredictionPrompt',
  input: { schema: ExpensePredictionInputSchema },
  output: { schema: ExpensePredictionOutputSchema },
  prompt: `You are a financial analyst. Based on the following list of recent expenses, predict the total spending for the next 30 days. 
  
The currency is in Philippine Pesos (₱). Provide a total estimated amount and a likely breakdown by category. Keep the analysis concise and provide one piece of actionable advice.

Recent Expenses:
{{#each recentExpenses}}
- {{date}}: {{description}} (₱{{{amount}}} in {{category}})
{{/each}}
`,
});

const expensePredictionFlow = ai.defineFlow(
  {
    name: 'expensePredictionFlow',
    inputSchema: ExpensePredictionInputSchema,
    outputSchema: ExpensePredictionOutputSchema,
  },
  async (input) => {
    // Check if there are any expenses
    if (input.recentExpenses.length === 0) {
      return { prediction: "Not enough data to make a prediction. Please add some expenses first." };
    }
    const { output } = await prompt(input);
    return output!;
  }
);
