'use client';
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import { useExpenses } from '@/contexts/expense-context';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import type { Category } from '@/lib/types';
import { UtensilsCrossed } from 'lucide-react';

const CategoryForm = ({ category, onSave, closeDialog }: { category?: Category, onSave: (cat: any) => void, closeDialog: () => void }) => {
    const [name, setName] = useState(category?.name || '');
    const [color, setColor] = useState(category?.color || '#000000');

    const handleSubmit = () => {
        onSave({ id: category?.id, name, color, icon: UtensilsCrossed });
        closeDialog();
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input id="category-name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="category-color">Color</Label>
                <Input id="category-color" type="color" value={color} onChange={e => setColor(e.target.value)} />
            </div>
            <DialogFooter>
                <Button onClick={handleSubmit}>Save Category</Button>
            </DialogFooter>
        </div>
    )
}

export default function SettingsPage() {
  const { budgets, categories, getCategoryById, updateBudgets, addCategory, updateCategory } = useExpenses();
  const { toast } = useToast();
  const [budgetValues, setBudgetValues] = useState<Record<string, number>>({});
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);


  useEffect(() => {
    const initialBudgets = budgets.reduce((acc, budget) => {
        acc[budget.categoryId] = budget.amount;
        return acc;
    }, {} as Record<string, number>);
    setBudgetValues(initialBudgets);
  }, [budgets]);

  const handleBudgetChange = (categoryId: string, value: string) => {
    setBudgetValues(prev => ({ ...prev, [categoryId]: Number(value) }));
  };

  const handleUpdateBudgets = () => {
    updateBudgets(budgetValues);
    toast({
        title: "Budgets Updated",
        description: "Your budget amounts have been successfully updated.",
    });
  }

  const handleSaveCategory = (categoryData: any) => {
    if(categoryData.id) {
        updateCategory(categoryData);
         toast({
            title: "Category Updated",
            description: `The ${categoryData.name} category has been updated.`,
        });
    } else {
        addCategory(categoryData);
        toast({
            title: "Category Added",
            description: `The ${categoryData.name} category has been added.`,
        });
    }
  }

  const openCategoryDialog = (category?: Category) => {
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background/60">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? 'Edit' : 'Add'} Category</DialogTitle>
                        <DialogDescription>
                           {editingCategory ? 'Edit the details of your category.' : 'Enter the details for a new category.'}
                        </DialogDescription>
                    </DialogHeader>
                    <CategoryForm 
                        category={editingCategory}
                        onSave={handleSaveCategory} 
                        closeDialog={() => setIsCategoryDialogOpen(false)} 
                    />
                </DialogContent>
            </Dialog>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Categories</CardTitle>
                        <CardDescription>Add, edit, or remove spending categories.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            {categories.map(category => (
                                <div key={category.id} className="flex items-center justify-between p-2 rounded-md border">
                                    <div className="flex items-center gap-3">
                                        <category.icon className={cn("h-5 w-5")} style={{color: category.color}} />
                                        <span>{category.name}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => openCategoryDialog(category)}>Edit</Button>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full" onClick={() => openCategoryDialog()}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Category
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Customize Budgets</CardTitle>
                        <CardDescription>Set or change your monthly budget for each category.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {budgets.map(budget => {
                          const category = getCategoryById(budget.categoryId);
                          if (!category) return null;
                          const remaining = (budgetValues[budget.categoryId] || budget.amount) - budget.spent;

                          return (
                            <div key={budget.id} className="space-y-2">
                              <div className="flex justify-between">
                                <Label htmlFor={`budget-${budget.categoryId}`}>{category.name}</Label>
                                <span className="text-sm text-muted-foreground">
                                  ₱{remaining.toFixed(2)} remaining
                                </span>
                              </div>
                              <Input 
                                id={`budget-${budget.categoryId}`} 
                                type="number" 
                                value={budgetValues[budget.categoryId] || ''}
                                onChange={(e) => handleBudgetChange(budget.categoryId, e.target.value)}
                               />
                            </div>
                          )
                        })}

                        <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleUpdateBudgets}>Update Budgets</Button>
                    </CardContent>
                </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
