import * as types from './types';
import { PromiseStatus } from '@middlewares';
import { isEmpty } from 'ramda';

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
    claimReasonByClaimTypeId: {
      // 1: {
      //   data: [],
      //   byCode: {},
      // },
    },
  },
};

/**
 * This is to prevent race condition where list fetched (without the specified properties) overwriting values that are already in the store
 * @param {object} claimsMap incoming claims
 * @param {object} existingClaimsMap claims in the store
 */
// Comment this block because it's never used
// function copyClaimItemCategoryReceiptsAndReferrals(
//   claimsMap,
//   existingClaimsMap,
// ) {
//   Object.keys(claimsMap).forEach(key => {
//     const existingClaim = existingClaimsMap[key];
//     if (existingClaim) {
//       claimsMap[key].claimItemCategory = existingClaim.claimItemCategory;
//       claimsMap[key].receipts = existingClaim.receipts;
//       claimsMap[key].referrals = existingClaim.referrals;
//     }
//   });
// }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SUBMIT_CLAIM_SUCCESS: {
      return {
        ...state,
        lastSubmittedClaim: action.payload,
      };
    }
    case types.GET_CXA1_CLAIMS_START: {
      return {
        ...state,
        getCXA1ClaimCompleted: PromiseStatus.START,
      };
    }
    case types.GET_CXA1_CLAIMS_SUCCESS: {
      return {
        ...state,
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
        claimsMap: action.payload.claimsMap,
        getCXA1ClaimCompleted: PromiseStatus.SUCCESS,
      };
    }
    case types.GET_CXA1_CLAIMS_ERROR: {
      return {
        ...state,
        getCXA1ClaimCompleted: PromiseStatus.ERROR,
      };
    }
    case types.GET_CLAIMS_START: {
      return {
        ...state,
        getClaimCompleted: PromiseStatus.START,
      };
    }
    case types.GET_CLAIMS_SUCCESS: {
      return {
        ...state,
        approved: {
          orderAll: action.payload.approved,
        },
        rejected: {
          orderAll: action.payload.rejected,
        },
        completed: {
          orderAll: action.payload.completed,
        },
        processing: {
          orderAll: action.payload.processing,
        },
        claimsMap: {
          ...state.claimsMap,
          ...action.payload.claimsMap,
        },
        getClaimCompleted: PromiseStatus.SUCCESS,
      };
    }
    case types.GET_CLAIMS_ERROR: {
      return {
        ...state,
        getClaimCompleted: PromiseStatus.ERROR,
      };
    }
    case types.GET_CXA1_CLAIM_FILTERS_SUCCESS: {
      return {
        ...state,
        filters: {
          ...action.payload,
        },
        selectedCXA1ClaimFilters: isEmpty(state.selectedCXA1ClaimFilters)
          ? [
              {
                type: 'claimPlanFilters',
                value: action.payload.claimPlanFilters.find(p => p.isDefault)
                  ?.id,
              },
            ]
          : state.selectedCXA1ClaimFilters,
      };
    }
    case types.GET_CLAIM_SUCCESS: {
      return {
        ...state,
        singleClaim: action.payload,
      };
    }
    case types.GET_CXA1_CLAIM_SUCCESS: {
      return {
        ...state,
        singleCXA1Claim: action.payload,
      };
    }
    case types.GET_CLAIM_FILTERS_SUCCESS: {
      // hardcode change claimCategoryFilters
      return {
        ...state,
        filters: {
          ...action.payload,
          claimCategoryFilters: [
            { code: 'outpatient', text: 'Outpatient' },
            { code: 'inpatient', text: 'Inpatient' },
            { code: 'dental', text: 'Dental' },
          ],
        },
      };
    }

    case types.UPDATE_CLAIM_FILTERS: {
      return {
        ...state,
        selectedClaimFilters: action.payload,
      };
    }

    case types.UPDATE_CXA1_CLAIM_FILTERS: {
      return {
        ...state,
        selectedCXA1ClaimFilters: action.payload,
      };
    }

    case types.GET_CXA1_CLAIM_PROVIDER_SUCCESS: {
      const claimTypeId = action.payload.claimTypeId;
      if (state.claimProviderByClaimTypeId?.[claimTypeId]?.data?.length > 0)
        return state;

      const byCode = {};
      const providers = action.payload.providers;
      for (let i = 0; i < providers?.length; i++)
        byCode[providers[i].id] = providers[i];

      return {
        ...state,
        cxa1: {
          ...state.cxa1,
          claimProviderByClaimTypeId: {
            ...state.claimProviderByClaimTypeId,
            [claimTypeId]: { data: action.payload.providers, byCode },
          },
        },
      };
    }
    case types.GET_CXA1_CLAIM_REASONS_SUCCESS: {
      const claimTypeId = action.payload.claimTypeId;
      if (state.claimReasonByClaimTypeId?.[claimTypeId]?.data?.length > 0)
        return state;
      const byCode = {};
      const reasons = action.payload.reasons;
      for (let i = 0; i < reasons?.length; i++)
        byCode[reasons[i].code] = reasons[i];

      return {
        ...state,
        cxa1: {
          ...state.cxa1,
          claimReasonByClaimTypeId: {
            ...state.claimReasonByClaimTypeId,
            [claimTypeId]: { data: action.payload.reasons, byCode },
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
