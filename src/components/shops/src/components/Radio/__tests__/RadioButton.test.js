import React from 'react';
import { renderForTest } from '@testUtils';
import RadioButton from '../RadioButton';
import { TouchableWithoutFeedback } from 'react-native';
import { fireEvent } from 'react-native-testing-library';

describe('RadioButton', () => {
  it('should render properly', () => {
    const onChange = jest.fn();
    const Comp = renderForTest(
      <RadioButton checked={true} text={'text'} onChange={onChange} value={1} />,
    );
    expect(Comp.queryByTestId('checked')).toBeTruthy();
    expect(Comp.queryByText('text')).toBeTruthy();
    const button = Comp.queryByType(TouchableWithoutFeedback);
    fireEvent.press(button);
    expect(onChange).toBeCalledWith(1);
  });
});
