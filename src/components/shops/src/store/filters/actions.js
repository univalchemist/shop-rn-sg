import {
  UPDATE_SELECTED_CATEGORIES,
  UPDATE_SORT_TYPE,
  UPDATE_FILTER_TYPES,
  UPDATE_SEARCH_STRING,
  UPDATE_SEARCH_PARAM,
  UPDATE_SELECTED_CATEGORY,
  CLEAR_FILTER,
} from './types';

export const updateSelectedCategories = categories => ({
  type: UPDATE_SELECTED_CATEGORIES,
  payload: categories,
});

export const updateSortType = sortType => ({
  type: UPDATE_SORT_TYPE,
  payload: sortType,
});

export const updateFilterTypes = filterTypes => ({
  type: UPDATE_FILTER_TYPES,
  payload: filterTypes,
});

export const updateSearchString = searchString => ({
  type: UPDATE_SEARCH_STRING,
  payload: searchString,
});

export const updateSearchParam = () => ({
  type: UPDATE_SEARCH_PARAM,
});
export const updateSelectedCategory = categoryId => async (
  dispatch,
  getState,
) => {
  const { categories } = getState().shop.config;
  const category = categories.find(c => c.value === categoryId);

  return dispatch({
    type: UPDATE_SELECTED_CATEGORY,
    payload: { category },
  });
};
export const clearFilter = () => ({
  type: CLEAR_FILTER,
});
