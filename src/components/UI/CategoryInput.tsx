import React, { useState, useEffect } from "react";
import { Category } from "@/types";
import { v4 as uuidv4 } from "uuid";
import getIncomesCategories from "@/services/Categories/getIncomesCategories";
import dbName from "@/services/dbNames";
import getExpensesCategories from "@/services/Categories/getExpensesCategories";
import { useDispatch, useSelector } from "react-redux";
import { selectExpenseCategory, selectIncomeCategory, setExpenseCategory, setIncomeCategory } from "@/lib/features/categories";
import { selectIncomeValues, setExpenseValues, setIncomeValues } from "@/lib/features/expenditure";
const { incomeCategory, expensesCategory } = dbName
const CategoryInput = ({
    categories,
    placeholder,
    label,
    tab
}: {
    categories: Category[];
    placeholder: string;
    label: string
    tab: string
}) => {
    const dispatch = useDispatch()
    const incomeCategories = useSelector(selectIncomeCategory)
    const expenseCategories = useSelector(selectExpenseCategory)
    const inputValues = useSelector(selectIncomeValues)
    const [search, setSearch] = useState("");
    const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const lowercasedInput = search.toLowerCase();
        if (tab === "income") {
            const filtered = incomeCategories.filter((cat: any) =>
                cat.name.toLowerCase().includes(lowercasedInput)
            );
            setFilteredCategories(filtered);
        }
        if (tab === "expense") {
            const filtered = expenseCategories.filter((cat: any) =>
                cat.name.toLowerCase().includes(lowercasedInput)
            );
            setFilteredCategories(filtered);
        }

    }, [search, categories]);

    const handleCategorySelect = (category: Category) => {
        setSearch(category.name as string);
        if (tab == "income") {
            dispatch(setIncomeValues({ key: "categoryId", value: category.id }))
        }
        if (tab == "expense") {
            dispatch(setExpenseValues({ key: "categoryId", value: category.id }))
        }
        setIsDropdownOpen(false);
    };

    const handleSave = (e: any) => {
        if (search.trim()) {

            if (tab == "income") {
                const oldData = getIncomesCategories();
                const id = uuidv4()
                const data = [...oldData, { id, name: search }];
                localStorage.setItem(incomeCategory, JSON.stringify(data));
                dispatch(setIncomeCategory(data));
            }
            if (tab == "expense") {
                const oldData = getExpensesCategories();
                const data = [...oldData, { id: uuidv4(), name: search }];
                localStorage.setItem(expensesCategory, JSON.stringify(data));
                dispatch(setExpenseCategory(data));

            }


            setSearch("");
            setIsDropdownOpen(false);
        }
    };

    return (
        <div className="relative w-full col-span-12">
            <label
                htmlFor='categoryId'
                className='block text-sm font-medium text-gray-700 dark:text-slate-100 mb-2'
            >
                {label}
            </label>
            <div className="relative">
                <input
                    id="categoryId"
                    type="text"
                    value={search}
                    placeholder={placeholder}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="p-2 h-12 block w-full rounded-md border pr-20 border-primary shadow-sm bg-slate-50 dark:bg-slate-400 outline-none focus:outline-none text-primary dark:text-white"
                />
                <div onClick={handleSave} className="absolute cursor-pointer right-2 -translate-y-1/2 top-1/2 bg-incomes text-white p-2 rounded-lg">
                    Ekle
                </div>
            </div>

            {isDropdownOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-700 border border-primary rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredCategories.map((category) => (
                        <li
                            key={category.id}
                            className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                            onClick={() => handleCategorySelect(category)}
                        >
                            {category.name}
                        </li>
                    ))}
                    {filteredCategories.length === 0 && (
                        <li className="px-4 py-2 text-gray-500 dark:text-slate-300">
                            {placeholder}
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default CategoryInput;
