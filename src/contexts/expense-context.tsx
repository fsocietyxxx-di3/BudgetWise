'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { Expense, Budget, Category } from '@/lib/types';
import { expenses as initialExpenses, budgets as initialBudgets, categories as initialCategories } from '@/lib/data';

interface ExpenseContextType {
  expenses: Expense[];
  budgets: Budget[];
  categories: Category[];
  addExpense: (expense: Omit<Expense, 'id' | 'date'> & { date: Date }) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  updateBudgets: (newBudgets: Record<string, number>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  getCategoryById: (id: string) => Category | undefined;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryById = (id: string) => {
    return categories.find(c => c.id === id);
  }

  const addExpense = (expense: Omit<Expense, 'id'>) => {
     setExpenses(prevExpenses => {
        const newExpense = {
            ...expense,
            id: new Date().toISOString(),
        };
        const updatedExpenses = [...prevExpenses, newExpense];

        // Update budget spent after updating expenses
        setBudgets(prevBudgets => prevBudgets.map(budget => {
            const categoryExpenses = updatedExpenses.filter(e => e.categoryId === budget.categoryId);
            const totalSpent = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
            return { ...budget, spent: totalSpent };
        }));

        return updatedExpenses;
    });
  };

  const updateBudgets = (newBudgets: Record<string, number>) => {
    setBudgets(prevBudgets => prevBudgets.map(budget => ({
      ...budget,
      amount: newBudgets[budget.categoryId] || budget.amount,
    })));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = {
      ...category,
      id: category.name.toLowerCase().replace(/\s+/g, '-'),
    };
    setCategories(prev => [...prev, newCategory]);
    // Also add a new budget for this category
    setBudgets(prev => [...prev, { id: newCategory.id, categoryId: newCategory.id, amount: 0, spent: 0}]);
  };

  const updateCategory = (updatedCategory: Category) => {
    setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
  };


  const value = {
    expenses,
    budgets,
    categories,
    addExpense,
    searchTerm,
    setSearchTerm,
    updateBudgets,
    addCategory,
    updateCategory,
    getCategoryById,
  };

  return (
    <ExpenseContext.Provider value={value}>
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
