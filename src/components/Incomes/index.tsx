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
import HistoriesAddAction from "../HistoriesAddAction";
type IncomeProps = {
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
const Incomes = () => {
  const dispatch = useDispatch();
  const incomes = useSelector(selectIncomes);
  
  const expenseValues = useSelector(selectIncomeValues);
  const { amount, categoryId, date, description } = expenseValues;
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
        description
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
      <HistoriesAddAction buttonColor={"incomes"} buttonText="Gelir Ekle" title="Yeni Gelir Ekle" values={expenseValues} categoryData={incomesCategories} dispatchHandler={dispatchHandler} addAction={addIncome} />

      <div className='bg-slate-100 dark:bg-primary/80 p-6 rounded-lg shadow-md'>
        <div className='flex flex-col md:flex-row justify-between items-center w-full mb-2'>
          <h2 className='text-2xl font-semibold mb-4 text-primary dark:text-slate-50'>Gelir Geçmişi</h2>
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
export default Incomes;
