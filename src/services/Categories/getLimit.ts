import dbName from "../dbNames";

const { expensesCategory } = dbName;
export default (categoryId: string) => {
  const data =
    (window.localStorage.getItem(expensesCategory) as string) || "[]";
  const parsedData = JSON.parse(data);
  return {
    limit:
      parseInt(
        parsedData.find((env: { id: string }) => env.id === categoryId).limit
      ) ?? 0,
    data: parsedData.find((env: { id: string }) => env.id === categoryId),
  };
};
