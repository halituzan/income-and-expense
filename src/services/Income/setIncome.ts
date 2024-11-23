import { ExpenseItem } from "@/types";
import dbName from "../dbNames";

const { incomes } = dbName;
export default (payload: ExpenseItem) => {
  const data = (window.localStorage.getItem(incomes) as string) || "[]";
  const parsedData = JSON.parse(data) as ExpenseItem[];
  const newData = JSON.stringify([...parsedData, payload]);
  localStorage.setItem(incomes, newData);
  return newData;
};
