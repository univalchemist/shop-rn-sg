import reducer, { INITIAL_STATE } from '../reducer';
import * as types from '../types';

describe('Shop home reducer', () => {
  it('should return initial state when action is undefined', () => {
    expect(reducer(undefined, { type: 'INIT' })).toEqual(INITIAL_STATE);
  });

  it('should handle GET_SUGGESTED_PRODUCTS_SUCCESS', () => {
    const state = {
      ...INITIAL_STATE,
      productMap: {
        sku_1: {
          name: 'Product 1',
        },
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      suggestedProductSkus: ['sku_1', 'sku_2'],
      productMap: {
        sku_1: {
          id: 1,
          name: 'Product 1-A',
          sku: 'sku_1',
        },
        sku_2: {
          id: 2,
          name: 'Product 2',
          sku: 'sku_2',
        },
      },
    };

    const payload = {
      categories: [
        {
          products: [
            { id: 1, sku: 'sku_1', name: 'Product 1-A' },
            { id: 2, sku: 'sku_2', name: 'Product 2' },
          ],
        },
      ],
    };

    const action = {
      type: types.GET_SUGGESTED_PRODUCTS_SUCCESS,
      payload,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_SUCCESS', () => {
    const state = {
      ...INITIAL_STATE,
      productMap: {
        sku_1: {
          id: 1,
          name: 'Product 1',
          sku: 'sku_1',
        },
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      productMap: {
        sku_1: {
          id: 1,
          name: 'Product 1',
          sku: 'sku_1',
        },
        sku_2: {
          id: 2,
          name: 'Product 2',
          sku: 'sku_2',
        },
      },
    };

    const payload = {
      categories: [
        {
          id: 2,
          products: [{ id: 2, sku: 'sku_2', name: 'Product 2' }],
        },
      ],
    };

    const action = {
      type: types.GET_PRODUCTS_SUCCESS,
      payload,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_BY_SEARCH_TERM', () => {
    const state = {
      ...INITIAL_STATE,
      productMap: {},
    };

    const expectedState = {
      ...INITIAL_STATE,
      productMap: {
        sku_2: {
          id: 2,
          name: 'Product 2',
          sku: 'sku_2',
        },
      },
    };

    const payload = {
      categories: [
        {
          id: 1,
          numberOfResults: 1,
          products: [{ id: 2, sku: 'sku_2', name: 'Product 2' }],
        },
      ],
    };

    const action = {
      type: types.GET_PRODUCTS_BY_SEARCH_TERM_SUCCESS,
      payload,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCT_BY_SKU_SUCCESS', () => {
    const state = {
      ...INITIAL_STATE,
      productMap: {
        sku_1: {
          id: 1,
          name: 'Product 1-A',
          sku: 'sku_1',
        },
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      productMap: {
        sku_1: {
          id: 1,
          name: 'Product 1-A',
          sku: 'sku_1',
        },
        sku_2: {
          id: 2,
          name: 'Product 2',
          sku: 'sku_2',
        },
      },
    };

    const action = {
      type: types.GET_PRODUCT_BY_SKU_SUCCESS,
      payload: {
        id: 2,
        name: 'Product 2',
        sku: 'sku_2',
      },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS', () => {
    const state = {
      ...INITIAL_STATE,
      productMap: {
        sku_1: {
          id: 1,
          name: 'Product 1-A',
          sku: 'sku_1',
        },
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      productMap: {
        sku_1: {
          id: 1,
          name: 'Product 1-A',
          sku: 'sku_1',
        },
        sku_2: {
          id: 2,
          name: 'Product 2',
          sku: 'sku_2',
        },
      },
    };

    const payload = {
      categories: [
        {
          id: 1,
          products: [{ id: 2, sku: 'sku_2', name: 'Product 2' }],
        },
      ],
    };

    const action = {
      type: types.GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
      payload,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });
});
