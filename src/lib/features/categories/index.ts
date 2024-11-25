import { ExpenseItem, Category } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryTypes {
  incomeCategories: Category[];
  expenseCategories: Category[];
}

const initialState: CategoryTypes = {
  incomeCategories: [],
  expenseCategories: [],
};

const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    setIncomeCategory: (state, action: PayloadAction<Category[]>) => {
      state.incomeCategories = action.payload;
    },
    setExpenseCategory: (state, action: PayloadAction<Category[]>) => {
      state.expenseCategories = action.payload;
    },
  },
});

export const { setIncomeCategory, setExpenseCategory } = category.actions;

export const selectIncomeCategory = (state: { category: CategoryTypes }) =>
  state.category.incomeCategories;
export const selectExpenseCategory = (state: { category: CategoryTypes }) =>
  state.category.expenseCategories;

export default category.reducer;
