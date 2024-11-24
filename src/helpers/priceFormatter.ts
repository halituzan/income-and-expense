import dbName from "@/services/dbNames";

type PriceFormatterOptions = {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

const priceFormatter = (
  value: number,
  options: PriceFormatterOptions = {}
): string => {
  const cur = JSON.parse(
    localStorage.getItem(dbName.notificationsSettings) as string
  )?.currency;
  const {
    locale = "tr-TR",
    currency = "TRY",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;
  const formattedOptions: PriceFormatterOptions = {
    locale: cur === "USD" ? "en-EN" : locale,
    currency: cur || currency,
    minimumFractionDigits,
    maximumFractionDigits,
  };
  return new Intl.NumberFormat(formattedOptions.locale, {
    style: "currency",
    currency: formattedOptions.currency!,
    minimumFractionDigits: formattedOptions.minimumFractionDigits,
    maximumFractionDigits: formattedOptions.maximumFractionDigits,
  }).format(value);
};

export default priceFormatter;
