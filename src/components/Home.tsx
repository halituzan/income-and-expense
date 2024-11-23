"use client";
import { useTranslations } from "next-intl";
import Expenses from "./Charts/Expenses";
import Incomes from "./Charts/Incomes";
import IncomesAndExpenses from "./Charts/IncomesAndExpenses";
import Card from "./UI/Card";

type Props = {};

const HomePage = (props: Props) => {
  const t = useTranslations("Common");

  const changeLanguage = (lng: any) => {};

  return (
    <div className='flex flex-col justify-center items-center max-w-7xl mx-auto px-4 w-full'>
      <div className='grid grid-cols-12 gap-4 w-full'>
        <div className='col-span-12 w-full'>
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-12 md:col-span-6'>
              <div className='bg-incomes/20 p-4 '>
                <h3 className='text-lg font-medium text-incomes/70'>
                  Total Income
                </h3>
                <p className='text-2xl font-bold text-incomes'>$5,000</p>
              </div>
            </div>
            <div className='col-span-12 md:col-span-6'>
              <div className='bg-expenses/20 p-4'>
                <h3 className='text-lg font-medium text-expenses/70'>
                  Total Expenses
                </h3>
                <p className='text-2xl font-bold text-expenses'>$3,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-2 w-full'>
        <div className='col-span-12 md:col-span-6'>
          <div className='my-2'>
            <Card p={2} bg='incomes/20' shadow='none' rounded='none'>
              <h3 className='flex justify-center items-center text-xl font-semibold text-incomes'>
                Incomes
              </h3>
            </Card>
          </div>
          <Card>
            <div className='w-full h-[300px] '>
              <Incomes />
            </div>
          </Card>
        </div>
        <div className='col-span-12 md:col-span-6'>
          <div className='my-2'>
            <Card p={2} bg='expenses/20' shadow='none' rounded='none'>
              <h3 className='flex justify-center items-center text-xl font-semibold text-expenses'>
                Expenses{" "}
              </h3>
            </Card>
          </div>
          <Card>
            <div className='w-full h-[300px]'>
              <Expenses />
            </div>
          </Card>
        </div>
      </div>
      <div className='w-full mt-2'>
        {/* <Card p={2} bg='primary' shadow='lg' rounded='lg'>
          <h3 className='flex justify-center items-center text-xl font-semibold text-white'>
            Gelir Gider Tablosu
          </h3>
        </Card> */}
        <div className='w-full h-[600px]'>
          <IncomesAndExpenses />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
