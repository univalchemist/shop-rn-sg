import React from 'react';
import { renderForTest } from '@testUtils';
import PaymentSuccessScreen from '../PaymentSuccessScreen';
import messages from '@shops/locales/en-HK.json';
import { fireEvent } from 'react-native-testing-library';
import { Button, Image } from '@shops/wrappers/components';
import { NAVIGATION_HOME_SCREEN_PATH, ORDER_HISTORY_SCREEN } from '@shops/navigation/routes';
import { balloon } from '@shops/assets/images';

const route = {
  params: {
    order: {
      orderIdText: 'CXA01',
    },
  },
};
describe('PaymentSuccessScreen', () => {
  it('should render properly', () => {
    const { queryByText, queryByType } = renderForTest(
      <PaymentSuccessScreen route={route}  />,
    );
    const image = queryByType(Image);
    expect(image.props.source).toEqual(balloon);
    expect(queryByText(messages['shop.paymentSuccess.title'])).toBeTruthy();
    expect(queryByText(`Order number <${route.params.order.orderIdText}>`));
    expect(queryByText(messages['shop.paymentSuccess.thankMessage'])).toBeTruthy();
    expect(queryByText(messages['shop.paymentSuccess.btnContinue'])).toBeTruthy();
    expect(queryByText(messages['shop.paymentSuccess.btnViewOrder'])).toBeTruthy();
  });
  it('buttons should behave correctly',()=>{
    const navigation = {
      navigate: jest.fn(),
      popToTop:jest.fn(),
    };
    const {  queryAllByType } = renderForTest(
      <PaymentSuccessScreen route={route} navigation={navigation} />,
    );
    const buttons=queryAllByType(Button);
    const btnContinue=buttons[0];
    fireEvent.press(btnContinue);
    expect(navigation.navigate).toBeCalledWith(NAVIGATION_HOME_SCREEN_PATH)

    const btnViewOrder=buttons[1];
    fireEvent.press(btnViewOrder);
    expect(navigation.popToTop).toBeCalled()
    expect(navigation.navigate).toBeCalledWith(ORDER_HISTORY_SCREEN)
  })
});
