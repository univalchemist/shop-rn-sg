import reducer, { initialState } from '../reducer';
import * as types from '../types';

describe('ssoLogin reducer', () => {
  it('initiate state', () => {
    const initialStateObj = reducer(undefined, {});
    expect(initialStateObj).toEqual(initialState);
  });

  it('should update state when action UPDATE_ACCOUNT_INFO is dispatched', () => {
    const action = {
      type: types.UPDATE_ACCOUNT_INFO_SUCCESS,
      payload: {
        username: 'someusername',
        password: 'somepassword',
      },
    };
    const state = reducer(undefined, action);

    const expectedState = {
      ...initialState,
      accountInfo: action.payload,
    };

    expect(state).toEqual(expectedState);
  });
});
