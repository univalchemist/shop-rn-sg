import {
  ADD_TO_CART,
  GET_CART,
  GET_CART_BILLING,
  GET_CART_SHIPPING,
  GET_CART_TOTALS,
  REMOVE_ITEM_FROM_CART,
  MAKE_PAYMENT,
  POST_CART_SHIPPING,
  POST_CART_BILLING,
  GET_CART_COUPONS,
  REMOVE_CART_COUPON,
  ADD_CART_COUPON,
  UPDATE_CART,
} from './types';

export const addToCart = ({
  sku,
  quantity,
  productType = '',
  redemptionPoint = '',
  deliveryType = '',
}) => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { userId, clientId } = getState().user;
    const body = {
      productType,
      deliveryType,
      redemptionPoint: redemptionPoint?.redemptId || '',
    };
    const { data } = await api.addToCart({
      clientId,
      userId,
      sku,
      quantity,
      body,
    });
    return data;
  };

  return dispatch({
    type: ADD_TO_CART,
    payload: getPromise(),
  });
};

export const updateCart = ({
  sku,
  quantity,
  productType = '',
  redemptionPoint = '',
  deliveryType = '',
}) => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { userId, clientId } = getState().user;
    const body = {
      productType,
      deliveryType,
      redemptionPoint: redemptionPoint?.redemptId || '',
    };
    const { data } = await api.updateCart({
      clientId,
      userId,
      sku,
      quantity,
      body,
    });
    return data;
  };

  return dispatch({
    type: UPDATE_CART,
    payload: getPromise(),
  });
};

export const getCart = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { userId, clientId } = getState().user;
    const { data } = await api.getCart(clientId, userId);
    return data;
  };

  return dispatch({
    type: GET_CART,
    payload: getPromise(),
  });
};

export const getCartTotals = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { userId, clientId } = getState().user;
    const { data } = await api.getCartTotals(clientId, userId);
    return data;
  };

  return dispatch({
    type: GET_CART_TOTALS,
    payload: getPromise(),
  });
};

export const getCartBilling = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { userId, clientId } = getState().user;
    const { data } = await api.getCartBilling({ clientId, userId });
    return data;
  };

  return dispatch({
    type: GET_CART_BILLING,
    payload: getPromise(),
  });
};

export const postCartBilling = (chosenAddress, saveAddress = false) => (
  dispatch,
  getState,
  { api },
) => {
  const getPromise = async () => {
    const { userId, clientId } = getState().user;
    const address = {
      ...chosenAddress,
      saveAddress,
    };
    delete address.id;
    delete address.isDefaultShipping;
    delete address.isDefaultBilling;
    const { data } = await api.postCartBilling({ clientId, userId, address });
    return data;
  };

  return dispatch({
    type: POST_CART_BILLING,
    payload: getPromise(),
  });
};

export const getCartShipping = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { userId, clientId } = getState().user;
    const { data } = await api.getCartShipping({ clientId, userId });
    return data;
  };

  return dispatch({
    type: GET_CART_SHIPPING,
    payload: getPromise(),
  });
};

export const postCartShipping = (chosenAddress, saveAddress = false) => (
  dispatch,
  getState,
  { api },
) => {
  const getPromise = async () => {
    const { userId, clientId } = getState().user;

    const address = {
      shippingAddress: {
        ...chosenAddress,
        saveAddress,
      },
      shippingCarrierCode: 'cxa',
      shippingMethodCode: 'cxa',
    };
    delete address.shippingAddress?.id;
    delete address.shippingAddress?.isDefaultShipping;
    delete address.shippingAddress?.isDefaultBilling;
    const data = await api.postCartShipping({ clientId, userId, address });
    return data.data;
  };

  return dispatch({
    type: POST_CART_SHIPPING,
    payload: getPromise(),
  });
};

export const removeItemFromCart = sku => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { userId, clientId } = getState().user;
    const { data } = await api.removeItemFromCart(clientId, userId, sku);
    return data;
  };

  return dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: getPromise(),
  });
};

export const makePayment = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { userId, clientId } = getState().user;
    const { data } = await api.makePayment({ clientId, userId });
    return data;
  };

  return dispatch({
    type: MAKE_PAYMENT,
    payload: getPromise(),
  });
};

export const getCartCoupons = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { userId, clientId } = getState().user;
    const { data } = await api.getCartCoupons(clientId, userId);
    return data;
  };

  return dispatch({
    type: GET_CART_COUPONS,
    payload: getPromise(),
  });
};

export const removeCartCoupon = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { userId, clientId } = getState().user;
    const { data } = await api.removeCartCoupon(clientId, userId);
    return data;
  };

  return dispatch({
    type: REMOVE_CART_COUPON,
    payload: getPromise(),
  });
};

export const addCartCoupon = couponCode => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { userId, clientId } = getState().user;
    const { data } = await api.addCartCoupon(clientId, userId, couponCode);
    return data;
  };

  return dispatch({
    type: ADD_CART_COUPON,
    payload: getPromise(),
    meta: {
      couponCode,
    },
  });
};
