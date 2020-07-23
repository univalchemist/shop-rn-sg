import reducer, { INITIAL_STATE } from '../reducer';
import {
  GET_PRODUCTS_START,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_BY_CATEGORY_ID_START,
  GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_ID_ERROR,
  GET_SUGGESTED_PRODUCTS_START,
  GET_SUGGESTED_PRODUCTS_SUCCESS,
  GET_SUGGESTED_PRODUCTS_ERROR,
  GET_PRODUCTS_BY_SEARCH_TERM_START,
  GET_PRODUCTS_BY_SEARCH_TERM_SUCCESS,
  GET_PRODUCTS_BY_SEARCH_TERM_ERROR,
} from '@shops/store/home/types';

describe('Shop paginations reducer', () => {
  it('should return initial state when action is undefined', () => {
    expect(reducer(undefined, { type: 'INIT' })).toEqual(INITIAL_STATE);
  });

  it('should handle GET_PRODUCTS_START', () => {
    const expectedState = {
      ...INITIAL_STATE,
      products: {
        isLoading: true,
      },
    };

    const action = {
      type: GET_PRODUCTS_START,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_SUCCESS', () => {
    const state = {
      ...INITIAL_STATE,
      products: {
        isLoading: true,
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      productsByCategoryId: {
        1: {
          page: 1,
          numberOfResults: 10,
          isLoading: false,
        },
        2: {
          page: 1,
          numberOfResults: 15,
          isLoading: false,
        },
      },
      products: {
        isLoading: false,
      },
    };

    const payload = {
      categories: [
        {
          id: 1,
          numberOfResults: 10,
        },
        {
          id: 2,
          numberOfResults: 15,
        },
      ],
    };
    const action = {
      type: GET_PRODUCTS_SUCCESS,
      payload,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_ERROR', () => {
    const state = {
      ...INITIAL_STATE,
      products: {
        isLoading: true,
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      products: {
        isLoading: false,
      },
    };

    const action = {
      type: GET_PRODUCTS_ERROR,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_BY_CATEGORY_ID_START', () => {
    const state = {
      ...INITIAL_STATE,
      productsByCategoryId: {
        1: {
          page: 1,
          numberOfResults: 100,
          isLoading: false,
        },
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      productsByCategoryId: {
        1: {
          page: 1,
          numberOfResults: 100,
          isLoading: true,
        },
      },
    };

    const action = {
      type: GET_PRODUCTS_BY_CATEGORY_ID_START,
      meta: {
        categoryId: 1,
      },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS', () => {
    const state = {
      ...INITIAL_STATE,
      productsByCategoryId: {
        1: {
          page: 1,
          numberOfResults: 100,
          isLoading: true,
        },
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      productsByCategoryId: {
        1: {
          page: 2,
          numberOfResults: 2,
          isLoading: false,
        },
      },
    };

    const action = {
      type: GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
      meta: {
        categoryId: 1,
      },
      payload: {
        numberOfResults: 2,
      },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_BY_CATEGORY_ID_ERROR', () => {
    const state = {
      ...INITIAL_STATE,
      productsByCategoryId: {
        1: {
          page: 1,
          numberOfResults: 100,
          isLoading: true,
        },
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      productsByCategoryId: {
        1: {
          page: 1,
          numberOfResults: 100,
          isLoading: false,
        },
      },
    };

    const action = {
      type: GET_PRODUCTS_BY_CATEGORY_ID_ERROR,
      meta: {
        categoryId: 1,
      },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_SUGGESTED_PRODUCTS_START', () => {
    const state = {
      ...INITIAL_STATE,
      suggestedProducts: {
        isLoading: false,
        page: 1,
        numberOfResults: 100,
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      suggestedProducts: {
        isLoading: true,
        page: 1,
        numberOfResults: 100,
      },
    };

    const action = {
      type: GET_SUGGESTED_PRODUCTS_START,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_SUGGESTED_PRODUCTS_SUCCESS', () => {
    const state = {
      ...INITIAL_STATE,
      suggestedProducts: {
        isLoading: true,
        page: 1,
        numberOfResults: 100,
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      suggestedProducts: {
        isLoading: false,
        page: 2,
        numberOfResults: 100,
      },
    };

    const action = {
      type: GET_SUGGESTED_PRODUCTS_SUCCESS,
      payload: {
        numberOfResults: 100,
      },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_SUGGESTED_PRODUCTS_ERROR', () => {
    const state = {
      ...INITIAL_STATE,
      suggestedProducts: {
        isLoading: true,
        page: 1,
        numberOfResults: 100,
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      suggestedProducts: {
        isLoading: false,
        page: 1,
        numberOfResults: 100,
      },
    };

    const action = {
      type: GET_SUGGESTED_PRODUCTS_ERROR,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_BY_SEARCH_TERM_START', () => {
    const expectedState = {
      ...INITIAL_STATE,
      products: {
        isLoading: true,
      },
    };

    const action = {
      type: GET_PRODUCTS_BY_SEARCH_TERM_START,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_BY_SEARCH_TERM_SUCCESS', () => {
    const state = {
      ...INITIAL_STATE,
      products: {
        isLoading: true,
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      productsByCategoryId: {
        1: {
          page: 1,
          numberOfResults: 10,
          isLoading: false,
        },
        2: {
          page: 1,
          numberOfResults: 15,
          isLoading: false,
        },
      },
      products: {
        isLoading: false,
      },
    };

    const action = {
      type: GET_PRODUCTS_BY_SEARCH_TERM_SUCCESS,
      payload: {
        categories: [
          { id: 1, numberOfResults: 10 },
          { id: 2, numberOfResults: 15 },
        ],
      },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_BY_SEARCH_TERM_ERROR', () => {
    const state = {
      ...INITIAL_STATE,
      products: {
        isLoading: true,
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      products: {
        isLoading: false,
      },
    };

    const action = {
      type: GET_PRODUCTS_BY_SEARCH_TERM_ERROR,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });
});
