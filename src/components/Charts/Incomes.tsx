"use client";
import { selectIncomes, setIncomes } from "@/lib/features/expenditure";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import getIncome from "@/services/Income/getIncome";
import dateToMonth from "@/helpers/dateToMonth";

const Incomes = () => {
  const dispatch = useDispatch();
  const income = useSelector(selectIncomes);
  const formatData = income.map((item: any) => {
    return {
      name: item.category.name,
      id: item.category.id,
      income: item.amount,
    };
  });

  const groupedData = formatData.reduce((acc: any, current: any) => {
    const existingItem = acc.find((item: any) => item.id === current.id);
    if (existingItem) {
      existingItem.income += current.income;
    } else {
      acc.push(current);
    }
    return acc;
  }, []);

  useEffect(() => {
    const incomesData = getIncome();
    dispatch(setIncomes(incomesData));
  }, []);
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        width={500}
        height={300}
        data={groupedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='income' fill='#059669' activeBar={<Rectangle />} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default Incomes;
