import { renderForTest } from '@testUtils';
import MoreDetails from '@shops/screens/home/ProductDetailsScreen/MoreDetails/MoreDetails';
import React from 'react';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import Accordion from 'react-native-collapsible/Accordion';
import moment from 'moment';
import navigation from '@testUtils/__mocks__/navigation';
import { Button } from '@shops/wrappers/components';
import { Icon } from 'react-native-elements';
import { SHOP_REVIEW_SCREEN } from '@shops/navigation/routes';
import { RatingStars } from '@shops/components';
import { DATE_FORMAT_SHORT } from '@shops/utils/constant';
import { GET_REVIEW, PRODUCT } from '@shops/__mocks__/data';

const reviewsWith4Items = [
  {
    id: 8,
    title: 'Bob thinks product makes bob happy',
    detail: 'dfsdfsdfds',
    nickName: 'Bob Jones',
    ratings: [
      { percent: 80, ratingCode: 'Overall ratings' },
      { percent: 80, ratingCode: 'Product/Service quality' },
      { percent: 80, ratingCode: 'Purchase experience' },
      { percent: 80, ratingCode: 'Redemption experience' },
    ],
    reviewDate: '2020-04-24T07:29:31',
  },
  {
    id: 7,
    title: 'Good product',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    nickName: 'Simba',
    ratings: [
      { percent: 100, ratingCode: 'Overall ratings' },
      { percent: 80, ratingCode: 'Purchase experience' },
      { percent: 60, ratingCode: 'Product/Service quality' },
    ],
    reviewDate: '2020-04-25T00:44:34',
  },

  {
    id: 6,
    title: 'Good product 1',
    detail:
      'Lorem ipsum 1 dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    nickName: 'Simba1',
    ratings: [
      { percent: 90, ratingCode: 'Overall ratings' },
      { percent: 70, ratingCode: 'Purchase experience' },
      { percent: 50, ratingCode: 'Product/Service quality' },
    ],
    reviewDate: '2020-04-23T00:44:34',
  },

  {
    id: 5,
    title: 'Jones thinks product makes bob happy',
    detail: 'dfsdfsdfds',
    nickName: 'Jones Jones',
    ratings: [
      { percent: 80, ratingCode: 'Overall ratings' },
      { percent: 80, ratingCode: 'Product/Service quality' },
      { percent: 80, ratingCode: 'Purchase experience' },
      { percent: 80, ratingCode: 'Redemption experience' },
    ],
    reviewDate: '2020-04-22T07:29:31',
  },
];

const api = {
  getReviews: jest.fn(() => Promise.resolve({ data: GET_REVIEW })),
};

describe('MoreDetails', () => {
  it('should open section in accordion properly', async () => {
    const moreDetailsScreen = renderForTest(<MoreDetails product={PRODUCT} />);
    const accordion = moreDetailsScreen.getByType(Accordion);
    fireEvent(accordion, 'change', [2]);
    await flushMicrotasksQueue();
    const icons = moreDetailsScreen.getAllByType(Icon);
    expect(icons[0].props.name).toEqual('expand-more');
    expect(icons[icons.length - 1].props.name).toEqual('expand-less');
    fireEvent(accordion, 'change', [0]);
    await flushMicrotasksQueue();
    expect(icons[0].props.name).toEqual('expand-less');
    expect(icons[icons.length - 1].props.name).toEqual('expand-more');
  });

  it('should have reviews when getReviews return data', async () => {
    const moreDetailsScreen = renderForTest(<MoreDetails product={PRODUCT} />, {
      api,
    });
    await flushMicrotasksQueue();
    const reviewTitle1 = moreDetailsScreen.getByText(GET_REVIEW[0].title);
    const reviewDetails1 = moreDetailsScreen.getByText(GET_REVIEW[0].detail);
    const reviewDate = moreDetailsScreen.getByText(
      moment(GET_REVIEW[0].reviewDate).format(DATE_FORMAT_SHORT),
    );

    expect(reviewTitle1).toBeDefined();
    expect(reviewDetails1).toBeDefined();
    expect(reviewDate).toBeDefined();
  });

  it('should have reviews only 2 when getReviews return data more than 2', async () => {
    const api = {
      getReviews: jest.fn(() => Promise.resolve({ data: reviewsWith4Items })),
    };
    const moreDetailsScreen = renderForTest(<MoreDetails product={PRODUCT} />, {
      api,
    });
    await flushMicrotasksQueue();
    const ratingStars = moreDetailsScreen.getAllByType(RatingStars);
    expect(ratingStars.length).toBe(3); //one default is in header
  });

  it('should navigate to ReviewScreen when click Button', async () => {
    const moreDetailsScreen = renderForTest(
      <MoreDetails product={PRODUCT} navigation={navigation} />,
      { api },
    );
    await flushMicrotasksQueue();
    const button = moreDetailsScreen.getByType(Button);
    fireEvent.press(button);
    expect(navigation.navigate).toHaveBeenCalledWith(SHOP_REVIEW_SCREEN, {
      productSku: PRODUCT.sku,
      reviews: GET_REVIEW,
    });
  });
});
