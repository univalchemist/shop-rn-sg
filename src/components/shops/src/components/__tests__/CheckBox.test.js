import React from 'react';
import { renderForTest } from '@testUtils';
import CheckBox from '../CheckBox';
import { CheckBox as RNCheckBox } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native';
import { fireEvent } from 'react-native-testing-library';
import { Image } from '@shops/wrappers/components';
import { checkboxActive, checkboxInactive } from '@shops/assets/icons';

describe('CheckBox', () => {
  it('should render properly', () => {
    const onPress = jest.fn();
    const Comp = renderForTest(<CheckBox onPress={onPress} label={'label'} />);
    expect(Comp.queryByText('label')).toBeTruthy();
    const container = Comp.queryByType(TouchableWithoutFeedback);
    fireEvent.press(container);
    expect(onPress).toBeCalled();
    const rnCheckBox = Comp.queryByType(RNCheckBox);
    fireEvent.press(rnCheckBox);
    expect(onPress).toHaveBeenCalledTimes(2);
  });
  it('should render active image when checkbox is active', () => {
    const Comp = renderForTest(<CheckBox checked={true} />);
    const image = Comp.queryByType(Image);
    expect(image.props.source).toEqual(checkboxActive);
  });

  it('should render inactive image when checkbox is active', () => {
    const Comp = renderForTest(<CheckBox checked={false} />);
    const image = Comp.queryByType(Image);
    expect(image.props.source).toEqual(checkboxInactive);
  });
});
