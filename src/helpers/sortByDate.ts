export default function sortByDate(
  data: any,
  order: "asc" | "desc" = "asc"
) {
  return data.sort((a: any, b: any) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (order === "asc") {
      return dateA.getTime() - dateB.getTime(); // Artan sıralama
    } else {
      return dateB.getTime() - dateA.getTime(); // Azalan sıralama
    }
  });
}
