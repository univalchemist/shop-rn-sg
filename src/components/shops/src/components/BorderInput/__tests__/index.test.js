import React from 'react';
import { BorderInput } from '@shops/components';
import { renderForTest } from '@testUtils';
import { TextInput } from 'react-native';

describe('BorderInput', () => {
  it('should render correctly', () => {
    const placeHolder = 'Special instruction for vendor';
    const value = 'Instruction';
    const borderInput = renderForTest(
      <BorderInput value={value} placeholder={placeHolder} />,
    );
    const textInput = borderInput.getByType(TextInput);
    expect(textInput.props.value).toEqual(value);
    expect(textInput.props.placeholder).toEqual(placeHolder);
  });

  it('should render correctly when error', () => {
    const borderInput = renderForTest(
      <BorderInput isError={true} outlined={true} optional={true} />,
    );

    const textInput = borderInput.getByType(TextInput);
    expect(textInput.props.borderWidth).toEqual(2);
    expect(textInput.props.borderColor).toEqual('#DB0011');
  });
});
