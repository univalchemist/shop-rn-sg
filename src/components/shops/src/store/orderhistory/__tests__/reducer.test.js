import reducer, { INITIAL_STATE } from '../reducer';
import * as types from '../types';
import { ORDER_HISTORY, ORDER_DETAILS_HISTORY } from '@shops/__mocks__/data';

describe('Order history reducer', () => {
  it('should return initial state when action is undefined', () => {
    expect(reducer(undefined, { type: null })).toEqual(INITIAL_STATE);
  });

  it('should handle GET_ORDER_HISTORY_SUCCESS', () => {
    const expectedState = {
      ...INITIAL_STATE,
      orderHistory: ORDER_HISTORY,
    };

    const action = {
      type: types.GET_ORDER_HISTORY_SUCCESS,
      payload: ORDER_HISTORY,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle GET_ORDER_DETAIL_SUCCESS', () => {
    const expectedState = {
      ...INITIAL_STATE,
      orderDetail: ORDER_DETAILS_HISTORY,
    };

    const action = {
      type: types.GET_ORDER_DETAIL_SUCCESS,
      payload: ORDER_DETAILS_HISTORY,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });
})
