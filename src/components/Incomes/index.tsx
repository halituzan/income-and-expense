"use client";
import {
  clearIncomeValues,
  ExpenditureValues,
  selectIncomes,
  selectIncomeValues,
  setIncomes,
  setIncomeValues,
} from "@/lib/features/expenditure";
import * as XLSX from "xlsx";
import { Icon } from "@iconify/react";
import getIncomesCategories from "@/services/Categories/getIncomesCategories";
import getIncome from "@/services/Income/getIncome";
import setIncome from "@/services/Income/setIncome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import DateRangePicker from "../UI/DateRangePicker";
import HistoriesAddAction from "../HistoriesAddAction";
import { useTranslations } from "next-intl";
import { Category, ExpenseItem } from "@/types";
import filterByDateRange from "@/helpers/filteredByDateRange";
import sortByDate from "@/helpers/sortByDate";

const Incomes = () => {
  const t = useTranslations("Income")
  const tf = useTranslations("Form")
  const te = useTranslations("Exports");
  const dispatch = useDispatch();
  const incomes = useSelector(selectIncomes);
  const expenseValues = useSelector(selectIncomeValues);
  const { amount, categoryId, date, description } = expenseValues;
  const [incomesCategories, setIncomesCategories] = useState<Category[]>([]);
  const [dateRange, setDateRange] = useState<Date[] | undefined[]>([undefined, undefined]);
  const [sort, setSort] = useState<"asc" | "desc" | null>(null);

  const dispatchHandler = (key: keyof ExpenditureValues, value: string) => {
    dispatch(setIncomeValues({ key: key, value: value }));
  };
  const addIncome = (e: React.FormEvent) => {
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
      const data = setIncome(newExpense);
      const expensesData = getIncome();

      dispatch(setIncomes(expensesData));
      dispatch(clearIncomeValues());
    }
  };
  const handleSortClick = () => {
    const nextOrder = sort === null ? "desc" : sort === "desc" ? "asc" : null;
    setSort(nextOrder);
  };

  const setIncomeDatas = () => {
    const incomesData = getIncome();
    dispatch(setIncomes(incomesData));
  }
  const handleFilterTime = (sorting: any) => {

    if (sorting === null) {
      setIncomeDatas()
    } else {
      let copyData = [...incomes]
      const data = sortByDate(copyData, sorting)
      dispatch(setIncomes(data));
    }

  }
  useEffect(() => {

    handleFilterTime(sort)

  }, [sort]);
  useEffect(() => {
    if (dateRange[0] || dateRange[1]) {
      const data = filterByDateRange(incomes, dateRange[0], dateRange[1])
      dispatch(setIncomes(data));
    } else {
      const categoryData = getIncomesCategories();
      setIncomesCategories(categoryData);
      setIncomeDatas()
    }
  }, [dateRange]);
  const handleExport = () => {
    const formattedData = incomes.map((income: any) => ({
      [te("category")]: income.category.name,
      [te("description")]: income.description,
      [te("amount")]: income.amount.toFixed(2) + " TL",
      [te("date")]: new Date(income.date).toLocaleString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Incomes");
    XLSX.writeFile(workbook, "incomes.xlsx");
  };

  return (
    <div className='container mx-auto p-4'>
      <HistoriesAddAction isLimit={false} buttonColor={"incomes"} buttonText={tf("Income.button")} title={t("title")} values={expenseValues} categoryData={incomesCategories} dispatchHandler={dispatchHandler} addAction={addIncome} />

      <div className='bg-slate-100 dark:bg-primary/80 p-6 rounded-lg shadow-md'>
        <div className='flex flex-col md:flex-row justify-between items-center w-full mb-2'>
          <div className='flex items-center mb-4'>
            <h2 className='text-2xl font-semibold  text-primary dark:text-slate-50'>
              {t("history")}
            </h2>
            <button
              className='ml-2 bg-primary text-slate-100 dark:bg-slate-200 dark:text-primary p-2 rounded-lg'
              onClick={handleExport}
            >
              {te("download")}
            </button>
          </div>

          <div className='flex items-center'>
            <button
              onClick={() => {
                setIncomeDatas();
                setDateRange([undefined, undefined]);
              }}
              className='mr-2 text-primary dark:text-slate-100'
            >
              Clear
            </button>
            <DateRangePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>
        </div>
        <div className="flex flex-1 justify-between items-center w-full p-1 bg-primary text-slate-100 dark:bg-slate-500 dark:text-slate-100">
          <div>Tür</div>
          <button onClick={handleSortClick} className="flex items-center">
            Tarihe Göre Sırala <Icon icon="bx:sort" />
          </button>
        </div>

        {incomes.length === 0 ? (
          <p className='text-gray-500'>Henüz gelir kaydı bulunmamaktadır.</p>
        ) : (
          <ul className='space-y-4 divide-y'>
            {incomes.map((expense: ExpenseItem) => (
              <li key={expense.id} className='py-2'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-semibold text-primary dark:text-slate-50'>{expense?.category?.name}</p>
                    <p className='text-primary/80 dark:text-slate-200 text-sm'>{expense?.description}</p>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold text-lg text-primary dark:text-slate-50'>
                      {expense?.amount?.toFixed(2)} TL
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
export default Incomes;
