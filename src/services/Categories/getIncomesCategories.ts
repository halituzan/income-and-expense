import dbName from "../dbNames";

const { incomeCategory } = dbName;
export default () => {
  const data =
    (window.localStorage.getItem(incomeCategory) as string) || "[]";
  const parsedData = JSON.parse(data);
  return parsedData;
};
