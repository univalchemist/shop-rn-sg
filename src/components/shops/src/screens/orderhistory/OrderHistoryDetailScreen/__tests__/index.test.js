import React from 'react';
import { renderForTest } from '@testUtils';
import OrderHistoryDetailScreen from '../index';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import { TrackedButton } from '@shops/wrappers/components';
import {
  TRACK_ORDER_SCREEN,
  WRITE_REVIEW_SCREEN,
} from '@shops/navigation/routes';
import { ORDER_DETAILS_HISTORY } from '@shops/__mocks__/data';
import { ORDER_STATUS_STRING } from '@shops/utils/constant';

const mock = {
  grandTotal: 1200,
  subTotal: 0,
  discount: 0,
  shipping: 12,
  tax: 0,
  shippingTax: 0,
  subtotalIncludingTax: 0,
  shippingIncludingTax: 0,
  currency: '$',
  status: 0,
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
};

const api = {
  getOrderDetail: jest.fn(() =>
    Promise.resolve({ data: ORDER_DETAILS_HISTORY }),
  ),
};
const initialState = {
  shop: {
    config: {
      currency: {
        defaultCurrencySymbol: 'SGD',
      },
    },
  },
};
describe('OrderHistoryDetailScreen', () => {
  it('should render text properly when status is complete', async () => {
    const route = { params: { orderHistory: ORDER_DETAILS_HISTORY } };
    const Comp = renderForTest(<OrderHistoryDetailScreen route={route} />, {
      api,
      initialState,
    });
    await flushMicrotasksQueue();
    expect(Comp.queryByText('Order No. : CXA000000038')).toBeTruthy();
    expect(Comp.queryByText('13 May 2020')).toBeTruthy();
    expect(Comp.queryAllByText('Total (7 items)')).toBeTruthy();
    expect(Comp.queryByText('Delivery / self collection')).toBeTruthy();
    expect(Comp.queryByText('Payment summary')).toBeTruthy();
    expect(Comp.queryByText('Payment by Cash')).toBeTruthy();
    expect(Comp.queryByText('incl. Delivery (SGD 140.00)')).toBeTruthy();
    expect(Comp.queryAllByText('Status: Shipped')).toBeTruthy();
  });

  it('should render text properly when status is pending', async () => {
    const orderDetailHistory = { ...ORDER_DETAILS_HISTORY };
    orderDetailHistory.status = ORDER_STATUS_STRING.PENDING;
    const api = {
      getOrderDetail: jest.fn(() =>
        Promise.resolve({ data: orderDetailHistory }),
      ),
    };
    const route = { params: { orderHistory: orderDetailHistory } };
    const Comp = renderForTest(<OrderHistoryDetailScreen route={route} />, {
      api,
      initialState,
    });
    await flushMicrotasksQueue();
    expect(Comp.queryByText('Order No. : CXA000000038')).toBeTruthy();
    expect(Comp.queryByText('13 May 2020')).toBeTruthy();
    expect(Comp.queryAllByText('Total (7 items)')).toBeTruthy();
    expect(Comp.queryByText('Delivery / self collection')).toBeTruthy();
    expect(Comp.queryByText('Payment summary')).toBeTruthy();
    expect(Comp.queryByText('Payment by Cash')).toBeTruthy();
    expect(Comp.queryByText('incl. Delivery (SGD 140.00)')).toBeTruthy();
    expect(Comp.queryAllByText('Status: Processing')).toBeTruthy();
  });

  it('buttons should render and behave properly', async () => {
    const navigation = { navigate: jest.fn() };
    const route = { params: { orderHistory: mock } };
    const Comp = renderForTest(
      <OrderHistoryDetailScreen route={route} navigation={navigation} />,
      {
        api,
        initialState,
      },
    );
    await flushMicrotasksQueue();
    const buttons = Comp.queryAllByType(TrackedButton);
    expect(buttons[0].props.title).toEqual('Track order');
    expect(buttons[1].props.title).toEqual('Leave a review');
    fireEvent.press(buttons[0]);
    expect(navigation.navigate).toBeCalledWith(TRACK_ORDER_SCREEN, {
      orderId: 38,
    });
    fireEvent.press(buttons[1]);
    expect(navigation.navigate).toBeCalledWith(WRITE_REVIEW_SCREEN, {
      boughtProduct: ORDER_DETAILS_HISTORY.items[0],
      orderId: 38,
    });
  });
});
