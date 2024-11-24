export default (data: any) => {
  const total = data.reduce((sum: any, item: any) => {
    return sum + item.amount || 0;
  }, 0);

  return total;
};
