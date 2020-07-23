import { GET_REVIEW, REVIEW_FORM } from '@shops/__mocks__/data';
import * as actions from '../actions';
import * as types from '../types';
import { configureMockStore } from '@testUtils';

const api = {
  getReviews: () => ({
    data: GET_REVIEW,
  }),
  getReviewForm: () => ({
    data: REVIEW_FORM,
  }),
};

describe('Review actions', () => {
  const initialState = { user: { clientId: 'cxadev', userId: '253' } };
  let store;
  beforeEach(() => {
    store = configureMockStore(api)(initialState);
  });

  it('should create an action to get review ', () => {
    const expectedActions = [
      { type: types.GET_REVIEW_START },
      {
        type: types.GET_REVIEW_SUCCESS,
        payload: GET_REVIEW,
      },
    ];
    return store.dispatch(actions.getReviews()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to getReviewForm ', () => {
    const expectedActions = [
      { type: types.GET_REVIEW_FORM_START },
      {
        type: types.GET_REVIEW_FORM_SUCCESS,
        payload: REVIEW_FORM,
      },
    ];
    return store.dispatch(actions.getReviewForm()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
