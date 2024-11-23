"use client";
import {
  clearExpenseValues,
  ExpenditureValues,
  selectExpenses,
  selectExpenseValues,
  setExpenses,
  setExpenseValues
} from "@/lib/features/expenditure";
import getExpensesCategories from "@/services/Categories/getExpensesCategories";
import getExpense from "@/services/Expense/getExpense";
import setExpense from "@/services/Expense/setExpense";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import HistoriesAddAction from "../HistoriesAddAction";
type ExpenseProps = {
  id: string;
  amount: number;
  categoryId: string;
  date: any;
  category?: CategoryProps;
  description: string
};
type CategoryProps = {
  id: string;
  name: string;
};
const Expense: FC = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const expenseValues = useSelector(selectExpenseValues);
  const { amount, categoryId, date, description } = expenseValues;
  const [expenseCategories, setExpenseCategories] = useState<any>([]);

  const dispatchHandler = (key: keyof ExpenditureValues, value: any) => {
    dispatch(setExpenseValues({ key: key, value: value }));
  };

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && categoryId) {
      const newExpense: ExpenseProps = {
        id: uuidv4(),
        amount: parseFloat(amount),
        categoryId,
        date,
        description
      };
      const data = setExpense(newExpense);
      const expensesData = getExpense();

      dispatch(setExpenses(expensesData));
      dispatch(clearExpenseValues());
    }
  };

  useEffect(() => {
    const data = getExpensesCategories();
    setExpenseCategories(data);
  }, []);

  useEffect(() => {
    const expensesData = getExpense();
    dispatch(setExpenses(expensesData));
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <HistoriesAddAction buttonColor={"expenses"} buttonText="Harcama Ekle" values={expenseValues} categoryData={expenseCategories} dispatchHandler={dispatchHandler} addAction={addExpense} title={"Yeni Harcama Ekle"} />


      <div className='bg-slate-100 dark:bg-primary/80 p-6 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold mb-4 text-primary dark:text-slate-50'>Harcama Geçmişi</h2>
        {expenses.length === 0 ? (
          <p className='text-primary dark:text-slate-50'>Henüz harcama kaydı bulunmamaktadır.</p>
        ) : (
          <ul className='space-y-4 divide-y'>
            {expenses.map((expense: any) => (
              <li key={expense.id} className='py-2'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-semibold text-primary dark:text-slate-50'>{expense?.category?.name}</p>
                    <p className='text-primary/80 dark:text-slate-200 text-sm'>{expense?.description}</p>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold text-lg text-primary dark:text-slate-50'>
                      {expense.amount.toFixed(2)} TL
                    </p>
                    <p className='text-sm text-primary/80 dark:text-slate-200'>
                      {expense.date.toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Expense;
