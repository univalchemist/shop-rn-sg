import React from 'react';
import { renderForTest } from '@testUtils';
import AddressItem from '../AddressItem';
import messages from '@shops/locales/en-HK.json';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import { TrackedButton } from '@shops/wrappers/components';
import { Alert } from 'react-native';
import { SHOP_EDIT_ADDRESS_SCREEN } from '@shops/navigation/routes';
jest.mock('react-native/Libraries/Alert/Alert', () => ({ alert: jest.fn() }));

const props = {
  addressLine1: 'addressLine1',
  addressLine2: 'addressLine2',
  firstName: 'firstName',
  lastName: 'lastName',
  telephone: 'telephone',
  city: 'city',
  country: 'country',
  province: 'province',
  zipCode: 'zipCode',
  isDefault: true,
  navigation: {
    navigate: jest.fn(),
  },
  id: 'id',
};

describe('AddressItem', () => {
  it('should render properly', () => {
    const Comp = renderForTest(<AddressItem {...props} />);

    expect(
      Comp.queryByText(messages['shop.address.defaultDeliveryAddress']),
    ).toBeTruthy();
    expect(Comp.queryByText(messages['shop.address.firstName'])).toBeTruthy();
    expect(Comp.queryByText(props.firstName)).toBeTruthy();
    expect(Comp.queryByText(messages['shop.address.lastName'])).toBeTruthy();
    expect(Comp.queryByText(props.lastName)).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.address.streetAddress']),
    ).toBeTruthy();
    expect(Comp.queryByText(props.addressLine1)).toBeTruthy();
    expect(Comp.queryByText(props.addressLine2)).toBeTruthy();
    expect(Comp.queryByText(messages['shop.address.city'])).toBeTruthy();
    expect(Comp.queryByText(props.city)).toBeTruthy();
    expect(Comp.queryByText(messages['shop.address.province'])).toBeTruthy();
    expect(Comp.queryByText(props.province)).toBeTruthy();
    expect(Comp.queryByText(messages['shop.address.country'])).toBeTruthy();
    expect(Comp.queryByText(props.country)).toBeTruthy();
    expect(Comp.queryByText(messages['shop.address.zipCode'])).toBeTruthy();
    expect(Comp.queryByText(props.zipCode)).toBeTruthy();
    expect(Comp.queryByText(messages['shop.address.telephone'])).toBeTruthy();
    expect(Comp.queryByText(props.telephone)).toBeTruthy();
    expect(Comp.queryAllByType(TrackedButton)).toHaveLength(2);
  });

  it('should perform delete  properly', async () => {
    const api = {
      deleteDeliveryAddress: jest.fn().mockResolvedValue({ data: true }),
    };
    const Comp = renderForTest(<AddressItem {...props} />, { api });
    const buttonDelete = Comp.queryAllByType(TrackedButton)[1];
    fireEvent.press(buttonDelete);
    expect(Alert.alert).toHaveBeenCalledTimes(1);
    expect(Alert.alert.mock.calls[0][0]).toBe(
      messages['shop.cartItem.removeItemDialogTitle'],
    );
    expect(Alert.alert.mock.calls[0][1]).toBe(
      messages['shop.address.removeAddressDialogMessage'],
    );
    expect(Alert.alert.mock.calls[0][2][0].text).toBe(
      messages['shop.common.cancel'],
    );
    expect(Alert.alert.mock.calls[0][2][1].text).toBe(
      messages['shop.common.ok'],
    );
    Alert.alert.mock.calls[0][2][1].onPress();
    await flushMicrotasksQueue();
    expect(api.deleteDeliveryAddress).toBeCalled();
  });

  it('should navigate to edit screen  properly', async () => {
    const Comp = renderForTest(<AddressItem {...props} />);
    const buttonEdit = Comp.queryAllByType(TrackedButton)[0];
    fireEvent.press(buttonEdit);
    expect(props.navigation.navigate).toBeCalledWith(SHOP_EDIT_ADDRESS_SCREEN, {
      addressId: 'id',
    });
  });
});
