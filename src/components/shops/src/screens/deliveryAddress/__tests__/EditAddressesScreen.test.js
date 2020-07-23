import React from 'react';
import { renderForTest } from '@testUtils';
import EditAddressScreen from '../EditAddressScreen';
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
      },
    },
  },
};

const route = {
  params: {
    addressId: '67',
  },
};

describe('EditAddressScreen', () => {
  it('should render properly', () => {
    const Comp = renderForTest(<EditAddressScreen route={route} />, {
      initialState,
    });
    const addressForm = Comp.queryByType(AddressForm);
    expect(addressForm).toBeTruthy();
    expect(addressForm.props.initialValue).toEqual({
      address1: '620A, Lor 1 Toa Payoh Singapore 319762',
      address2: 'address2',
      city: 'Singapore',
      countryId: 'SG',
      firstName: 'Jie',
      lastName: 'Shen',
      telephone: '68823000',
      zipCode: '319762',
    });
  });

  it('should toggle checkbox properly', async () => {
    const Comp = renderForTest(<EditAddressScreen route={route} />, {
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

  it('s onFormChange works properly', async () => {
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
    const Comp = renderForTest(<EditAddressScreen route={route} />, {
      initialState,
    });
    let addressForm = Comp.queryByType(AddressForm);
    fireEvent(addressForm, 'onChange', form);
    await flushMicrotasksQueue();
    addressForm = Comp.queryByType(AddressForm);
    expect(addressForm.props.initialValue).toEqual(form);
  });

  it('s onSubmit works properly', async () => {
    const api = {
      updateDeliveryAddress: jest.fn().mockResolvedValue({ data: {} }),
    };
    const navigation = {
      goBack: jest.fn(),
    };
    const Comp = renderForTest(
      <EditAddressScreen route={route} navigation={navigation} />,
      {
        initialState,
        api,
      },
    );
    let trackedButton = Comp.queryByType(TrackedButton);
    fireEvent.press(trackedButton);
    await flushMicrotasksQueue();
    expect(api.updateDeliveryAddress).toBeCalledWith(
      'clientId',
      'userId',
      67,
      initialState.shop.deliveryAddress.addressMap[67],
    );
    expect(navigation.goBack).toBeCalled();
  });

  it('s onSubmit works properly with no address 2', async () => {
    const form = {
      firstName: 'firstName',
      lastName: 'lastName',
      telephone: 'telephone',
      address1: 'address1',
      city: 'city',
      countryId: 'countryId',
      zipCode: 'zipCode',
      province: 'province',
    };
    const api = {
      updateDeliveryAddress: jest.fn().mockResolvedValue({ data: {} }),
    };
    const navigation = {
      goBack: jest.fn(),
    };
    const Comp = renderForTest(
      <EditAddressScreen route={route} navigation={navigation} />,
      {
        initialState,
        api,
      },
    );
    let addressForm = Comp.queryByType(AddressForm);
    fireEvent(addressForm, 'onChange', form);
    await flushMicrotasksQueue();
    let trackedButton = Comp.queryByType(TrackedButton);
    fireEvent.press(trackedButton);
    await flushMicrotasksQueue();
    expect(api.updateDeliveryAddress).toBeCalledWith('clientId', 'userId', 67, {
      city: 'city',
      countryId: 'countryId',
      firstName: 'firstName',
      telephone: 'telephone',
      lastName: 'lastName',
      postCode: 'zipCode',
      province: 'province',
      isDefaultShipping: false,
      id: 67,
      region: {
        code: 'province',
        id: 0,
        region: 'province',
      },
      regionId: 0,
      street: ['address1'],
    });
    expect(navigation.goBack).toBeCalled();
  });

  it('s onSubmit not be call if is not validate', async () => {
    const api = {
      updateDeliveryAddress: jest.fn().mockResolvedValue({ data: {} }),
    };
    const navigation = {
      goBack: jest.fn(),
    };
    const Comp = renderForTest(
      <EditAddressScreen route={route} navigation={navigation} />,
      {
        initialState,
        api,
      },
    );
    const form = {
      firstName: 'firstName',
    };
    let addressForm = Comp.queryByType(AddressForm);
    fireEvent(addressForm, 'onChange', form);
    await flushMicrotasksQueue();
    let trackedButton = Comp.queryByType(TrackedButton);

    fireEvent.press(trackedButton);

    expect(api.updateDeliveryAddress).not.toBeCalled();
  });
});
