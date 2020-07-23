import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AddToCartButton } from '@shops/components';
import { render } from '@testUtils';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import { DELIVERY_TYPE } from '@shops/utils/constant';

describe('AddCartButton', () => {
  it('should render correctly', () => {
    const api = {
      addToCart: jest.fn(() => Promise.resolve({ data: {} })),
    };
    const [AddCartButtonCom] = render(
      <AddToCartButton quantity={1} sku={'a'} />,
      { api },
    );
    const buttonText = AddCartButtonCom.getByText('Add to cart');
    const button = AddCartButtonCom.getByType(TouchableOpacity);

    fireEvent(button, 'press');
    expect(buttonText).toBeDefined();
  });

  it('should onAddToCartSuccess when addToCart Successs', async () => {
    const api = {
      addToCart: jest.fn(() => Promise.resolve({ data: {} })),
    };
    const onAddToCartSuccess = jest.fn();
    const [AddCartButtonCom] = render(
      <AddToCartButton
        quantity={1}
        sku={'a'}
        onAddToCartSuccess={onAddToCartSuccess}
      />,
      { api },
    );
    const button = AddCartButtonCom.getByType(TouchableOpacity);

    fireEvent(button, 'press');
    await flushMicrotasksQueue();
    expect(onAddToCartSuccess).toBeCalled();
  });

  it('should onAddToCartFailed when addToCart Failed', async () => {
    const api = {
      addToCart: jest.fn(() => Promise.reject({})),
    };
    const onAddToCartFailed = jest.fn();
    const [AddCartButtonCom] = render(
      <AddToCartButton
        quantity={1}
        sku={'a'}
        onAddToCartFailed={onAddToCartFailed}
      />,
      { api },
    );
    const button = AddCartButtonCom.getByType(TouchableOpacity);

    fireEvent(button, 'press');
    await flushMicrotasksQueue();
    expect(onAddToCartFailed).toBeCalled();
  });

  it('should call api when deliveryType equal delivery', async () => {
    const api = {
      addToCart: jest.fn(),
    };
    const [AddCartButtonCom] = render(
      <AddToCartButton
        quantity={1}
        sku={'a'}
        deliveryType={DELIVERY_TYPE.DELIVERY}
      />,
      { api },
    );
    const button = AddCartButtonCom.getByType(TouchableOpacity);

    fireEvent(button, 'press');
    await flushMicrotasksQueue();
    expect(api.addToCart).toBeCalled();
  });

  it('should not call api when validate error', async () => {
    const api = {
      addToCart: jest.fn(),
    };
    const [AddCartButtonCom] = render(
      <AddToCartButton
        quantity={1}
        sku={'a'}
        deliveryType={DELIVERY_TYPE.SELF_COLLECTION}
        redemptionPoint={null}
      />,
      { api },
    );
    const button = AddCartButtonCom.getByType(TouchableOpacity);

    fireEvent(button, 'press');
    await flushMicrotasksQueue();
    expect(api.addToCart).not.toBeCalled();
  });
});
