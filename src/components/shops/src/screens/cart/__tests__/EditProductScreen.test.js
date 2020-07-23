import React from 'react';
import { renderForTest } from '@testUtils';
import EditProductScreen from '../EditProductScreen';
import messages from '@shops/locales/en-HK.json';
import {
  fireEvent,
  flushMicrotasksQueue,
  act,
} from 'react-native-testing-library';
import { TrackedButton } from '@shops/wrappers/components';
import { CART, PRODUCT } from '@shops/__mocks__/data';
import {
  BorderInput,
  DeliverySelfCollection,
  QuantityButton,
  SnackBar,
} from '@shops/components';
import { DELIVERY_TYPE } from '@shops/utils/constant';
import { AddToCartSnackView } from '@shops/screens/home/ProductDetailsScreen/AddToCartSnackView';
import { SHOP_CART_SCREEN } from '@shops/navigation/routes';

const initialState = {
  shop: {
    home: {
      productMap: {
        Product_01: PRODUCT,
      },
    },
    cart: CART,
  },
  user: {
    clientId: 'clientId',
    userId: '1',
  },
};
const route = {
  params: { productSku: 'Product_01' },
  onUpdateFinish: jest.fn(),
};

describe('EditProductScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render properly', () => {
    const Comp = renderForTest(<EditProductScreen route={route} />, {
      initialState,
    });
    expect(Comp.queryByText(messages['shop.product.quantity'])).toBeTruthy();
    expect(Comp.queryByText(messages['shop.common.apply'])).toBeTruthy();
    expect(Comp.queryByText('-')).toBeTruthy();
    expect(Comp.queryByText('+')).toBeTruthy();
  });
  it('should call product when not found product in productMap ', async () => {
    const api = {
      getProductBySku: jest.fn(() => Promise.resolve({ data: {} })),
    };
    const initialState = {
      shop: {
        home: {
          productMap: {},
        },
        cart: CART,
      },
      user: {
        clientId: 'clientId',
        userId: '1',
      },
    };
    renderForTest(<EditProductScreen route={route} />, {
      initialState,
      api,
    });
    await flushMicrotasksQueue();
    expect(api.getProductBySku).toBeCalled();
  });

  it('should decrease quantity properly', async () => {
    const Comp = renderForTest(<EditProductScreen route={route} />, {
      initialState,
    });
    const decreaseButton = Comp.queryAllByType(QuantityButton)[0];
    const borderInput = Comp.queryByType(BorderInput);
    fireEvent.press(decreaseButton);
    await flushMicrotasksQueue();
    expect(borderInput.props.value).toEqual(CART.items[0].quantity - 1);
  });

  it('should not decrease when  quantity is 1', async () => {
    const cart = {
      id: '1933',
      isActive: true,
      isVirtual: false,
      itemsCount: 1,
      itemsQty: 1,
      items: [
        {
          id: 1096,
          sku: 'Product_01',
          quantity: 1,
          name: 'Product 01',
          price: 1000.0,
          type: 'simple',
          thumbnail: {
            id: 0,
            file:
              'https://shop.cxa2dev.com/media/catalog/product/cache/ca48c27989a3d90b22cca42748fce193/4/1/418035916060_1.png',
            position: 0,
          },
        },
      ],
    };
    const initialState = {
      shop: {
        home: {
          productMap: {
            Product_01: PRODUCT,
          },
        },
        cart,
      },
    };
    const Comp = renderForTest(<EditProductScreen route={route} />, {
      initialState,
    });
    const decreaseButton = Comp.queryAllByType(QuantityButton)[0];
    const borderInput = Comp.queryByType(BorderInput);
    fireEvent.press(decreaseButton);
    await flushMicrotasksQueue();
    expect(borderInput.props.value).toEqual(cart.items[0].quantity);
  });

  it('should increase quantity properly', async () => {
    const Comp = renderForTest(<EditProductScreen route={route} />, {
      initialState,
    });
    const increaseButton = Comp.queryAllByType(QuantityButton)[1];
    const borderInput = Comp.queryByType(BorderInput);
    fireEvent.press(increaseButton);
    await flushMicrotasksQueue();
    expect(borderInput.props.value).toEqual(CART.items[0].quantity + 1);
  });

  it('should change value input properly', async () => {
    const Comp = renderForTest(<EditProductScreen route={route} />, {
      initialState,
    });
    const borderInput = Comp.queryByType(BorderInput);
    fireEvent(borderInput, 'changeText', '10');
    await flushMicrotasksQueue();
    expect(borderInput.props.value).toEqual(10);
  });

  it('should return 1 when clear input ', async () => {
    const Comp = renderForTest(<EditProductScreen route={route} />, {
      initialState,
    });
    const borderInput = Comp.queryByType(BorderInput);
    fireEvent(borderInput, 'changeText', '');
    await flushMicrotasksQueue();
    expect(borderInput.props.value).toEqual(1);
  });

  it('should apply change product properly ', async () => {
    const navigation = { navigate: jest.fn() };
    const api = {
      updateCart: jest.fn(() => Promise.resolve({ data: {} })),
      getCartTotals: jest.fn(() => Promise.resolve({ data: {} })),
    };
    const Comp = renderForTest(
      <EditProductScreen route={route} navigation={navigation} />,
      {
        initialState,
        api,
      },
    );
    const button = Comp.queryByType(TrackedButton);
    fireEvent.press(button);
    await flushMicrotasksQueue();
    expect(api.updateCart).toBeCalledWith({
      clientId: 'clientId',
      userId: '1',
      quantity: 2,
      sku: 'Product_01',
      body: {
        deliveryType: 'delivery',
        productType: 'simple',
        redemptionPoint: '',
      },
    });
    expect(api.getCartTotals).toBeCalled();
    expect(navigation.navigate).toBeCalledWith(SHOP_CART_SCREEN);
  });

  it('should render deliveryMethodSelected when it contain in cartItem', async () => {
    const api = {
      updateCart: jest.fn(() => Promise.resolve({ data: {} })),
      getCartTotals: jest.fn(() => Promise.resolve({ data: {} })),
    };
    const initState = {
      ...initialState,
      shop: {
        ...initialState.shop,
        cart: {
          ...CART,
          items: [
            {
              ...CART.items[0],
              deliveryMethodSelected: DELIVERY_TYPE.SELF_COLLECTION,
            },
          ],
        },
      },
    };
    const Comp = renderForTest(<EditProductScreen route={route} />, {
      initialState: initState,
    });
    await flushMicrotasksQueue();
    const deliverySelfCollection = Comp.queryByType(DeliverySelfCollection);
    expect(deliverySelfCollection.props.deliveryType).toEqual(
      DELIVERY_TYPE.SELF_COLLECTION,
    );
    const button = Comp.queryByType(TrackedButton);
    fireEvent.press(button);
    await flushMicrotasksQueue();
    expect(api.updateCart).not.toBeCalled();
  });

  it('should render deliveryMethodSelected when it contain in cartItem', async () => {
    const initState = {
      ...initialState,
      shop: {
        ...initialState.shop,
        cart: {
          ...CART,
          items: [
            {
              ...CART.items[0],
              deliveryMethodSelected: DELIVERY_TYPE.SELF_COLLECTION,
              redemptionPointSelected: '4',
            },
          ],
        },
      },
    };
    const Comp = renderForTest(<EditProductScreen route={route} />, {
      initialState: initState,
    });
    await flushMicrotasksQueue();
    let deliverySelfCollection = Comp.queryByType(DeliverySelfCollection);
    fireEvent(
      deliverySelfCollection,
      'onSelectLocation',
      PRODUCT.redemptionPoint[0],
    );
    await flushMicrotasksQueue();
    deliverySelfCollection = Comp.queryByType(DeliverySelfCollection);
    expect(deliverySelfCollection.props.currentSelected).toEqual(
      PRODUCT.redemptionPoint[0],
    );
  });

  it('should render default redemptionPoint when redemptionPoint length is 1', async () => {
    const initState = {
      ...initialState,
      shop: {
        ...initialState.shop,
        home: {
          productMap: {
            Product_01: {
              ...PRODUCT,
              redemptionPoint: [PRODUCT.redemptionPoint[2]],
            },
          },
        },
      },
    };
    const Comp = renderForTest(<EditProductScreen route={route} />, {
      initialState: initState,
    });
    await flushMicrotasksQueue();
    let deliverySelfCollection = Comp.queryByType(DeliverySelfCollection);
    expect(deliverySelfCollection.props.currentSelected).toEqual(
      PRODUCT.redemptionPoint[2],
    );
  });

  it('should handle error when update cart fail properly', async () => {
    const api = {
      updateCart: jest.fn(() =>
        Promise.reject({
          response: { data: { messageKey: 'InvalidQuantity' } },
        }),
      ),
      getCartTotals: jest.fn(() => Promise.resolve({ data: {} })),
    };
    const initState = {
      ...initialState,
      shop: {
        ...initialState.shop,
        home: {
          productMap: {
            Product_01: PRODUCT,
          },
        },
        cart: {
          ...CART,
          items: [
            {
              ...CART.items[0],
              deliveryMethodSelected: DELIVERY_TYPE.SELF_COLLECTION,
              redemptionPointSelected: '4',
            },
          ],
        },
      },
    };
    const Comp = renderForTest(<EditProductScreen route={route} />, {
      initialState: initState,
      api,
    });
    await flushMicrotasksQueue();
    const button = Comp.queryByType(TrackedButton);
    act(() => {
      fireEvent.press(button);
    });

    await flushMicrotasksQueue();
    expect(api.updateCart).toBeCalledWith({
      clientId: 'clientId',
      userId: '1',
      quantity: 2,
      sku: 'Product_01',
      body: {
        deliveryType: DELIVERY_TYPE.SELF_COLLECTION,
        productType: 'simple',
        redemptionPoint: '4',
      },
    });
    const snackView = Comp.queryByType(AddToCartSnackView);
    fireEvent(snackView, 'onCancelPress');
    await flushMicrotasksQueue();
    const snackBar = Comp.queryByType(SnackBar);
    expect(snackBar.props.visible).toEqual(false);
  });
});
