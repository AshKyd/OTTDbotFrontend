const SHORT_FORMATS = [
  { divisor: 1e9, suffix: "b" },
  { divisor: 1e6, suffix: "m" },
  { divisor: 1e3, suffix: "k" },
];

const CURRENCY_OPTIONS = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const SHORT_OPTIONS = {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
};

const formatMoney = (amount) => {
  if (amount === null || amount === undefined) {
    return (0).toLocaleString("en-US", CURRENCY_OPTIONS);
  }

  const absAmount = Math.abs(amount);

  for (const { divisor, suffix } of SHORT_FORMATS) {
    if (absAmount >= divisor) {
      return (
        "$" +
        (amount / divisor).toLocaleString(undefined, SHORT_OPTIONS) +
        suffix
      ); // Added dollar sign
    }
  }

  return amount.toLocaleString("en-US", CURRENCY_OPTIONS);
};

const Money = ({ money }) => {
  const formattedShort = formatMoney(money);
  const formattedFull =
    money !== null && money !== undefined
      ? money.toLocaleString("en-US", CURRENCY_OPTIONS)
      : (0).toLocaleString("en-US", CURRENCY_OPTIONS);

  return <span title={formattedFull}>{formattedShort}</span>;
};

export default Money;
