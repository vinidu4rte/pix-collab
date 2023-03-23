export function formatCurrency(value: string) {
  const numericValue = Number(value.replace(/[^0-9]/g, "")) / 100;

  if (isNaN(numericValue)) return value.replace(/[^0-9]/g, "");

  if (numericValue > 5000) {
    return "R$ 5.000,00";
  }

  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
