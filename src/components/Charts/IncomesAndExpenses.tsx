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
import sortByDate from '@/helpers/sortByDate';


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
                date: item.date,
                id: item.category.id,
                [t("Income.tableName")]: item.amount,
            };
        });
    const formatExpenseData: FormattedData[] = expense.map((item: any) => {
        return {
            name: dateToMonth(item.date) as string,
            date: item.date,
            id: item.category.id,
            [t("Expense.tableName")]: - item.amount,
        };
    });
    const concatData: FormattedData[] = [...formatIncomeData, ...formatExpenseData]

    const groupedData = concatData.reduce((acc: FormattedData[], current: FormattedData) => {
        // Yıl ve ayı birlikte kontrol etmek için bir anahtar oluştur
        const groupKey = `${current.name}-${new Date(current.date).getFullYear()}-${new Date(current.date).getMonth()}`;

        // Grupta aynı key'e sahip bir öğe var mı?
        const existingItem = acc.find((item: FormattedData) => item.groupKey === groupKey);

        if (existingItem) {
            const currentIncomeAmount = current[t("Income.tableName")];
            const existingIncomeAmount = existingItem[t("Income.tableName")];
            const currentExpenseAmount = current[t("Expense.tableName")];
            const existingExpenseAmount = existingItem[t("Expense.tableName")];

            // Gelir değerlerini birleştir
            if (typeof existingIncomeAmount === "number" && typeof currentIncomeAmount === "number") {
                existingItem[t("Income.tableName")] = existingIncomeAmount + currentIncomeAmount;
            }

            // Gider değerlerini birleştir
            if (typeof existingExpenseAmount === "number" && typeof currentExpenseAmount === "number") {
                existingItem[t("Expense.tableName")] = existingExpenseAmount + currentExpenseAmount;
            }
        } else {
            // Yeni bir grup oluştur
            acc.push({
                id: current.id,
                groupKey, // Yeni key ekle (gruplama için)
                name: current.name,
                date: current.date,
                [t("Income.tableName")]: current[t("Income.tableName")] || 0,
                [t("Expense.tableName")]: current[t("Expense.tableName")] || 0,
            });
        }
        return acc;
    }, []).map(item => {
        // Gruplama anahtarını kaldırarak temiz bir çıktı oluştur
        const { groupKey, ...rest } = item;
        return rest;
    });


    const sortingData = sortByDate(groupedData)


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
                data={sortingData.slice(0, 12)}
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
                <Bar dataKey={t("Income.tableName")} fill="#059669" stackId="stack" />
                <Bar dataKey={t("Expense.tableName")} fill="#f87171" stackId="stack" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default IncomesAndExpenses