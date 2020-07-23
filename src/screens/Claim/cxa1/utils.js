import moment from 'moment';
import { CLAIM_STATUS } from '@store/claim/constants';

export const getHeaderTitle = ({ intl, statusCode }) => {
  let headerId =
    statusCode === CLAIM_STATUS.REQUEST_FOR_INFORMATION
      ? CLAIM_STATUS.PROCESSING
      : [
          CLAIM_STATUS.APPROVED,
          CLAIM_STATUS.REJECTED,
          CLAIM_STATUS.PROCESSING,
          CLAIM_STATUS.HISTORY,
          CLAIM_STATUS.PAID,
        ].indexOf(statusCode) !== -1
      ? statusCode
      : '';

  if (!headerId) {
    return '';
  }
  return intl.formatMessage({
    id: `claim.claimsListSection.${headerId.toLowerCase()}`,
  });
};

export const integrateClaimDetailSections = (
  intl,
  momentLocale,
  claimTypes,
  {
    statusCode,
    createdOn,
    receiptDate,
    type,
    typeCode,
    reason,
    amount,
    user,
    receiptNumber,
    providerName,
    benefitPlan,
    estimatedPaymentDate,
    paymentDate,

    // TODO - check if using totalReimbursedAmount from approvedAmmount or paymentlist
    approvedAmount: totalReimbursedAmount,
    paymentList,
  },
) => {
  const formatDate = date =>
    date
      ? moment(date)
          .locale(momentLocale)
          .format('ll')
      : '';

  const claimStatus = statusCode.toUpperCase();
  const claimTypeTags = [
    claimTypes[typeCode]?.isTaxable &&
      intl.formatMessage({ id: 'claim.label.taxable' }),
    claimTypes[typeCode]?.cpfContributable &&
      intl.formatMessage({ id: 'claim.label.cpfContributable' }),
  ].filter(Boolean);

  // let totalReimbursedAmount = 0;
  let reimbursedItems = [];

  if (claimStatus !== CLAIM_STATUS.PROCESSING && paymentList?.length > 0) {
    // totalReimbursedAmount = paymentList.reduce(
    //   (total, payment) => total + payment.reimbursedAmount,
    //   totalReimbursedAmount,
    // );

    reimbursedItems = paymentList.map(item => {
      return {
        label: `${intl.formatMessage({ id: 'claim.label.reimbursed' })} ${
          intl.locale === 'zh-HK' ? item.benefitDescSch : item.benefitDescEng
        }`,
        value: intl.formatNumber(item.reimbursedAmount, {
          format: 'money',
        }),
      };
    });
  }

  return [
    claimStatus !== CLAIM_STATUS.REJECTED && {
      title: '',
      items: [
        claimStatus === CLAIM_STATUS.PROCESSING && {
          label: intl.formatMessage({
            id: 'claim.label.claimSubmissionDate',
          }),
          value: formatDate(createdOn),
        },
        claimStatus !== CLAIM_STATUS.PROCESSING && {
          label: intl.formatMessage({
            id: 'claim.label.totalReimbursedAmount',
          }),
          value: intl.formatNumber(totalReimbursedAmount, { format: 'money' }),
        },

        ...reimbursedItems,

        claimStatus !== CLAIM_STATUS.PAID && {
          label: intl.formatMessage({
            id: 'claim.label.estimatedPaymentDate',
          }),
          value: formatDate(estimatedPaymentDate),
        },
        claimStatus === CLAIM_STATUS.PAID && {
          label: intl.formatMessage({
            id: 'claim.label.paymentDate',
          }),
          value: formatDate(paymentDate),
        },
      ].filter(Boolean),
    },
    {
      title: intl.formatMessage({ id: 'claim.section.patientDetails' }),
      items: [
        {
          label: intl.formatMessage({ id: 'claim.label.patientName' }),
          value: user,
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'claim.section.claimDetails' }),
      items: [
        {
          label: intl.formatMessage({ id: 'claim.label.benefitPlan' }),
          value: benefitPlan,
        },
        {
          label: intl.formatMessage({ id: 'claim.label.consultationDate' }),
          value: formatDate(receiptDate),
        },
        {
          label: intl.formatMessage({ id: 'claim.label.providerName' }),
          value: providerName,
        },
        {
          label: intl.formatMessage({ id: 'claim.label.claimType' }),
          value: type,
          tags: claimTypeTags,
        },
        {
          label: intl.formatMessage({ id: 'claim.label.claimReason' }),
          value: reason,
        },
        {
          label: intl.formatMessage({ id: 'claim.label.receiptNumber' }),
          value: receiptNumber,
        },
        {
          label: intl.formatMessage({ id: 'claim.label.receiptAmount' }),
          value: intl.formatNumber(amount, { format: 'money' }),
        },
      ],
    },
  ].filter(Boolean);
};

export const integrateClaimDocuments = (
  intl,
  { referrals = [], receipts = [], settlementAdvices = [], prescriptions = [] },
) => {
  const documentType = intl.formatMessage({
    id: 'uploadBox.accessibilityLabel.type.document',
  });

  return [
    receipts.length && {
      title: intl.formatMessage({ id: 'claim.section.receipts' }),
      items: receipts,
      field: intl.formatMessage({ id: 'claim.section.receipts' }),
      isDocumentSection: true,
      documentType,
    },
    referrals.length && {
      title: intl.formatMessage({ id: 'claim.section.referrals' }),
      items: referrals,
      field: intl.formatMessage({ id: 'claim.section.referrals' }),
      isDocumentSection: true,
      documentType,
    },
    settlementAdvices.length && {
      title: intl.formatMessage({ id: 'claim.section.settlementAdvices' }),
      items: settlementAdvices,
      field: intl.formatMessage({ id: 'claim.section.settlementAdvices' }),
      isDocumentSection: true,
      documentType,
    },
    prescriptions.length && {
      title: intl.formatMessage({ id: 'claim.section.prescriptions' }),
      items: prescriptions,
      field: intl.formatMessage({ id: 'claim.section.prescriptions' }),
      isDocumentSection: true,
      documentType,
    },
  ].filter(Boolean);
};
