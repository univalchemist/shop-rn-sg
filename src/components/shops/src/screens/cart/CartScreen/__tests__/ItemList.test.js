import React from 'react';
import { renderForTest } from '@testUtils';
import ItemList from '../ItemList';
import { CART } from '@shops/__mocks__/data';
import { OFFER_TYPE } from '@shops/utils/constant';
import { CartItem } from '@shops/screens/cart/CartScreen/CartItem';

const initialState = {
  shop: {
    cart: CART,
  },
};
const props = {
  navigation: {
    navigate: jest.fn(),
  },
  title: 'title',
};

describe('ItemList', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should render properly', () => {
    const Comp = renderForTest(
      <ItemList offerType={OFFER_TYPE.DELIVERABLE} {...props} />,
      { initialState },
    );
    expect(Comp.queryAllByType(CartItem)).toHaveLength(1);
    expect(Comp.queryByText('title')).toBeTruthy();
  });

  it('should render null when no item', () => {
    const initialState = {
      shop: {
        cart: {
          items: [],
        },
      },
    };
    const Comp = renderForTest(
      <ItemList offerType={OFFER_TYPE.DELIVERABLE} {...props} />,
      { initialState },
    );
    expect(Comp.queryByType(CartItem)).toBeNull();
    expect(Comp.queryByText('title')).toBeNull();
  });
});
