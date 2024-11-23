import getExpensesCategories from "../Categories/getExpensesCategories";
import dbName from "../dbNames";

const { expenses } = dbName;
export default () => {
  const data = (window.localStorage.getItem(expenses) as string) || "[]";
  const parsedData = JSON.parse(data);
  const expensesCategory = getExpensesCategories();

  const newData = parsedData.map((item: any) => {
    return {
      ...item,
      category: expensesCategory.find((i: any) => i.id == item.categoryId),
    };
  });

  console.log("newData", newData);

  return newData;
};
