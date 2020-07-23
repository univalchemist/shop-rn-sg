import React from 'react';
import { renderForTest } from '@testUtils';
import CartAddresses from '../CartAddresses';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import SelectAddress from '@shops/components/AddressList/SelectAddress';
import { Text } from '@shops/wrappers/components';
import { AddressForm } from '../AddressForm';
import { CheckBox } from '@shops/components';

const initialState = {
  shop: {
    config: {
      countryIds: ['SG'],
      countryMap: { SG: { id: 'SG', abbreviation: 'SG', name: 'Singapore' } },
    },
  },
};

const addresses = [{ id: 0, text: 'add new address' }];

describe('CartAddresses', () => {
  it('should render properly', () => {
    const Comp = renderForTest(
      <CartAddresses addresses={addresses} title={'title'} />,
      { initialState },
    );
    expect(Comp.queryByText('title')).toBeTruthy();
    const selectAddress = Comp.queryByType(SelectAddress);
    expect(selectAddress).toBeTruthy();
    expect(Comp.queryByType(AddressForm)).toBeTruthy();
    expect(Comp.queryByType(CheckBox)).toBeTruthy();
  });

  it('should hide form when init address larger than 1', () => {
    const addresses = [
      { id: 1, text: 'address1' },
      { id: 0, text: 'add new address' },
    ];
    const Comp = renderForTest(
      <CartAddresses addresses={addresses} title={'title'} />,
      { initialState },
    );
    expect(Comp.queryByType(AddressForm)).toBeNull();
    expect(Comp.queryByType(CheckBox)).toBeNull();
  });

  it('should show form when change to add new address', async () => {
    const addresses = [
      { id: 1, text: 'address1' },
      { id: 0, text: 'add new address' },
    ];
    const newForm = {
      address1: 'address1',
    };
    const onFormChange = jest.fn();
    const onCheckboxChange = jest.fn();
    const Comp = renderForTest(
      <CartAddresses
        addresses={addresses}
        title={'title'}
        onFormChange={onFormChange}
        onCheckboxChange={onCheckboxChange}
      />,
      { initialState },
    );
    const selectAddress = Comp.queryByType(SelectAddress);
    fireEvent(selectAddress, 'selectChange', 0);
    await flushMicrotasksQueue();
    const addressForm = Comp.queryByType(AddressForm);
    const checkbox = Comp.queryByType(CheckBox);
    expect(addressForm).toBeTruthy();
    expect(checkbox).toBeTruthy();
    fireEvent(addressForm, 'change', newForm);
    expect(onFormChange).toBeCalledWith(newForm);
    fireEvent(checkbox, 'onPress');
    expect(onCheckboxChange).toBeCalledWith(true)
  });

  it('should hide form when change to exist address', async () => {
    const addresses = [
      { id: 1, text: 'address1' },
      { id: 0, text: 'add new address' },
    ];
    const Comp = renderForTest(
      <CartAddresses addresses={addresses} title={'title'} />,
      { initialState },
    );
    const selectAddress = Comp.queryByType(SelectAddress);
    fireEvent(selectAddress, 'selectChange', 0);
    await flushMicrotasksQueue();
    fireEvent(selectAddress, 'selectChange', 1);
    await flushMicrotasksQueue();
    expect(Comp.queryByType(AddressForm)).toBeNull();
    expect(Comp.queryByType(CheckBox)).toBeNull();
  });

  it('should not crash when doesnt pass any value', () => {
    const Comp = renderForTest(<CartAddresses />);
    expect(Comp.queryByType(SelectAddress)).toBeTruthy();
    expect(Comp.queryByType(Text)).toBeTruthy();
  });
});
