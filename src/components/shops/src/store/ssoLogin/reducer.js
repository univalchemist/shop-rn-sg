import * as types from './types';

export const initialState = {
  accountInfo: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        accountInfo: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
