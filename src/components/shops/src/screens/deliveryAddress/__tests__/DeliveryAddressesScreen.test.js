import React from 'react';
import { renderForTest } from '@testUtils';
import DeliveryAddressesScreen from '../DeliveryAddressesScreen';
import messages from '@shops/locales/en-HK.json';
import { fireEvent } from 'react-native-testing-library';
import { TrackedButton } from '@shops/wrappers/components';
import { SHOP_ADD_ADDRESS_SCREEN } from '@shops/navigation/routes';
import { AddressItem } from '@shops/screens/deliveryAddress/AddressItem';

const initialState = {
  user: {
    clientId: 'clientId',
    userId: 'userId',
  },
  shop: {
    home: {
      wallet: {},
    },
    config: {
      countryIds: ['SG'],
      countryMap: { SG: { id: 'SG', abbreviation: 'SG', name: 'Singapore' } },
    },
    deliveryAddress: {
      addressMap: {
        67: {
          id: 67,
          region: { id: 0 },
          regionId: 0,
          countryId: 'SG',
          telephone: '68823000',
          province: 'province',
          postCode: '319762',
          city: 'Singapore',
          firstName: 'Jie',
          lastName: 'Shen',
          street: ['620A, Lor 1 Toa Payoh Singapore 319762', 'address2'],
          isDefaultShipping: false,
        },

        68: {
          id: 68,
          region: { id: 0 },
          regionId: 0,
          countryId: 'SG',
          telephone: '68823000',
          province: 'province',
          postCode: '319762',
          city: 'Singapore',
          firstName: 'Jie',
          lastName: 'Shen',
          street: ['620A, Lor 1 Toa Payoh Singapore 319762', 'address2'],
          isDefaultShipping: false,
        },
      },
      addressIds: [67, 68],
    },
  },
};

describe('DeliveryAddressesScreen', () => {
  it('should render properly', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const Comp = renderForTest(
      <DeliveryAddressesScreen navigation={navigation} />,
      { initialState },
    );
    expect(Comp.queryByText(messages['shop.address.delivery'])).toBeTruthy();
    expect(Comp.queryByText(messages['shop.address.addNew'])).toBeTruthy();
    const addressItems = Comp.queryAllByType(AddressItem);
    expect(addressItems).toHaveLength(2);
    const buttons = Comp.queryAllByType(TrackedButton);
    const buttonAddNew = buttons[buttons.length - 1];
    fireEvent.press(buttonAddNew);
    expect(navigation.navigate).toBeCalledWith(SHOP_ADD_ADDRESS_SCREEN);
  });

  it('should render  properly when no addresses', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const initialState = {
      shop: {
        home: {
          wallet: {},
        },
        config: {
          countryIds: ['SG'],
          countryMap: {
            SG: { id: 'SG', abbreviation: 'SG', name: 'Singapore' },
          },
        },
        deliveryAddress: {
          addressMap: [],
          addressIds: [],
        },
      },
    };
    const Comp = renderForTest(
      <DeliveryAddressesScreen navigation={navigation} />,
      { initialState },
    );
    expect(
      Comp.queryByText(messages['shop.address.noDeliveryAddress']),
    ).toBeTruthy();
    expect(Comp.queryAllByType(AddressItem)).toHaveLength(0);
  });
});
