import reducer, { INITIAL_STATE } from '../reducer';
import { ADDRESSES } from '@shops/__mocks__/data';
import * as types from '../types';

describe('DeliveryAddress reducer', () => {
  it('should return initial state when action is undefined', () => {
    expect(reducer(undefined, { type: 'INIT' })).toEqual(INITIAL_STATE);
  });
  it('should handle GET_DELIVERY_ADDRESSES_SUCCESS', () => {
    const expectedState = {
      ...INITIAL_STATE,
      addressIds: [67, 98],
      addressMap: {
        67: {
          id: 67,
          region: { id: 0 },
          regionId: 0,
          countryId: 'SG',
          telephone: '68823000',
          postCode: '319762',
          city: 'Singapore',
          firstName: 'Jie',
          lastName: 'Shen',
          street: ['620A, Lor 1 Toa Payoh Singapore 319762'],
          isDefaultShipping: false,
          isDefaultBilling: true,
        },
        98: {
          id: 98,
          region: { id: 0 },
          regionId: 0,
          countryId: 'SG',
          telephone: '3847342',
          postCode: '50000',
          city: 'Ho Chi Minh',
          firstName: 'Cxa2dev_Us3',
          lastName: 'Cxa2dev_Us3',
          street: ['10 Doan Van Bo'],
          isDefaultShipping: false,
          isDefaultBilling: false,
        },
      },
    };

    const action = {
      type: types.GET_DELIVERY_ADDRESSES_SUCCESS,
      payload: ADDRESSES,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle ADD_DELIVERY_ADDRESS_SUCCESS', () => {
    const expectedState = {
      ...INITIAL_STATE,
      addressIds: [67, 98],
      addressMap: {
        67: {
          id: 67,
          region: { id: 0 },
          regionId: 0,
          countryId: 'SG',
          telephone: '68823000',
          postCode: '319762',
          city: 'Singapore',
          firstName: 'Jie',
          lastName: 'Shen',
          street: ['620A, Lor 1 Toa Payoh Singapore 319762'],
          isDefaultShipping: false,
          isDefaultBilling: true,
        },
        98: {
          id: 98,
          region: { id: 0 },
          regionId: 0,
          countryId: 'SG',
          telephone: '3847342',
          postCode: '50000',
          city: 'Ho Chi Minh',
          firstName: 'Cxa2dev_Us3',
          lastName: 'Cxa2dev_Us3',
          street: ['10 Doan Van Bo'],
          isDefaultShipping: false,
          isDefaultBilling: false,
        },
      },
    };

    const action = {
      type: types.ADD_DELIVERY_ADDRESS_SUCCESS,
      payload: ADDRESSES,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_DELIVERY_ADDRESS_SUCCESS', () => {
    const expectedState = {
      ...INITIAL_STATE,
      addressIds: [67, 98],
      addressMap: {
        67: {
          id: 67,
          region: { id: 0 },
          regionId: 0,
          countryId: 'SG',
          telephone: '68823000',
          postCode: '319762',
          city: 'Singapore',
          firstName: 'Jie',
          lastName: 'Shen',
          street: ['620A, Lor 1 Toa Payoh Singapore 319762'],
          isDefaultShipping: false,
          isDefaultBilling: true,
        },
        98: {
          id: 98,
          region: { id: 0 },
          regionId: 0,
          countryId: 'SG',
          telephone: '3847342',
          postCode: '50000',
          city: 'Ho Chi Minh',
          firstName: 'Cxa2dev_Us3',
          lastName: 'Cxa2dev_Us3',
          street: ['10 Doan Van Bo'],
          isDefaultShipping: false,
          isDefaultBilling: false,
        },
      },
    };

    const action = {
      type: types.UPDATE_DELIVERY_ADDRESS_SUCCESS,
      payload: ADDRESSES,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_DELIVERY_ADDRESS_SUCCESS with payload undefined', () => {
    const action = {
      type: types.UPDATE_DELIVERY_ADDRESS_SUCCESS,
      payload: undefined,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE);
  });

  it('should handle DELETE_DELIVERY_ADDRESS_SUCCESS', () => {
    const expectedState = {
      ...INITIAL_STATE,
      addressIds: [67, 98],
      addressMap: {
        67: {
          id: 67,
          region: { id: 0 },
          regionId: 0,
          countryId: 'SG',
          telephone: '68823000',
          postCode: '319762',
          city: 'Singapore',
          firstName: 'Jie',
          lastName: 'Shen',
          street: ['620A, Lor 1 Toa Payoh Singapore 319762'],
          isDefaultShipping: false,
          isDefaultBilling: true,
        },
        98: {
          id: 98,
          region: { id: 0 },
          regionId: 0,
          countryId: 'SG',
          telephone: '3847342',
          postCode: '50000',
          city: 'Ho Chi Minh',
          firstName: 'Cxa2dev_Us3',
          lastName: 'Cxa2dev_Us3',
          street: ['10 Doan Van Bo'],
          isDefaultShipping: false,
          isDefaultBilling: false,
        },
      },
    };

    const action = {
      type: types.DELETE_DELIVERY_ADDRESS_SUCCESS,
      payload: ADDRESSES,
      meta: { addressIds: [67] },
    };
    const state = {
      ...INITIAL_STATE,
      addressIds: [67, 98],
      addressMap: {
        67: {
          id: 67,
          region: { id: 0 },
          regionId: 0,
          countryId: 'SG',
          telephone: '68823000',
          postCode: '319762',
          city: 'Singapore',
          firstName: 'Jie',
          lastName: 'Shen',
          street: ['620A, Lor 1 Toa Payoh Singapore 319762'],
          isDefaultShipping: false,
          isDefaultBilling: true,
        },
        98: {
          id: 98,
          region: { id: 0 },
          regionId: 0,
          countryId: 'SG',
          telephone: '3847342',
          postCode: '50000',
          city: 'Ho Chi Minh',
          firstName: 'Cxa2dev_Us3',
          lastName: 'Cxa2dev_Us3',
          street: ['10 Doan Van Bo'],
          isDefaultShipping: false,
          isDefaultBilling: false,
        },
      },
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });
});
