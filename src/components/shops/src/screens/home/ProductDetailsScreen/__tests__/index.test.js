import React from 'react';
import { renderForTest } from '@testUtils';
import ProductDetailsScreen from '../index';
import ProductDetails from '../ProductDetails';
import { MoreDetail } from '../MoreDetails/MoreDetails';
import { AddCartButton } from '@shops/components/AddCartButton';
import CustomOrder from '../CustomOrder';
import navigation from '@testUtils/__mocks__/navigation';
import { BackButton, SnackBar, Spinner } from '@shops/components';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import { AddToCartSnackView } from '@shops/screens/home/ProductDetailsScreen/AddToCartSnackView';
import { SHOP_CART_SCREEN } from '@shops/navigation/routes';
import { PRODUCT } from '@shops/__mocks__/data';
import { DELIVERY_TYPE } from '@shops/utils/constant';

const initialState = {
  shop: {
    home: {
      productMap: {
        Product_01: PRODUCT,
      },
    },
    config: {
      currency: {
        defaultCurrencySymbol: '$SG',
      },
    },
    route: {
      params: {
        productSku: 'Product_01',
      },
    },
  },
};

const route = {
  params: {
    productSku: 'Product_01',
  },
};

jest.useRealTimers();

describe('ProductDetailsScreen', () => {
  it('should render properly', async () => {
    const screen = renderForTest(
      <ProductDetailsScreen navigation={navigation} route={route} />,
      { initialState },
    );
    const backButton = screen.getByType(BackButton);
    const productDetails = screen.getByType(ProductDetails);
    const moreDetails = screen.getByType(MoreDetail);
    let customOrder = screen.getByType(CustomOrder);
    const addToCartButton = screen.getByType(AddCartButton);
    expect(backButton).toBeDefined();
    expect(productDetails).toBeDefined();
    expect(moreDetails).toBeDefined();
    expect(customOrder).toBeDefined();
    expect(addToCartButton).toBeDefined();

    fireEvent(customOrder, 'selectLocation', PRODUCT.redemptionPoint[0]);
    await flushMicrotasksQueue();
    customOrder = screen.getByType(CustomOrder);
    expect(customOrder.props.currentSelected).toEqual(
      PRODUCT.redemptionPoint[0],
    );
  });

  it('should render properly when deliveryType is selfCollection only', async () => {
    const initState = {
      ...initialState,
      shop: {
        home: {
          productMap: {
            Product_01: {
              ...PRODUCT,
              deliveryMethod: DELIVERY_TYPE.SELF_COLLECTION,
            },
          },
        },
      },
    };
    const screen = renderForTest(
      <ProductDetailsScreen navigation={navigation} route={route} />,
      { initialState: initState },
    );

    const customOrder = screen.getByType(CustomOrder);
    await flushMicrotasksQueue();
    expect(customOrder.props.deliveryType).toEqual(
      DELIVERY_TYPE.SELF_COLLECTION,
    );
  });

  it('should show redemptionPoint when redemptionPoint arr length is 1 ', async () => {
    const initState = {
      ...initialState,
      shop: {
        home: {
          productMap: {
            Product_01: {
              ...PRODUCT,
              deliveryMethod: DELIVERY_TYPE.SELF_COLLECTION,
              redemptionPoint: [
                {
                  redemptId: '3',
                  redemptValue: '1965, Wilson StreetSan Diego',
                },
              ],
            },
          },
        },
      },
    };
    const screen = renderForTest(
      <ProductDetailsScreen navigation={navigation} route={route} />,
      { initialState: initState },
    );

    const customOrder = screen.getByType(CustomOrder);
    await flushMicrotasksQueue();
    expect(customOrder.props.currentSelected).toEqual(
      {
        redemptId: '3',
        redemptValue: '1965, Wilson StreetSan Diego',
      }
    );
  });

  it('should show Spinner when storeMap doesnt have productSku passed', () => {
    const route = {
      params: {
        productSku: 'Product_02',
      },
    };
    const screen = renderForTest(
      <ProductDetailsScreen navigation={navigation} route={route} />,
      { initialState },
    );
    const spinner = screen.getByType(Spinner);
    expect(spinner).toBeDefined();
  });

  it('SnackBar should behave properly', async () => {
    const screen = renderForTest(
      <ProductDetailsScreen navigation={navigation} route={route} />,
      { initialState },
    );
    const snackBar = screen.getByType(SnackBar);
    fireEvent(snackBar, 'snackBarHided');
    await flushMicrotasksQueue();
    expect(snackBar.props.visible).toBe(false);

    const snackView = screen.getByType(AddToCartSnackView);
    fireEvent(snackView, 'cancelPress');
    await flushMicrotasksQueue();
    expect(snackBar.props.visible).toBe(false);
    fireEvent(snackView, 'containerPress');
    expect(navigation.navigate).toBeCalledWith(SHOP_CART_SCREEN);
  });

  it('Add to Cart should behave correctly', async () => {
    const screen = renderForTest(
      <ProductDetailsScreen navigation={navigation} route={route} />,
      { initialState },
    );
    await flushMicrotasksQueue();
    const snackBar = screen.getByType(SnackBar);
    const addCartButton = screen.getByType(AddCartButton);
    fireEvent(addCartButton, 'addToCartSuccess');
    await flushMicrotasksQueue();
    fireEvent(addCartButton, 'addToCartFailed');
    await flushMicrotasksQueue();
    expect(snackBar.props.visible).toBe(false);
  });
});
