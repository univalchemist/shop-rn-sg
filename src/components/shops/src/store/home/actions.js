import {
  GET_SUGGESTED_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY_ID,
  GET_PRODUCT_BY_SKU,
  GET_PRODUCTS_BY_SEARCH_TERM,
  GET_SHOP_WALLET,
} from './types';
import { PRODUCT_PARAMS } from '@shops/config/constants';

export const getSuggestedOffers = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId } = getState().user;
    const { suggestedProducts } = getState().shop.paginations;
    const { data } = await api.getSuggestedOffers({
      clientId,
      page: suggestedProducts.page,
    });
    return data;
  };

  return dispatch({
    type: GET_SUGGESTED_PRODUCTS,
    payload: getPromise(),
  });
};

export const getProducts = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const state = getState();
    const { clientId } = state.user;
    const { params } = state.shop.filters;
    const { data } = await api.getProducts(clientId, {
      page: 1,
      pageSize: 4,
      ...params,
    });
    return data;
  };

  return dispatch({
    type: GET_PRODUCTS,
    payload: getPromise(),
  });
};

export const getProductsByCategoryId = categoryId => (
  dispatch,
  getState,
  { api },
) => {
  const getPromise = async () => {
    const state = getState();
    const { clientId } = state.user;
    const { productsByCategoryId } = state.shop.paginations;
    const params = { ...state.shop.filters.params };
    delete params[PRODUCT_PARAMS.CATEGORY_ID];
    const { page } = productsByCategoryId[parseInt(categoryId, 10)];
    const { data } = await api.getProductsByCategoryId(clientId, categoryId, {
      page: page + 1,
      pageSize: 4,
      ...params,
    });
    return data;
  };

  return dispatch({
    type: GET_PRODUCTS_BY_CATEGORY_ID,
    payload: getPromise(),
    meta: { categoryId },
  });
};

export const getProductBySku = sku => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId } = getState().user;
    const { data } = await api.getProductBySku(clientId, sku);

    return data;
  };

  return dispatch({
    type: GET_PRODUCT_BY_SKU,
    payload: getPromise(),
  });
};

export const getProductBySearchTerm = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const state = getState();
    const { clientId } = state.user;
    const { params } = state.shop.filters;
    const { data } = await api.getProductsBySearchTerm(clientId, {
      page: 1,
      pageSize: 4,
      ...params,
    });
    return data;
  };

  return dispatch({
    type: GET_PRODUCTS_BY_SEARCH_TERM,
    payload: getPromise(),
  });
};

export const getShopWallet = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.getShopWallet(clientId, userId);

    return data;
  };

  return dispatch({
    type: GET_SHOP_WALLET,
    payload: getPromise(),
  });
};
