import { format } from "date-fns";
import { tr } from "date-fns/locale";
export default (date: string, lang: string) => {
  const newDate = new Date(date);
  const formattedDate = format(newDate, "MMMM yyyy", {
    locale: lang === "tr" ? tr : undefined,
  });
  return formattedDate;
};
