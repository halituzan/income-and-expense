import { FormattedData } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

type Props = { data: any };

const PiePercentChart = ({ data }: Props) => {
    const t = useTranslations("Home")

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const formatData: FormattedData[] = data.map((item: any) => {
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

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    data={groupedData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey={t("Expense.tableName")}
                >
                    {data.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={_.category.color == "transparent" ? "black" : _.category.color} />
                    ))}
                </Pie>
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PiePercentChart;
