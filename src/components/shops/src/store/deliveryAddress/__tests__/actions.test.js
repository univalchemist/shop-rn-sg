import { configureMockStore } from '@testUtils';
import { ADDRESSES } from '@shops/__mocks__/data';
import * as actions from '../actions';
import * as types from '../types';

const api = {
  getDeliveryAddresses: () => ({
    data: ADDRESSES,
  }),
  deleteDeliveryAddress: () => ({
    data: ADDRESSES,
  }),
  addDeliveryAddress: () => ({
    data: ADDRESSES,
  }),
  updateDeliveryAddress: () => ({
    data: ADDRESSES,
  }),
};

describe('Shop DeliveryAddress actions', () => {
  it('should create an action to getAddresses', () => {
    const initialState = { user: { clientId: 'cxadev' } };
    const store = configureMockStore(api)(initialState);
    const expectedActions = [
      { type: types.GET_DELIVERY_ADDRESSES_START },
      {
        type: types.GET_DELIVERY_ADDRESSES_SUCCESS,
        payload: ADDRESSES,
      },
    ];

    return store.dispatch(actions.getDeliveryAddresses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to delete address ', () => {
    const initialState = { user: { clientId: 'cxadev' } };
    const addressId = '1';
    const store = configureMockStore(api)(initialState);
    const expectedActions = [
      { type: types.DELETE_DELIVERY_ADDRESS_START, meta: { addressId: '1' } },
      {
        type: types.DELETE_DELIVERY_ADDRESS_SUCCESS,
        payload: ADDRESSES,
        meta: { addressId: '1' },
      },
    ];

    return store.dispatch(actions.deleteDeliveryAddress(addressId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to add delivery address', () => {
    const initialState = {
      user: {
        clientId: 'cxadev',
        membersMap: {
          1: { contactNumber: '012345', firstName: 'First', lastName: 'last' },
        },
        userId: 1,
      },
    };
    const store = configureMockStore(api)(initialState);
    const expectedActions = [
      { type: types.ADD_DELIVERY_ADDRESS_START },
      {
        type: types.ADD_DELIVERY_ADDRESS_SUCCESS,
        payload: ADDRESSES,
      },
    ];

    return store.dispatch(actions.addDeliveryAddress()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to add delivery address without contact number', () => {
    const initialState = {
      user: {
        clientId: 'cxadev',
        membersMap: {
          1: { firstName: 'First', lastName: 'last' },
        },
        userId: 1,
      },
    };
    const store = configureMockStore(api)(initialState);
    const expectedActions = [
      { type: types.ADD_DELIVERY_ADDRESS_START },
      {
        type: types.ADD_DELIVERY_ADDRESS_SUCCESS,
        payload: ADDRESSES,
      },
    ];

    return store.dispatch(actions.addDeliveryAddress()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to add update address', () => {
    const initialState = { user: { clientId: 'cxadev' } };
    const address = { id: 100 };
    const store = configureMockStore(api)(initialState);
    const expectedActions = [
      { type: types.UPDATE_DELIVERY_ADDRESS_START },
      {
        type: types.UPDATE_DELIVERY_ADDRESS_SUCCESS,
        payload: ADDRESSES,
      },
    ];

    return store.dispatch(actions.updateDeliveryAddress(address)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
