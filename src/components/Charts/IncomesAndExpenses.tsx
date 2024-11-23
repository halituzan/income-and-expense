import dateToMonth from '@/helpers/dateToMonth';
import { selectExpenses, selectIncomes, setExpenses, setIncomes } from '@/lib/features/expenditure';
import getExpense from '@/services/Expense/getExpense';
import getIncome from '@/services/Income/getIncome';
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
    const axisColor = theme === "dark" ? "#ffffff" : "#475569";
    const dispatch = useDispatch();
    const income = useSelector(selectIncomes);
    const expense = useSelector(selectExpenses)
    const formatIncomeData = income.map((item: any) => {
        return {
            name: dateToMonth(item.date),
            id: item.category.id,
            income: item.amount,
        };
    });
    const formatExpenseData = expense.map((item: any) => {
        return {
            name: dateToMonth(item.date),
            id: item.category.id,
            expense: - item.amount,
        };
    });
    const concatData = [...formatIncomeData, ...formatExpenseData]

    const groupedData = concatData.reduce((acc: any, current: any) => {
        const existingItem = acc.find((item: any) => item.name === current.name);
        if (existingItem) {
            existingItem.income = (existingItem.income || 0) + (current.income || 0);
            existingItem.expense = (existingItem.expense || 0) + (current.expense || 0);
        } else {
            acc.push({
                name: current.name,
                income: current.income || 0,
                expense: current.expense || 0,
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
                <Bar dataKey="income" fill="#059669" stackId="stack" />
                <Bar dataKey="expense" fill="#f87171" stackId="stack" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default IncomesAndExpenses