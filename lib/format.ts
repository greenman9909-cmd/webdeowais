export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export function calculateOriginalPrice(finalPrice: number, discount: number) {
  if (discount <= 0) return finalPrice;
  const original = finalPrice / (1 - discount / 100);
  return Math.round(original * 100) / 100;
}
