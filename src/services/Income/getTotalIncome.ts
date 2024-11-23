import dbName from "../dbNames";

const { incomes } = dbName;
export default () => {
  const data = (window.localStorage.getItem(incomes) as string) || "[]";
  const parsedData = JSON.parse(data);

  const totalAmount = parsedData.reduce((sum: number, item: any) => {
    return sum + (item.amount || 0);
  }, 0);

  return totalAmount;
};
