import {
  UPDATE_SELECTED_CATEGORIES,
  UPDATE_SORT_TYPE,
  UPDATE_FILTER_TYPES,
  UPDATE_SEARCH_STRING,
  UPDATE_SEARCH_PARAM,
  UPDATE_SELECTED_CATEGORY,
  CLEAR_FILTER,
} from './types';
import {
  GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_BY_SEARCH_TERM_SUCCESS,
} from '../home/types';
import { FILTER_TYPES, PRODUCT_PARAMS } from '@shops/config/constants';

export const INITIAL_STATE = {
  selectedCategories: [],
  sortType: null,
  filterTypes: {},
  params: {},
  searchString: '',
  searchTerm: '',
  groupedProductSkus: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_CATEGORIES: {
      const params = { ...state.params };

      if (action.payload?.length) {
        params[PRODUCT_PARAMS.CATEGORY_ID] = action.payload.map(c =>
          parseInt(c.value, 10),
        );
      } else {
        delete params[PRODUCT_PARAMS.CATEGORY_ID];
      }

      return {
        ...state,
        params,
        selectedCategories: action.payload,
      };
    }
    case UPDATE_SORT_TYPE: {
      const params = { ...state.params };

      if (action.payload) {
        const sorts = action.payload.split('-');

        params[PRODUCT_PARAMS.SORT_TYPE] = sorts[0];
        params[PRODUCT_PARAMS.SORT_ORDER] = sorts[1];
      } else {
        delete params[PRODUCT_PARAMS.SORT_TYPE];
        delete params[PRODUCT_PARAMS.SORT_ORDER];
      }

      return {
        ...state,
        params,
        sortType: action.payload,
      };
    }
    case UPDATE_SEARCH_STRING: {
      return {
        ...state,
        searchString: action.payload,
      };
    }

    case UPDATE_SEARCH_PARAM: {
      const params = { ...state.params };
      const searchString = state.searchString;
      if (searchString) {
        params[PRODUCT_PARAMS.SEARCH_STRING] = searchString;
        params[PRODUCT_PARAMS.FIELD] = 'name';
        delete params[PRODUCT_PARAMS.HAS_RATING];
        delete params[PRODUCT_PARAMS.MINIMUM_PRICE];
        delete params[PRODUCT_PARAMS.MAXIMUM_PRICE];
        delete params[PRODUCT_PARAMS.SORT_TYPE];
        delete params[PRODUCT_PARAMS.SORT_ORDER];
      } else {
        delete params[PRODUCT_PARAMS.SEARCH_STRING];
        delete params[PRODUCT_PARAMS.FIELD];
      }
      return {
        ...state,
        params,
        searchTerm: searchString,
        filterTypes: {},
        sortType: null,
      };
    }
    case UPDATE_FILTER_TYPES: {
      const params = { ...state.params };
      const filterTypes = action.payload;

      if (filterTypes[FILTER_TYPES.RATINGS]) {
        params[PRODUCT_PARAMS.HAS_RATING] = 'true';
      } else {
        delete params[PRODUCT_PARAMS.HAS_RATING];
      }

      if (filterTypes[FILTER_TYPES.RANGE_PRICE]) {
        params[PRODUCT_PARAMS.MINIMUM_PRICE] =
          filterTypes[FILTER_TYPES.RANGE_PRICE][0];
        params[PRODUCT_PARAMS.MAXIMUM_PRICE] =
          filterTypes[FILTER_TYPES.RANGE_PRICE][1];
      } else {
        delete params[PRODUCT_PARAMS.MINIMUM_PRICE];
        delete params[PRODUCT_PARAMS.MAXIMUM_PRICE];
      }

      return {
        ...state,
        params,
        filterTypes: action.payload,
      };
    }
    case GET_PRODUCTS_SUCCESS: {
      const { categories } = action.payload;
      let groupedProductSkus = {};
      categories.map(category => {
        const childProducts = category.products;
        groupedProductSkus = {
          ...groupedProductSkus,
          [category.id]: childProducts.map(p => p.sku),
        };
      });

      return { ...state, groupedProductSkus };
    }
    case GET_PRODUCTS_BY_SEARCH_TERM_SUCCESS: {
      let groupedProductSkus = {};
      const { categories } = action.payload;
      categories.map(category => {
        const childProducts = category.products;
        groupedProductSkus = {
          ...groupedProductSkus,
          [category.id]: childProducts.map(p => p.sku),
        };
      });

      return { ...state, groupedProductSkus };
    }
    case GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS: {
      const { categoryId } = action.meta;
      const { categories } = action.payload;
      const products = categories[0].products || [];
      const productsSku = products.map(p => p.sku);
      return {
        ...state,
        groupedProductSkus: {
          ...state.groupedProductSkus,
          [categoryId]: [
            ...state.groupedProductSkus[categoryId],
            ...productsSku,
          ],
        },
      };
    }

    case UPDATE_SELECTED_CATEGORY: {
      const params = {};
      const { category } = action.payload;

      if (category) {
        params[PRODUCT_PARAMS.CATEGORY_ID] = [parseInt(category.value, 10)];
      } else {
        return state;
      }

      return {
        ...state,
        params,
        selectedCategories: [
          { type: category.titleValue, value: category.value },
        ],
      };
    }
    case CLEAR_FILTER: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
