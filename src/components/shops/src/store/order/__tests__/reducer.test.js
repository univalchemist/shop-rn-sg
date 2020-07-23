import reducer, { INITIAL_STATE } from '../reducer';
import { PAYMENT } from '@shops/__mocks__/data';
import { MAKE_PAYMENT_SUCCESS } from '@shops/store/cart/types';

describe('Shop home reducer', () => {
  it('should return initial state when action is undefined', () => {
    expect(reducer(undefined, { type: 'INIT' })).toEqual(INITIAL_STATE);
  });

  it('should handle MAKE_PAYMENT_SUCCESS', () => {
    const state = {
      ...INITIAL_STATE,
    };

    const expectedState = {
      ...INITIAL_STATE,
      ...PAYMENT,
    };

    const action = {
      type: MAKE_PAYMENT_SUCCESS,
      payload: {
        ...PAYMENT,
      },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });
});
