import dbName from "../dbNames";

const { expenses } = dbName;
export default (payload: any) => {
  const data = (window.localStorage.getItem(expenses) as string) || "[]";
  const parsedData = JSON.parse(data) as any;
  const newData = JSON.stringify([...parsedData, payload]);
  localStorage.setItem(expenses, newData);
  return newData;
};
