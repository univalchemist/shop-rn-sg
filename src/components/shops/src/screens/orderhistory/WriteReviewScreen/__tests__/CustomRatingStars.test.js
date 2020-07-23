import React from 'react';
import { renderForTest } from '@testUtils';
import CustomRatingStars, { areEqual } from '../CustomRatingStars';
import { fireEvent } from 'react-native-testing-library';
import { Icon } from '@shops/wrappers/components';
import { TouchableOpacity } from 'react-native';
import { REVIEW_FORM } from '@shops/__mocks__/data';

describe('CustomRatingStars', () => {
  it('should render properly', () => {
    const Comp = renderForTest(
      <CustomRatingStars
        options={REVIEW_FORM.ratings['overall_ratings-1'].options}
        currentRating={4}
      />,
    );
    const icons = Comp.queryAllByType(Icon);
    expect(icons.length).toEqual(5);
    let fillStar = 0,
      emptyStar = 0;
    for (let icon of icons) {
      if (icon.props.name === 'star') {
        fillStar++;
      } else if (icon.props.name === 'star-border') {
        emptyStar++;
      }
    }
    expect(fillStar).toEqual(4);
    expect(emptyStar).toEqual(1);
  });

  it('should render properly when no options', () => {
    const Comp = renderForTest(
      <CustomRatingStars
        currentRating={4}
      />,
    );
    const icons = Comp.queryAllByType(Icon);
    expect(icons.length).toEqual(0);

  });

  it('onPress should  work properly', () => {
    const onPress = jest.fn();
    const Comp = renderForTest(
      <CustomRatingStars
        options={REVIEW_FORM.ratings['overall_ratings-1'].options}
        currentRating={4}
        onPress={onPress}
      />,
    );
    const buttons = Comp.queryAllByType(TouchableOpacity);
    fireEvent.press(buttons[3]);
    expect(onPress).toBeCalledWith(4);
  });

  it('areEqual should work properly',()=>{
    const prevProps={currentRating:0,enable:false};
    const nextProps={currentRating:1,enable:false};
    expect(areEqual(prevProps,nextProps)).toEqual(false)

    const prevProps1={currentRating:1,enable:true};
    const nextProps1={currentRating:1,enable:false};
    expect(areEqual(prevProps1,nextProps1)).toEqual(false)
  })
});
