import dbName from "../dbNames";

const { notificationsSettings } = dbName;
export default () => {
  const data =
    (window.localStorage.getItem(notificationsSettings) as string) || "{}";
  const parsedData = JSON.parse(data);
  return parsedData;
};
