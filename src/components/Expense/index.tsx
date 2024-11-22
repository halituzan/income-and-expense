"use client"
import getExpensesCategories from '@/services/Categories/getExpensesCategories';
import getExpense from '@/services/Expense/getExpense';
import setExpense from '@/services/Expense/setExpense';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
type ExpenseProps = {
    id: string;
    amount: number;
    categoryId: string;
    date: any;
    category?: CategoryProps
};
type CategoryProps = {
    id: string,
    name: string
}
export default function Expense() {
    const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
    const [expenseCategories, setExpenseCategories] = useState<any>([]);
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState<any>('');

    const addExpense = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount && categoryId) {
            const newExpense: ExpenseProps = {
                id: uuidv4(),
                amount: parseFloat(amount),
                categoryId,
                date,
            };
            const data = setExpense(newExpense)
            const expensesData = getExpense()
            setExpenses(expensesData)
            setAmount('');
            setCategoryId('');
            setDate('')

        }
    };

    useEffect(() => {
        const data = getExpensesCategories()
        setExpenseCategories(data)

    }, []);

    useEffect(() => {
        const expensesData = getExpense()
        setExpenses(expensesData)
    }, []);


    return (
        <div className="container mx-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Yeni Harcama Ekle</h2>
                <form onSubmit={addExpense} className=" grid grid-cols-12 gap-2 w-full">
                    <div className='col-span-4 mt-0'>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Miktar</label>
                        <input
                            type="number"
                            id="amount"
                            placeholder='Miktar'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="p-2 h-12 block w-full rounded-md border border-primary shadow-sm"
                            required
                        />
                    </div>
                    <div className='col-span-4 mt-0'>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Kategori</label>
                        <select
                            id="categoryId"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="p-2 h-12 block w-full rounded-md border border-primary shadow-sm"
                            required
                        >
                            <option value="">Kategori Seçin</option>
                            {expenseCategories.map((cat: any) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-span-2 mt-0'>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Harcama Zamanı</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="p-2 h-12 block w-full rounded-md border border-primary shadow-sm"
                            required
                        />
                    </div>
                    <div className='col-span-2 self flex items-end '>
                        <button
                            type="submit"
                            className="w-full bg-green-500 h-12 text-white px-4 py-2 rounded-md hover:bg-green-600 "
                        >
                            Harcama Ekle
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Harcama Geçmişi</h2>
                {expenses.length === 0 ? (
                    <p className="text-gray-500">Henüz harcama kaydı bulunmamaktadır.</p>
                ) : (
                    <ul className="space-y-4 divide-y">
                        {expenses.map((expense) => (
                            <li key={expense.id} className="py-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{expense?.category?.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg">{expense.amount.toFixed(2)} TL</p>
                                        <p className="text-sm text-gray-500">{expense?.date?.toLocaleString()}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

