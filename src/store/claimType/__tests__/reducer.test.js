import reducer from '../reducer';
import * as types from '../types';

describe('consultationType reducer', () => {
  it('should return the initialState', () => {
    const expectedState = {
      categories: { byId: {}, all: [] },
      types: { byId: {} },
      reasons: { byId: {} },
      cxa1: {
        categories: {
          all: [],
          byId: {},
        },
        reasons: {
          byId: {},
        },
        types: {
          byId: {},
        },
      },
    };

    expect(reducer(undefined, {})).toEqual(expectedState);
  });

  it('should handle FETCH_CLAIM_TYPES_SUCCESS', () => {
    const expectedState = {
      categories: { byId: {}, all: [] },
      types: { byId: {} },
      reasons: { byId: {} },
      cxa1: {
        categories: {
          all: [],
          byId: {},
        },
        reasons: {
          byId: {},
        },
        types: {
          byId: {},
        },
      },
    };
    const action = {
      type: types.FETCH_CLAIM_TYPES_SUCCESS,
      payload: {
        categories: { byId: {}, all: [] },
        types: { byId: {} },
        reasons: { byId: {} },
      },
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_CXA1_CLAIM_TYPES_SUCCESS', () => {
    const expectedState = {
      categories: { byId: {}, all: [] },
      types: { byId: {} },
      reasons: { byId: {} },
      cxa1: {
        categories: {
          all: [],
          byId: {},
        },
        reasons: {
          byId: {},
        },
        types: {
          byId: {},
        },
      },
    };
    const action = {
      type: types.FETCH_CXA1_CLAIM_TYPES_SUCCESS,
      payload: {
        categories: { byId: {}, all: [] },
        types: { byId: {} },
        reasons: { byId: {} },
      },
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});
