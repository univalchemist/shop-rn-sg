import React from 'react';
import { renderForTest } from '@testUtils';
import SortByScreen from '../SortByScreen';
import { SORTINGS } from '@shops/__mocks__/data';
import { ListItem } from '@shops/wrappers/components';
import { fireEvent } from 'react-native-testing-library';

const initialState = {
  shop: {
    filters: { sortType: SORTINGS[0].id + '-' + SORTINGS[0].direction },
    config: { sortings: SORTINGS },
  },
};
const navigation = { goBack: jest.fn() };

describe('SortByScreen', () => {
  it('should render properly', () => {
    const Comp = renderForTest(
      <SortByScreen navigation={navigation}  />,
      { initialState },
    );
    const listItems = Comp.queryAllByType(ListItem);
    expect(listItems).toHaveLength(SORTINGS.length);
    fireEvent.press(listItems[0]);
    expect(navigation.goBack).toBeCalled()
  });
});
