import reducer, { INITIAL_STATE } from '../reducer';

import * as types from '../types';
import { BILLING, CART, CART_TOTAL, SHIPPING } from '@shops/__mocks__/data';

describe('Shop filters reducer', () => {
  it('should return initial state when action is undefined', () => {
    expect(reducer(undefined, { type: 'INIT' })).toEqual(INITIAL_STATE);
  });

  it('should handle GET_CART_SUCCESS with valid action payload', () => {
    const { items, itemsCount, itemsQty, isActive } = CART;
    const expectedState = {
      ...INITIAL_STATE,
      items,
      itemsCount,
      itemsQty,
      isActive,
    };

    const action = {
      type: types.GET_CART_SUCCESS,
      payload: CART,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle ADD_TO_CART_SUCCESS with valid action payload', () => {
    const { items, itemsCount, itemsQty, isActive } = CART;
    const expectedState = {
      ...INITIAL_STATE,
      items,
      itemsCount,
      itemsQty,
      isActive,
    };

    const action = {
      type: types.ADD_TO_CART_SUCCESS,
      payload: CART,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });
  it('should handle REMOVE_ITEM_FROM_CART_SUCCESS with valid action payload', () => {
    const { items, itemsCount, itemsQty, isActive } = CART;
    const expectedState = {
      ...INITIAL_STATE,
      items,
      itemsCount,
      itemsQty,
      isActive,
    };

    const action = {
      type: types.REMOVE_ITEM_FROM_CART_SUCCESS,
      payload: CART,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle GET_CART_TOTALS_SUCCESS with valid action payload', () => {
    const expectedState = {
      ...INITIAL_STATE,
      totals: CART_TOTAL,
    };

    const action = {
      type: types.GET_CART_TOTALS_SUCCESS,
      payload: CART_TOTAL,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle GET_BILLING_ADDRESS_SUCCESS with valid action payload', () => {
    const expectedState = {
      ...INITIAL_STATE,
      billing: BILLING,
    };

    const action = {
      type: types.GET_BILLING_ADDRESS_SUCCESS,
      payload: BILLING,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle GET_SHIPPING_ADDRESS_SUCCESS with valid action payload', () => {
    const expectedState = {
      ...INITIAL_STATE,
      shipping: SHIPPING,
    };

    const action = {
      type: types.GET_SHIPPING_ADDRESS_SUCCESS,
      payload: SHIPPING,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle GET_CART_COUPONS_SUCCESS with valid action payload', () => {
    const expectedState = {
      ...INITIAL_STATE,
      discountCode: 'Welcome10',
    };

    const action = {
      type: types.GET_CART_COUPONS_SUCCESS,
      payload: ['Welcome10'],
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle ADD_CART_COUPON_SUCCESS with valid action payload', () => {
    const expectedState = {
      ...INITIAL_STATE,
      discountCode: 'Welcome10',
    };

    const action = {
      type: types.ADD_CART_COUPON_SUCCESS,
      meta: {
        couponCode: 'Welcome10',
      },
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle REMOVE_CART_COUPON_SUCCESS with valid action payload', () => {
    const expectedState = {
      ...INITIAL_STATE,
      discountCode: null,
    };

    const action = {
      type: types.REMOVE_CART_COUPON_SUCCESS,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });
});
