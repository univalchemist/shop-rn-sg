import reducer from '../reducer';
import * as types from '../types';
import { PromiseStatus } from '@middlewares';

const initialState = {
  claimProcessing: [],
  claimCompleted: [],
  processing: {
    orderAll: [],
  },
  approved: {
    orderAll: [],
  },
  rejected: {
    orderAll: [],
  },
  completed: {
    orderAll: [],
  },
  benefitPlanYear: null,
  singleClaim: {},
  singleCXA1Claim: {},
  claimsMap: {},
  filters: {},
  selectedClaimFilters: [],
  selectedCXA1ClaimFilters: [],
  getClaimCompleted: PromiseStatus.START,
  getCXA1ClaimCompleted: PromiseStatus.START,
  cxa1: {
    claimProviderByClaimTypeId: {},
    claimReasonByClaimTypeId: {},
  },
};

describe('Claim reducer', () => {
  it('should return the initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_CLAIMS_START', () => {
    const action = {
      type: types.GET_CLAIMS_START,
      payload: {},
    };
    const expectedState = {
      ...initialState,
      getClaimCompleted: PromiseStatus.START,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_CLAIM_SUCCESS', () => {
    const expectedResponseObject = {
      claimId: '31323061',
      clientId: 'cxadevclient1',
      memberId: null,
      claimantId: '192510',
      receiptDate: '2017-03-04T00:00:00',
      amount: 4450.0,
    };
    const action = {
      type: types.GET_CLAIM_SUCCESS,
      payload: expectedResponseObject,
    };
    const currentState = {
      ...initialState,
    };
    const expectedState = {
      ...initialState,
      singleClaim: { ...expectedResponseObject },
    };

    expect(reducer(currentState, action)).toEqual(expectedState);
  });

  it('should handle GET_CLAIMS_SUCCESS', () => {
    const claimsMap = {
      6: {
        foo: 'baz',
      },
    };
    const expectedResponseObject = {
      approved: [],
      rejected: [],
      completed: [],
      processing: [],
      claimsMap,
    };
    const action = {
      type: types.GET_CLAIMS_SUCCESS,
      payload: expectedResponseObject,
    };
    const currentState = {
      ...initialState,
      claimsMap,
    };
    const expectedState = {
      ...initialState,
      approved: {
        orderAll: action.payload.approved,
      },
      rejected: {
        orderAll: action.payload.rejected,
      },
      processing: {
        orderAll: action.payload.processing,
      },
      claimsMap,
      getClaimCompleted: PromiseStatus.SUCCESS,
    };

    expect(reducer(currentState, action)).toEqual(expectedState);
  });

  it('should handle GET_CLAIMS_ERROR', () => {
    const action = {
      type: types.GET_CLAIMS_ERROR,
      payload: {},
    };
    const expectedState = {
      ...initialState,
      getClaimCompleted: PromiseStatus.ERROR,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_CXA1_CLAIMS_START', () => {
    const action = {
      type: types.GET_CXA1_CLAIMS_START,
      payload: {},
    };
    const expectedState = {
      ...initialState,
      getCXA1ClaimCompleted: PromiseStatus.START,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_CXA1_CLAIMS_SUCCESS', () => {
    const claimsMap = {
      6: {
        foo: 'baz',
        status: 'submitted',
      },
      7: {
        foo: 'baz',
        status: 'processing',
      },
      8: {
        foo: 'foo',
        status: 'rejected',
      },
    };
    const expectedResponseObject = {
      claims: [
        { foo: 'baz', status: 'submitted' },
        {
          foo: 'baz',
          status: 'processing',
        },
      ],
      claimsMap,
    };
    const action = {
      type: types.GET_CXA1_CLAIMS_SUCCESS,
      payload: expectedResponseObject,
    };
    const currentState = {
      ...initialState,
      claimsMap,
    };
    const expectedState = {
      ...initialState,
      claimProcessing: action.payload.claims.filter(
        item =>
          item.status.toUpperCase() === 'SUBMITTED' ||
          item.status.toUpperCase() === 'PROCESSING',
      ),
      claimCompleted: action.payload.claims.filter(
        item =>
          item.status.toUpperCase() !== 'SUBMITTED' &&
          item.status.toUpperCase() !== 'PROCESSING',
      ),
      claimsMap,
      getCXA1ClaimCompleted: PromiseStatus.SUCCESS,
    };

    expect(reducer(currentState, action)).toEqual(expectedState);
  });

  it('should handle GET_CXA1_CLAIMS_ERROR', () => {
    const action = {
      type: types.GET_CXA1_CLAIMS_ERROR,
      payload: {},
    };
    const expectedState = {
      ...initialState,
      getCXA1ClaimCompleted: PromiseStatus.ERROR,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_CLAIM_FILTERS', () => {
    const currentState = {
      ...initialState,
      selectedClaimFilters: [],
    };

    const filters = [
      'wellness',
      'PROCESSING',
      'REJECTED',
      'outpatient',
      'APPROVED',
      'William Brown',
    ];

    const action = {
      type: types.UPDATE_CLAIM_FILTERS,
      payload: filters,
    };

    const expectedState = {
      ...initialState,
      selectedClaimFilters: filters,
    };

    expect(reducer(currentState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_CLAIM_LIST_FILTERS', () => {
    const currentState = {
      ...initialState,
      selectedCXA1ClaimFilters: [],
    };

    const filters = [
      'wellness',
      'PROCESSING',
      'REJECTED',
      'outpatient',
      'APPROVED',
      'William Brown',
    ];

    const action = {
      type: types.UPDATE_CXA1_CLAIM_FILTERS,
      payload: filters,
    };

    const expectedState = {
      ...initialState,
      selectedCXA1ClaimFilters: filters,
    };

    expect(reducer(currentState, action)).toEqual(expectedState);
  });

  it('should handle SUBMIT_CLAIM_SUCCESS', () => {
    const currentState = {
      ...initialState,
      lastSubmittedClaim: null,
    };

    const submitClaimData = {
      data: {},
    };

    const action = {
      type: types.SUBMIT_CLAIM_SUCCESS,
      payload: submitClaimData,
    };

    const expectedState = {
      ...initialState,
      lastSubmittedClaim: submitClaimData,
    };

    expect(reducer(currentState, action)).toEqual(expectedState);
  });

  it('should handle GET_CLAIM_FILTERS_SUCCESS', () => {
    const currentState = {
      ...initialState,
      filters: null,
    };

    const claimFilterData = [
      'wellness',
      'PROCESSING',
      'REJECTED',
      'outpatient',
      'APPROVED',
      'William Brown',
    ];

    const action = {
      type: types.GET_CLAIM_FILTERS_SUCCESS,
      payload: claimFilterData,
    };

    const expectedState = {
      ...initialState,
      filters: {
        ...claimFilterData,
        claimCategoryFilters: [
          { code: 'outpatient', text: 'Outpatient' },
          { code: 'inpatient', text: 'Inpatient' },
          { code: 'dental', text: 'Dental' },
        ],
      },
    };

    expect(reducer(currentState, action)).toEqual(expectedState);
  });

  it('should handle GET_CXA1_CLAIM_FILTERS_SUCCESS', () => {
    const currentState = {
      ...initialState,
      filters: null,
    };

    const claimFilterData = {
      claimPlanFilters: [
        {
          id: '2020',
          text: '2020',
          isDefault: true,
        },
        {
          id: '2019',
          text: '2019',
          isDefault: false,
        },
        {
          id: '2017',
          text: '2017',
          isDefault: false,
        },
      ],
      claimCategoryFilters: [
        {
          code: 'outpatient',
          text: 'Outpatient',
        },
        {
          code: 'inpatient',
          text: 'Inpatient',
        },
        {
          code: 'flex',
          text: 'Flex',
        },
      ],
      claimStatusFilters: [
        {
          code: 'Paid',
          text: 'Paid',
        },
        {
          code: 'Approved',
          text: 'Approved',
        },
        {
          code: 'Rejected',
          text: 'Rejected',
        },
        {
          code: 'Processing',
          text: 'Processing',
        },
        {
          code: 'Submitted',
          text: 'Submitted',
        },
      ],
    };

    const action = {
      type: types.GET_CXA1_CLAIM_FILTERS_SUCCESS,
      payload: claimFilterData,
    };

    const expectedState = {
      ...initialState,
      filters: {
        ...claimFilterData,
      },
      selectedCXA1ClaimFilters: [
        {
          type: 'claimPlanFilters',
          value: '2020',
        },
      ],
    };

    expect(reducer(currentState, action)).toEqual(expectedState);
  });
});
