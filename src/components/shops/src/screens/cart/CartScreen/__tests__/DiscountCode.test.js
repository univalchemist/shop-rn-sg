import React from 'react';
import { renderForTest } from '@testUtils';
import DiscountCode from '../DiscountCode';
import messages from '@shops/locales/en-HK.json';
import { TextInput } from 'react-native';
import { TrackedButton, InputField } from '@shops/wrappers/components';
import {
  act,
  fireEvent,
} from 'react-native-testing-library';

const VALID_CODE = 'VALID_CODE';
const INVALID_CODE = 'INVALID_CODE';

const initialState = {
  shop: {
    cart: {
      discountCode: null,
    },
  },
  user: {
    userId: 'userId',
    clientId: 'clientId',
  },
};
const api = {
  addCartCoupon: jest.fn((clientId, userId, code) => {
    return new Promise((resolve, reject) => {
      if (code === VALID_CODE) {
        resolve({ data: true });
      } else if (code === INVALID_CODE) {
        reject({
          response: { data: { errors: [{ messageKey: 'NotFound' }] } },
        });
      } else {
        reject({});
      }
    });
  }),
  getCartTotals: jest.fn(),
  removeCartCoupon: jest.fn().mockResolvedValue({data:true}),
};

describe('DiscountCode', () => {
  beforeEach(()=>jest.clearAllMocks());
  it('should render properly', () => {
    const Comp = renderForTest(<DiscountCode />, { initialState });
    expect(Comp.queryByText(messages['shop.cart.discountCode'])).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.cart.applyDiscountCode']),
    ).toBeTruthy();
    expect(Comp.queryByType(TextInput)).toBeTruthy();
    expect(Comp.queryByType(TrackedButton)).toBeTruthy();
  });

  it('should handle valid code properly', async () => {
    const Comp = renderForTest(<DiscountCode />, { initialState, api });
    let input = Comp.queryByType(TextInput);
    fireEvent.changeText(input, VALID_CODE);
    const button = Comp.queryByType(TrackedButton);
    await act(() => fireEvent.press(button));
    const inputField = Comp.queryByType(InputField);
    expect(inputField.props.errorAfterSubmit).toEqual(null);
  });

  it('should handle invalid code properly', async () => {
    const Comp = renderForTest(<DiscountCode />, { initialState, api });
    let input = Comp.queryByType(TextInput);
    fireEvent.changeText(input, INVALID_CODE);
    const button = Comp.queryByType(TrackedButton);
    await act(() => fireEvent.press(button));
    const inputField = Comp.queryByType(InputField);
    expect(inputField.props.errorAfterSubmit).toEqual(
      messages['shop.cart.invalidDiscountCode'],
    );
  });

  it('should handle unknown code properly', async () => {
    const Comp = renderForTest(<DiscountCode />, { initialState, api });
    let input = Comp.queryByType(TextInput);
    fireEvent.changeText(input, 'unknown');
    const button = Comp.queryByType(TrackedButton);
    await act(() => fireEvent.press(button));
    expect(api.getCartTotals).toBeCalled();
  });

  it('should show error when user leave input empty', async () => {
    const Comp = renderForTest(<DiscountCode />, { initialState, api });
    const button = Comp.queryByType(TrackedButton);
    await act(() => fireEvent.press(button));
    const inputField = Comp.queryByType(InputField);
    expect(inputField.props.errorAfterSubmit).toEqual('Required');
  });

  it('should remove cartCoupon properly', async () => {
    const initState = { ...initialState };
    initState.shop.cart.discountCode = 'discountCode';
    const Comp = renderForTest(<DiscountCode />, {
      initialState: initState,
      api,
    });
    const button = Comp.queryByType(TrackedButton);
    await act(() => fireEvent.press(button));
    expect(api.removeCartCoupon).toBeCalled()
  });
});
