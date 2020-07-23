import * as types from '../types';
import * as actions from '../actions';
import { configureMockStore } from '@testUtils';
import AsyncStorage from '@react-native-community/async-storage';
import CookieManager from '@react-native-community/cookies';
import { Platform } from 'react-native';

describe('ssoLogin actions', () => {
  describe('updateAccountConfigForShop', () => {
    jest.spyOn(AsyncStorage, 'setItem').mockResolvedValue(true);
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should not clear cookie when userId equal than  userId stored', async () => {
      jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('userId');

      const store = configureMockStore()();
      return store
        .dispatch(
          actions.updateAccountConfigForShop({
            accountInfo: {
              username: 'someusername',
              password: 'somepassword',
            },
            userId: 'userId',
          }),
        )
        .then(() => {
          expect(CookieManager.clearAll).not.toBeCalled();
          expect(store.getActions()).toEqual([
            {
              type: types.UPDATE_ACCOUNT_INFO_START,
            },
            {
              type: types.UPDATE_ACCOUNT_INFO_SUCCESS,
              payload: {
                password: 'somepassword',
                username: 'someusername',
              },
            },
          ]);
        });
    });

    test('should clear cookie when userId different than userId stored and android device', async () => {
      jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('userId');
      Platform.OS = 'android';
      const store = configureMockStore()();
      return store
        .dispatch(
          actions.updateAccountConfigForShop({
            accountInfo: {
              username: 'someusername',
              password: 'somepassword',
            },
            userId: 'userId1',
          }),
        )
        .then(() => {
          expect(CookieManager.clearAll).toBeCalledWith(undefined);
          expect(store.getActions()).toEqual([
            {
              type: types.UPDATE_ACCOUNT_INFO_START,
            },
            {
              type: types.UPDATE_ACCOUNT_INFO_SUCCESS,
              payload: {
                password: 'somepassword',
                username: 'someusername',
              },
            },
          ]);
        });
    });

    test('should clear cookie when userId different than userId stored and ios device', async () => {
      jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('userId');
      Platform.OS = 'ios';
      const store = configureMockStore()();
      return store
        .dispatch(
          actions.updateAccountConfigForShop({
            accountInfo: {
              username: 'someusername',
              password: 'somepassword',
            },
            userId: 'userId1',
          }),
        )
        .then(() => {
          expect(CookieManager.clearAll).toBeCalledWith(true);
          expect(store.getActions()).toEqual([
            {
              type: types.UPDATE_ACCOUNT_INFO_START,
            },
            {
              type: types.UPDATE_ACCOUNT_INFO_SUCCESS,
              payload: {
                password: 'somepassword',
                username: 'someusername',
              },
            },
          ]);
        });
    });
  });
});
