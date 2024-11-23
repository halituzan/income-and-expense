"use client"
import { selectExpenses, setExpenses } from "@/lib/features/expenditure";
import getExpense from "@/services/Expense/getExpense";
import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useTheme from "../hooks/useTheme";
import priceFormatter from "@/helpers/priceFormatter";

const Expenses = () => {
  const { theme } = useTheme()
  const axisColor = theme === "dark" ? "#ffffff" : "#475569";
  const dispatch = useDispatch();
  const expense = useSelector(selectExpenses)
  const formatData = expense.map((item: any) => {
    return {
      name: item.category.name,
      id: item.category.id,
      expense: item.amount
    }
  })

  const groupedData = formatData.reduce((acc: any, current: any) => {
    const existingItem = acc.find((item: any) => item.id === current.id);
    if (existingItem) {
      existingItem.expense += current.expense;
    } else {
      acc.push(current);
    }
    return acc;
  }, []);

  useEffect(() => {
    const expenseData = getExpense();
    dispatch(setExpenses(expenseData));
  }, []);


  return (
    <ResponsiveContainer width='100%' height='100%' >
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
        <XAxis dataKey="name" tick={{ fill: axisColor }} />
        <YAxis tick={{ fill: axisColor }} />
        <Tooltip />
        <Legend />
        <Bar dataKey='expense' fill="#f87171" activeBar={<Rectangle />} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default Expenses;
