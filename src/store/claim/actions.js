import moment from 'moment';
import { change } from 'redux-form';
import Config from '@config';
import * as types from './types';
import { CLAIM_STATUS } from './constants';

function transformClaimSubmit(
  formValues,
  claimType,
  claimReasonByClaimTypeId,
  isCXA1Integration,
) {
  const {
    selectedPatientId,
    claimTypeId,
    claimReason: claimReasonId,
    consultationDate,
    receiptAmount,
    contactNumber,
    otherInsurerAmount,
    receiptFilesIds,
    settlementAdviceIds,
    prescriptionIds,
    referralFilesIds,
    diagnosisText,
    isMaternity,
    provider,
    hospitalClinic,
    dischargeDate,
    receiptNo,
  } = formValues;
  const receiptDate = moment(consultationDate, moment.ISO_8601).format(
    'YYYY-MM-DDT00:00:00',
  );
  const selectedClaimType = claimType.types.byId[claimTypeId];
  const selectedClaimReason = !isCXA1Integration
    ? claimType.reasons.byId[claimReasonId]
    : claimReasonByClaimTypeId[claimTypeId].byCode[claimReasonId];
  const selectedCategory =
    claimType.categories.byId[selectedClaimType.claimCategoryId];
  const submitData = {
    claimantId: selectedPatientId,
    categoryCode: selectedCategory.code,
    reasonCode: selectedClaimReason.code,
    typeCode: selectedClaimType.code,
    isMaternity: isMaternity || false,
    amount: receiptAmount,
    receiptNo,
    acceptTermsAndConditions: true,
    contactNumber,
    receiptDate,
    otherInsurerAmount,
    documents: {
      receipts: receiptFilesIds,
      referrals: referralFilesIds,
      settlementAdvices: settlementAdviceIds,
      prescriptions: prescriptionIds,
    },
    provider,
    hospitalClinic,
    dischargeDate: moment(dischargeDate, moment.ISO_8601).format(
      'YYYY-MM-DDT00:00:00',
    ),
  };

  if (diagnosisText) {
    submitData.diagnosisText = diagnosisText;
  }
  return submitData;
}

function submitClaim(values) {
  return (dispatch, getState, { api }) => {
    const {
      claimType,
      user: { clientId, userId, isCXA1Integration },
      claim: {
        cxa1: { claimReasonByClaimTypeId },
      },
    } = getState();

    const payload = transformClaimSubmit(
      values,
      !isCXA1Integration ? claimType : claimType.cxa1,
      claimReasonByClaimTypeId,
      isCXA1Integration,
    );
    const getPromise = async () => {
      const response = await api.submitClaim(clientId, userId, payload);
      return response.data;
    };

    return dispatch({
      type: types.SUBMIT_CLAIM,
      payload: getPromise(),
    });
  };
}

function uploadDocumentsForReference(documentType, docs) {
  return (dispatch, getState, { api }) => {
    const getPromise = async () => {
      try {
        const { clientId, userId } = getState().user;
        const responses = await Promise.all(
          docs.map(doc =>
            api.uploadDocumentReference(clientId, userId, documentType, doc),
          ),
        );

        const references = responses.map(response => response.data.documentId);

        const fileField = `${documentType.toLowerCase()}FilesIds`;
        dispatch(change('claimDetailsForm', fileField, references));

        return references;
      } catch (e) {
        throw e;
      }
    };

    return dispatch({
      type: types.UPLOAD_DOCUMENTS_FOR_REFERENCE,
      payload: getPromise(),
    });
  };
}

function getTransformClaimDocument(clientId, userId) {
  return document => ({
    ...document,
    uri: Config.apiRoutes.getClaimDocument(clientId, userId, document.id),
  });
}

function transformClaims(clientId, userId, claims) {
  const transformClaimDocument = getTransformClaimDocument(clientId, userId);
  const approved = [];
  const rejected = [];
  const processing = [];
  const completed = [];
  const claimsMap = {};
  claims.forEach(claim => {
    const { claimId, statusCode } = claim;
    if (!claim.documents) {
      claim.documents = {
        receipts: [],
        referrals: [],
      };
    } else {
      claim.documents.receipts = claim.documents.receipts.map(
        transformClaimDocument,
      );
      claim.documents.referrals = claim.documents.referrals.map(
        transformClaimDocument,
      );
    }

    claimsMap[claimId] = claim;
    if (
      statusCode === CLAIM_STATUS.PROCESSING ||
      statusCode === CLAIM_STATUS.REQUEST_FOR_INFORMATION
    ) {
      processing.push(claimId);
    }
    if (statusCode === CLAIM_STATUS.APPROVED) {
      approved.push(claimId);
      completed.push(claimId);
    }
    if (statusCode === CLAIM_STATUS.REJECTED) {
      rejected.push(claimId);
      completed.push(claimId);
    }
  });

  return {
    processing,
    approved,
    rejected,
    claimsMap,
    completed,
  };
}

const getClaim = claimId => {
  return (dispatch, getState, { api }) => {
    const {
      user: { clientId, userId },
    } = getState();
    const getPromise = async () => {
      const response = await api.getClaim(clientId, userId, claimId);
      return response.data;
    };

    return dispatch({
      type: types.GET_CLAIM,
      payload: getPromise(),
    });
  };
};

const getCXA1Claim = claimId => {
  return (dispatch, getState, { api }) => {
    const {
      user: { clientId, userId },
    } = getState();
    const getPromise = async () => {
      const { data } = await api.getClaim(clientId, userId, claimId);

      return data;
    };

    return dispatch({
      type: types.GET_CXA1_CLAIM,
      payload: getPromise(),
    });
  };
};

const getClaims = () => {
  return (dispatch, getState, { api }) => {
    const {
      user: { clientId, userId },
      claim: { selectedClaimFilters },
    } = getState();
    const getPromise = async () => {
      const filters = selectedClaimFilters.reduce(
        (acc, filter) => {
          if (filter.type === 'claimCategoryFilters')
            acc.categoryCodes.push(filter.value);
          else if (filter.type === 'claimStatusFilters')
            acc.statuses.push(filter.value);
          else if (filter.type === 'patient') acc.patients.push(filter.value);
          return acc;
        },
        { patients: [], statuses: [], categoryCodes: [] },
      );
      let filterQuery = [];
      if (filters.statuses.length > 0) {
        const hasProcessing = filters.statuses.includes('PROCESSING');
        if (hasProcessing) {
          filters.statuses.push('REQUEST FOR INFORMATION');
        }
        filterQuery.push(`statuses=${filters.statuses.join(',')}`);
      }
      if (filters.categoryCodes.length > 0)
        filterQuery.push(`categoryCodes=${filters.categoryCodes.join(',')}`);
      if (filters.patients.length > 0)
        filterQuery.push(`patientIds=${filters.patients.join(',')}`);
      const response = await api.getClaims(
        clientId,
        userId,
        filterQuery.join('&'),
      );
      const transformedData = transformClaims(clientId, userId, response.data);
      return {
        approved: transformedData.approved,
        rejected: transformedData.rejected,
        completed: transformedData.completed,
        processing: transformedData.processing,
        claimsMap: transformedData.claimsMap,
      };
    };

    return dispatch({
      type: types.GET_CLAIMS,
      payload: getPromise(),
    });
  };
};

const getCXA1Claims = () => (dispatch, getState, { api }) => {
  const {
    user: { clientId, userId },
    claim: { selectedCXA1ClaimFilters },
  } = getState();

  const getPromise = async () => {
    const filters = selectedCXA1ClaimFilters.reduce(
      (acc, filter) => {
        if (filter.type === 'claimPlanFilters') acc.plans.push(filter.value);
        else if (filter.type === 'claimCategoryFilters')
          acc.categoryCodes.push(filter.value);
        else if (filter.type === 'claimStatusFilters')
          acc.statuses.push(filter.value);
        else if (filter.type === 'patient') acc.patients.push(filter.value);
        return acc;
      },
      { plans: [], patients: [], statuses: [], categoryCodes: [] },
    );

    let filterQuery = [];
    if (filters.statuses.length > 0) {
      const hasProcessing = filters.statuses.includes('PROCESSING');
      if (hasProcessing) {
        filters.statuses.push('REQUEST FOR INFORMATION');
      }
      filterQuery.push(`statuses=${filters.statuses.join(',')}`);
    }
    if (filters.plans.length > 0)
      filterQuery.push(`planIds=${filters.plans.join(',')}`);
    if (filters.categoryCodes.length > 0)
      filterQuery.push(`categoryCodes=${filters.categoryCodes.join(',')}`);
    if (filters.patients.length > 0)
      filterQuery.push(`patientIds=${filters.patients.join(',')}`);

    const { data } = await api.getClaims(
      clientId,
      userId,
      filterQuery.join('&'),
    );

    return {
      claims: data,
      claimsMap: transformClaims(clientId, userId, data).claimsMap,
    };
  };

  return dispatch({
    type: types.GET_CXA1_CLAIMS,
    payload: getPromise(),
  });
};

const getClaimFilters = () => (dispatch, getState, { api }) => {
  const {
    user: { clientId },
  } = getState();

  const getPromise = async () => {
    const response = await api.getClaimFilters(clientId);
    return response.data;
  };

  return dispatch({
    type: types.GET_CLAIM_FILTERS,
    payload: getPromise(),
  });
};

const getCXA1ClaimFilters = () => (dispatch, getState, { api }) => {
  const {
    user: { clientId },
  } = getState();

  const getPromise = async () => {
    const { data } = await api.getClaimFilters(clientId);

    return data;
  };

  return dispatch({
    type: types.GET_CXA1_CLAIM_FILTERS,
    payload: getPromise(),
  });
};

const updateClaimFilters = filters => dispatch => {
  return dispatch({
    type: types.UPDATE_CLAIM_FILTERS,
    payload: filters,
  });
};

const updateCXA1ClaimFilters = filters => dispatch => {
  return dispatch({
    type: types.UPDATE_CXA1_CLAIM_FILTERS,
    payload: filters,
  });
};

const getCXA1ClaimProvider = claimTypeId => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId } = getState().user;
    const { claimProviderByClaimTypeId } = getState().claim.cxa1;
    if (claimProviderByClaimTypeId?.[claimTypeId]) return { claimTypeId };

    const { data } = await api.getHospitalClinic(clientId, claimTypeId);
    return { providers: data, claimTypeId };
  };

  return dispatch({
    type: types.GET_CXA1_CLAIM_PROVIDER,
    payload: getPromise(),
  });
};

const getCXA1ClaimReasons = claimTypeId => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId } = getState().user;
    const { claimReasonByClaimTypeId } = getState().claim.cxa1;
    if (claimReasonByClaimTypeId?.[claimTypeId]) return { claimTypeId };

    const { data } = await api.getClaimReasons(clientId, claimTypeId);
    return { reasons: data, claimTypeId };
  };
  return dispatch({
    type: types.GET_CXA1_CLAIM_REASONS,
    payload: getPromise(),
  });
};

export {
  getClaim,
  getClaims,
  submitClaim,
  uploadDocumentsForReference,
  transformClaimSubmit,
  getClaimFilters,
  updateClaimFilters,
  getCXA1Claim,
  getCXA1Claims,
  getCXA1ClaimFilters,
  getCXA1ClaimProvider,
  getCXA1ClaimReasons,
  updateCXA1ClaimFilters,
};
