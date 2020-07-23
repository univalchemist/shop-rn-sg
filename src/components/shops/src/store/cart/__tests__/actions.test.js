import {
  SHIPPING,
  BILLING,
  PAYMENT,
  CART,
  CART_TOTAL,
} from '@shops/__mocks__/data';
import * as actions from '../actions';
import * as types from '../types';
import { configureMockStore } from '@testUtils';

const api = {
  addToCart: () => ({
    data: CART,
  }),
  getCart: () => ({
    data: CART,
  }),
  getCartTotals: () => ({
    data: CART_TOTAL,
  }),
  getCartBilling: () => ({
    data: BILLING,
  }),
  postCartBilling: () => ({
    data: BILLING,
  }),
  getCartShipping: () => ({
    data: SHIPPING,
  }),
  postCartShipping: () => ({
    data: SHIPPING,
  }),
  removeItemFromCart: () => ({
    data: CART,
  }),
  makePayment: () => ({
    data: PAYMENT,
  }),
  getCartCoupons: () => ({
    data: ['Welcome10'],
  }),
  removeCartCoupon: () => ({}),
  addCartCoupon: () => ({}),
};

describe('Cart actions', () => {
  const initialState = { user: { clientId: 'cxadev', userId: '253' } };
  let store;
  beforeEach(() => {
    store = configureMockStore(api)(initialState);
  });

  it('should create an action to addToCart ', () => {
    const expectedActions = [
      { type: types.ADD_TO_CART_START },
      {
        type: types.ADD_TO_CART_SUCCESS,
        payload: CART,
      },
    ];
    return store.dispatch(actions.addToCart({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to getCart ', () => {
    const expectedActions = [
      { type: types.GET_CART_START },
      {
        type: types.GET_CART_SUCCESS,
        payload: CART,
      },
    ];
    return store.dispatch(actions.getCart()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to getCartTotals ', () => {
    const expectedActions = [
      { type: types.GET_CART_TOTALS_START },
      {
        type: types.GET_CART_TOTALS_SUCCESS,
        payload: CART_TOTAL,
      },
    ];
    return store.dispatch(actions.getCartTotals()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should create an action to getCartBilling ', () => {
    const expectedActions = [
      { type: types.GET_CART_BILLING_START },
      {
        type: types.GET_CART_BILLING_SUCCESS,
        payload: BILLING,
      },
    ];
    return store.dispatch(actions.getCartBilling()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to postCartBilling ', () => {
    const expectedActions = [
      { type: types.POST_CART_BILLING_START },
      {
        type: types.POST_CART_BILLING_SUCCESS,
        payload: BILLING,
      },
    ];
    return store.dispatch(actions.postCartBilling()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to getCartShipping ', () => {
    const expectedActions = [
      { type: types.GET_CART_SHIPPING_START },
      {
        type: types.GET_CART_SHIPPING_SUCCESS,
        payload: SHIPPING,
      },
    ];
    return store.dispatch(actions.getCartShipping()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to postCartShipping ', () => {
    const expectedActions = [
      { type: types.POST_CART_SHIPPING_START },
      {
        type: types.POST_CART_SHIPPING_SUCCESS,
        payload: SHIPPING,
      },
    ];
    return store.dispatch(actions.postCartShipping()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to removeItemFromCart ', () => {
    const expectedActions = [
      { type: types.REMOVE_ITEM_FROM_CART_START },
      {
        type: types.REMOVE_ITEM_FROM_CART_SUCCESS,
        payload: CART,
      },
    ];
    return store.dispatch(actions.removeItemFromCart()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to makePayment ', () => {
    const expectedActions = [
      { type: types.MAKE_PAYMENT_START },
      {
        type: types.MAKE_PAYMENT_SUCCESS,
        payload: PAYMENT,
      },
    ];
    return store.dispatch(actions.makePayment()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to getCartCoupons', () => {
    const expectedActions = [
      { type: types.GET_CART_COUPONS_START },
      {
        type: types.GET_CART_COUPONS_SUCCESS,
        payload: ['Welcome10'],
      },
    ];
    return store.dispatch(actions.getCartCoupons()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to removeCartCoupon', () => {
    const expectedActions = [
      { type: types.REMOVE_CART_COUPON_START },
      {
        type: types.REMOVE_CART_COUPON_SUCCESS,
      },
    ];
    return store.dispatch(actions.removeCartCoupon()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to addCartCoupon', () => {
    const expectedActions = [
      {
        type: types.ADD_CART_COUPON_START,
        meta: {
          couponCode: 'Welcome10',
        },
      },
      {
        type: types.ADD_CART_COUPON_SUCCESS,
        meta: {
          couponCode: 'Welcome10',
        },
      },
    ];
    return store.dispatch(actions.addCartCoupon('Welcome10')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
