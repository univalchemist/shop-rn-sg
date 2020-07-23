import * as React from 'react';
import { renderForTest } from '@testUtils';
import WriteReviewScreen from '../index';
import { BackButton } from '@shops/components';
import {
  InputField,
  TextAreaField,
  CheckBox,
  TrackedButton,
} from '@shops/wrappers/components';
import {
  fireEvent,
  flushMicrotasksQueue,
} from 'react-native-testing-library';
import { REVIEW_SUBMITTED_SCREEN } from '@shops/navigation/routes';
import { REVIEW_FORM } from '@shops/__mocks__/data';
import CustomRatingStars from '../CustomRatingStars';

const route = {
  params: {
    boughtProduct: {
      name: 'Product name',
      vendor: 'Product vendor',
    },
  },
};

const api = {
  getReviewForm: jest.fn(() => Promise.resolve({ data: REVIEW_FORM })),
  postReview: jest.fn(() => Promise.resolve({ data: {} })),
};

describe('WriteReviewScreen', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should render properly', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const Comp = renderForTest(
      <WriteReviewScreen route={route} navigation={navigation} />,
      { api },
    );
    await flushMicrotasksQueue();
    expect(Comp.queryByType(BackButton)).toBeTruthy();
    expect(Comp.queryAllByType(CustomRatingStars)).toHaveLength(4);
    expect(Comp.queryByText('Write a review')).toBeTruthy();
    expect(Comp.queryByText('Product vendor')).toBeTruthy();
    expect(Comp.queryByText('Ratings')).toBeTruthy();
    const inputFields = Comp.queryAllByType(InputField);
    expect(inputFields[0].props.label).toEqual('Name');
    expect(inputFields[0].props.hint).toEqual('Optional');
    expect(inputFields[1].props.label).toEqual('Headline');
    expect(inputFields[1].props.hint).toEqual('Optional');
    const textAreaField = Comp.queryByType(TextAreaField);
    expect(textAreaField.props.label).toEqual('Write your review');
    expect(textAreaField.props.hint).toEqual('Optional');
    expect(
      Comp.queryByText(
        'I understand that accept to be contacted by respective vendor in case further clarification regarding your commented/review is needed.',
      ),
    ).toBeTruthy();
    expect(Comp.queryByType(CheckBox)).toBeTruthy();

    const button = Comp.queryByType(TrackedButton);
    expect(button.props.title).toBe('Submit');
    fireEvent.press(button);

    await flushMicrotasksQueue();
    expect(navigation.navigate).toBeCalledWith(REVIEW_SUBMITTED_SCREEN);
  });

  it('should have rating change  properly', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const Comp = renderForTest(
      <WriteReviewScreen route={route} navigation={navigation} />,
      { api },
    );
    await flushMicrotasksQueue();
    const ratingSection = Comp.queryAllByType(CustomRatingStars);
    fireEvent(ratingSection[1], 'press', 8);
    const button = Comp.queryByType(TrackedButton);
    fireEvent.press(button);
    await flushMicrotasksQueue();
    expect(api.postReview).toBeCalledTimes(1);
  });

  it('should have checkbox work properly', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const Comp = renderForTest(
      <WriteReviewScreen route={route} navigation={navigation} />,
      { api },
    );
    await flushMicrotasksQueue();
    const checkbox = Comp.queryByType(CheckBox);
    fireEvent.press(checkbox);
    await flushMicrotasksQueue();

    const button = Comp.queryByType(TrackedButton);

    expect(button.props.disabled).toEqual(false);
  });
});
