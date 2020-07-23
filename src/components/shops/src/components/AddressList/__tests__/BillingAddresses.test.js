import React from 'react';
import { renderForTest } from '@testUtils';
import BillingAddresses from '../BillingAddresses';
import CartAddresses from '../CartAddresses';
import messages from '@shops/locales/en-HK.json';
import { fireEvent } from 'react-native-testing-library';

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
const countryMap = {
  SG: { id: 'SG', abbreviation: 'SG', name: 'Singapore' },
};

const initialState = {
  shop: {
    deliveryAddress: {
      addressMap: addressMap,
      addressIds: [67],
    },
    config: {
      countryMap,
    },
  },
};

const onChange = jest.fn();
const onFormChange = jest.fn();
const onCheckboxChange = jest.fn();
const navigation = {
  navigate: jest.fn(),
};

describe('BillingAddresses', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render properly', () => {
    const Comp = renderForTest(
      <BillingAddresses
        onChange={onChange}
        onFormChange={onFormChange}
        onCheckboxChange={onCheckboxChange}
        navigation={navigation}
      />,
      { initialState },
    );
    expect(Comp.queryByText(messages['shop.address.billing'])).toBeTruthy();
    const cartAddresses = Comp.queryByType(CartAddresses);
    expect(cartAddresses).toBeTruthy();
    fireEvent(cartAddresses, 'change', 12);
    expect(onChange).toBeCalledWith(12);
    const formChange ={ address1: 'address1' };
    fireEvent(cartAddresses, 'formChange', formChange);
    expect(onFormChange).toBeCalledWith(formChange)
    fireEvent(cartAddresses, 'checkboxChange', true);
    expect(onCheckboxChange).toBeCalledWith(true)
  });
});
