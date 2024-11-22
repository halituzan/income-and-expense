"use client";
import {
  clearIncomeValues,
  ExpenditureValues,
  selectIncomes,
  selectIncomeValues,
  setIncomes,
  setIncomeValues,
} from "@/lib/features/expenditure";
import getIncomesCategories from "@/services/Categories/getIncomesCategories";
import getIncome from "@/services/Income/getIncome";
import setIncome from "@/services/Income/setIncome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import DateRangePicker from "../UI/DateRangePicker";
type IncomeProps = {
  id: string;
  amount: number;
  categoryId: string;
  date: any;
  category?: CategoryProps;
};
type CategoryProps = {
  id: string;
  name: string;
};
const Incomes = () => {
  const dispatch = useDispatch();
  const incomes = useSelector(selectIncomes);
  const expenseValues = useSelector(selectIncomeValues);
  const { amount, categoryId, date } = expenseValues;
  const [incomesCategories, setIncomesCategories] = useState<any>([]);

  const dispatchHandler = (key: keyof ExpenditureValues, value: any) => {
    dispatch(setIncomeValues({ key: key, value: value }));
  };

  const addIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && categoryId) {
      const newExpense: IncomeProps = {
        id: uuidv4(),
        amount: parseFloat(amount),
        categoryId,
        date,
      };
      const data = setIncome(newExpense);
      const expensesData = getIncome();

      dispatch(setIncomes(expensesData));
      dispatch(clearIncomeValues());
    }
  };

  useEffect(() => {
    const data = getIncomesCategories();
    setIncomesCategories(data);
  }, []);

  useEffect(() => {
    const incomesData = getIncome();
    dispatch(setIncomes(incomesData));
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>Yeni Gelir Ekle</h2>
        <form onSubmit={addIncome} className=' grid grid-cols-12 gap-2 w-full'>
          <div className='col-span-4 mt-0'>
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
          <div className='col-span-4 mt-0'>
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
              {incomesCategories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className='col-span-2 mt-0'>
            <label
              htmlFor='date'
              className='block text-sm font-medium text-gray-700'
            >
              Gelir Zamanı
            </label>
            <input
              type='date'
              id='date'
              name='date'
              value={date}
              onChange={(e: any) =>
                dispatchHandler(e.target.name, e.target.value)
              }
              className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm'
              required
            />
          </div>
          <div className='col-span-2 self flex items-end '>
            <button
              type='submit'
              className='w-full bg-green-500 h-12 text-white px-4 py-2 rounded-md hover:bg-green-600 '
            >
              Gelir Ekle
            </button>
          </div>
        </form>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex justify-between items-center w-full'>
          <h2 className='text-2xl font-semibold mb-4'>Gelir Geçmişi</h2>
          <DateRangePicker />
        </div>

        {incomes.length === 0 ? (
          <p className='text-gray-500'>Henüz gelir kaydı bulunmamaktadır.</p>
        ) : (
          <ul className='space-y-4 divide-y'>
            {incomes.map((expense: any) => (
              <li key={expense.id} className='py-2'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-semibold'>{expense?.category?.name}</p>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold text-lg'>
                      {expense.amount.toFixed(2)} TL
                    </p>
                    <p className='text-sm text-gray-500'>
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
export default Incomes;
