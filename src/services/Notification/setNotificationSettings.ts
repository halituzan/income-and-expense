import dbName from "../dbNames";
import getNotificationSettings from "./getNotificationSettings";

const { notificationsSettings } = dbName;
export default (key: string, value: any) => {
  let data = getNotificationSettings();
  const newData = { ...data, [key]: value };
  localStorage.setItem(notificationsSettings, JSON.stringify(newData));
};
