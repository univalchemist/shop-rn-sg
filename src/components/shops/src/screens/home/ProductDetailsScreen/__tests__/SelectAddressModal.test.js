import React from 'react';
import { renderForTest } from '@testUtils';
import SelectAddressModal from '../SelectAddressModal';
import { fireEvent } from 'react-native-testing-library';
import { ListItem } from '@shops/wrappers/components';
import { PRODUCT } from '@shops/__mocks__/data';
import { FlatList } from 'react-native';

const route = {
  params: {
    onSelectLocation: jest.fn(),
    currentSelected: {redemptId:'3'},
    redemptionPoint: PRODUCT.redemptionPoint,
  },
};

describe('SelectAddressModal', () => {
  it('should render properly', () => {
    const Comp = renderForTest(<SelectAddressModal route={route} />);
    expect(Comp.queryAllByType(ListItem)).toHaveLength(
      PRODUCT.redemptionPoint.length,
    );
    for (let point of PRODUCT.redemptionPoint) {
      expect(Comp.queryByText(point.redemptValue)).toBeTruthy();
    }
  });

  it('should render emptyScreen when dont pass any params', () => {
    const Comp = renderForTest(<SelectAddressModal route={{params:{}}} />);
    expect(Comp.queryByType(FlatList)).toBeTruthy()
    expect(Comp.queryByType(ListItem)).toBeNull()
  });

  it('should handle pressItem properly', () => {
    const navigation = {
      goBack: jest.fn(),
    };
    const Comp = renderForTest(
      <SelectAddressModal route={route} navigation={navigation} />,
    );
    const item = Comp.queryAllByType(ListItem)[0];
    fireEvent.press(item);
    expect(route.params.onSelectLocation).toBeCalledWith(
      PRODUCT.redemptionPoint[0],
    );
    expect(navigation.goBack).toBeCalled();
  });
});
