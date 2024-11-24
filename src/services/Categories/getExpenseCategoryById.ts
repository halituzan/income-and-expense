import dbName from "../dbNames";

const { expenses } = dbName;
export default (categoryId: string) => {
  const data = (window.localStorage.getItem(expenses) as string) || "[]";
  const parsedData = JSON.parse(data);
  const total = parsedData.reduce((sum: any, item: any) => {
    return sum + item.amount || 0;
  }, 0);

  return {
    data:
      parsedData.filter(
        (env: { categoryId: string }) => env.categoryId === categoryId
      ) ?? {},
    total: total ?? 0,
  };
};
