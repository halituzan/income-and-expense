"use client";
import { selectExpenses, setExpenses } from "@/lib/features/expenditure";
import getExpense from "@/services/Expense/getExpense";
import { FormattedData } from "@/types";
import { useTranslations } from "next-intl";
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

const Expenses = () => {
  const { theme } = useTheme();
  const t = useTranslations("Home");
  const axisColor = theme === "dark" ? "#ffffff" : "#475569";
  const dispatch = useDispatch();
  const expense = useSelector(selectExpenses);

  const formatData: FormattedData[] = expense.map(
    (item: any) => {
      return {
        name: item.category.name,
        id: item.category.id,
        [t("Expense.tableName")]: item.amount,
      };
    }
  );

  const groupedData = formatData.reduce(
    (acc: FormattedData[], current: FormattedData) => {
      const existingItem = acc.find(
        (item: FormattedData) => item.id === current.id
      ) as FormattedData;

      if (existingItem) {
        const currentAmount = current[t("Expense.tableName")];
        const existingAmount = existingItem[t("Expense.tableName")];
        if (
          typeof existingAmount === "number" &&
          typeof currentAmount === "number"
        ) {
          existingItem[t("Expense.tableName")] = existingAmount + currentAmount;
        }
      } else {
        acc.push(current);
      }
      return acc;
    },
    []
  );



  useEffect(() => {
    const expenseData = getExpense();
    dispatch(setExpenses(expenseData));
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
        <XAxis dataKey='name' tick={{ fill: axisColor }} />
        <YAxis tick={{ fill: axisColor }} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={t("Expense.tableName")}
          fill='#f87171'
          activeBar={<Rectangle />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default Expenses;
