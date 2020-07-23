import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
export const getCurrency = state =>
  state.shop?.config?.currency?.defaultCurrencySymbol || '';

export const getSymbolCurrencySelector = createSelector(
  [getCurrency],
  currencySymbol => currencySymbol,
);

const formatMoney = price =>
  parseFloat(price)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const useGetFormattedPrice = (price, defaultSymbol) => {
  const currencySymbol =
    defaultSymbol || useSelector(getSymbolCurrencySelector);
  if (!price) return '';
  return `${currencySymbol}${formatMoney(price)}`;
};
