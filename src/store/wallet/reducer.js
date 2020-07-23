import * as types from './types';

const initialState = {
  balanceMap: {},
  balanceTextMap: {},
  walletBalances: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_WALLET_SUCCESS: {
      const { member, dependents } = action.payload;
      const balanceMap = {};
      const balanceTextMap = {};
      const membersList = member ? [member, ...dependents] : dependents;
      membersList.forEach(({ memberId, balance, balanceText }) => {
        balanceMap[memberId] = balance;
        balanceTextMap[memberId] = balanceText;
      });

      return {
        ...state,
        balanceMap,
        balanceTextMap,
      };
    }

    case types.FETCH_EWALLET_SUCCESS: {
      const {
        balances: { member, dependents = [], validTo },
        membersMap,
      } = action.payload;

      const walletBalances = member ? [member, ...dependents] : dependents;
      const walletBalancesWithName = walletBalances.map(balance => {
        const info = membersMap[balance.memberId];
        return {
          ...balance,
          name: info ? info.fullName : '',
          validTo,
        };
      });
      return { ...state, walletBalances: walletBalancesWithName };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
