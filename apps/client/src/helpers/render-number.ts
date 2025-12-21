export const renderNumber = (number: number, withCurrency: boolean): string => {
  return new Intl.NumberFormat('uk-UA', {
    style: withCurrency ? 'currency' : 'decimal',
    currency: withCurrency ? 'UAH' : undefined,
    currencyDisplay: withCurrency ? 'symbol' : undefined,
  }).format(number);
};
