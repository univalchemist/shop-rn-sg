import React from 'react';
import { renderForTest, render } from '@testUtils';
import {
  fireEvent,
  flushMicrotasksQueue,
  act,
} from 'react-native-testing-library';

import { Carousel } from '@wrappers/components';
import WalletBalancesCarousel, {
  WalletCardSkeletonPlaceholder,
} from '../WalletBalancesCarousel';

const initialState = {
  user: {
    clientId: 'clientId',
    userId: '3',
    walletBalances: [],
    membersMap: {
      '3': {
        contactNumber: '12345678',
        fullName: 'hello',
        memberId: '3',
      },
      '4': {
        contactNumber: '12345678',
        fullName: 'hello',
        memberId: '4',
      },
    },
  },
};

const walletBalancesResponseData = {
  member: {
    clientId: 'clientId',
    memberId: '3',
    balance: 120,
    openBalance: 590,
    status: 'available',
    currency: 'HKD',
  },
  dependents: [
    {
      clientId: 'clientId',
      memberId: '4',
      balance: 120,
      openBalance: 590,
      status: 'available',
      currency: 'HKD',
    },
    {
      clientId: 'clientId',
      memberId: '5',
      balance: 120,
      openBalance: 590,
      status: 'available',
      currency: 'HKD',
    },
  ],
  validTo: '20 Jun 2020',
};

jest.useFakeTimers();

describe('WalletBalancesCarousel', () => {
  it('should render wallet balances carousel after call api', async () => {
    const [Component] = render(<WalletBalancesCarousel />, {
      initialState,
      api: {
        fetchEwallet: jest.fn(() =>
          Promise.resolve({ data: walletBalancesResponseData }),
        ),
      },
    });

    expect(Component.getByType(WalletCardSkeletonPlaceholder)).toBeDefined();
    await act(() => flushMicrotasksQueue());
    expect(Component.toJSON()).toMatchSnapshot();

    const carousel = Component.queryAllByType(Carousel);
    carousel[0].props.onSnapToItem(1);
    expect(carousel.length).toEqual(1);
  });

  it('should render wallet balances carousel after call api with empty validTo data', async () => {
    const [Component] = render(<WalletBalancesCarousel />, {
      initialState,
      api: {
        fetchEwallet: jest.fn(() =>
          Promise.resolve({
            data: { ...walletBalancesResponseData, validTo: undefined },
          }),
        ),
      },
    });

    expect(Component.getByType(WalletCardSkeletonPlaceholder)).toBeDefined();
    await act(() => flushMicrotasksQueue());
    expect(Component.toJSON()).toMatchSnapshot();

    const carousel = Component.queryAllByType(Carousel);
    carousel[0].props.onSnapToItem(1);
    expect(carousel.length).toEqual(1);
  });

  it('should not render wallet balances carousel after call api get empty data', async () => {
    const component = renderForTest(<WalletBalancesCarousel />, {
      initialState,
      api: {
        fetchEwallet: jest.fn(() => Promise.resolve({ data: {} })),
      },
    });

    expect(component.getByType(WalletCardSkeletonPlaceholder)).toBeDefined();
    await act(() => flushMicrotasksQueue());
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should not render wallet balances carousel after call api failed', async () => {
    const component = renderForTest(<WalletBalancesCarousel />, {
      initialState,
      api: {
        fetchEwallet: jest.fn(() => Promise.reject({ message: 'error' })),
      },
    });

    expect(component.getByType(WalletCardSkeletonPlaceholder)).toBeDefined();
    await act(() => flushMicrotasksQueue());
    expect(component.toJSON()).toMatchSnapshot();
  });
});
