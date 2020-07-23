import React from 'react';
import { renderForTest } from '@testUtils';
import RatingStars from '../index';
import { fireEvent } from 'react-native-testing-library';
import { Icon } from '@shops/wrappers/components';
import { TouchableOpacity } from 'react-native';

describe('RatingStars', () => {
  it('should render properly by passing number rating', () => {
    const Comp = renderForTest(<RatingStars rating={80} />);
    const stars = Comp.queryAllByType(Icon);
    expect(stars.length).toEqual(5);
    let starFullCount = 0,
      starEmptyCount = 0;
    for (let star of stars) {
      if (star.props.name === 'star') {
        starFullCount++;
      } else if (star.props.name === 'star-border') {
        starEmptyCount++;
      }
    }
    expect(starFullCount).toEqual(4);
    expect(starEmptyCount).toEqual(1);
  });

  it('should render properly by passing array rating', () => {
    const Comp = renderForTest(
      <RatingStars rating={[{ percent: 80 }, { percent: 40 }, 60]} />,
    );
    const stars = Comp.queryAllByType(Icon);
    expect(stars.length).toEqual(5);
    let starFullCount = 0,
      starEmptyCount = 0;
    for (let star of stars) {
      if (star.props.name === 'star') {
        starFullCount++;
      } else if (star.props.name === 'star-border') {
        starEmptyCount++;
      }
    }
    expect(starFullCount).toEqual(2);
    expect(starEmptyCount).toEqual(3);
  });

  it('onPress should works properly', () => {
    const onPress = jest.fn();
    const Comp = renderForTest(
      <RatingStars rating={0} onPress={onPress} index={2} />,
    );
    const buttons = Comp.queryAllByType(TouchableOpacity);
    fireEvent.press(buttons[1]);
    expect(onPress).toBeCalledWith(40, 2);
  });
});
