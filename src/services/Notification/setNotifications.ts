import dbName from "../dbNames";
import getNotifications from "./getNotifications";

const { notifications } = dbName;
export default (payload: any) => {
  let data = getNotifications();
  const newData = [...data, ...payload];
  localStorage.setItem(notifications, JSON.stringify(newData));
};
