import React from 'react';
import { renderForTest } from '@testUtils';
import CartEmpty from '../CartEmpty';
import messages from '@shops/locales/en-HK.json';
import { fireEvent } from 'react-native-testing-library';
import { TrackedButton, Image } from '@shops/wrappers/components';
import { cartEmpty } from '@shops/assets/images';

describe('CartEmpty', () => {
  it('should render properly', () => {
    const navigation = jest.fn();
    const Comp = renderForTest(<CartEmpty navigation={navigation} />);
    expect(Comp.queryByText(messages['shop.cart.cartEmptyTitle'])).toBeTruthy();
    expect(Comp.queryByText(messages['shop.cart.cartEmptyDesc'])).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.cart.continueShopping']),
    ).toBeTruthy();
    expect(Comp.queryByType(TrackedButton)).toBeTruthy();
    const imageComp = Comp.queryByType(Image);
    expect(imageComp).toBeTruthy();
    expect(imageComp.props.source).toEqual(cartEmpty);
  });
  it('should handle Press Properly', () => {
    const navigation = {
      goBack: jest.fn(),
    };
    const Comp = renderForTest(<CartEmpty navigation={navigation} />);
    const Button = Comp.getByType(TrackedButton);
    fireEvent.press(Button);
    expect(navigation.goBack).toBeCalled();
  });
});
