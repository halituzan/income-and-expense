"use client";
import { ExpenditureValues } from "@/lib/features/expenditure";
import { Category } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
type Props = {
  values: ExpenditureValues;
  categoryData: Category[];
  dispatchHandler: (key: keyof ExpenditureValues, value: string) => void;
  addAction: (e: React.FormEvent) => void;
  title: string;
  buttonText: string;
  buttonColor: string;
  isLimit: boolean
};
const validNames: (keyof ExpenditureValues)[] = ['amount', 'categoryId', 'date', 'description'];
const HistoriesAddAction = ({
  values,
  categoryData,
  dispatchHandler,
  addAction,
  title,
  buttonText,
  buttonColor,
  isLimit = false
}: Props) => {
  const t = useTranslations("Form")
  const { amount, categoryId, date, description } = values;
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(categoryData);
  }, [categoryData]);

  return (
    <div className='bg-slate-100 dark:bg-primary/50 p-6 rounded-lg shadow-md mb-8'>
      <h2 className='text-2xl font-semibold mb-4 text-primary dark:text-slate-50'>{title}</h2>
      <form onSubmit={addAction} className=' grid grid-cols-12 gap-2 w-full'>
        <div className='col-span-12 md:col-span-4 mt-0'>
          <label
            htmlFor='amount'
            className='block text-sm font-medium text-primary dark:text-slate-100 mb-2'
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
            className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm bg-slate-50 dark:bg-primary/80 outline-none focus:outline-none text-primary dark:text-slate-100'
            required
          />
        </div>
        <div className='col-span-12 md:col-span-4 mt-0'>
          <label
            htmlFor='categoryId'
            className='block text-sm font-medium text-primary dark:text-slate-100 mb-2'
          >
            {t("category")}
          </label>
          <select
            id='categoryId'
            name='categoryId'
            value={categoryId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              if (validNames.includes(e.target.name as keyof ExpenditureValues)) {
                dispatchHandler(e.target.name as keyof ExpenditureValues, e.target.value);
              }
            }}
            className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm bg-slate-50 dark:bg-primary/80 outline-none focus:outline-none text-primary dark:text-slate-100'
            required
          >
            <option value=''>{t("selectCategory")}</option>
            {categories.map((cat: Category) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className='col-span-12 md:col-span-4 mt-0'>
          <label
            htmlFor='date'
            className='block text-sm font-medium text-primary dark:text-slate-100 mb-2'
          >
            {t("spendTime")}
          </label>
          <input
            type='date'
            id='date'
            name='date'
            value={date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (validNames.includes(e.target.name as keyof ExpenditureValues)) {
                dispatchHandler(e.target.name as keyof ExpenditureValues, e.target.value);
              }
            }}
            className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm bg-slate-50 dark:bg-primary/80 outline-none focus:outline-none text-primary dark:text-slate-100'
            required
          />
        </div>
        <div className='col-span-12 md:col-span-8 mt-0'>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-primary dark:text-slate-100 mb-2'
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
            className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm bg-slate-50 dark:bg-primary/80 outline-none focus:outline-none text-primary dark:text-slate-100'
          />
        </div>


        <div className='col-span-12 md:col-span-4 self flex items-end '>
          <button
            type='submit'
            className={`w-full h-12 text-white px-4 py-2 rounded-md bg-${buttonColor} hover:bg-${buttonColor}/80  `}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HistoriesAddAction;
