import React from 'react';
import { renderForTest } from '@testUtils';
import PaymentFailedScreen from '../PaymentFailedScreen';
import messages from '@shops/locales/en-HK.json';
import { fireEvent } from 'react-native-testing-library';
import { Button } from '@shops/wrappers/components';
import { SHOP_CART_SCREEN } from '@shops/navigation/routes';

describe('PaymentFailedScreen', () => {
  it('should render properly', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const { queryByText,queryByType } = renderForTest(
      <PaymentFailedScreen navigation={navigation} />,
    );
    expect(queryByText(messages['shop.paymentFailed.title'])).toBeTruthy();
    expect(queryByText(messages['shop.paymentFailed.info'])).toBeTruthy();
    expect(
      queryByText(messages['shop.paymentFailed.btnReturnToCart']),
    ).toBeTruthy();
    const button =queryByType(Button);
    fireEvent.press(button);
    expect(navigation.navigate).toBeCalledWith(SHOP_CART_SCREEN)
  });
});
