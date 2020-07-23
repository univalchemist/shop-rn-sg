/* istanbul ignore file */

export * from './config/actions';
export * from './filters/actions';
export * from './home/actions';
export * from './review/actions';
export * from './cart/actions';
export * from './orderhistory/actions';
export * from './deliveryAddress/actions';
export * from './ssoLogin/actions';
export * from './order/actions';
export * from './paginations/actions';

import * as types from './types';

import {
  getCategories,
  getCountries,
  getSortings,
  getStoreConfigs,
  getBanners,
} from '@shops/store/config/actions';
import {
  getCart,
  getCartCoupons,
  getCartTotals,
} from '@shops/store/cart/actions';
import { getDeliveryAddresses } from '@shops/store/deliveryAddress/actions';

export const initializeShop = () => async dispatch => {
  const getPromise = async () => {
    const actions = [
      getStoreConfigs,
      getCategories,
      getSortings,
      getCountries,
      getCart,
      getCartTotals,
      getDeliveryAddresses,
      getCartCoupons,
      getBanners,
    ];
    return Promise.all(actions.map(action => dispatch(action())));
  };

  return dispatch({
    type: types.SHOP_INITIALIZE,
    payload: getPromise(),
  });
};
