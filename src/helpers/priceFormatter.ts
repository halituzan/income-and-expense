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
  const {
    locale = "tr-TR",
    currency = "TRY",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};

export default priceFormatter;
