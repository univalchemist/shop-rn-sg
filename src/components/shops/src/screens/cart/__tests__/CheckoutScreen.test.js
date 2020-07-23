import React from 'react';
import { renderForTest } from '@testUtils';
import CheckoutScreen from '../CheckoutScreen';
import messages from '@shops/locales/en-HK.json';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import { TrackedButton } from '@shops/wrappers/components';
import { CART, ORDER_DETAILS_HISTORY } from '@shops/__mocks__/data';
import CartAddresses from '@shops/components/AddressList/CartAddresses';
import ConfirmModal from '@shops/screens/cart/CartScreen/ConfirmModal';
import { formattedAddress } from '@shops/components/AddressList/useValidateForm';
import {
  PAYMENT_SCREEN,
  PAYMENT_SUCCESS_SCREEN,
} from '@shops/navigation/routes';

const api = {
  makePayment: jest.fn(() =>
    Promise.resolve({ data: { paymentUrl: 'paymentUrl', orderId: 'orderId' } }),
  ),
  postCartBilling: jest.fn(() => Promise.resolve({ data: {} })),
  getCart: jest.fn(() => Promise.resolve({ data: {} })),
  getDeliveryAddresses: jest.fn(() => Promise.resolve({ data: {} })),
  getOrder: jest.fn().mockResolvedValue({ data: ORDER_DETAILS_HISTORY }),
};
const countryMap = {
  SG: { id: 'SG', abbreviation: 'SG', name: 'Singapore' },
};
const addressIds = [67];
const addressMap = {
  67: {
    id: 67,
    region: { id: 0 },
    regionId: 0,
    countryId: 'SG',
    telephone: '68823000',
    postCode: '319762',
    city: 'Singapore',
    firstName: 'Jie',
    lastName: 'Shen',
    street: ['620A, Lor 1 Toa Payoh Singapore 319762'],
  },
};
const membersMap = {
  '1': {
    firstName: 'first',
    lastName: 'last',
    contactNumber: '0123',
  },
};
const initialState = {
  user: {
    clientId: 'clientId',
    userId: '1',
    membersMap,
  },
  shop: {
    cart: {
      itemCount: 1,
      isActive: true,
      items: CART.items,
      totals: {
        grandTotal: 1000,
      },
    },
    deliveryAddress: {
      addressMap,
      addressIds,
    },
    config: {
      countryMap,
      currency: { defaultCurrencySymbol: '$SG' },
    },
  },
};

const shippingAddress = {
  address1: 'address 1',
  address2: 'address 2',
  city: 'City',
  province: 'province',
  countryId: 'SG',
  zipCode: '70000',
  firstName: 'first',
  lastName: 'last',
  telephone: '0123',
};
const route = {
  params: {
    shippingAddress,
  },
};

describe('CheckoutScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render properly', () => {
    const Comp = renderForTest(<CheckoutScreen route={route} />, {
      initialState,
      api,
    });
    const shippingAddressesComp = Comp.getByType(CartAddresses);
    fireEvent(shippingAddressesComp, 'checkboxChange', true);
    const modal = Comp.getByType(ConfirmModal);
    fireEvent(modal, 'onCancel');
    expect(Comp.queryByText(messages['shop.common.checkout'])).toBeTruthy();
    expect(Comp.queryByText(messages['shop.common.cart'])).toBeTruthy();
    expect(Comp.queryByText(messages['shop.checkout.orderTotal'])).toBeTruthy();
    expect(Comp.queryByText(messages['shop.checkout.payNow'])).toBeTruthy();
    expect(Comp.queryByText('$SG 1,000.00')).toBeTruthy();
  });

  it('should call correct data when user pick exist address ', async () => {
    const Comp = renderForTest(<CheckoutScreen route={route} />, {
      initialState,
      api,
    });
    const shippingAddressesComp = Comp.getByType(CartAddresses);
    fireEvent(shippingAddressesComp, 'change', 67);

    const button = Comp.getByType(TrackedButton);
    const modal = Comp.getByType(ConfirmModal);
    fireEvent.press(button);
    fireEvent(modal, 'onConfirm');
    await flushMicrotasksQueue();
    const address = { ...addressMap[67] };
    delete address.id;
    expect(api.postCartBilling).toBeCalledWith({
      address: {
        ...address,
        saveAddress: false,
      },
      clientId: 'clientId',
      userId: '1',
    });
  });

  it('should call correct data when user pick exist same as shipping ', async () => {
    const Comp = renderForTest(<CheckoutScreen route={route} />, {
      initialState,
      api,
    });
    const shippingAddressesComp = Comp.getByType(CartAddresses);
    fireEvent(shippingAddressesComp, 'change', -1);

    const button = Comp.getByType(TrackedButton);
    const modal = Comp.getByType(ConfirmModal);
    fireEvent.press(button);
    fireEvent(modal, 'onConfirm');
    await flushMicrotasksQueue();
    const address = { shippingAddress };
    delete address.id;
    expect(api.postCartBilling).toBeCalledWith({
      address: {
        ...shippingAddress,
        saveAddress: false,
      },
      clientId: 'clientId',
      userId: '1',
    });
  });

  it('should call correct data when user pick new form ', async () => {
    const navigation = { navigate: jest.fn() };
    const Comp = renderForTest(
      <CheckoutScreen route={route} navigation={navigation} />,
      {
        initialState,
        api,
      },
    );
    const shippingAddressesComp = Comp.getByType(CartAddresses);
    fireEvent(shippingAddressesComp, 'change', -0);
    fireEvent(shippingAddressesComp, 'formChange', shippingAddress);
    await flushMicrotasksQueue();
    const button = Comp.getByType(TrackedButton);
    const modal = Comp.getByType(ConfirmModal);
    fireEvent.press(button);
    fireEvent(modal, 'onConfirm');

    await flushMicrotasksQueue();
    const address = { shippingAddress };
    delete address.id;
    expect(api.postCartBilling).toBeCalledWith({
      address: {
        ...formattedAddress({ form: shippingAddress }),
        saveAddress: false,
      },
      clientId: 'clientId',
      userId: '1',
    });
    expect(navigation.navigate).toBeCalledWith(PAYMENT_SCREEN, {
      orderId: 'orderId',
      paymentUrl: 'paymentUrl',
    });
  });

  it('should navigate to success payment screen if paymentUrl empty ', async () => {
    const navigation = { navigate: jest.fn() };
    api.makePayment.mockResolvedValueOnce({
      data: { paymentUrl: null, orderId: 'orderId' },
    });
    const Comp = renderForTest(
      <CheckoutScreen route={route} navigation={navigation} />,
      {
        initialState,
        api,
      },
    );
    const shippingAddressesComp = Comp.getByType(CartAddresses);
    fireEvent(shippingAddressesComp, 'change', -1);

    const button = Comp.getByType(TrackedButton);
    const modal = Comp.getByType(ConfirmModal);
    fireEvent.press(button);
    fireEvent(modal, 'onConfirm');
    await flushMicrotasksQueue();
    expect(navigation.navigate).toBeCalledWith(PAYMENT_SUCCESS_SCREEN, {
      order: ORDER_DETAILS_HISTORY,
    });
  });
});
