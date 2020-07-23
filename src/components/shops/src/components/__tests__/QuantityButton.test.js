import React from 'react';
import { renderForTest } from '@testUtils';
import QuantityButton from '../QuantityButton';
import { Text } from '@shops/wrappers/components';
import { TouchableOpacity } from 'react-native';
import { fireEvent } from 'react-native-testing-library';

describe('QuantityButton', () => {
  it('should render properly', () => {
    const onPress = jest.fn();
    const Comp = renderForTest(<QuantityButton text={'-'} onPress={onPress} />);

    expect(Comp.queryByType(Text)).toBeTruthy();
    expect(Comp.queryByText('-')).toBeTruthy();
    const button = Comp.queryByType(TouchableOpacity);
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(onPress).toBeCalled();
  });
});
