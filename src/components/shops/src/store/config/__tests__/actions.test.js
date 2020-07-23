import { configureMockStore } from '@testUtils';
import { STORE_CONFIGS, CATEGORY_TREE, SORTINGS } from '@shops/__mocks__/data';
import * as actions from '../actions';
import * as types from '../types';

const api = {
  getStoreConfigs: () => ({
    data: [STORE_CONFIGS],
  }),
  getCategories: () => ({
    data: [CATEGORY_TREE],
  }),
  getSortings: () => ({
    data: SORTINGS,
  }),
  getCountries: () => ({
    data: [
      {
        id: 'SG',
        abbreviation: 'SG',
        name: 'Singapore',
      },
    ],
  }),
  getBanners: () => ({
    data: {
      items: [
        {
          bannerId: '1',
          content: 'test',
          title: 'Test Banner',
          images: 'cxa.jpg',
          group: 'home',
          target: 'self',
          createdAt: '2020-06-03 02:50:20',
          updateAt: '2020-06-03 02:50:20',
          fromDate: '2020-04-30 00:00:00',
          toDate: '2021-05-05 00:00:00',
          status: true,
          fullImage: 'https://shop.cxa2dev.com/media/banner_api/banner/cxa.jpg',
        },
      ],
    },
  }),
};

describe('Shop config actions', () => {
  it('should create an action to get store configs', () => {
    const initialState = { user: { clientId: 'cxadev' } };
    const store = configureMockStore(api)(initialState);
    const expectedActions = [
      { type: types.GET_STORE_CONFIGS_START },
      {
        type: types.GET_STORE_CONFIGS_SUCCESS,
        payload: STORE_CONFIGS,
      },
    ];

    return store.dispatch(actions.getStoreConfigs()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to get categories', () => {
    const initialState = { user: { clientId: 'cxadev' } };
    const store = configureMockStore(api)(initialState);
    const expectedActions = [
      { type: types.GET_CATEGORIES_START },
      {
        type: types.GET_CATEGORIES_SUCCESS,
        payload: CATEGORY_TREE,
      },
    ];

    return store.dispatch(actions.getCategories()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to get sortings', () => {
    const initialState = { user: { clientId: 'cxadev' } };
    const store = configureMockStore(api)(initialState);
    const expectedActions = [
      { type: types.GET_SORTINGS_START },
      {
        type: types.GET_SORTINGS_SUCCESS,
        payload: SORTINGS,
      },
    ];

    return store.dispatch(actions.getSortings()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to get countries', () => {
    const initialState = { user: { clientId: 'cxadev' } };
    const store = configureMockStore(api)(initialState);
    const expectedActions = [
      { type: types.GET_COUNTRIES_START },
      {
        type: types.GET_COUNTRIES_SUCCESS,
        payload: [
          {
            id: 'SG',
            abbreviation: 'SG',
            name: 'Singapore',
          },
        ],
      },
    ];

    return store.dispatch(actions.getCountries()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to get banners', () => {
    const initialState = { user: { clientId: 'cxadev' } };
    const store = configureMockStore(api)(initialState);
    const expectedActions = [
      { type: types.GET_BANNERS_START },
      {
        type: types.GET_BANNERS_SUCCESS,
        payload: {
          items: [
            {
              bannerId: '1',
              content: 'test',
              title: 'Test Banner',
              images: 'cxa.jpg',
              group: 'home',
              target: 'self',
              createdAt: '2020-06-03 02:50:20',
              updateAt: '2020-06-03 02:50:20',
              fromDate: '2020-04-30 00:00:00',
              toDate: '2021-05-05 00:00:00',
              status: true,
              fullImage:
                'https://shop.cxa2dev.com/media/banner_api/banner/cxa.jpg',
            },
          ],
        },
      },
    ];

    return store.dispatch(actions.getBanners()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
