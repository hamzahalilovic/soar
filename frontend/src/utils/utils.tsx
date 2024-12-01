export const formatAndMaskCardNumber = (cardNumber: string): string => {
  const groups = cardNumber.match(/.{1,4}/g);
  if (!groups) return cardNumber;

  return groups
    .map((group, index) => (index === 1 || index === 2 ? "****" : group))
    .join(" ");
};

export const isPositiveNumber = (amount: number): boolean => {
  return amount > 0;
};

export const formatCurrencyAmount = (amount: number): string => {
  const formattedAmount = Math.abs(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return amount > 0 ? `+${formattedAmount}` : `-${formattedAmount}`;
};
