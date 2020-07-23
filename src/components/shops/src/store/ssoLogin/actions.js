import * as types from './types';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { USER_ID_FOR_SHOP } from '@shops/utils/constant';
import CookieManager from '@react-native-community/cookies';
import PropTypes from 'prop-types';

export const updateAccountConfigForShop = ({
  accountInfo,
  userId,
}) => dispatch => {
  const getPromise = async () => {
    const savedClientId = await AsyncStorage.getItem(USER_ID_FOR_SHOP);
    if (userId?.toString() !== savedClientId) {
      const useWebkit = Platform.OS === 'ios' || undefined;
      CookieManager.clearAll(useWebkit);
    }
    AsyncStorage.setItem(USER_ID_FOR_SHOP, userId?.toString());
    return accountInfo;
  };
  return dispatch({
    type: types.UPDATE_ACCOUNT_INFO,
    payload: getPromise(),
  });
};

updateAccountConfigForShop.propTypes = PropTypes.shape({
  clientId: PropTypes.string.isRequired,
  accountInfo: PropTypes.shape({
    clientname: PropTypes.string,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
});
