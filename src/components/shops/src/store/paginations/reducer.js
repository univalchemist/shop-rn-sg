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
  GET_PRODUCTS_BY_SEARCH_TERM_ERROR,
  GET_PRODUCTS_BY_SEARCH_TERM_SUCCESS,
  GET_PRODUCTS_BY_SEARCH_TERM_START,
  GET_SUGGESTED_PRODUCTS_INIT,
} from '../home/types';

export const INITIAL_STATE = {
  productsByCategoryId: {},
  products: {
    isLoading: false,
  },
  suggestedProducts: {
    isLoading: false,
    page: 1,
    numberOfResults: 100,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS_START:
    case GET_PRODUCTS_BY_SEARCH_TERM_START: {
      return {
        ...state,
        products: {
          isLoading: true,
        },
      };
    }
    case GET_SUGGESTED_PRODUCTS_START: {
      return {
        ...state,
        suggestedProducts: {
          ...state.suggestedProducts,
          isLoading: true,
        },
      };
    }
    case GET_SUGGESTED_PRODUCTS_SUCCESS: {
      const { numberOfResults } = action.payload;
      return {
        ...state,
        suggestedProducts: {
          ...state.suggestedProducts,
          isLoading: false,
          page: state.suggestedProducts.page + 1,
          numberOfResults,
        },
      };
    }
    case GET_SUGGESTED_PRODUCTS_INIT: {
      return {
        ...state,
        suggestedProducts: {
          ...state.suggestedProducts,
          isLoading: false,
          page: 1,
        },
      };
    }
    case GET_SUGGESTED_PRODUCTS_ERROR: {
      return {
        ...state,
        suggestedProducts: {
          ...state.suggestedProducts,
          isLoading: false,
        },
      };
    }
    case GET_PRODUCTS_SUCCESS: {
      const { categories } = action.payload;
      const productsByCategoryId = {};
      categories.map(category => {
        productsByCategoryId[category.id] = {
          page: 1,
          numberOfResults: category.numberOfResults,
          isLoading: false,
        };
      });
      return {
        ...state,
        products: {
          isLoading: false,
        },
        // TODO: need to update after backend update their data
        productsByCategoryId,
      };
    }
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        products: {
          isLoading: false,
        },
      };
    case GET_PRODUCTS_BY_CATEGORY_ID_START: {
      const { categoryId } = action.meta;
      const pagination = state.productsByCategoryId[categoryId];

      return {
        ...state,
        productsByCategoryId: {
          ...state.productsByCategoryId,
          [categoryId]: {
            ...pagination,
            isLoading: true,
          },
        },
      };
    }
    case GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS: {
      const { categoryId } = action.meta;
      const { numberOfResults } = action.payload;
      const pagination = state.productsByCategoryId[categoryId];

      return {
        ...state,
        productsByCategoryId: {
          ...state.productsByCategoryId,
          [categoryId]: {
            ...pagination,
            numberOfResults,
            page: pagination.page + 1,
            isLoading: false,
          },
        },
      };
    }
    case GET_PRODUCTS_BY_CATEGORY_ID_ERROR: {
      const { categoryId } = action.meta;
      const pagination = state.productsByCategoryId[categoryId];

      return {
        ...state,
        productsByCategoryId: {
          ...state.productsByCategoryId,
          [categoryId]: {
            ...pagination,
            isLoading: false,
          },
        },
      };
    }
    case GET_PRODUCTS_BY_SEARCH_TERM_SUCCESS: {
      const { categories } = action.payload;
      const productsByCategoryId = {};
      categories.map(category => {
        productsByCategoryId[category.id] = {
          page: 1,
          numberOfResults: category.numberOfResults,
          isLoading: false,
        };
      });
      return {
        ...state,
        products: {
          isLoading: false,
        },
        // TODO: need to update after backend update their data
        productsByCategoryId,
      };
    }
    case GET_PRODUCTS_BY_SEARCH_TERM_ERROR:
      return {
        ...state,
        products: {
          isLoading: false,
        },
      };
    default:
      return state;
  }
};
