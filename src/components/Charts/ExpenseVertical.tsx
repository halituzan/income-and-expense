"use client";
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
import { selectExpenses, setExpenses } from "@/lib/features/expenditure";
import getExpense from "@/services/Expense/getExpense";
import { FormattedData } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useTheme from "../hooks/useTheme";

const ExpenseVertical = () => {
  const { theme } = useTheme();
  const t = useTranslations("Home");
  const axisColor = theme === "dark" ? "#ffffff" : "#475569";
  const dispatch = useDispatch();
  const expense = useSelector(selectExpenses);
  console.log("expense", expense);

  const formatData: FormattedData[] = expense.map((item: any) => {
    return {
      name: item.category.name,
      id: item.category.id,
      [t("Expense.tableName")]: item.amount,
      limit: item.category.limit,
    };
  });

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
  console.log("groupedData", groupedData);

  useEffect(() => {
    const expenseData = getExpense();
    dispatch(setExpenses(expenseData));
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
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
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis tick={{ fill: axisColor }} type="number" />
        <YAxis
          tick={{ fill: axisColor }}
          dataKey="name"
          type="category"
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={t("Expense.tableName")}
          fill="#f87171"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey={"limit"}
          fill="#f59e0b"
          activeBar={<Rectangle fill="red" stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseVertical;
