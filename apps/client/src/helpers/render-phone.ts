export const renderPhone = (phone: string): string => {
  const match = phone.match(/^380(\d{2})(\d{3})(\d{2})(\d{2})$/);

  if (!match) return phone;

  const [, operator, part1, part2, part3] = match;

  return `+38 (0${operator}) ${part1}-${part2}-${part3}`;
};
