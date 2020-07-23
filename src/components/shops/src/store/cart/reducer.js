import {
  GET_CART_SUCCESS,
  GET_CART_TOTALS_SUCCESS,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  ADD_TO_CART_SUCCESS,
  GET_BILLING_ADDRESS_SUCCESS,
  GET_SHIPPING_ADDRESS_SUCCESS,
  GET_CART_COUPONS_SUCCESS,
  REMOVE_CART_COUPON_SUCCESS,
  ADD_CART_COUPON_SUCCESS,
  UPDATE_CART_SUCCESS,
} from './types';

export const INITIAL_STATE = {
  isActive: false,
  itemsCount: 0,
  itemsQty: 0,
  items: [],
  totals: {},
  shipping: [],
  billing: [],
  discountCode: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
    case GET_CART_SUCCESS:
    case UPDATE_CART_SUCCESS:
    case REMOVE_ITEM_FROM_CART_SUCCESS: {
      const { items, itemsCount, itemsQty, isActive } = action.payload;

      return {
        ...state,
        items,
        itemsCount,
        itemsQty,
        isActive,
      };
    }

    case GET_CART_TOTALS_SUCCESS: {
      return {
        ...state,
        totals: action.payload,
      };
    }

    case GET_BILLING_ADDRESS_SUCCESS: {
      return {
        ...state,
        billing: action.payload,
      };
    }

    case GET_SHIPPING_ADDRESS_SUCCESS: {
      return {
        ...state,
        shipping: action.payload,
      };
    }

    case GET_CART_COUPONS_SUCCESS: {
      return {
        ...state,
        discountCode: action.payload?.[0],
      };
    }

    case ADD_CART_COUPON_SUCCESS: {
      return {
        ...state,
        discountCode: action.meta.couponCode,
      };
    }

    case REMOVE_CART_COUPON_SUCCESS: {
      return {
        ...state,
        discountCode: null,
      };
    }

    default:
      return state;
  }
};
