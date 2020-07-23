/* istanbul ignore file */
import React from 'react';
import {
  useTheme as useThemeDefault,
  useIntl,
  useFetchActions,
} from '@cxa-rn/core';
import { useSelector } from 'react-redux';
import { getSymbolCurrencySelector } from '@shops/store/selectors';

export { useIntl, useFetchActions };

export const useTheme = () => {
  return useThemeDefault().shop;
};

const formatMoney = price =>
  parseFloat(price)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const useGetFormattedPrice = (price, defaultSymbol, showZero = true) => {
  const currencySymbol =
    defaultSymbol || useSelector(getSymbolCurrencySelector);
  if (!showZero && !price) {
    return '';
  }
  if (showZero && !price) {
    price = 0;
  }

  return currencySymbol + ' ' + formatMoney(price);
};

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
