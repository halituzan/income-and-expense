import { ExpenseItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExpenditureValues {
  amount?: string;
  categoryId?: string;
  date?: any;
  description?: string;
  id?: string;
}

export interface ExpenditureState {
  incomes: ExpenseItem[];
  expenses: ExpenseItem[];
  incomeValues: ExpenditureValues;
  expenseValues: ExpenditureValues;
}

const initialState: ExpenditureState = {
  incomes: [],
  expenses: [],
  incomeValues: {
    amount: "",
    categoryId: "",
    date: "",
    description: "",
  },
  expenseValues: {
    amount: "",
    categoryId: "",
    date: "",
    description: "",
  },
};

const expenditure = createSlice({
  name: "expenditure",
  initialState,
  reducers: {
    setIncomes: (state, action: PayloadAction<ExpenseItem[]>) => {
      state.incomes = action.payload;
    },
    setExpenses: (state, action: PayloadAction<ExpenseItem[]>) => {
      state.expenses = action.payload;
    },
    setIncomeValues: (
      state,
      action: PayloadAction<{
        key: keyof ExpenditureValues;
        value: string | any;
      }>
    ) => {
      state.incomeValues[action.payload.key] = action.payload.value;
    },
    setExpenseValues: (
      state,
      action: PayloadAction<{
        key: keyof ExpenditureValues;
        value: string | any;
      }>
    ) => {
      state.expenseValues[action.payload.key] = action.payload.value;
    },
    clearIncomeValues: (state) => {
      state.incomeValues = {
        amount: "",
        categoryId: "",
        date: "",
        description: "",
      };
    },
    clearExpenseValues: (state) => {
      state.expenseValues = {
        amount: "",
        categoryId: "",
        date: "",
        description: "",
      };
    },
  },
});

export const {
  setIncomes,
  setExpenses,
  setIncomeValues,
  setExpenseValues,
  clearIncomeValues,
  clearExpenseValues,
} = expenditure.actions;

export const selectIncomes = (state: {
  expenditure: ExpenditureState;
}): ExpenseItem[] => state.expenditure.incomes;

export const selectExpenses = (state: {
  expenditure: ExpenditureState;
}): ExpenseItem[] => state.expenditure.expenses;

export const selectIncomeValues = (state: { expenditure: ExpenditureState }) =>
  state.expenditure.incomeValues;

export const selectExpenseValues = (state: { expenditure: ExpenditureState }) =>
  state.expenditure.expenseValues;

export default expenditure.reducer;
