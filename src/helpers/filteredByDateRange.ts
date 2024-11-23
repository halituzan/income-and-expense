export default function filterByDateRange(
  data: any,
  startDate: Date | undefined,
  endDate: Date | undefined
) {
  let start: Date | undefined = undefined;
  let end: Date | undefined = undefined;
  if (startDate) {
    start = new Date(startDate);
  }
  if (endDate) {
    end = new Date(endDate);
  }

  return data.filter((item: any) => {
    const itemDate = new Date(item.date);
    const isAfterStart = start ? itemDate >= start : true;
    const isBeforeEnd = end ? itemDate <= end : true;
    return isAfterStart && isBeforeEnd;
  });
}
