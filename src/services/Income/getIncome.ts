import getIncomesCategories from "../Categories/getIncomesCategories";
import dbName from "../dbNames";

const { incomes } = dbName;
export default () => {
  const data = (window.localStorage.getItem(incomes) as string) || "[]";
  const parsedData = JSON.parse(data);
  const incomesCategory = getIncomesCategories();

  const newData = parsedData.map((item: any) => {
    return {
      ...item,
      category: incomesCategory.find((i: any) => i.id == item.categoryId) ?? {
        name: "Tanımsız",
        id: "undefined",
      },
    };
  });

  return newData;
};
