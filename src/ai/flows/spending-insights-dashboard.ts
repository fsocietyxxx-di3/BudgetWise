'use server';

/**
 * @fileOverview A flow for generating spending insights for the dashboard.
 *
 * - getSpendingInsights - A function that generates spending insights.
 * - SpendingInsightsInput - The input type for the getSpendingInsights function.
 * - SpendingInsightsOutput - The return type for the getSpendingInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpendingInsightsInputSchema = z.object({
  totalExpenses: z.number().describe('The total expenses for the period.'),
  budget: z.number().describe('The total budget for the period.'),
  topCategories: z.array(z.string()).describe('The top spending categories.'),
});
export type SpendingInsightsInput = z.infer<typeof SpendingInsightsInputSchema>;

const SpendingInsightsOutputSchema = z.object({
  insights: z.string().describe('Key insights on the total expenses, remaining budget, and top spending categories.'),
});
export type SpendingInsightsOutput = z.infer<typeof SpendingInsightsOutputSchema>;

export async function getSpendingInsights(input: SpendingInsightsInput): Promise<SpendingInsightsOutput> {
  return spendingInsightsFlow(input);
}

const spendingInsightsPrompt = ai.definePrompt({
  name: 'spendingInsightsPrompt',
  input: {schema: SpendingInsightsInputSchema},
  output: {schema: SpendingInsightsOutputSchema},
  prompt: `You are a personal finance advisor. Provide key insights based on the following spending data:

Total Expenses: {{{totalExpenses}}}
Budget: {{{budget}}}
Top Spending Categories: {{#each topCategories}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Please provide a summary of the user\'s financial status, including whether they are on track with their budget, and what their top spending categories indicate about their spending habits.`,
});

const spendingInsightsFlow = ai.defineFlow(
  {
    name: 'spendingInsightsFlow',
    inputSchema: SpendingInsightsInputSchema,
    outputSchema: SpendingInsightsOutputSchema,
  },
  async input => {
    const {output} = await spendingInsightsPrompt(input);
    return output!;
  }
);
