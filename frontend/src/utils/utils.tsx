export const formatAndMaskCardNumber = (cardNumber: string): string => {
  const groups = cardNumber.match(/.{1,4}/g);
  if (!groups) return cardNumber;

  return groups
    .map((group, index) => (index === 1 || index === 2 ? "****" : group))
    .join(" ");
};
