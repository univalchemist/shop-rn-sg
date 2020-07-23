import { GET_ORDER } from './types';

export const getOrder = orderId => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.getOrder({
      clientId,
      userId,
      orderId,
    });
    return data;
  };

  return dispatch({
    type: GET_ORDER,
    payload: getPromise(),
  });
};
