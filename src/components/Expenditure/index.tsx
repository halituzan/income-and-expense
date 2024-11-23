"use client"
import getExpensesCategories from '@/services/Categories/getExpensesCategories';
import getIncomesCategories from '@/services/Categories/getIncomesCategories';
import dbName from '@/services/dbNames';
import { Icon } from "@iconify/react";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
type Category = {
  id: string;
  name: string;
};

export default function CategoryManager() {
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  const [newIncomeCategory, setNewIncomeCategory] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const { expensesCategory, incomeCategory } = dbName;
  useEffect(() => {
    const incomeData = getIncomesCategories()
    const expensesData = getExpensesCategories()
    setIncomeCategories(incomeData)
    setExpenseCategories(expensesData)
  }, []);

  const addCategory = (type: 'income' | 'expense') => {
    if (type === 'income' && newIncomeCategory.trim() !== '') {
      const oldData = getIncomesCategories()
      const data = [...oldData, { id: uuidv4(), name: newIncomeCategory }]
      localStorage.setItem(incomeCategory, JSON.stringify(data))
      setNewIncomeCategory("")
      setIncomeCategories(data)
    } else if (type === 'expense' && newExpenseCategory.trim() !== '') {
      const oldData = getExpensesCategories()
      const data = [...oldData, { id: uuidv4(), name: newExpenseCategory }]
      localStorage.setItem(expensesCategory, JSON.stringify(data))
      setNewExpenseCategory("")
      setExpenseCategories(data)
    }
  };
  const removeCategory = (type: 'income' | 'expense', id: string) => {
    if (type === 'income') {
      const oldData = getIncomesCategories()
      const data = oldData.filter((item: { id: string }) => item.id !== id)
      localStorage.setItem(incomeCategory, JSON.stringify(data))
      setNewIncomeCategory("")
      setExpenseCategories(data)
    } else if (type === 'expense') {
      const oldData = getExpensesCategories()
      const data = oldData.filter((item: { id: string }) => item.id !== id)
      localStorage.setItem(expensesCategory, JSON.stringify(data))
      setNewExpenseCategory("")
      setExpenseCategories(data)
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gelir Kategorileri */}
        <div className="bg-incomes/10 dark:bg-incomes p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-incomes dark:text-slate-100">Incomes</h2>
          <form onSubmit={(e) => { e.preventDefault(); addCategory("income"); }} className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={newIncomeCategory}
                onChange={(e) => setNewIncomeCategory(e.target.value)}
                placeholder="Yeni gelir kalemi"
                className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none bg-white dark:bg-slate-100"
              />
              <button
                type="submit"
                className="bg-incomes dark:bg-primary text-white px-4 py-2 rounded-r-md hover:bg-incomes dark:hover:bg-primary/80 focus:outline-none"
              >
                Ekle
              </button>
            </div>
          </form>
          <ul className="space-y-2">
            {incomeCategories.map((category: Category) => (
              <div className='flex items-center w-full'>
                <li key={category.id} className="bg-slate-50 p-2 rounded shadow flex-1">{category.name}</li>
                <button
                  onClick={() => removeCategory("income", category.id)}
                  className="bg-warning/80 text-white px-4 py-2 rounded-r-md hover:bg-warning focus:outline-none"
                >
                  <Icon icon="material-symbols:delete" />
                </button>
              </div>
            ))}
          </ul>
        </div>

        {/* Gider Kategorileri */}
        <div className="bg-expenses/10 dark:bg-expenses p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-expenses dark:text-slate-100">Expenses</h2>
          <form onSubmit={(e) => { e.preventDefault(); addCategory('expense'); }} className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={newExpenseCategory}
                onChange={(e) => setNewExpenseCategory(e.target.value)}
                placeholder="Yeni gider kalemi"
                className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none bg-white dark:bg-slate-100"
              />
              <button
                type="submit"
                className="bg-expenses/80 dark:bg-primary text-white px-4 py-2 rounded-r-md hover:bg-expenses focus:outline-none"
              >
                Ekle
              </button>
            </div>
          </form>
          <ul className="space-y-2">
            {expenseCategories.map((category: Category) => (
              <div className='flex items-center w-full'>
                <li key={category.id} className="bg-slate-50 p-2 rounded shadow flex-1">{category.name}</li>
                <button
                  onClick={() => removeCategory("expense", category.id)}
                  className="bg-warning/80 text-white px-4 py-2 rounded-r-md hover:bg-warning focus:outline-none"
                >
                  <Icon icon="material-symbols:delete" />
                </button>
              </div>

            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

