"use client";
import priceFormatter from "@/helpers/priceFormatter";
import getExpensesCategories from "@/services/Categories/getExpensesCategories";
import getIncomesCategories from "@/services/Categories/getIncomesCategories";
import dbName from "@/services/dbNames";
import { Category } from "@/types";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectExpenseCategory, selectIncomeCategory, setExpenseCategory, setIncomeCategory } from "@/lib/features/categories";

const { expensesCategory, incomeCategory } = dbName;
export default function CategoryManager() {
  const t = useTranslations("Expenditure");
  const incomeCategories = useSelector(selectIncomeCategory)
  const expenseCategories = useSelector(selectExpenseCategory)
  const dispatch = useDispatch()
  //? States
  const [newIncomeCategory, setNewIncomeCategory] = useState("");
  const [newExpenseCategory, setNewExpenseCategory] = useState("");
  const [expenseLimit, setExpenseLimit] = useState<string>("");
  const [incomeColor, setIncomeColor] = useState<string>("#f59e0b");
  const [expenseColor, setExpenseColor] = useState<string>("#f59e0b");


  const [deleteItem, setDeleteItem] = useState<any>({});
  const [type, setType] = useState<"income" | "expense" | null>(null);
  //? States

  //? Fonktions
  const addCategory = (type: "income" | "expense") => {
    if (type === "income" && newIncomeCategory.trim() !== "") {
      const oldData = getIncomesCategories();
      const data = [...oldData, { id: uuidv4(), name: newIncomeCategory, color: incomeColor }];
      localStorage.setItem(incomeCategory, JSON.stringify(data));
      setNewIncomeCategory("");
      dispatch(setIncomeCategory(data));
    } else if (type === "expense" && newExpenseCategory.trim() !== "") {
      const oldData = getExpensesCategories();
      const data = [
        ...oldData,
        { id: uuidv4(), name: newExpenseCategory, limit: expenseLimit, color: expenseColor },
      ];
      localStorage.setItem(expensesCategory, JSON.stringify(data));
      setNewExpenseCategory("");
      setExpenseLimit("");
      dispatch(setExpenseCategory(data));
    }
  };
  const removeCategory = (type: "income" | "expense", id: string) => {
    if (type === "income") {
      const oldData = getIncomesCategories();
      const data = oldData.filter((item: { id: string }) => item.id !== id);
      localStorage.setItem(incomeCategory, JSON.stringify(data));
      setNewIncomeCategory("");
      dispatch(setIncomeCategory(data));
    } else if (type === "expense") {
      const oldData = getExpensesCategories();
      const data = oldData.filter((item: { id: string }) => item.id !== id);
      localStorage.setItem(expensesCategory, JSON.stringify(data));
      setNewExpenseCategory("");
      dispatch(setExpenseCategory(data));
    }
    setDeleteItem({});
    setType(null);
  };
  //? Fonktions

  //? Hooks
  useEffect(() => {
    const incomeData = getIncomesCategories();
    const expensesData = getExpensesCategories();
    dispatch(setIncomeCategory(incomeData));
    dispatch(setExpenseCategory(expensesData));
  }, []);
  //? Hooks

  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Gelir Kalemleri */}
        <div className='bg-slate-100 dark:bg-primary/80 p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4 text-incomes dark:text-slate-100'>
            {t("incomes")}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCategory("income");
            }}
            className='mb-4'
          >
            <div className='flex'>
              <label htmlFor="colorPickerIncome" className={`peer px-3 py-2 border border-transparent rounded-l-md focus:outline-none min-w-[42px] w-[42px] h-[42px]`} style={{
                background: incomeColor
              }}></label>
              <input
                id="colorPickerIncome"
                type='color'
                value={incomeColor}
                onChange={(e) => setIncomeColor(e.target.value)}
                placeholder={"Limit"}
                className={`opacity-0 w-0`}
                style={{
                  background: incomeColor
                }}
              />
              <input
                type='text'
                value={newIncomeCategory}
                onChange={(e) => setNewIncomeCategory(e.target.value)}
                placeholder={t("newIncome")}
                className='flex-grow px-3 py-2 border focus:outline-none bg-white dark:bg-slate-100 w-full'
              />
              <button
                type='submit'
                className='bg-incomes text-white px-4 py-2 rounded-r-md hover:bg-incomes dark:hover:bg-primary/80 focus:outline-none'
              >
                {t("add")}
              </button>
            </div>
          </form>
          <ul className='space-y-2'>
            {incomeCategories?.map((category: Category) => (
              <div className='flex items-center w-full' key={category.id}>
                <li
                  key={category.id}
                  className='bg-slate-50 p-2 rounded shadow flex-1'
                >
                  <span className='font-semibold text-primary'>
                    {category.name}
                  </span>
                </li>
                <button
                  onClick={() => {
                    setDeleteItem(category);
                    setType("income");
                  }}
                  className='bg-warning/80 text-white px-4 py-2 rounded-r-md hover:bg-warning focus:outline-none'
                >
                  <Icon icon='material-symbols:delete' />
                </button>
              </div>
            ))}
          </ul>
        </div>

        {/* Gider Kalemleri */}
        <div className='bg-slate-100 dark:bg-primary/80 p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4 text-expenses dark:text-slate-100'>
            {t("expenses")}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCategory("expense");
            }}
            className='mb-4 w-full'
          >
            <div className='flex w-full flex-1'>

              <label htmlFor="colorPickerExpense" className={`peer px-3 py-2 border border-transparent rounded-l-md focus:outline-none min-w-[42px] w-[42px] h-[42px]`} style={{
                background: expenseColor
              }}></label>
              <input
                id="colorPickerExpense"
                type='color'
                value={expenseColor}
                onChange={(e) => setExpenseColor(e.target.value)}
                placeholder={"Limit"}
                className={`opacity-0 w-0`}
                style={{
                  background: expenseColor
                }}
              />

              <input
                type='number'
                value={expenseLimit}
                onChange={(e) => setExpenseLimit(e.target.value)}
                placeholder={"Limit"}
                className='px-3 py-2 border focus:outline-none bg-white dark:bg-slate-100 w-[100px]'
              />
              <input
                type='text'
                value={newExpenseCategory}
                onChange={(e) => setNewExpenseCategory(e.target.value)}
                placeholder={t("newExpense")}
                className=' px-3 py-2 border focus:outline-none bg-white dark:bg-slate-100 flex-1 w-full'
              />
              <button
                type='submit'
                className='bg-expenses/80 text-white px-4 py-2 rounded-r-md hover:bg-expenses focus:outline-none'
              >
                {t("add")}
              </button>
            </div>
          </form>
          <ul className='space-y-2'>
            {expenseCategories.map((category: Category) => (
              <div className='flex items-center w-full' key={category.id}>
                <li
                  key={category.id}
                  className='bg-slate-50 p-2 text-primary rounded shadow flex-1 flex justify-between items-center'
                >
                  <span className='font-semibold'>{category.name}</span>
                  {category.limit && (
                    <span className='text-expenses font-semibold text-[10px]'>
                      Limit: {priceFormatter(category.limit as number)}
                    </span>
                  )}
                </li>
                <button
                  onClick={() => {
                    setDeleteItem(category);
                    setType("expense");
                  }}
                  className='bg-warning/80 text-white px-4 py-2 rounded-r-md hover:bg-warning focus:outline-none'
                >
                  <Icon icon='material-symbols:delete' />
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <Modal
        open={deleteItem.id}
        title={t("Modal.title")}
        close={() => {
          setType(null);
          setDeleteItem({});
        }}
        height={300}
      >
        <h1 className='text-primary dark:text-slate-100 font-semibold text-center text-2xl'>
          {t("Modal.h1", { category: deleteItem.name })}
        </h1>
        <p className='text-center my-4 text-primary dark:text-slate-100'>
          {t("Modal.p", { category: deleteItem.name })}
        </p>

        <div className='flex w-1/2 mx-auto justify-evenly'>
          <button
            className='border py-2 px-4 rounded-lg bg-slate-300 dark:bg-slate-500 text-primary dark:text-slate-100'
            onClick={() => {
              setType(null);
              setDeleteItem({});
            }}
          >
            {t("Modal.cancel")}
          </button>
          <button
            className='border ml-2 py-2 px-4 rounded-lg text-slate-100 bg-expenses dark:text-slate-100'
            onClick={() => removeCategory(type as any, deleteItem.id as string)}
          >
            {t("Modal.confirm")}
          </button>
        </div>
      </Modal>
    </div>
  );
}
