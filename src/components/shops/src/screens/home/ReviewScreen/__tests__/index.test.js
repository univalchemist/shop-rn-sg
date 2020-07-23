import React from 'react';
import { renderForTest } from '@testUtils';
import ReviewScreen from '../index';
import {  PRODUCT, GET_REVIEW } from '@shops/__mocks__/data';
import { RatingStars } from '@shops/components';

const initialState = {
  shop: {
    home: {
      productMap: {
        Product_01: PRODUCT,
      },
    },
  },
};

const route = {
  params: {
    productSku: 'Product_01',
    reviews: GET_REVIEW,
  },
};

describe('ReviewScreen', () => {
  beforeEach(()=>jest.clearAllMocks())
  it('should render header properly', () => {
    const Comp = renderForTest(<ReviewScreen route={route} />, {
      initialState,
    });
    expect(Comp.queryByText(PRODUCT.name)).toBeTruthy();
    expect(Comp.queryByText(PRODUCT.vendor)).toBeTruthy();
    expect(Comp.queryByText(`(${PRODUCT.ratingsCount})`)).toBeTruthy();
    const ratingHeader = Comp.queryByTestId('ratingHeader');
    expect(ratingHeader.props.rating).toEqual(PRODUCT.averageRating)
  });

  it('should render list items properly', () => {
    const Comp = renderForTest(<ReviewScreen route={route} />, {
      initialState,
    });
    for(let review of GET_REVIEW){
      expect(Comp.queryByText(review.title)).toBeTruthy();
      expect(Comp.queryByText(review.nickName)).toBeTruthy();
      expect(Comp.queryByText(review.detail)).toBeTruthy();
    }
    expect(Comp.queryByText('24-04-2020')).toBeTruthy();
    expect(Comp.queryByText('23-04-2020')).toBeTruthy();
    const ratingStars = Comp.queryAllByType(RatingStars);
    expect(ratingStars[1].props.rating).toEqual(GET_REVIEW[0].ratings);
    expect(ratingStars[2].props.rating).toEqual(GET_REVIEW[1].ratings);
  });
});
