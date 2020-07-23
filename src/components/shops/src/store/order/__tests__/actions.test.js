import { ORDER_DETAILS_HISTORY } from '@shops/__mocks__/data';
import * as actions from '../actions';
import * as types from '../types';
import { configureMockStore } from '@testUtils';

const api = {
  getOrder: () => ({
    data: ORDER_DETAILS_HISTORY,
  }),
};

describe('Order history actions', () => {
  const initialState = { user: { clientId: 'cxadev', userId: '253' } };
  let store;
  beforeEach(() => {
    store = configureMockStore(api)(initialState);
  });

  it('should create an action to get order ', () => {
    const expectedActions = [
      { type: types.GET_ORDER_START },
      {
        type: types.GET_ORDER_SUCCESS,
        payload: ORDER_DETAILS_HISTORY,
      },
    ];
    return store.dispatch(actions.getOrder()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
