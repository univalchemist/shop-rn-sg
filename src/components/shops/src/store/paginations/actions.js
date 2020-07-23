import { GET_SUGGESTED_PRODUCTS_INIT } from '../home/types';

export const initSuggestedOfferPagination = () => dispatch => {
  return dispatch({
    type: GET_SUGGESTED_PRODUCTS_INIT,
  });
};
