import * as axios from 'axios';
import Config from '@shops/config';
import api from '../api';

jest.mock('@store/configureStore', () => ({
  getStore: jest.fn(() => ({
    getState: jest.fn(() => ({
      user: {
        data: {
          username: 'test@test.com',
        },
      },
    })),
  })),
}));

jest.mock('@services/secureStore', () => ({
  fetchTokens: jest.fn(() => ({
    id_token: 'myidtoken',
    access_token: 'myaccesstoken',
  })),
}));

jest.mock('axios');

const FormDataMock = () => ({
  append: jest.fn(),
});

global.FormData = FormDataMock;

describe('apis', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should test getSuggestedOffers', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getSuggestedOffers({
      clientId: 'clientId',
      page: '1',
      pageSize: '6',
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getSuggestedOffers('clientId', '1', '6'),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getSuggestedOffers with default value', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getSuggestedOffers({
      clientId: 'clientId',
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getSuggestedOffers('clientId', '1', '6'),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getReviews', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getReviews({
      clientId: 'clientId',
      productId: 1,
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getReviews('clientId', 1),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getStoreConfigs', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getStoreConfigs('clientId');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getStoreConfigs('clientId'),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getCategories', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getCategories('clientId');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getCategories('clientId'),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getSortings', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getSortings('clientId');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getSortings('clientId'),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getCountries', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getCountries('clientId');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getCountries('clientId'),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getProducts', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getProducts('clientId', {});
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getProductsGroupedCategories('clientId'),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getProductsByCategoryId', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getProductsByCategoryId('clientId', 1, {});
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getProductsByCategoryId('clientId', 1, {}),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test addToCart', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
    });
    await api.addToCart({
      userId: 1,
      clientId: 'clientId',
      quantity: 1,
      sku: 'sku',
    });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      Config.apiRoutes.addToCart('clientId', 1, 'sku', 1),
      undefined,
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test addToCart with default value', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
    });
    await api.addToCart({
      userId: 1,
      clientId: 'clientId',
      sku: 'sku',
    });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      Config.apiRoutes.addToCart('clientId', 1, 'sku', 1),
      undefined,
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test updateCart', async () => {
    axios.put.mockResolvedValueOnce({
      status: 200,
    });
    await api.updateCart({
      userId: 1,
      clientId: 'clientId',
      quantity: 1,
      sku: 'sku',
    });
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(
      Config.apiRoutes.updateCart('clientId', 1, 'sku', 1),
      undefined,
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test updateCart with default value', async () => {
    axios.put.mockResolvedValueOnce({
      status: 200,
    });
    await api.updateCart({
      userId: 1,
      clientId: 'clientId',
      sku: 'sku',
    });
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(
      Config.apiRoutes.updateCart('clientId', 1, 'sku', 1),
      undefined,
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getCart', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getCart('clientId', 1);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getCart('clientId', 1),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getCartTotals', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getCartTotals('clientId', 1);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getCartTotals('clientId', 1),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getCartBilling', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getCartBilling({ clientId: 'clientId', userId: 1 });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.billing('clientId', 1),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test postCartBilling', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
    });
    await api.postCartBilling({
      clientId: 'clientId',
      userId: 1,
      address: { address1: 'address1' },
    });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      Config.apiRoutes.billing('clientId', 1),
      { address1: 'address1' },
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getCartShipping', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getCartShipping({ clientId: 'clientId', userId: 1 });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.shipping('clientId', 1),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test postCartShipping', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
    });
    await api.postCartShipping({
      clientId: 'clientId',
      userId: 1,
      address: { address1: 'address1' },
    });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      Config.apiRoutes.shipping('clientId', 1),
      { address1: 'address1' },
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test removeItemFromCart', async () => {
    axios.delete.mockResolvedValueOnce({
      status: 200,
    });
    await api.removeItemFromCart('clientId', 1, 'sku');
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      Config.apiRoutes.removeItemFromCart('clientId', 1, 'sku'),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getProductBySku', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getProductBySku('clientId', 'sku');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getProductBySku('clientId', 'sku'),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test makePayment', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
    });
    await api.makePayment({ clientId: 'clientId', userId: 1 });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      Config.apiRoutes.makePayment('clientId', 1),
      undefined,
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getOrdersHistory', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getOrdersHistory({ clientId: 'clientId', userId: 1 });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getOrdersHistory('clientId', 1),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getOrderDetail', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getOrderDetail({ clientId: 'clientId', userId: 1, orderId: 1 });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getOrderDetail('clientId', 1, 1),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getTrackOrder', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getTrackOrder({ clientId: 'clientId', userId: 1, orderId: 1 });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getTrackOrder('clientId', 1, 1),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getReviewForm', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getReviews({ clientId: 'clientId', productId: 1 });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getReviews('clientId', 1, 1),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test postReview', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
    });
    await api.postReview({
      clientId: 'clientId',
      userId: 1,
      orderId: 1,
      sku: 'sku',
      body: {},
    });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      Config.apiRoutes.postReview('clientId', 1, 1, 'sku'),
      {},
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getDeliveryAddresses', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getDeliveryAddresses('clientId', 1);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.deliveryAddresses('clientId', 1),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test addDeliveryAddress', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
    });
    await api.addDeliveryAddress('clientId', 1, {});
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      Config.apiRoutes.deliveryAddresses('clientId', 1),
      {},
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test deleteDeliveryAddress', async () => {
    axios.delete.mockResolvedValueOnce({
      status: 200,
    });
    await api.deleteDeliveryAddress('clientId', 1, 1);
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      Config.apiRoutes.deliveryAddressById('clientId', 1, 1),

      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test deleteDeliveryAddress', async () => {
    axios.put.mockResolvedValueOnce({
      status: 200,
    });
    await api.updateDeliveryAddress('clientId', 1, 1, {});
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(
      Config.apiRoutes.deliveryAddressById('clientId', 1, 1),
      {},
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getOrder', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getOrder({ clientId: 'clientId', userId: 1, orderId: 1 });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getOrder('clientId', 1, 1),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getCartCoupons', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getCartCoupons('clientId', 1);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getCartCoupons('clientId', 1),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test removeCartCoupon', async () => {
    axios.delete.mockResolvedValueOnce({
      status: 200,
    });
    await api.removeCartCoupon('clientId', 1);
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      Config.apiRoutes.removeCartCoupon('clientId', 1),

      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test addCartCoupon', async () => {
    axios.put.mockResolvedValueOnce({
      status: 200,
    });
    await api.addCartCoupon('clientId', 1, 'couponCode');
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(
      Config.apiRoutes.addCartCoupon('clientId', 1, 'couponCode'),
      undefined,
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getBanners', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getBanners('clientId');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getBanners('clientId'),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });

  it('should test getReviewForm', async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
    });
    await api.getReviewForm({clientId:'clientId'});
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      Config.apiRoutes.getReviewForm('clientId'),
      {
        headers: {
          Authorization: 'Bearer myaccesstoken',
        },
      },
    );
  });
});
