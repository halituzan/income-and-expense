import { ExpenseItem } from "@/types";
import dbName from "../dbNames";

const { expenses } = dbName;
export default () => {
  const data = (window.localStorage.getItem(expenses) as string) || "[]";
  const parsedData = JSON.parse(data);
  console.log("parsedData", parsedData);

  const totalAmount = parsedData.reduce((sum: number, item: ExpenseItem) => {
    return sum + (item.amount || 0);
  }, 0);

  return totalAmount;
};
