import { MAKE_PAYMENT_SUCCESS } from '@shops/store/cart/types';

export const INITIAL_STATE = {
  paymentUrl: '',
  orderId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAKE_PAYMENT_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
