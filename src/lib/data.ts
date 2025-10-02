import type { Category, Expense, Budget } from './types';
import {
  UtensilsCrossed,
  Car,
  Ticket,
  Wrench,
  ShoppingCart,
  HeartPulse,
  MoreHorizontal,
} from 'lucide-react';

export const categories: Category[] = [
  { id: 'food', name: 'Food', icon: UtensilsCrossed, color: 'hsl(var(--chart-1))' },
  { id: 'transportation', name: 'Transportation', icon: Car, color: 'hsl(var(--chart-2))' },
  { id: 'entertainment', name: 'Entertainment', icon: Ticket, color: 'hsl(var(--chart-3))' },
  { id: 'utilities', name: 'Utilities', icon: Wrench, color: 'hsl(var(--chart-4))' },
  { id: 'shopping', name: 'Shopping', icon: ShoppingCart, color: 'hsl(var(--chart-5))' },
  { id: 'health', name: 'Health', icon: HeartPulse, color: 'hsl(var(--chart-1))' },
  { id: 'other', name: 'Other', icon: MoreHorizontal, color: 'hsl(var(--muted-foreground))' },
];

export const expenses: Expense[] = [];

const calculateSpent = (categoryId: string) =>
  expenses
    .filter((e) => e.categoryId === categoryId)
    .reduce((sum, e) => sum + e.amount, 0);

export const budgets: Budget[] = [
  { id: '1', categoryId: 'food', amount: 10000, spent: calculateSpent('food') },
  { id: '2', categoryId: 'transportation', amount: 4000, spent: calculateSpent('transportation') },
  { id: '3', categoryId: 'entertainment', amount: 4000, spent: calculateSpent('entertainment') },
  { id: '4', categoryId: 'utilities', amount: 4000, spent: calculateSpent('utilities') },
  { id: '5', categoryId: 'shopping', amount: 5000, spent: calculateSpent('shopping') },
  { id: '6', categoryId: 'health', amount: 2000, spent: calculateSpent('health') },
  { id: '7', categoryId: 'other', amount: 1000, spent: calculateSpent('other') },
];

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}
