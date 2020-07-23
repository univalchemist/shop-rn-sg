import * as React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import TextArea, { HintText } from '../index';
import { renderForTest } from '@testUtils';
import { fireEvent } from 'react-native-testing-library';
import { Input } from 'react-native-elements';

describe('TextArea', () => {
  it('should render properly', () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const Comp = renderForTest(
      <TextArea
        onBlur={onBlur}
        onFocus={onFocus}
        touched={true}
        error={true}
        label={'label'}
      />,
    );
    const touchableField = Comp.queryByType(TouchableOpacity);
    fireEvent.press(touchableField);
    const input = Comp.queryByType(Input);
    fireEvent(input, 'blur', 1);
    expect(onBlur).toBeCalledWith(1);
    fireEvent(input, 'focus', 1);
    expect(onFocus).toBeCalledWith(1);
  });

  it('should show hint text properly', () => {
    const Comp = renderForTest(
      <TextArea
        hint={'hint'}
        height={50}
        customStyles={{ customHintStyles: { flex: 1 } }}
      />,
    );
    const input = Comp.queryByType(Input);
    fireEvent(input, 'blur', 1);
    const hint = Comp.queryByType(HintText);
    expect(hint.props.customHintStyles).toEqual({ flex: 1 });
    expect(hint.props.top).toEqual(50);
    expect(hint.props.focused).toEqual(false);
    fireEvent(input, 'focus', 1);
    expect(hint.props.focused).toEqual(true);

  });

  it('should have right style if platform is android', () => {
    Platform.OS = 'android';
    const Comp = renderForTest(
      <TextArea
      />,
    );
    const input = Comp.queryByType(Input);
    expect(input.props.selectionColor).toEqual('#afdaff');
  });
});
