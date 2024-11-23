"use client";
import { selectIncomes, setIncomes } from "@/lib/features/expenditure";
import getIncome from "@/services/Income/getIncome";
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

const Incomes = () => {
  const t = useTranslations("Home");
  const { theme } = useTheme()
  const axisColor = theme === "dark" ? "#ffffff" : "#475569";
  const dispatch = useDispatch();
  const income = useSelector(selectIncomes);
  const formatData = income.map((item: any) => {
    return {
      name: item.category.name,
      id: item.category.id,
      [t("Income.tableName")]: item.amount,
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
        <XAxis dataKey="name" tick={{ fill: axisColor }} />
        <YAxis tick={{ fill: axisColor }} />
        <Tooltip />
        <Legend />
        <Bar dataKey={t("Income.tableName")} fill='#059669' activeBar={<Rectangle />} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default Incomes;
