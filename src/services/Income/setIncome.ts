import dbName from "../dbNames";

const { incomes } = dbName;
export default (payload: any) => {
  const data = (window.localStorage.getItem(incomes) as string) || "[]";
  const parsedData = JSON.parse(data) as any;
  const newData = JSON.stringify([...parsedData, payload]);
  localStorage.setItem(incomes, newData);
  return newData;
};
