import React from 'react';
import { renderForTest } from '@testUtils';
import ClearAllButton from '../ClearAllButton';
import { TouchableOpacity } from 'react-native';
import { fireEvent } from 'react-native-testing-library';

describe('ClearAllButton', () => {
  it('should render properly', () => {
    const onPress = jest.fn();
    const navigation = {
      goBack: jest.fn(),
    };
    const Comp = renderForTest(
      <ClearAllButton
        text={'clear'}
        onPress={onPress}
        navigation={navigation}
      />,
    );

    expect(Comp.queryByText('clear')).toBeTruthy();
    const button = Comp.queryByType(TouchableOpacity);
    fireEvent.press(button);
    expect(onPress).toBeCalled();
    expect(navigation.goBack).toBeCalled();

  });
});
