import React from 'react';
import { renderForTest } from '@testUtils';
import CartBadge from '../CartBadge';
import { cart } from '@shops/assets/icons';
import { Image } from '@shops/wrappers/components';

describe('CartBadge', () => {
  it('should render properly', () => {
    const initialState = {
      shop: {
        cart: {
          itemsCount: 1,
        },
      },
    };
    const Comp = renderForTest(<CartBadge />, { initialState });
    const image = Comp.queryByType(Image);
    expect(image.props.source).toEqual(cart);
    expect(Comp.queryByTestId('circle')).toBeTruthy();

  });

  it('should not show red dot when no Item ', () => {
    const initialState = {
      shop: {
        cart: {
          itemsCount: 0,
        },
      },
    };
    const Comp = renderForTest(<CartBadge />, { initialState });

    expect(Comp.queryByTestId('circle')).toBeNull();

  });
});
