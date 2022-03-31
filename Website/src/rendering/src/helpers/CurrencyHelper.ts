const significanDigits = 2;
const thousandsSeparator = ',';
const decimalSeparator = '.';
const currencySymbol = '$';

export function formatCurrency(value = 0): string {
  const formatted = value.toFixed(significanDigits);
  const [currency, decimal] = formatted.split('.');
  const currencyWithThousandsSeparator = currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator
  );
  return currencySymbol + currencyWithThousandsSeparator + decimalSeparator + decimal;
}
