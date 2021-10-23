export function formatDate(strDate: string) {
  const date: Date = new Date(strDate);

  return date.toDateString();
}
