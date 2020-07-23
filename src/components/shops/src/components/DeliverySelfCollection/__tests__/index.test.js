import React from 'react';
import { renderForTest } from '@testUtils';
import DeliverySelfCollection from '../index';
import { CustomSelectField } from '@shops/wrappers/components';
import { fireEvent } from 'react-native-testing-library';
import { PRODUCT } from '@shops/__mocks__/data';
import { DELIVERY_TYPE } from '@shops/utils/constant';
import messages from '@shops/locales/en-HK.json';
import { SELECT_ADDRESS_MODAL } from '@shops/navigation/routes';
import { RadioButton } from '@shops/components';

const props = {
  product: PRODUCT,
  deliveryType: DELIVERY_TYPE.DELIVERY,
  setDeliveryType: jest.fn(),
  currentSelected: '',
  onSelectLocation: jest.fn(),
  error: '',
  navigation: {
    navigate: jest.fn(),
  },
};

describe('DeliverySelfCollection', () => {
  it('should render properly when deliveryType is equal delivery', () => {
    const product = { ...PRODUCT, deliveryMethod: 'stub' };
    const Comp = renderForTest(
      <DeliverySelfCollection {...props} product={product} />,
    );
    expect(
      Comp.queryByText(messages['shop.product.deliveryType']),
    ).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.product.selectLocation']),
    ).toBeNull();
    expect(Comp.queryAllByType(RadioButton)).toHaveLength(0);
  });

  it('should render properly when deliveryType is equal selfcollection', () => {
    const Comp = renderForTest(
      <DeliverySelfCollection
        {...props}
        deliveryType={DELIVERY_TYPE.SELF_COLLECTION}
      />,
    );
    expect(
      Comp.queryByText(messages['shop.product.deliveryType']),
    ).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.product.selectLocation']),
    ).toBeTruthy();
    const selectField = Comp.queryByType(CustomSelectField);
    expect(Comp.queryAllByType(RadioButton)).toHaveLength(2);
    fireEvent.press(selectField);
    expect(props.navigation.navigate).toBeCalledWith(SELECT_ADDRESS_MODAL, {
      onSelectLocation: props.onSelectLocation,
      redemptionPoint: props.product.redemptionPoint,
      currentSelected: '',
    });
  });
});
