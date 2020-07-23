import {
  GET_DELIVERY_ADDRESSES,
  DELETE_DELIVERY_ADDRESS,
  ADD_DELIVERY_ADDRESS,
  UPDATE_DELIVERY_ADDRESS,
} from './types';

export const getDeliveryAddresses = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.getDeliveryAddresses(clientId, userId);

    return data;
  };

  return dispatch({
    type: GET_DELIVERY_ADDRESSES,
    payload: getPromise(),
  });
};

export const deleteDeliveryAddress = addressId => (
  dispatch,
  getState,
  { api },
) => {
  const getPromise = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.deleteDeliveryAddress(
      clientId,
      userId,
      addressId,
    );

    return data;
  };

  return dispatch({
    type: DELETE_DELIVERY_ADDRESS,
    payload: getPromise(),
    meta: { addressId },
  });
};

export const addDeliveryAddress = address => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId, userId } = getState().user;

    const { data } = await api.addDeliveryAddress(clientId, userId, address);

    return data;
  };

  return dispatch({
    type: ADD_DELIVERY_ADDRESS,
    payload: getPromise(),
  });
};

export const updateDeliveryAddress = address => (
  dispatch,
  getState,
  { api },
) => {
  const getPromise = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.updateDeliveryAddress(
      clientId,
      userId,
      address.id,
      address,
    );

    return data;
  };

  return dispatch({
    type: UPDATE_DELIVERY_ADDRESS,
    payload: getPromise(),
  });
};
