import type { LucideIcon } from 'lucide-react';

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
  categoryId: string;
};

export type Budget = {
  id: string;
  categoryId: string;
  amount: number;
  spent: number;
};
