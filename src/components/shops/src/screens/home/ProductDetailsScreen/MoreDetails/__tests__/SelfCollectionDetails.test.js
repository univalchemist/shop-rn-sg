import React from 'react';
import { renderForTest } from '@testUtils';
import {
  SelfCollectionDetailContent,
  getOfferTypeMap,
} from '../SelfCollectionDetails';
import { PRODUCT } from '@shops/__mocks__/data';
import messages from '@shops/locales/en-HK.json';

describe('SelfCollectionDetails', () => {
  it('should render properly', () => {
    const Comp = renderForTest(<SelfCollectionDetailContent item={PRODUCT} />);
    expect(Comp.queryByText(messages['shop.product.offerType'])).toBeTruthy();
    expect(Comp.queryByText('Deliverable')).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.product.voucherValidityRedemption']),
    ).toBeTruthy();
    expect(Comp.queryByText('30 days')).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.product.promoExpiryDate']),
    ).toBeTruthy();
    expect(Comp.queryByText('Sep 30th, 2020')).toBeTruthy();
  });

  it('getOfferTypeMap should return null when offerType not define', () => {
     expect(getOfferTypeMap(null)).toEqual(null)
  });
});
