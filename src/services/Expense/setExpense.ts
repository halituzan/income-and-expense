import { ExpenseItem } from "@/types";
import dbName from "../dbNames";

const { expenses } = dbName;
export default (payload: ExpenseItem) => {

  const data = (window.localStorage.getItem(expenses) as string) || "[]";
  const parsedData = JSON.parse(data) as ExpenseItem[];
  const newData = JSON.stringify([...parsedData, payload]);
  localStorage.setItem(expenses, newData);
  return newData;
};
