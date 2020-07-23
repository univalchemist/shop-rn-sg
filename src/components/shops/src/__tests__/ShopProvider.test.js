import * as React from 'react';
import { renderForTest } from '@testUtils';
import { ShopContextProvider, useShopContext } from '../ShopProvider';
import { Text } from '@shops/wrappers/components';

import { renderHook } from '@testing-library/react-hooks';

describe('ShopProvider', () => {
  it('have correct useShopContext', () => {
    jest.spyOn(React, 'createContext');
    const { result } = renderHook(() => useShopContext());
    expect(result).toEqual({
      current: {
        authAuthorizeUrl: null,
        redirectUrl: null,
        shopAuthorizeLoginUrl: null,
      },
      error: undefined,
    });
  });
  it('should render ShopContextProvider correctly', () => {
    const children = <Text>test</Text>;
    const Comp = renderForTest(
      <ShopContextProvider
        value={{
          authAuthorizeUrl: 'authAuthorizeUrl',
          redirectUrl: 'redirectUrl',
          shopAuthorizeLoginUrl: 'shopAuthorizeLoginUrl',
        }}
      >
        {children}
      </ShopContextProvider>,
    );
    expect(Comp.queryByText('test')).toBeTruthy();
  });
});
