import dateToMonth from '@/helpers/dateToMonth';
import { selectExpenses, selectIncomes, setExpenses, setIncomes } from '@/lib/features/expenditure';
import getExpense from '@/services/Expense/getExpense';
import getIncome from '@/services/Income/getIncome';
import { Category, FormattedData } from '@/types';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import useTheme from '../hooks/useTheme';


const IncomesAndExpenses = () => {
    const { theme } = useTheme()
    const t = useTranslations("Home");
    const axisColor = theme === "dark" ? "#ffffff" : "#475569";
    const dispatch = useDispatch();
    const income = useSelector(selectIncomes);
    const expense = useSelector(selectExpenses)
    const formatIncomeData: FormattedData[] = income.map(
        (item: any) => {
            return {
                name: dateToMonth(item.date) as string,
                id: item.category.id,
                [t("Income.tableName")]: item.amount,
            };
        });
    const formatExpenseData: FormattedData[] = expense.map((item: any) => {
        return {
            name: dateToMonth(item.date) as string,
            id: item.category.id,
            [t("Expense.tableName")]: - item.amount,
        };
    });
    const concatData: FormattedData[] = [...formatIncomeData, ...formatExpenseData]

    const groupedData = concatData.reduce((acc: FormattedData[], current: FormattedData) => {
        const existingItem = acc.find(
            (item: FormattedData) => item.name === current.name
        ) as FormattedData

        if (existingItem) {
            const currentIncomeAmount = current[t("Income.tableName")];
            const existingIncomeAmount = existingItem[t("Income.tableName")];
            const currentExpenseAmount = current[t("Expense.tableName")];
            const existingExpenseAmount = existingItem[t("Expense.tableName")];
            if (
                typeof existingIncomeAmount === "number" &&
                typeof currentIncomeAmount === "number"

            ) {
                existingItem[t("Income.tableName")] = existingIncomeAmount + currentIncomeAmount;
            }

            if (typeof existingExpenseAmount === "number" &&
                typeof currentExpenseAmount === "number") {
                existingItem[t("Expense.tableName")] = existingExpenseAmount + currentExpenseAmount;
            }

        } else {
            acc.push({
                id: current.id,
                name: current.name,
                [t("Income.tableName")]: current[t("Income.tableName")] || 0,
                [t("Expense.tableName")]: current[t("Expense.tableName")] || 0,
            });
        }
        return acc;
    }, []);

    useEffect(() => {
        const expenseData = getExpense();
        const incomesData = getIncome();
        dispatch(setExpenses(expenseData));
        dispatch(setIncomes(incomesData));
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={groupedData}
                stackOffset="sign"
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: axisColor }} />
                <YAxis tick={{ fill: axisColor }} />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey={t("Expense.tableName")} fill="#059669" stackId="stack" />
                <Bar dataKey={t("Income.tableName")} fill="#f87171" stackId="stack" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default IncomesAndExpenses