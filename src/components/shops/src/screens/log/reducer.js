/* istanbul ignore file */
export const INITIAL_STATE = {
  logPayment: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOG_PAYMENT':
      return { ...state, logPayment: [...state.logPayment, action.payload] };
    default:
      return state;
  }
};
