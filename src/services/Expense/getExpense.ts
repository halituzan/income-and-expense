import { Category, ExpenseItem } from "@/types";
import getExpensesCategories from "../Categories/getExpensesCategories";
import dbName from "../dbNames";

const { expenses } = dbName;
export default () => {
  const data = (window.localStorage.getItem(expenses) as string) || "[]";
  const parsedData = JSON.parse(data);
  const expensesCategory = getExpensesCategories();

  const newData = parsedData.map((item: ExpenseItem) => {
    return {
      ...item,
      category: expensesCategory.find(
        (i: Category) => i.id == item.categoryId
      ) ?? {
        name: "Tanımsız",
        id: "undefined",
      },
    };
  });

  return newData;
};
