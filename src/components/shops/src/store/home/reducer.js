import { keyBy } from 'lodash';
import {
  GET_SUGGESTED_PRODUCTS_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_BY_SKU_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
  GET_PRODUCTS_BY_SEARCH_TERM_SUCCESS,
  GET_SHOP_WALLET_SUCCESS,
} from './types';

export const INITIAL_STATE = {
  suggestedProductSkus: [],
  productMap: {},
  wallet: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUGGESTED_PRODUCTS_SUCCESS:
      const { categories } = action.payload;
      const products = categories?.length ? categories[0].products : [];
      const productMap = keyBy(products, p => p.sku);
      return {
        ...state,
        suggestedProductSkus: [
          ...new Set([
            ...state.suggestedProductSkus,
            ...products.map(p => p.sku),
          ]),
        ],
        productMap: {
          ...state.productMap,
          ...productMap,
        },
      };

    case GET_PRODUCTS_SUCCESS: {
      const { categories } = action.payload;
      let productMap = {};
      categories.map(category => {
        const productChildMap = keyBy(category.products, p => p.sku);
        productMap = {
          ...productMap,
          ...productChildMap,
        };
      });
      return {
        ...state,
        productMap: {
          ...state.productMap,
          ...productMap,
        },
      };
    }

    case GET_PRODUCTS_BY_SEARCH_TERM_SUCCESS: {
      const { categories } = action.payload;
      let productMap = {};
      categories.map(category => {
        const productChildMap = keyBy(category.products, p => p.sku);
        productMap = {
          ...productMap,
          ...productChildMap,
        };
      });
      return {
        ...state,
        productMap: {
          ...productMap,
        },
      };
    }

    case GET_PRODUCT_BY_SKU_SUCCESS: {
      const product = action.payload;
      return {
        ...state,
        productMap: {
          ...state.productMap,
          [product.sku]: product,
        },
      };
    }
    case GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS: {
      const { categories } = action.payload;
      const products = categories[0].products || [];
      const productKeyBy = keyBy(products, p => p.sku);

      return {
        ...state,
        productMap: {
          ...state.productMap,
          ...productKeyBy,
        },
      };
    }

    case GET_SHOP_WALLET_SUCCESS: {
      return {
        ...state,
        wallet: action.payload?.member,
      };
    }
    default:
      return state;
  }
};
