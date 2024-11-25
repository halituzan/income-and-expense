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
import { Category, ExpenseItem } from "@/types";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import CategoryInput from "../UI/CategoryInput";
import dbName from "@/services/dbNames";
import getLimit from "@/services/Categories/getLimit";
import getExpenseCategoryById from "@/services/Categories/getExpenseCategoryById";
import { toast } from "react-toastify";
const { notificationsSettings } = dbName

const validNames: (keyof ExpenditureValues)[] = ['amount', 'categoryId', 'date', 'description'];

const FastAction = () => {
  const dispatch = useDispatch();
  const t = useTranslations("Form");
  const expenseValues = useSelector(selectExpenseValues);
  const incomeValues = useSelector(selectIncomeValues);
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
  const [tab, setTab] = useState("income");
  const { amount, categoryId, date, description } =
    tab === "expense" ? expenseValues : incomeValues;
  const dispatchHandler = (key: keyof ExpenditureValues, value: string) => {
    if (tab === "expense") {
      dispatch(setExpenseValues({ key: key, value: value }));
    } else {
      dispatch(setIncomeValues({ key: key, value: value }));
    }
  };

  const addAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "expense" && amount && categoryId) {
      const newExpense: ExpenseItem = {
        id: uuidv4(),
        amount: parseFloat(amount),
        categoryId: categoryId ?? "",
        date: date ?? "",
        description: description ?? "",
        createdAt: new Date()
      };
      const data = setExpense(newExpense);
      const expensesData = getExpense();

      dispatch(setExpenses(expensesData));
      dispatch(clearExpenseValues());
      const notificationSetting = JSON.parse(localStorage.getItem(notificationsSettings) as string)
      const category = getLimit(categoryId)
      const categoryTotal = getExpenseCategoryById(categoryId).total
      if ((categoryTotal / category.limit) * 100 >= notificationSetting.categoryPercent) {
        if (notificationSetting.isOpenNotification) {
          toast.warning(`${category.data.name ?? "Kategori"} harcama limitinin ${notificationSetting.categoryPercent}%'i aşıldı!`, { position: "top-right" });
          // Daha sonrası için bir logic kurulucak
          // localStorage.setItem(notifications, JSON.stringify([{ message: `${category.data[0].name ?? "Kategori"} harcama limiti ${notificationSetting.categoryPercent}%'i aşıldı!`, category, limit: category.limit }]))
        }

      }
    }
    if (tab === "income" && amount && categoryId) {
      const newIncome: ExpenseItem = {
        id: uuidv4(),
        amount: parseFloat(amount),
        categoryId: categoryId ?? "",
        date,
        description: description ?? "",
        createdAt: new Date()
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
  }, [tab]);

  useEffect(() => {
    const expensesData = getExpense();
    dispatch(setExpenses(expensesData));

  }, []);
  return (
    <div className='h-full flex flex-col justify-between'>
      <div className='w-full shadow bg-slate-100 grid grid-cols-2 gap-2 mb-4 rounded-lg'>
        <button
          onClick={() => {
            dispatch(clearIncomeValues());
            setTab("income");
          }}
          className={`col-span-1 h-8 rounded-l-md transition-all delay-100 ${tab == "income" ? "bg-primary dark:bg-slate-900 text-white" : ""
            }`}
        >
          {t("Income.name")}
        </button>
        <button
          onClick={() => {
            dispatch(clearExpenseValues());
            setTab("expense");
          }}
          className={`col-span-1 h-8 rounded-r-md transition-all delay-100 ${tab == "expense" ? "bg-primary dark:bg-slate-900 text-white" : ""
            }`}
        >
          {t("Expense.name")}
        </button>
      </div>
      <form
        onSubmit={addAction}
        className='grid grid-cols-12 gap-2 w-full flex-1'
      >
        <div className='col-span-12 mt-0'>
          <label
            htmlFor='amount'
            className='block text-sm font-medium text-gray-700 dark:text-slate-100 mb-2'
          >
            {t("amount")}
          </label>
          <input
            type='number'
            id='amount'
            name='amount'
            placeholder={t("amount")}
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (validNames.includes(e.target.name as keyof ExpenditureValues)) {
                dispatchHandler(e.target.name as keyof ExpenditureValues, e.target.value);
              }
            }}
            className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm bg-slate-50 dark:bg-slate-400 outline-none focus:outline-none text-primary dark:text-white placeholder:text-primary dark:placeholder:text-slate-100'
            required
          />
        </div>
        <div className='col-span-12 mt-0'>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700 dark:text-slate-100 mb-2'
          >
            {t("description")}
          </label>
          <textarea
            id='description'
            name='description'
            placeholder={t("description")}
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (validNames.includes(e.target.name as keyof ExpenditureValues)) {
                dispatchHandler(e.target.name as keyof ExpenditureValues, e.target.value);
              }
            }}
            className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm bg-slate-50 dark:bg-slate-400 outline-none focus:outline-none text-primary dark:text-white placeholder:text-primary dark:placeholder:text-slate-100'
            required
          />
        </div>

        <CategoryInput
          categories={tab === "expense" ? expenseCategories : incomeCategories}
          placeholder={t("selectCategory")}
          label={t("category")}
          tab={tab}
        />


        <div className='col-span-12 mt-0'>
          <label
            htmlFor='date'
            className='block text-sm font-medium text-gray-700 dark:text-slate-100 mb-2'
          >
            {tab === "expense" ? t("Expense.spendTime") : t("Income.spendTime")}
          </label>
          <input
            type='date'
            id='date'
            name='date'
            placeholder='dd.mm.yyyy'
            value={date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (validNames.includes(e.target.name as keyof ExpenditureValues)) {
                dispatchHandler(e.target.name as keyof ExpenditureValues, e.target.value);
              }
            }}
            className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm bg-slate-50 dark:bg-slate-400 outline-none focus:outline-none text-primary  dark:text-white placeholder:text-primary dark:placeholder:text-slate-100'
            required
          />
        </div>
        <div className='col-span-12 self-stretch flex items-end mt-4 flex-1'>
          {tab === "expense" ? (
            <button
              type='submit'
              className='w-full bg-expenses h-12 text-white px-4 py-2 rounded-md hover:bg-expenses/80 '
            >
              {t("Expense.button")}
            </button>
          ) : (
            <button
              type='submit'
              className='w-full bg-incomes h-12 text-white px-4 py-2 rounded-md hover:bg-incomes/80 '
            >
              {t("Income.button")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FastAction;
