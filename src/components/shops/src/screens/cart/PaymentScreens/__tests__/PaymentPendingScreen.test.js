import React from 'react';
import { renderForTest } from '@testUtils';
import PaymentPendingScreen from '../PaymentPendingScreen';
import messages from '@shops/locales/en-HK.json';
import { fireEvent } from 'react-native-testing-library';
import { Button, Image } from '@shops/wrappers/components';
import {
  NAVIGATION_HOME_SCREEN_PATH,
  ORDER_HISTORY_SCREEN,
} from '@shops/navigation/routes';
import { error } from '@shops/assets/images';

describe('PaymentPendingScreen', () => {
  it('should render properly', () => {
    const { queryByText, queryByType } = renderForTest(
      <PaymentPendingScreen />,
    );
    const image = queryByType(Image);
    expect(image.props.source).toEqual(error);
    expect(queryByText(messages['shop.paymentPending.title'])).toBeTruthy();
    expect(queryByText(messages['shop.paymentPending.info'])).toBeTruthy();
    expect(
      queryByText(messages['shop.paymentSuccess.btnContinue']),
    ).toBeTruthy();
    expect(
      queryByText(messages['shop.paymentSuccess.btnViewOrder']),
    ).toBeTruthy();
  });

  it('button should works properly', () => {
    const navigation = {
      navigate: jest.fn(),
      popToTop: jest.fn(),
    };
    const { queryAllByType } = renderForTest(
      <PaymentPendingScreen navigation={navigation} />,
    );
    const buttons = queryAllByType(Button);
    fireEvent.press(buttons[0]);
    expect(navigation.navigate).toBeCalledWith(NAVIGATION_HOME_SCREEN_PATH);
    fireEvent.press(buttons[1]);
    expect(navigation.navigate).toBeCalledWith(ORDER_HISTORY_SCREEN);
  });
});
