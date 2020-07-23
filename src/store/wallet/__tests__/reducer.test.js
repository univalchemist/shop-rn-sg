import reducer from '@store/wallet/reducer';
import * as types from '@store/wallet/types';

describe('Wallet Reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'ANY' })).toEqual({
      balanceMap: {},
      balanceTextMap: {},
      walletBalances: [],
    });
  });

  test('should set wallet details on FETCH_WALLET_SUCCESS', () => {
    const testData = {
      member: {
        memberId: 3,
        balance: 999,
        balanceText: '$HK999',
      },
      dependents: [
        {
          memberId: 4,
          balance: 123,
          balanceText: '$HK123',
        },
      ],
    };
    expect(
      reducer(
        {},
        {
          type: types.FETCH_WALLET_SUCCESS,
          payload: testData,
        },
      ),
    ).toEqual({
      balanceMap: {
        3: 999,
        4: 123,
      },
      balanceTextMap: {
        3: '$HK999',
        4: '$HK123',
      },
    });
  });

  test('should set wallet for dependent even if member doesnt have balance on FETCH_WALLET_SUCCESS', () => {
    const testData = {
      member: null,
      dependents: [
        {
          memberId: 4,
          balance: 123,
          balanceText: '$HK123',
        },
      ],
    };
    expect(
      reducer(
        {},
        {
          type: types.FETCH_WALLET_SUCCESS,
          payload: testData,
        },
      ),
    ).toEqual({
      balanceMap: {
        4: 123,
      },
      balanceTextMap: {
        4: '$HK123',
      },
    });
  });
});

describe('Wallet Balance Reducer', () => {
  test('should set wallet details on FETCH_WALLET_SUCCESS', () => {
    const testData = {
      balances: {
        member: { clientId: 'clientId', memberId: '3', balance: 120 },
        dependents: [
          { clientId: 'clientId', memberId: '4', balance: 120 },
          { clientId: 'clientId', memberId: '5', balance: 120 },
          { clientId: 'clientId', memberId: '6', balance: 120 },
        ],
        validTo: '2020-01-01',
      },
      membersMap: {
        '3': { fullName: 'User 3' },
        '4': { fullName: 'User 4' },
        '5': { fullName: 'User 5' },
      },
    };

    expect(
      reducer(
        {},
        {
          type: types.FETCH_EWALLET_SUCCESS,
          payload: testData,
        },
      ),
    ).toEqual({
      walletBalances: [
        {
          clientId: 'clientId',
          memberId: '3',
          balance: 120,
          name: 'User 3',
          validTo: '2020-01-01',
        },
        {
          clientId: 'clientId',
          memberId: '4',
          balance: 120,
          name: 'User 4',
          validTo: '2020-01-01',
        },
        {
          clientId: 'clientId',
          memberId: '5',
          balance: 120,
          name: 'User 5',
          validTo: '2020-01-01',
        },
        {
          clientId: 'clientId',
          memberId: '6',
          balance: 120,
          name: '',
          validTo: '2020-01-01',
        },
      ],
    });

    expect(
      reducer(
        {},
        {
          type: types.FETCH_EWALLET_SUCCESS,
          payload: {
            ...testData,
            balances: { dependents: testData.balances.dependents },
          },
        },
      ),
    ).toEqual({
      walletBalances: [
        {
          clientId: 'clientId',
          memberId: '4',
          balance: 120,
          name: 'User 4',
          validTo: undefined,
        },
        {
          clientId: 'clientId',
          memberId: '5',
          balance: 120,
          name: 'User 5',
          validTo: undefined,
        },
        {
          clientId: 'clientId',
          memberId: '6',
          balance: 120,
          name: '',
          validTo: undefined,
        },
      ],
    });

    expect(
      reducer(
        {},
        {
          type: types.FETCH_EWALLET_SUCCESS,
          payload: {
            ...testData,
            balances: {},
          },
        },
      ),
    ).toEqual({
      walletBalances: [],
    });
  });

  // test('should set wallet for dependent even if member doesnt have balance on FETCH_WALLET_SUCCESS', () => {
  //   const testData = {
  //     member: null,
  //     dependents: [
  //       {
  //         memberId: 4,
  //         balance: 123,
  //         balanceText: '$HK123',
  //       },
  //     ],
  //   };
  //   expect(
  //     reducer(
  //       {},
  //       {
  //         type: types.FETCH_WALLET_SUCCESS,
  //         payload: testData,
  //       },
  //     ),
  //   ).toEqual({
  //     balanceMap: {
  //       4: 123,
  //     },
  //     balanceTextMap: {
  //       4: '$HK123',
  //     },
  //   });
  // });
});
