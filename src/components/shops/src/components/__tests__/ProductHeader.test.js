import React from 'react';
import { renderForTest } from '@testUtils';
import ProductHeader, { BeforeDiscountPriceText } from '../ProductHeader';
import messages from '@shops/locales/en-HK.json';
import { PRODUCT } from '@shops/__mocks__/data';
import { Text } from '@shops/wrappers/components';

const initialState = {
  shop: {
    config: {
      currency: {
        defaultCurrencySymbol: '$SG',
      },
    },
  },
};

describe('ProductHeader', () => {
  it('should render properly', () => {
    const Comp = renderForTest(<ProductHeader product={PRODUCT} />, {
      initialState,
    });
    expect(Comp.queryByText(PRODUCT.name)).toBeTruthy();
    expect(Comp.queryByText(PRODUCT.vendor)).toBeTruthy();
    expect(
      Comp.queryByText(
        PRODUCT.discountPercent + '% ' + messages['shop.common.off'],
      ),
    ).toBeTruthy();
    expect(Comp.queryByText('$SG 1,000.00')).toBeTruthy();
    expect(Comp.queryByText('$SG 800.00')).toBeTruthy();
  });

  it('should render properly when no discount', () => {
    const noDiscount = { ...PRODUCT, finalPrice: 1000.0, discountPercent: 0.0 };
    const Comp = renderForTest(<ProductHeader product={noDiscount} />, {
      initialState,
    });
    expect(
      Comp.queryByText(
        PRODUCT.discountPercent + '% ' + messages['shop.common.off'],
      ),
    ).toBeNull();
    expect(Comp.queryByType(BeforeDiscountPriceText)).toBeNull();
  });

  it('should not crash when no product pass', () => {
    const Comp = renderForTest(<ProductHeader />, {
      initialState,
    });

    expect(Comp.queryAllByType(Text)).toBeTruthy();
  });
});
