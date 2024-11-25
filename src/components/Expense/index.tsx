"use client";
import {
  clearExpenseValues,
  ExpenditureValues,
  selectExpenses,
  selectExpenseValues,
  setExpenses,
  setExpenseValues,
} from "@/lib/features/expenditure";
import { Icon } from "@iconify/react";
import getExpensesCategories from "@/services/Categories/getExpensesCategories";
import getExpense from "@/services/Expense/getExpense";
import setExpense from "@/services/Expense/setExpense";
import { Category, ExpenseItem } from "@/types";
import { useTranslations } from "next-intl";
import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import HistoriesAddAction from "../HistoriesAddAction";
import sortByDate from "@/helpers/sortByDate";
import filterByDateRange from "@/helpers/filteredByDateRange";
import DateRangePicker from "../UI/DateRangePicker";
import * as XLSX from "xlsx";
import getLimit from "@/services/Categories/getLimit";
import getExpenseCategoryById from "@/services/Categories/getExpenseCategoryById";
import dbName from "@/services/dbNames";
import calculate from "@/helpers/calculate";
import ExpenseChart from "../Charts/Expenses";
import priceFormatter from "@/helpers/priceFormatter";
import { toast } from "react-toastify";
import ExpenseVertical from "../Charts/ExpenseVertical";
const { notificationsSettings, expenses: expenseTable } = dbName
const Expense: FC = () => {
  const t = useTranslations("Expense");
  const tf = useTranslations("Form");
  const te = useTranslations("Exports");
  const listRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const expenseValues = useSelector(selectExpenseValues);
  const { amount, categoryId, date, description } = expenseValues;
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  const [dateRange, setDateRange] = useState<Date[] | undefined[]>([
    undefined,
    undefined,
  ]);
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
        createdAt: new Date(),
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
  };
  const removeExpense = (id: string) => {
    const copyData: ExpenseItem[] = [...expenses]
    const removedData = copyData.filter(item => item.id !== id)
    localStorage.setItem(expenseTable, JSON.stringify(removedData))
    dispatch(setExpenses(removedData));
  }
  const setExpenseDatas = () => {
    const expensesData = getExpense();
    dispatch(setExpenses(expensesData));
  };
  const handleFilterTime = (sorting: any) => {
    if (sorting === null) {
      setExpenseDatas();
    } else {
      let copyData = [...expenses];
      const data = sortByDate(copyData, sorting);
      dispatch(setExpenses(data));
    }
  };
  useEffect(() => {
    handleFilterTime(sort);
  }, [sort]);
  useEffect(() => {
    if (dateRange[0] || dateRange[1]) {
      console.log("dateRange", dateRange);
      const data = filterByDateRange(expenses, dateRange[0], dateRange[1]);
      dispatch(setExpenses(data));
    } else {
      const data = getExpensesCategories();
      setExpenseCategories(data);
      setExpenseDatas();
    }
  }, [dateRange]);

  const handleExport = () => {
    const formattedData = expenses.map((expense: any) => ({
      [te("category")]: expense.category.name,
      [te("description")]: expense.description,
      [te("amount")]: priceFormatter(expense.amount) + " TL",
      [te("date")]: new Date(expense.date).toLocaleString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "expenses.xlsx");
  };

  return (
    <div className='container mx-auto p-4'>
      <HistoriesAddAction
        buttonColor={"expenses"}
        buttonText={tf("Expense.button")}
        values={expenseValues}
        categoryData={expenseCategories}
        dispatchHandler={dispatchHandler}
        addAction={addExpense}
        title={t("title")}
        isLimit={true}
      />
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-8 order-2 md:order-1">
          <div
            ref={listRef}
            className='bg-slate-100 dark:bg-primary/80 p-6 rounded-lg shadow-md'
          >
            <div className='flex flex-col md:flex-row justify-between items-center w-full mb-2'>
              <div className='flex items-center mb-4'>
                <h2 className='text-2xl font-semibold  text-primary dark:text-slate-50'>
                  {t("history")}
                </h2>
                {
                  expenses.length > 0 && <button
                    className='ml-2 bg-primary text-slate-100 dark:bg-slate-200 dark:text-primary p-2 rounded-lg'
                    onClick={handleExport}
                  >
                    {te("download")}
                  </button>
                }

              </div>

              <div className='flex items-center'>
                <button
                  onClick={() => {
                    setExpenseDatas();
                    setDateRange([undefined, undefined]);
                  }}
                  className='mr-2 text-primary dark:text-slate-100 border border-prmary p-1 rounded-md hover:bg-slate-500 hover:text-slate-100'
                >
                  <Icon icon="eos-icons:cleanup" />
                </button>
                <DateRangePicker
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              </div>
            </div>
            {
              expenses.length > 0 && <div className='flex flex-1 justify-between items-center w-full p-1 bg-primary text-slate-100 dark:bg-slate-500 dark:text-slate-100'>
                <div>{t("type")}</div>
                <button onClick={handleSortClick} className='flex items-center'>
                  {t("sort")}<Icon icon='bx:sort' />
                </button>
              </div>
            }

            {expenses.length === 0 ? (
              <p className='text-primary dark:text-slate-50'>{t("noData")}</p>
            ) : (
              <ul className='space-y-4 divide-y'>
                {expenses.map((expense: ExpenseItem) => (
                  <li key={expense.id} className='py-2'>
                    <div className='flex justify-between items-center'>
                      <div>
                        <p className='font-semibold text-primary dark:text-slate-50'>
                          {expense?.category?.name}
                        </p>
                        <p className='text-primary/80 dark:text-slate-200 text-sm'>
                          {expense?.description}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className='text-right'>
                          <p className='font-bold text-lg text-expenses'>
                            -{priceFormatter(expense?.amount as number) ?? 0}
                          </p>
                          <p className='text-sm text-primary/80 dark:text-slate-200'>
                            {expense?.date?.toLocaleString()}
                          </p>
                        </div>
                        <button onClick={() => removeExpense(expense.id as string)} className="w-8 h-8 ml-2 bg-expenses hover:bg-expenses/80 flex justify-center items-center rounded-lg">
                          <Icon icon='material-symbols:delete' color="white" fontSize={24} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
                <li>
                  <div className='flex justify-between items-center'>
                    <p className='font-semibold text-primary dark:text-slate-50'>
                      {t("total")}:
                    </p>
                    <div className='text-right'>
                      <div className='font-bold text-lg text-expenses'>
                        -{priceFormatter(calculate(expenses))}
                      </div>

                    </div>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 order-1 md:order-2">
          <div className="bg-slate-100 dark:bg-primary/80 p-6 rounded-lg shadow-md">
            <div className=" h-[300px] w-full ">
              <ExpenseVertical />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Expense;
