import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface ExpenditureValues {
  amount?: string;
  categoryId?: string;
  date?: any;
}
export interface ExpenditureState {
  incomes: object[];
  expenses: object[];
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
  },
  expenseValues: {
    amount: "",
    categoryId: "",
    date: "",
  },
};

const expenditure = createSlice({
  name: "expenditure",
  initialState,
  reducers: {
    setIncomes: (state, action: PayloadAction<any>) => {
      state.incomes = action.payload;
    },
    setExpenses: (state, action: PayloadAction<any>) => {
      state.expenses = action.payload;
    },
    setIncomeValues: (
      state,
      action: PayloadAction<{ key: keyof ExpenditureValues; value: any }>
    ) => {
      state.incomeValues[action.payload.key] = action.payload.value;
    },
    setExpenseValues: (
      state,
      action: PayloadAction<{ key: keyof ExpenditureValues; value: any }>
    ) => {
      state.expenseValues[action.payload.key] = action.payload.value;
    },
    clearIncomeValues: (state) => {
      state.incomeValues = { amount: "", categoryId: "", date: "" };
    },
    clearExpenseValues: (state) => {
      state.expenseValues = { amount: "", categoryId: "", date: "" };
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
export const selectIncomes = (state: { expenditure: ExpenditureState }) =>
  state.expenditure.incomes;
export const selectExpenses = (state: { expenditure: ExpenditureState }) =>
  state.expenditure.expenses;
export const selectIncomeValues = (state: any) =>
  state.expenditure.incomeValues;
export const selectExpenseValues = (state: any) =>
  state.expenditure.expenseValues;

export default expenditure.reducer;
