"use client";
import {
  clearExpenseValues,
  clearIncomeValues,
  ExpenditureValues,
  selectExpenseValues,
  selectIncomeValues,
  setExpenses,
  setExpenseValues,
  setIncomes,
  setIncomeValues,
} from "@/lib/features/expenditure";
import getExpensesCategories from "@/services/Categories/getExpensesCategories";
import getIncomesCategories from "@/services/Categories/getIncomesCategories";
import getExpense from "@/services/Expense/getExpense";
import setExpense from "@/services/Expense/setExpense";
import getIncome from "@/services/Income/getIncome";
import setIncome from "@/services/Income/setIncome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
type ExpenseProps = {
  id: string;
  amount: number;
  categoryId: string;
  date: any;
  description: string;
  category?: CategoryProps;
};
type CategoryProps = {
  id: string;
  name: string;
};
type Props = {};

const FastAction = (props: Props) => {
  const dispatch = useDispatch();
  const expenseValues = useSelector(selectExpenseValues);
  const incomeValues = useSelector(selectIncomeValues);

  const [expenseCategories, setExpenseCategories] = useState<any>([]);
  const [incomeCategories, setIncomeCategories] = useState<any>([]);
  const [tab, setTab] = useState("income");
  const { amount, categoryId, date, description } =
    tab === "expense" ? expenseValues : incomeValues;
  const dispatchHandler = (key: keyof ExpenditureValues, value: any) => {
    if (tab === "expense") {
      dispatch(setExpenseValues({ key: key, value: value }));
    } else {
      dispatch(setIncomeValues({ key: key, value: value }));
    }
  };

  const addAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "expense" && amount && categoryId) {
      const newExpense: ExpenseProps = {
        id: uuidv4(),
        amount: parseFloat(amount),
        categoryId,
        date,
        description,
      };
      const data = setExpense(newExpense);
      const expensesData = getExpense();

      dispatch(setExpenses(expensesData));
      dispatch(clearExpenseValues());
    }
    if (tab === "income" && amount && categoryId) {
      const newIncome: ExpenseProps = {
        id: uuidv4(),
        amount: parseFloat(amount),
        categoryId,
        date,
        description,
      };
      const data = setIncome(newIncome);
      const incomeData = getIncome();

      dispatch(setIncomes(incomeData));
      dispatch(clearIncomeValues());
    }
  };

  useEffect(() => {
    const expenseCategory = getExpensesCategories();
    const incomeCategory = getIncomesCategories();
    setExpenseCategories(expenseCategory);
    setIncomeCategories(incomeCategory);
  }, []);

  useEffect(() => {
    const expensesData = getExpense();
    dispatch(setExpenses(expensesData));
  }, []);
  return (
    <div className='h-full flex flex-col justify-between'>
      <div className='w-full shadow bg-white grid grid-cols-2 gap-2 mb-4 rounded-lg'>
        <button
          onClick={() => {
            dispatch(clearIncomeValues());
            setTab("income");
          }}
          className={`col-span-1 h-8 rounded-l-md transition-all delay-100 ${
            tab == "income" ? "bg-primary text-white" : ""
          }`}
        >
          Gelir
        </button>
        <button
          onClick={() => {
            dispatch(clearExpenseValues());
            setTab("expense");
          }}
          className={`col-span-1 h-8 rounded-r-md transition-all delay-100 ${
            tab == "expense" ? "bg-primary text-white" : ""
          }`}
        >
          Gider
        </button>
      </div>
      <form
        onSubmit={addAction}
        className='grid grid-cols-12 gap-2 w-full flex-1'
      >
        <div className='col-span-12 mt-0'>
          <label
            htmlFor='amount'
            className='block text-sm font-medium text-gray-700'
          >
            Miktar
          </label>
          <input
            type='number'
            id='amount'
            name='amount'
            placeholder='Miktar'
            value={amount}
            onChange={(e: any) =>
              dispatchHandler(e.target.name, e.target.value)
            }
            className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm'
            required
          />
        </div>
        <div className='col-span-12 mt-0'>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Açıklama
          </label>
          <textarea
            id='description'
            name='description'
            placeholder='Açıklama'
            value={description}
            onChange={(e: any) =>
              dispatchHandler(e.target.name, e.target.value)
            }
            className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm'
            required
          />
        </div>
        <div className='col-span-12 mt-0'>
          <label
            htmlFor='categoryId'
            className='block text-sm font-medium text-gray-700'
          >
            Kategori
          </label>
          <select
            id='categoryId'
            name='categoryId'
            value={categoryId}
            onChange={(e: any) =>
              dispatchHandler(e.target.name, e.target.value)
            }
            className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm'
            required
          >
            <option value=''>Kategori Seçin</option>
            {tab == "expense" &&
              expenseCategories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            {tab == "income" &&
              incomeCategories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
        <div className='col-span-12 mt-0'>
          <label
            htmlFor='date'
            className='block text-sm font-medium text-gray-700'
          >
            Harcama Zamanı
          </label>
          <input
            type='date'
            id='date'
            name='date'
            placeholder='dd.mm.yyyy'
            value={date}
            onChange={(e: any) =>
              dispatchHandler(e.target.name, e.target.value)
            }
            className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm'
            required
          />
        </div>
        <div className='col-span-12 self-stretch flex items-end mt-4 flex-1'>
          {tab === "expense" ? (
            <button
              type='submit'
              className='w-full bg-expenses h-12 text-white px-4 py-2 rounded-md hover:bg-expenses/80 '
            >
              Harcama Ekle
            </button>
          ) : (
            <button
              type='submit'
              className='w-full bg-incomes h-12 text-white px-4 py-2 rounded-md hover:bg-incomes/80 '
            >
              Gelir Ekle
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FastAction;
