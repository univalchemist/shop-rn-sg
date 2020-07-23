import {
  ORDER_HISTORY,
  ORDER_DETAILS_HISTORY,
  TRACK_ORDER,
} from '@shops/__mocks__/data';
import * as actions from '../actions';
import * as types from '../types';
import { configureMockStore } from '@testUtils';

const api = {
  getOrdersHistory: () => ({
    data: ORDER_HISTORY,
  }),
  getOrderDetail: () => ({
    data: ORDER_DETAILS_HISTORY,
  }),
  getTrackOrder: () => ({
    data: TRACK_ORDER,
  }),
};

describe('Order history actions', () => {
  const initialState = { user: { clientId: 'cxadev', userId: '253' } };
  let store;
  beforeEach(()=>{
    store = configureMockStore(api)(initialState);
  })

  it('should create an action to get order history', () => {
    const expectedActions = [
      { type: types.GET_ORDER_HISTORY_START },
      {
        type: types.GET_ORDER_HISTORY_SUCCESS,
        payload: ORDER_HISTORY,
      },
    ];
    return store.dispatch(actions.getOrderHistory()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to get getOrderDetail', () => {
    const expectedActions = [
      { type: types.GET_ORDER_DETAIL_START },
      {
        type: types.GET_ORDER_DETAIL_SUCCESS,
        payload: ORDER_DETAILS_HISTORY,
      },
    ];
    return store.dispatch(actions.getOrderDetail()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to get getTrackOrder', () => {
    const expectedActions = [
      { type: types.GET_TRACK_ORDER_START },
      {
        type: types.GET_TRACK_ORDER_SUCCESS,
        payload: TRACK_ORDER,
      },
    ];

    return store.dispatch(actions.getTrackOrder()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
