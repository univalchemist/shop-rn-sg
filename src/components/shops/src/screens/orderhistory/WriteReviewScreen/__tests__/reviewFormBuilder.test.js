import React from 'react';
import { renderForTest } from '@testUtils';
import { reviewFieldBuilder, reviewRatingBuilder } from '../reviewFormBuilder';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import messages from '@shops/locales/en-HK.json';
import CustomRatingStars from '../CustomRatingStars';
import {
  InputField,
  Text,
  TextAreaField,
} from '@shops/wrappers/components';
import { REVIEW_FORM } from '@shops/__mocks__/data';
import { Form } from 'react-final-form';
const intl = {
  formatMessage: jest.fn(({ id }) => {
    return messages[id];
  }),
};

const onSubmit = jest.fn();

describe('reviewFormBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('reviewFieldBuilder', () => {
    it('should return null when no field', () => {
      const comp = reviewFieldBuilder(null);
      expect(comp).toEqual(null);
    });
    it('should render field properly', () => {
      const fields = REVIEW_FORM.fields;

      const Comp = renderForTest(
        <Form
          onSubmit={onSubmit}
          render={() => {
            return <>{reviewFieldBuilder(fields, intl)}</>;
          }}
        />,
      );
      const inputFields = Comp.queryAllByType(InputField);
      expect(inputFields).toHaveLength(2);
      expect(inputFields[0].props.name).toEqual('nickname');
      expect(inputFields[0].props.hint).toEqual('Optional');
      expect(inputFields[0].props.label).toEqual('Name');

      expect(inputFields[1].props.name).toEqual('title');
      expect(inputFields[1].props.hint).toEqual('Optional');
      expect(inputFields[1].props.label).toEqual('Headline');

      const textAreaField = Comp.queryByType(TextAreaField);

      expect(textAreaField.props.name).toEqual('detail');
      expect(textAreaField.props.hint).toEqual('Optional');
      expect(textAreaField.props.label).toEqual('Write your review');
    });
  });

  describe('reviewRatingBuilder', () => {
    it('should return null when no field', () => {
      const comp = reviewRatingBuilder(null);
      expect(comp).toEqual(null);
    });

    it('should render rating properly', async () => {
      const onRatingChange = jest.fn();
      const ratings = REVIEW_FORM.ratings;

      const Comp = renderForTest(
        <>{reviewRatingBuilder(ratings, intl, onRatingChange)}</>,
      );
      await flushMicrotasksQueue();
      const ratingTitles = Comp.queryAllByType(Text);
      expect(ratingTitles).toHaveLength(
        Object.keys(REVIEW_FORM.ratings).length,
      );
      expect(intl.formatMessage).toBeCalledWith({
        id: 'shop.writeReview.overallRating',
        defaultMessage: 'Overall ratings',
      });

      expect(intl.formatMessage).toBeCalledWith({
        id: 'shop.writeReview.productServiceQuality',
        defaultMessage: 'Product/Service quality',
      });
      expect(intl.formatMessage).toBeCalledWith({
        id: 'shop.writeReview.purchaseExperience',
        defaultMessage: 'Purchase experience',
      });

      expect(intl.formatMessage).toBeCalledWith({
        id: 'shop.writeReview.redemptionExperience',
        defaultMessage: 'Redemption experience',
      });

      const ratingStars = Comp.queryAllByType(CustomRatingStars);
      expect(ratingStars).toHaveLength(4);
      fireEvent(ratingStars[1],'press',9);
      expect(onRatingChange).toBeCalledWith('productservice_quality-2',9);
    });
  });
});
