import * as actions from '../actions';
import { configureMockStore } from '@testUtils';
import { GET_SUGGESTED_PRODUCTS_INIT } from '@shops/store/home/types';

describe('Shop config actions', () => {
  it('should create an action to get home data', () => {
    const store = configureMockStore({})({});
    const expectedActions = {
      type: GET_SUGGESTED_PRODUCTS_INIT,
    };
    const action = store.dispatch(actions.initSuggestedOfferPagination());
    expect(action).toEqual(expectedActions);
  });
});
