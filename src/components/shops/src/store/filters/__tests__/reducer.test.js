import reducer, { INITIAL_STATE } from '../reducer';
import * as types from '../types';
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
  GET_PRODUCTS_BY_SEARCH_TERM_SUCCESS,
} from '@shops/store/home/types';

describe('Shop filters reducer', () => {
  it('should return initial state when action is undefined', () => {
    expect(reducer(undefined, { type: 'INIT' })).toEqual(INITIAL_STATE);
  });

  it('should handle UPDATE_SELECTED_CATEGORIES with valid action payload', () => {
    const expectedState = {
      ...INITIAL_STATE,
      params: {
        categoryId: [1, 2],
      },
      selectedCategories: [{ value: '1' }, { value: '2' }],
    };

    const action = {
      type: types.UPDATE_SELECTED_CATEGORIES,
      payload: [{ value: '1' }, { value: '2' }],
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_SELECTED_CATEGORIES without action payload', () => {
    const action = {
      type: types.UPDATE_SELECTED_CATEGORIES,
      payload: [],
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE);
  });

  it('should handle UPDATE_SORT_TYPE with valid action payload', () => {
    const state = {
      ...INITIAL_STATE,
      sortType: 'bestselling-DESC',
      params: {
        categoryId: [1],
        sortType: 'bestselling',
        sortOrder: 'DESC',
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      sortType: 'price-ASC',
      params: {
        categoryId: [1],
        sortType: 'price',
        sortOrder: 'ASC',
      },
    };

    const action = {
      type: types.UPDATE_SORT_TYPE,
      payload: 'price-ASC',
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_SORT_TYPE without action payload', () => {
    const state = {
      ...INITIAL_STATE,
      sortType: 'bestselling-DESC',
      params: {
        categoryId: [1],
        sortType: 'bestselling',
        sortOrder: 'DESC',
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      sortType: undefined,
      params: {
        categoryId: [1],
      },
    };

    const action = {
      type: types.UPDATE_SORT_TYPE,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_FILTER_TYPES with valid payload', () => {
    const state = {
      ...INITIAL_STATE,
      filterTypes: {
        rangePrice: [0, 500],
      },
      params: {
        categoryId: [1],
        maximumPrice: 500,
        minimumPrice: 0,
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      filterTypes: {
        rangePrice: [1, 1000],
        ratings: true,
      },
      params: {
        categoryId: [1],
        maximumPrice: 1000,
        minimumPrice: 1,
        hasRating: 'true',
      },
    };

    const action = {
      type: types.UPDATE_FILTER_TYPES,
      payload: {
        rangePrice: [1, 1000],
        ratings: true,
      },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_FILTER_TYPES without action payload', () => {
    const state = {
      ...INITIAL_STATE,
      filterTypes: {
        rangePrice: [0, 500],
      },
      params: {
        categoryId: [1],
        maximumPrice: 500,
        minimumPrice: 0,
      },
    };

    const expectedState = {
      ...INITIAL_STATE,
      params: {
        categoryId: [1],
      },
    };

    const action = {
      type: types.UPDATE_FILTER_TYPES,
      payload: {},
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_SEARCH_STRING with payload', () => {
    const state = {
      ...INITIAL_STATE,
      searchString: '',
    };

    const expectedState = {
      ...INITIAL_STATE,
      searchString: 'Product Name',
    };

    const action = {
      type: types.UPDATE_SEARCH_STRING,
      payload: 'Product Name',
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_SEARCH_PARAM', () => {
    const state = {
      ...INITIAL_STATE,
      filterTypes: {
        rangePrice: [1, 1000],
        ratings: true,
      },
      sortType: 'price-ASC',
      params: {
        sortType: 'price',
        sortOrder: 'ASC',
        maximumPrice: 1000,
        minimumPrice: 0,
        hasRating: 'true',
      },
      searchString: 'Product Name',
      searchTerm: '',
    };

    const expectedState = {
      ...INITIAL_STATE,
      filterTypes: {},
      sortType: null,
      params: {
        field: 'name',
        searchString: 'Product Name',
      },
      searchString: 'Product Name',
      searchTerm: 'Product Name',
    };

    const action = {
      type: types.UPDATE_SEARCH_PARAM,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_SUCCESS', () => {
    const state = {
      ...INITIAL_STATE,
    };

    const expectedState = {
      ...state,
      groupedProductSkus: {
        1: ['sku_1'],
        2: ['sku_2'],
        3: ['sku_3'],
      },
    };

    const payload = {
      categories: [
        { id: 1, products: [{ sku: 'sku_1' }] },
        { id: 2, products: [{ sku: 'sku_2' }] },
        { id: 3, products: [{ sku: 'sku_3' }] },
      ],
    };
    const action = {
      type: GET_PRODUCTS_SUCCESS,
      payload,
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS', () => {
    const state = {
      ...INITIAL_STATE,
      groupedProductSkus: {
        1: [],
      },
    };

    const expectedState = {
      ...state,
      groupedProductSkus: {
        1: ['sku-1'],
      },
    };

    const payload = {
      categories: [{ id: 1, products: [{ sku: 'sku-1' }] }],
    };

    const action = {
      type: GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
      payload,
      meta: {
        categoryId: 1,
      },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_SELECTED_CATEGORY with valid category payload', () => {
    const state = {
      ...INITIAL_STATE,
      params: {
        categoryId: [1],
      },
    };

    const expectedState = {
      ...state,
      params: {
        categoryId: [2],
      },
      selectedCategories: [
        {
          type: '1',
          value: '2',
        },
      ],
    };

    const action = {
      type: types.UPDATE_SELECTED_CATEGORY,
      payload: {
        category: {
          titleValue: '1',
          value: '2',
        },
      },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_SELECTED_CATEGORY with invalid category payload', () => {
    const state = {
      ...INITIAL_STATE,
      params: {
        categoryId: [1],
      },
    };

    const expectedState = {
      ...state,
      params: {
        categoryId: [1],
      },
    };

    const action = {
      type: types.UPDATE_SELECTED_CATEGORY,
      payload: {},
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_SEARCH_PARAM with valid category payload', () => {
    const state = {
      ...INITIAL_STATE,
      params: {
        categoryId: [1],
      },
      searchString: 'searchString',
    };

    const expectedState = {
      ...state,
      params: {
        categoryId: [1],
        field: 'name',
        searchString: 'searchString',
      },
      searchTerm: 'searchString',
    };

    const action = {
      type: types.UPDATE_SEARCH_PARAM,
      payload: {},
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle GET_PRODUCTS_BY_SEARCH_TERM_SUCCESS with valid category payload', () => {
    const payload = {
      categories: [
        { id: 1, products: [{ sku: 'sku-1' }] },
        { id: 2, products: [{ sku: 'sku-2' }] },
      ],
    };

    const expectedState = {
      ...INITIAL_STATE,
      groupedProductSkus: {
        '1': ['sku-1'],
        '2': ['sku-2'],
      },
    };

    const action = {
      type: GET_PRODUCTS_BY_SEARCH_TERM_SUCCESS,
      payload,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_FILTER with valid category payload', () => {
    const expectedState = INITIAL_STATE;

    const action = {
      type: types.CLEAR_FILTER,
    };

    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });
});
