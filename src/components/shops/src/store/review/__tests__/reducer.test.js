import reducer, { INITIAL_STATE } from '../reducer';
import * as types from '../types';
import {  GET_REVIEW } from '@shops/__mocks__/data';


describe('Review reducer', () => {
  it('should return initial state when action is undefined', () => {
    expect(reducer(undefined, { type: 'INIT' })).toEqual(INITIAL_STATE);
  });
  it('should handle GET_STORE_CONFIGS_SUCCESS', () => {
    const expectedState = {
      ...INITIAL_STATE,
      currentReviews: GET_REVIEW,
    };

    const action = {
      type: types.GET_REVIEW_SUCCESS,
      payload: GET_REVIEW,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });
})

