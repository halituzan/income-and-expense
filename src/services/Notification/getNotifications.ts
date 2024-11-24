import dbName from "../dbNames";

const { notifications } = dbName;
export default () => {
  const data =
    (window.localStorage.getItem(notifications) as string) || "{}";
  const parsedData = JSON.parse(data);
  return parsedData;
};
