import React from 'react';
import { renderForTest } from '@testUtils';
import CartItem from '../CartItem';
import messages from '@shops/locales/en-HK.json';
import { Alert, TouchableOpacity } from 'react-native';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import { Image } from '@shops/wrappers/components';
import { icEdit, icDelete } from '@shops/assets/icons';
import FastImage from '@shops/components/FastImage';
import { SHOP_EDIT_PRODUCT_SCREEN } from '@shops/navigation/routes';
jest.mock('react-native/Libraries/Alert/Alert', () => ({ alert: jest.fn() }));

describe('CartItem', () => {
  it('should render properly', () => {
    const cartData = {
      thumbnail: {
        file: 'thumbnail',
      },
      quantity: 1,
    };
    const Comp = renderForTest(
      <CartItem quantity={cartData.quantity} thumbnail={cartData.thumbnail} />,
    );
    expect(
      Comp.queryByText(
        messages['shop.common.quantity'] + ': ' + cartData.quantity,
      ),
    ).toBeTruthy();
    const icons = Comp.queryAllByType(Image);
    expect(icons[0].props.source).toEqual(icEdit);
    expect(icons[1].props.source).toEqual(icDelete);
    const imageThumbnail = Comp.queryByType(FastImage);
    expect(imageThumbnail.props.source).toEqual({
      uri: cartData.thumbnail.file,
    });
  });

  it('should button edit cart behave properly', () => {
    const navigate = jest.fn();
    const Comp = renderForTest(<CartItem navigate={navigate} sku={'1'} />);
    const buttons = Comp.queryAllByType(TouchableOpacity);

    fireEvent.press(buttons[0]);
    expect(navigate).toBeCalledWith(SHOP_EDIT_PRODUCT_SCREEN, {
      productSku: '1',
      onUpdateFinish:expect.any(Function)
    });
  });

  it('should button delete cart behave properly', async () => {
    const navigate = jest.fn();
    const api = {
      removeItemFromCart: jest.fn(() => Promise.resolve({ data: {} })),
      getCartTotals: jest.fn(() => Promise.resolve()),
    };
    const Comp = renderForTest(<CartItem navigate={navigate} sku={'1'} />, {
      api,
    });
    const buttons = Comp.queryAllByType(TouchableOpacity);

    fireEvent.press(buttons[1]);
    expect(Alert.alert).toHaveBeenCalledTimes(1);

    expect(Alert.alert.mock.calls[0][0]).toBe(
      messages['shop.cartItem.removeItemDialogTitle'],
    );
    expect(Alert.alert.mock.calls[0][1]).toBe(
      'Just double-checking you wanted to remove the item ',
    );
    expect(Alert.alert.mock.calls[0][2][0].text).toBe(
      messages['shop.common.cancel'],
    );
    expect(Alert.alert.mock.calls[0][2][1].text).toBe(
      messages['shop.common.ok'],
    );
    Alert.alert.mock.calls[0][2][1].onPress();
    await flushMicrotasksQueue();
    expect(api.removeItemFromCart).toBeCalled();
    expect(api.getCartTotals).toBeCalled();
  });
});
