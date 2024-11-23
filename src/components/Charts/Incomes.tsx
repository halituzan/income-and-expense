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
import { Category, FormattedData } from "@/types";

const Incomes = () => {
  const t = useTranslations("Home");
  const { theme } = useTheme()
  const axisColor = theme === "dark" ? "#ffffff" : "#475569";
  const dispatch = useDispatch();
  const income = useSelector(selectIncomes);
  const formatData: FormattedData[] = income.map(
    (item: { category: Category; amount: number }) => {
      return {
        name: item.category.name,
        id: item.category.id,
        [t("Income.tableName")]: item.amount,
      };
    }
  );

  const groupedData = formatData.reduce((acc: FormattedData[], current: FormattedData) => {
    const existingItem = acc.find((item: FormattedData) => item.id === current.id) as FormattedData;

    if (existingItem) {
      const currentAmount = current[t("Income.tableName")];
      const existingAmount = existingItem[t("Income.tableName")];
      if (typeof existingAmount === "number" && typeof currentAmount === "number") {
        existingItem[t("Income.tableName")] = existingAmount + currentAmount;
      }
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
