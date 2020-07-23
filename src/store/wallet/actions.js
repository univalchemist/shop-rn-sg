import * as types from '@store/wallet/types';

export const fetchWallet = () => {
  return (dispatch, getState, { api }) => {
    const getResponse = async () => {
      const { clientId, userId } = getState().user;
      const response = await api.fetchWallet({ clientId, userId });
      return response.data;
    };

    return dispatch({
      type: types.FETCH_WALLET,
      payload: getResponse(),
    });
  };
};

export const fetchEwallet = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId, userId, membersMap } = getState().user;
    const response = await api.fetchEwallet({ clientId, userId });
    return { balances: response.data, membersMap };
  };

  return dispatch({
    type: types.FETCH_EWALLET,
    payload: getPromise(),
  });
};
