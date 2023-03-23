export function formatCurrency(value: string) {
  const numbericValue = Number(value.replace(/[^0-9]/g, "")) / 100;
  if (isNaN(numbericValue)) return value.replace(/[^0-9]/g, "");

  return numbericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
