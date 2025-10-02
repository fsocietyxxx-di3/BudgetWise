'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Expense, Budget } from '@/lib/types';
import { expenses as initialExpenses, budgets as initialBudgets } from '@/lib/data';

interface ExpenseContextType {
  expenses: Expense[];
  budgets: Budget[];
  addExpense: (expense: Expense) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);

  const addExpense = (expense: Expense) => {
    setExpenses(prevExpenses => [...prevExpenses, expense]);
    
    // Also update the spent amount in the corresponding budget
    setBudgets(prevBudgets => prevBudgets.map(budget => {
      if (budget.categoryId === expense.categoryId) {
        const newSpent = budget.spent + expense.amount;
        return { ...budget, spent: newSpent };
      }
      return budget;
    }));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, budgets, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}
