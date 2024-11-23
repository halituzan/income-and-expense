"use client";
import { useEffect, useState } from "react";
type Props = {
  values: any;
  categoryData: any;
  dispatchHandler: any;
  addAction: any;
  title: string;
  buttonText: string;
  buttonColor: string;
};

const HistoriesAddAction = ({
  values,
  categoryData,
  dispatchHandler,
  addAction,
  title,
  buttonText,
  buttonColor,
}: Props) => {
  const { amount, categoryId, date, description } = values;
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    setCategories(categoryData);
  }, [categoryData]);

  return (
    <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
      <h2 className='text-2xl font-semibold mb-4'>{title}</h2>
      <form onSubmit={addAction} className=' grid grid-cols-12 gap-2 w-full'>
        <div className='col-span-12 md:col-span-4 mt-0'>
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
        <div className='col-span-12 md:col-span-4 mt-0'>
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
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className='col-span-12 md:col-span-4 mt-0'>
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
        <div className='col-span-12 md:col-span-8 mt-0'>
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