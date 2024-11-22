import dbName from "../dbNames";

const { expensesCategory } = dbName;
export default () => {
  const data = (window.localStorage.getItem(expensesCategory) as string) || "[]";
  const parsedData = JSON.parse(data);
  return parsedData;
};
