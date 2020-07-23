import React from 'react';
import { renderForTest } from '@testUtils';
import AddAddressScreen from '../AddAddressScreen';
import { CheckBox } from '@shops/components';
import messages from '@shops/locales/en-HK.json';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import { AddressForm } from '@shops/components/AddressList/AddressForm';
import { TrackedButton } from '@shops/wrappers/components';

const initialState = {
  user: {
    clientId: 'clientId',
    userId: 'userId',
  },
  shop: {
    config: {
      countryIds: ['SG'],
      countryMap: { SG: { id: 'SG', abbreviation: 'SG', name: 'Singapore' } },
    },
  },
};
describe('AddAddressScreen', () => {
  it('should render properly', () => {
    const Comp = renderForTest(<AddAddressScreen />, { initialState });
    expect(Comp.queryByType(AddressForm)).toBeTruthy();
    expect(Comp.queryByType(CheckBox)).toBeTruthy();
  });
  it('should toggle checkbox properly', async () => {
    const Comp = renderForTest(<AddAddressScreen />, {
      initialState,
    });
    let checkBox = Comp.queryByType(CheckBox);
    expect(
      Comp.queryByText(messages['shop.address.setDeliveryDefault']),
    ).toBeTruthy();
    expect(checkBox).toBeTruthy();
    expect(checkBox.props.checked).toEqual(false);
    fireEvent.press(checkBox);

    await flushMicrotasksQueue();
    checkBox = Comp.queryByType(CheckBox);
    expect(checkBox.props.checked).toEqual(true);
  });

  it('s onSubmit works properly', async () => {
    const form = {
      firstName: 'firstName',
      lastName: 'lastName',
      telephone: 'telephone',
      address1: '1',
      city: 'city',
      countryId: 'countryId',
      zipCode: 'zipCode',
      province: 'province',
    };
    const api = {
      addDeliveryAddress: jest.fn().mockResolvedValue({ data: {} }),
    };
    const Comp = renderForTest(<AddAddressScreen />, {
      initialState,
      api,
    });
    let addressForm = Comp.queryByType(AddressForm);
    fireEvent(addressForm, 'onChange', form);
    await flushMicrotasksQueue();
    let trackedButton = Comp.queryByType(TrackedButton);
    fireEvent.press(trackedButton);
    await flushMicrotasksQueue();
    expect(api.addDeliveryAddress).toBeCalledWith('clientId', 'userId',  {
      city: 'city',
      countryId: 'countryId',
      firstName: 'firstName',
      lastName: 'lastName',
      postCode: 'zipCode',
      region: { code: 'province', id: 0, region: 'province' },
      regionId: 0,
      street: ['1'],
      telephone: 'telephone',
    });
  });

  it('s onSubmit should not be call if is not validate', async () => {
    const form = {};
    const api = {
      addDeliveryAddress: jest.fn().mockResolvedValue({ data: {} }),
    };
    const Comp = renderForTest(<AddAddressScreen />, {
      initialState,
      api,
    });
    let addressForm = Comp.queryByType(AddressForm);
    fireEvent(addressForm, 'onChange', form);
    await flushMicrotasksQueue();
    let trackedButton = Comp.queryByType(TrackedButton);
    fireEvent.press(trackedButton);
    await flushMicrotasksQueue();
    expect(api.addDeliveryAddress).not.toBeCalled();
  });
});
