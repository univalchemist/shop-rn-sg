import { keyBy } from 'lodash';
import moment from 'moment';
import {
  GET_STORE_CONFIGS_SUCCESS,
  GET_SORTINGS_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  GET_COUNTRIES_SUCCESS,
  GET_BANNERS_SUCCESS,
} from './types';

export const INITIAL_STATE = {
  storeConfigs: {},
  currency: {},
  categoryTree: {},
  categories: [],
  sortings: {},
  countryIds: [],
  countryMap: {},
  banners: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_STORE_CONFIGS_SUCCESS: {
      return {
        ...state,
        storeConfigs: action.payload,
        currency: action.payload.currency,
      };
    }
    case GET_SORTINGS_SUCCESS: {
      const sortings = keyBy(
        action.payload,
        sorting => sorting.id + '-' + sorting.direction,
      );

      return {
        ...state,
        sortings,
      };
    }
    case GET_COUNTRIES_SUCCESS: {
      const countryMap = keyBy(action.payload, p => p.id);
      const countryIds = action.payload.map(p => p.id);

      return {
        ...state,
        countryMap,
        countryIds,
      };
    }
    case GET_CATEGORIES_SUCCESS: {
      const categoryTree = action.payload;
      const categories = categoryTree?.children?.reduce(
        (result, category) => {
          if (category.isActive && category.includeInMenu) {
            return result.concat(
              category?.children
                ?.filter(c => c.isActive)
                .map(subCategory => ({
                  title: category.name,
                  label: subCategory.name,
                  titleValue: category.id.toString(),
                  value: subCategory.id.toString(),
                })),
            );
          } else {
            return result;
          }
        },
        [
          {
            title: '',
            label: categoryTree?.name,
            titleValue: categoryTree.id.toString(),
            value: categoryTree.id.toString(),
          },
        ],
      );

      return {
        ...state,
        categoryTree,
        categories,
      };
    }
    case GET_BANNERS_SUCCESS: {
      const momentNow = moment(new Date());
      const filteredData = action.payload.items?.filter(banner => {
        const fromDate = moment(banner.fromDate.split(' ')[0]).startOf('d');
        const toDate = moment(banner.toDate.split(' ')[0]).endOf('d');

        return momentNow.isAfter(fromDate) && momentNow.isBefore(toDate);
      });

      return {
        ...state,
        banners: filteredData,
      };
    }
    default:
      return state;
  }
};
