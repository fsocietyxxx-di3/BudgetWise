import type { Category, Expense, Budget } from './types';
import {
  UtensilsCrossed,
  Car,
  Ticket,
  Wrench,
  ShoppingCart,
  HeartPulse,
  MoreHorizontal,
  LucideIcon,
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

export const expenses: Expense[] = [
  { id: '1', description: 'Groceries from Walmart', amount: 75.5, date: new Date('2024-07-20'), categoryId: 'food' },
  { id: '2', description: 'Gasoline', amount: 40.0, date: new Date('2024-07-19'), categoryId: 'transportation' },
  { id: '3', description: 'Movie tickets for "Dune"', amount: 30.0, date: new Date('2024-07-18'), categoryId: 'entertainment' },
  { id: '4', description: 'Electricity bill', amount: 120.0, date: new Date('2024-07-15'), categoryId: 'utilities' },
  { id: '5', description: 'New pair of shoes', amount: 90.0, date: new Date('2024-07-12'), categoryId: 'shopping' },
  { id: '6', description: 'Lunch with friends', amount: 45.25, date: new Date('2024-07-10'), categoryId: 'food' },
  { id: '7', description: 'Pharmacy', amount: 25.0, date: new Date('2024-07-09'), categoryId: 'health' },
  { id: '8', description: 'Uber ride', amount: 15.75, date: new Date('2024-06-12'), categoryId: 'transportation' },
  { id: '9', description: 'Concert ticket', amount: 150.0, date: new Date('2024-06-15'), categoryId: 'entertainment' },
  { id: '10', description: 'Internet bill', amount: 60.0, date: new Date('2024-06-18'), categoryId: 'utilities' },
  { id: '11', description: 'Dinner at Italian restaurant', amount: 85.0, date: new Date('2024-05-11'), categoryId: 'food' },
  { id: '12', description: 'New shirt', amount: 55.0, date: new Date('2024-05-12'), categoryId: 'shopping' },
];

const calculateSpent = (categoryId: string) =>
  expenses
    .filter((e) => e.categoryId === categoryId && e.date.getMonth() === new Date('2024-07-01').getMonth())
    .reduce((sum, e) => sum + e.amount, 0);

export const budgets: Budget[] = [
  { id: '1', categoryId: 'food', amount: 500, spent: calculateSpent('food') },
  { id: '2', categoryId: 'transportation', amount: 150, spent: calculateSpent('transportation') },
  { id: '3', categoryId: 'entertainment', amount: 200, spent: calculateSpent('entertainment') },
  { id: '4', categoryId: 'utilities', amount: 250, spent: calculateSpent('utilities') },
  { id: '5', categoryId: 'shopping', amount: 300, spent: calculateSpent('shopping') },
  { id: '6', categoryId: 'health', amount: 100, spent: calculateSpent('health') },
  { id: '7', categoryId: 'other', amount: 100, spent: calculateSpent('other') },
];

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}
