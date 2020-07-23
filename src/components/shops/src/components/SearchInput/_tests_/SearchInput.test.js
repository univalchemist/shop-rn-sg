
import React from 'react';
import { SearchInput } from '@shops/components';
import { renderForTest } from '@testUtils';

const initialState = {};

describe('SearchInput', () => {
  test('should match snapshot', async () => {
    const value = '';
    const placeholder = 'Search';
    const onChangeText = jest.fn();
    const onSubmit = jest.fn();
    const Component = renderForTest(
      <SearchInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onSubmit={onSubmit}
      />,
      {
        initialState,
      },
    );
    expect(Component.toJSON()).toMatchSnapshot();
  });
});
