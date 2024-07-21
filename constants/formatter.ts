export function formateDateApi(apiDateTime: string) {
  const date = new Date(apiDateTime);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // +1 car les mois vont de 0 à 11
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}
