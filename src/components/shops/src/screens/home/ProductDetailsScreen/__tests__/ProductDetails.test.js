import React from 'react';
import ProductDetails from '../ProductDetails';
import { renderForTest } from '@testUtils';
import { PRODUCT } from '@shops/__mocks__/data';
import ImageSlider from '../ImageSlider';


const initialState = {
  shop: { config: { currency: { defaultCurrencySymbol: '$SG' } } },
};

describe('ProductDetails', () => {
  it('should render correctly', () => {
    const productDetails = renderForTest(<ProductDetails product={PRODUCT} />, {
      initialState,
    });

    const productName = productDetails.getByText(PRODUCT.name);
    const imageSlider = productDetails.getByType(ImageSlider);
    const description = productDetails.getByText(PRODUCT.shortDescription);

    expect(productName).toBeDefined();
    expect(imageSlider.props.images.length).toEqual( PRODUCT.images.length);
    expect(description).toBeDefined();
  });

  it('should show special price when product have it', () => {
    const productHaveDiscountPercent = { ...PRODUCT };
    productHaveDiscountPercent.discountPercent = 20;
    const productDetails = renderForTest(
      <ProductDetails product={productHaveDiscountPercent} />,
      {
        initialState,
      },
    );

    const productName = productDetails.getByText(PRODUCT.name);
    const imageSlider = productDetails.getByType(ImageSlider);
    const description = productDetails.getByText(PRODUCT.shortDescription);

    expect(productName).toBeDefined();
    expect(imageSlider.props.images.length).toEqual( PRODUCT.images.length);
    expect(description).toBeDefined();
  });
});
