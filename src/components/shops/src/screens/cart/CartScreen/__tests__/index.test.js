import React from 'react';
import { renderForTest } from '@testUtils';
import CartScreen from '../index';
import messages from '@shops/locales/en-HK.json';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import { TrackedButton } from '@shops/wrappers/components';
import CartEmpty from '@shops/screens/cart/CartScreen/CartEmpty';
import { ADDRESSES, CART, SHIPPING } from '@shops/__mocks__/data';

import CartAddresses from '@shops/components/AddressList/CartAddresses';
import { formattedAddress } from '@shops/components/AddressList/useValidateForm';

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
const addressIds = [67];
const cart = { itemCount: 1, isActive: true, totals: {}, items: CART.items };
const countryMap = {
  SG: { id: 'SG', abbreviation: 'SG', name: 'Singapore' },
};
const initialState = {
  shop: {
    config: {
      countryMap,
    },
    cart,
    deliveryAddress: {
      addressMap,
      addressIds,
    },
    home:{
      wallet:{}
    }
  },
  user: {
    clientId: 'clientId',
    userId: '1',
    membersMap: {
      '1': {
        firstName: 'first',
        lastName: 'last',
        contactNumber: '0123',
      },
    },
  },
};

const api = {
  getDeliveryAddresses: jest.fn(() => Promise.resolve(ADDRESSES)),
  postCartShipping: jest.fn(() => Promise.resolve(SHIPPING)),
  addDeliveryAddress: jest.fn(() => Promise.resolve(ADDRESSES)),
};

describe('CartScreen', () => {
  it('should render CartEmpty when cart has no item ', () => {
    const navigation = { goBack: jest.fn() };
    const Comp = renderForTest(<CartScreen navigation={navigation} />, {
      initialState: {
        shop: {
          cart: { itemCount: 0, totals: {} },
          deliveryAddress: { addressMap, addressIds },
          config: {
            countryMap,
          },
        },
      },
    });
    expect(Comp.getByType(CartEmpty)).toBeTruthy();
  });

  it('should render Cart when cart has  item ', async () => {
    const navigation = { goBack: jest.fn() };
    const Comp = renderForTest(<CartScreen navigation={navigation} />, {
      initialState,
    });
    await flushMicrotasksQueue();
    expect(Comp.getByText(messages['shop.common.cart'])).toBeTruthy();
    expect(Comp.getByText(messages['shop.cart.totalPayment'])).toBeTruthy();
    expect(Comp.getByText(messages['shop.cart.paymentSummary'])).toBeTruthy();
    expect(
      Comp.getByText(messages['shop.cart.discountCode'])
    ).toBeTruthy();
    expect(Comp.getByText(messages['shop.common.note'])).toBeTruthy();
    expect(Comp.getByText(messages['shop.cart.noteDesc'])).toBeTruthy();
  });

  it('onAddressChange should work properly ', () => {
    const navigation = { goBack: jest.fn() };
    const Comp = renderForTest(<CartScreen navigation={navigation} />, {
      initialState,
      api,
    });
    const shippingAddressesComp = Comp.getByType(CartAddresses);
    fireEvent(shippingAddressesComp, 'change', 67);
    fireEvent(shippingAddressesComp, 'checkboxChange', true);
    const trackedButton = Comp.getAllByType(TrackedButton)[1];
    fireEvent.press(trackedButton);
    const address = { ...addressMap[67] };
    delete address.id;
    expect(api.postCartShipping).toBeCalledWith({
      address: {
        shippingAddress: {
          ...address,
          saveAddress: true,
        },
        shippingCarrierCode: 'cxa',
        shippingMethodCode: 'cxa',
      },
      clientId: 'clientId',
      userId: '1',
    });
  });

  it('onFormAddressChange should work properly', async () => {
    const navigation = { goBack: jest.fn() };
    const newAddress = {
      firstName:"firstName",
      lastName:"lastName",
      telephone:'68823000',
      address1: 'address 1',
      address2: 'address 2',
      city: 'City',
      province: 'province',
      countryId: 'SG',
      zipCode: '70000',
    };
    const Comp = renderForTest(<CartScreen navigation={navigation} />, {
      initialState,
      api,
    });
    const shippingAddressesComp = Comp.getByType(CartAddresses);
    fireEvent(shippingAddressesComp, 'change', 0);
    fireEvent(shippingAddressesComp, 'formChange', newAddress);
    await flushMicrotasksQueue();
    const trackedButton = Comp.getAllByType(TrackedButton)[1];
    fireEvent.press(trackedButton);
    await flushMicrotasksQueue();
    expect(api.postCartShipping).toBeCalledWith({
      address: {
        shippingAddress: {
          ...formattedAddress({
            form: newAddress,
          }),
          saveAddress: false,
        },
        shippingCarrierCode: 'cxa',
        shippingMethodCode: 'cxa',
      },
      clientId: 'clientId',
      userId: '1',
    });
  });
});
