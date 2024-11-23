"use client";
import {
  clearExpenseValues,
  ExpenditureValues,
  selectExpenses,
  selectExpenseValues,
  setExpenses,
  setExpenseValues
} from "@/lib/features/expenditure";
import { Icon } from "@iconify/react";
import getExpensesCategories from "@/services/Categories/getExpensesCategories";
import getExpense from "@/services/Expense/getExpense";
import setExpense from "@/services/Expense/setExpense";
import { Category, ExpenseItem } from "@/types";
import { useTranslations } from "next-intl";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import HistoriesAddAction from "../HistoriesAddAction";
import sortByDate from "@/helpers/sortByDate";
import filterByDateRange from "@/helpers/filteredByDateRange";
import DateRangePicker from "../UI/DateRangePicker";

const Expense: FC = () => {
  const t = useTranslations("Expense")
  const tf = useTranslations("Form")
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const expenseValues = useSelector(selectExpenseValues);
  const { amount, categoryId, date, description } = expenseValues;
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  const [dateRange, setDateRange] = useState<Date[] | undefined[]>([undefined, undefined]);
  const [sort, setSort] = useState<"asc" | "desc" | null>(null);

  const dispatchHandler = (key: keyof ExpenditureValues, value: string) => {
    dispatch(setExpenseValues({ key: key, value: value }));
  };

  const handleSortClick = () => {
    const nextOrder = sort === null ? "desc" : sort === "desc" ? "asc" : null;
    setSort(nextOrder);
  };


  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && categoryId) {
      const newExpense: ExpenseItem = {
        id: uuidv4(),
        amount: parseFloat(amount),
        categoryId,
        date,
        description: description ?? "",
        createdAt: new Date()
      };
      const data = setExpense(newExpense);
      const expensesData = getExpense();

      dispatch(setExpenses(expensesData));
      dispatch(clearExpenseValues());
    }
  };
  const setExpenseDatas = () => {
    const expensesData = getExpense();
    dispatch(setExpenses(expensesData));
  }
  const handleFilterTime = (sorting: any) => {

    if (sorting === null) {
      setExpenseDatas()
    } else {
      let copyData = [...expenses]
      const data = sortByDate(copyData, sorting)
      dispatch(setExpenses(data));
    }

  }
  useEffect(() => {
    handleFilterTime(sort)
  }, [sort]);
  useEffect(() => {
    if (dateRange[0] || dateRange[1]) {
      const data = filterByDateRange(expenses, dateRange[0], dateRange[1])
      dispatch(setExpenses(data));
    } else {
      const data = getExpensesCategories();
      setExpenseCategories(data);
      setExpenseDatas()
    }
  }, [dateRange]);


  return (
    <div className='container mx-auto p-4'>
      <HistoriesAddAction buttonColor={"expenses"} buttonText={tf("Expense.button")} values={expenseValues} categoryData={expenseCategories} dispatchHandler={dispatchHandler} addAction={addExpense} title={t("title")} />

      <div className='bg-slate-100 dark:bg-primary/80 p-6 rounded-lg shadow-md'>
        <div className='flex flex-col md:flex-row justify-between items-center w-full mb-2'>
          <h2 className='text-2xl font-semibold mb-4 text-primary dark:text-slate-50'>{t("history")}</h2>
          <div className="flex items-center">
            <button onClick={() => {
              setExpenseDatas()
              setDateRange([undefined, undefined])
            }} className="mr-2 text-primary dark:text-slate-100">Clear</button>
            <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          </div>
        </div>
        <div className="flex flex-1 justify-between items-center w-full p-1 bg-primary text-slate-100 dark:bg-slate-500 dark:text-slate-100">
          <div>Tür</div>
          <button onClick={handleSortClick} className="flex items-center">
            Tarihe Göre Sırala <Icon icon="bx:sort" />
          </button>
        </div>
        {expenses.length === 0 ? (
          <p className='text-primary dark:text-slate-50'>{t("noData")}</p>
        ) : (
          <ul className='space-y-4 divide-y'>
            {expenses.map((expense: ExpenseItem) => (
              <li key={expense.id} className='py-2'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-semibold text-primary dark:text-slate-50'>{expense?.category?.name}</p>
                    <p className='text-primary/80 dark:text-slate-200 text-sm'>{expense?.description}</p>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold text-lg text-primary dark:text-slate-50'>
                      {expense?.amount?.toFixed(2) ?? 0} TL
                    </p>
                    <p className='text-sm text-primary/80 dark:text-slate-200'>
                      {expense?.date?.toLocaleString()}
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
