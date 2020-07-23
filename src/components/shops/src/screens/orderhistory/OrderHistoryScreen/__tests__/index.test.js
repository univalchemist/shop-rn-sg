import React from 'react';
import { renderForTest } from '@testUtils';
import OrderHistoryScreen from '../index';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import { TrackedButton } from '@shops/wrappers/components';
import { ORDER_HISTORY_DETAIL_SCREEN } from '@shops/navigation/routes';
import { ORDER_STATUS_STRING } from '@shops/utils/constant';
import messages from '@shops/locales/en-HK.json';

const mockOrderHistory = [
  {
    grandTotal: 1200,
    subTotal: 0,
    discount: 0,
    shipping: 12,
    tax: 0,
    shippingTax: 0,
    subtotalIncludingTax: 0,
    shippingIncludingTax: 0,
    currency: '$',
    status: ORDER_STATUS_STRING.COMPLETE,
    orderId: '3333',
    orderIdText: 'CXA3333',
    itemCount: 3,
    payment: {
      grandTotal: 1150,
      method: 'string',
    },
    items: [
      {
        id: 0,
        quantity: 1,
        total: 500,
        sku: 'sku1',
        name: 'Lemon Essential Oil (Young Living)',
        description: 'string',
        thumbnail: {
          id: 0,
          file:
            'https://images-na.ssl-images-amazon.com/images/I/71wGPX1Mj7L._SX466_.jpg',
          position: 0,
          label: 'string',
        },
      },
    ],
    orderDate: '2020-05-08T14:37:25.033Z',
  },
];

const initialState = {
  shop: {
    orderHistory: {
      orderHistory: mockOrderHistory,
    },
    config: {
      currency: {
        defaultCurrencySymbol: '$',
      },
    },
    home:{
      wallet:{}
    }
  },
};

const api = {
  getOrdersHistory: jest.fn(() => Promise.resolve({ data: mockOrderHistory })),
};

describe('OrderHistoryScreen', () => {
  it('should render properly', async () => {
    const Comp = renderForTest(<OrderHistoryScreen />, { initialState, api });
    await flushMicrotasksQueue();
    expect(Comp.queryByText('Order History')).toBeTruthy();
    expect(Comp.queryByText('Order No. : CXA3333')).toBeTruthy();
    expect(Comp.queryByText('Total (3 items)')).toBeTruthy();
    expect(Comp.queryByText('$ 1,200.00')).toBeTruthy();
    expect(Comp.queryByText('Lemon Essential Oil (Young Living)')).toBeTruthy();
    expect(Comp.queryByText('Qty: 1')).toBeTruthy();
  });

  it('should render button when payment status is completed', async () => {
    const navigation = { navigate: jest.fn() };
    const Comp = renderForTest(<OrderHistoryScreen navigation={navigation} />, {
      api,
      initialState
    });
    await flushMicrotasksQueue();
    const button = Comp.queryByType(TrackedButton);
    expect(button.props.title).toEqual('View order details');
    fireEvent.press(button);
    expect(navigation.navigate).toBeCalledWith(ORDER_HISTORY_DETAIL_SCREEN, {
      orderHistory: mockOrderHistory[0],
    });
  });

  it('should render text when payment status is pending', async () => {
    const orderHistory = [...mockOrderHistory];
    orderHistory[0].status = ORDER_STATUS_STRING.PENDING;
    const api = {
      getOrdersHistory: jest.fn(() => Promise.resolve({ data: orderHistory })),
    };
    const navigation = { navigate: jest.fn() };
    const Comp = renderForTest(<OrderHistoryScreen navigation={navigation} />, {
      initialState,
      api,
    });
    await flushMicrotasksQueue();
    expect(Comp.queryByText(messages['shop.orderHistory.paymentPending'])).toBeTruthy();
  });

  it('should render text when payment status is the rest', async () => {
    const orderHistory = [...mockOrderHistory];
    orderHistory[0].status = ORDER_STATUS_STRING.CANCELED;
    const api = {
      getOrdersHistory: jest.fn(() => Promise.resolve({ data: orderHistory })),
    };
    const navigation = { navigate: jest.fn() };
    const Comp = renderForTest(<OrderHistoryScreen navigation={navigation} />, {
      initialState,
      api,
    });
    await flushMicrotasksQueue();
    expect(Comp.queryByText(messages['shop.orderHistory.paymentUnsuccessful'])).toBeTruthy();
  });
});
