import React from 'react';
import { renderForTest } from '@testUtils';
import {
  AddToCartFailedView,
  AddToCartSuccessView,
  AddToCartSnackView,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILED,
} from '../AddToCartSnackView';
import { TouchableOpacity } from 'react-native';
import messages from '@shops/locales/en-HK.json';
import { fireEvent } from 'react-native-testing-library';
import { Image, Icon } from '@shops/wrappers/components';
import { cart, xmark } from '@shops/assets/icons';

describe('AddToCartSnackView', () => {
  it('should render AddToCartSuccessView properly', () => {
    const onContainerPress = jest.fn();
    const onCancelPress = jest.fn();
    const Comp = renderForTest(
      <AddToCartSnackView
        type={ADD_TO_CART_SUCCESS}
        quantity={1}
        onCancelPress={onCancelPress}
        onContainerPress={onContainerPress}
      />,
    );
    const successView = Comp.queryByType(AddToCartSuccessView);
    expect(successView).toBeTruthy();
    expect(Comp.queryByType(AddToCartFailedView)).toBeNull();

    expect(successView.props.quantity).toEqual(1);
    fireEvent(successView, 'cancelPress');
    expect(onCancelPress).toHaveBeenCalledTimes(1);
    const containerTouchable = Comp.queryByType(TouchableOpacity);
    fireEvent.press(containerTouchable);
    expect(onContainerPress).toHaveBeenCalledTimes(1);
  });

  it('should render AddToCartSuccessFailed properly', () => {
    const Comp = renderForTest(
      <AddToCartSnackView type={ADD_TO_CART_FAILED} />,
    );

    expect(Comp.queryByType(AddToCartSuccessView)).toBeNull();
    expect(Comp.queryByType(AddToCartFailedView)).toBeTruthy();
  });

  it('should return  null when type is not define', () => {
    const Comp = renderForTest(<AddToCartSnackView />);

    expect(Comp.queryByType(AddToCartSuccessView)).toBeNull();
    expect(Comp.queryByType(AddToCartFailedView)).toBeNull();
  });

  it('AddToCartSuccessView render properly', () => {
    const onCancelPress = jest.fn();
    const Comp = renderForTest(
      <AddToCartSuccessView
        type={ADD_TO_CART_SUCCESS}
        quantity={1}
        onCancelPress={onCancelPress}
      />,
    );
    const images = Comp.queryAllByType(Image);
    expect(images[0].props.source).toEqual(cart);
    expect(images[1].props.source).toEqual(xmark);
    expect(Comp.queryByText('1 items added to cart.')).toBeTruthy();
    const button = Comp.queryByType(TouchableOpacity);
    fireEvent.press(button);
    expect(onCancelPress).toBeCalledTimes(1);
  });

  it('AddToCartFailedView render properly', () => {
    const onCancelPress = jest.fn();
    const Comp = renderForTest(
      <AddToCartFailedView onCancelPress={onCancelPress} />,
    );

    const icons = Comp.queryAllByType(Icon);
    expect(icons[0].props.name).toEqual('error-outline');
    expect(icons[1].props.name).toEqual('clear');
    expect(
      Comp.queryByText(messages['shop.product.snackBarMessageFailed']),
    ).toBeTruthy();
    const button = Comp.queryByType(TouchableOpacity);
    fireEvent.press(button);
    expect(onCancelPress).toBeCalledTimes(1);
  });
});
