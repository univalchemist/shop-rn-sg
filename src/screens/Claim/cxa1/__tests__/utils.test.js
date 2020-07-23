import {
  getHeaderTitle,
  integrateClaimDetailSections,
  integrateClaimDocuments,
} from '../utils';

jest.mock('moment', () =>
  jest.fn(() => ({
    locale: () => ({
      format: () => '01-04-2019',
    }),
  })),
);

const claimTypes = {
  TEST: {},
};

const claimData = {
  statusCode: 'PROCESSING',
  createdOn: '2019-01-12',
  receiptDate: '2019-01-11',
  type: 'mock type data',
  typeCode: 'MOCK_TYPE_CODE',
  reason: 'mock reason data',
  amount: 100,
  user: 'mock user',
  receiptNumber: '21312',
  providerName: 'mock provider data',
  benefitPlan: '2020',
  estimatedPaymentDate: '2019-01-12',
  paymentDate: '2019-01-12',
};

describe('Claim Utils', () => {
  it('should get header title by status', () => {
    const intl = { formatMessage: jest.fn(({ id }) => id) };
    let actual = getHeaderTitle({ intl, statusCode: 'PROCESSING' });
    expect(actual).toEqual('claim.claimsListSection.processing');

    actual = getHeaderTitle({ intl, statusCode: 'REQUEST FOR INFORMATION' });
    expect(actual).toEqual('claim.claimsListSection.processing');

    actual = getHeaderTitle({ intl, statusCode: 'Other' });
    expect(actual).toEqual('');
  });

  it('should integrate claim details', () => {
    const intl = { formatMessage: ({ id }) => id, formatNumber: num => num };
    const momentLocale = 'en-HK';

    const actual = integrateClaimDetailSections(
      intl,
      momentLocale,
      {
        MOCK_TYPE_CODE: {
          isTaxable: true,
          cpfContributable: true,
        },
      },
      claimData,
    );

    const expected = [
      {
        title: '',
        items: [
          { label: 'claim.label.claimSubmissionDate', value: '01-04-2019' },
          { label: 'claim.label.estimatedPaymentDate', value: '01-04-2019' },
        ],
      },
      {
        title: 'claim.section.patientDetails',
        items: [{ label: 'claim.label.patientName', value: 'mock user' }],
      },
      {
        title: 'claim.section.claimDetails',
        items: [
          { label: 'claim.label.benefitPlan', value: '2020' },
          { label: 'claim.label.consultationDate', value: '01-04-2019' },
          { label: 'claim.label.providerName', value: 'mock provider data' },
          {
            label: 'claim.label.claimType',
            value: 'mock type data',
            tags: ['claim.label.taxable', 'claim.label.cpfContributable'],
          },
          { label: 'claim.label.claimReason', value: 'mock reason data' },
          { label: 'claim.label.receiptNumber', value: '21312' },
          { label: 'claim.label.receiptAmount', value: 100 },
        ],
      },
    ];
    expect(actual).toEqual(expected);
  });

  it('should integrate claim details with paid status', () => {
    const intl = { formatMessage: ({ id }) => id, formatNumber: num => num };
    const momentLocale = 'en-HK';

    const actual = integrateClaimDetailSections(
      intl,
      momentLocale,
      claimTypes,
      {
        ...claimData,
        statusCode: 'PAID',
        approvedAmount: 200,
        paymentList: [
          {
            benefitDescEng: 'ACUPUNCTURE',
            benefitDescSch: '針灸',
            reimbursedCurrency: 'HK$',
            reimbursedAmount: 120.0,
          },
          {
            benefitDescEng: 'CHILDBIRTH',
            benefitDescSch: '產科,',
            reimbursedCurrency: 'HK$',
            reimbursedAmount: 80.0,
          },
        ],
      },
    );

    const expected = [
      {
        title: '',
        items: [
          { label: 'claim.label.totalReimbursedAmount', value: 200 },
          { label: 'claim.label.reimbursed ACUPUNCTURE', value: 120 },
          { label: 'claim.label.reimbursed CHILDBIRTH', value: 80 },
          { label: 'claim.label.paymentDate', value: '01-04-2019' },
        ],
      },
      {
        title: 'claim.section.patientDetails',
        items: [{ label: 'claim.label.patientName', value: 'mock user' }],
      },
      {
        title: 'claim.section.claimDetails',
        items: [
          { label: 'claim.label.benefitPlan', value: '2020' },
          { label: 'claim.label.consultationDate', value: '01-04-2019' },
          { label: 'claim.label.providerName', value: 'mock provider data' },
          { label: 'claim.label.claimType', value: 'mock type data', tags: [] },
          { label: 'claim.label.claimReason', value: 'mock reason data' },
          { label: 'claim.label.receiptNumber', value: '21312' },
          { label: 'claim.label.receiptAmount', value: 100 },
        ],
      },
    ];
    expect(actual).toEqual(expected);
  });

  it('should integrate claim details with approved status in chinese', () => {
    const intl = {
      locale: 'zh-HK',
      formatMessage: ({ id }) => id,
      formatNumber: num => num,
    };
    const momentLocale = 'en-HK';

    const actual = integrateClaimDetailSections(
      intl,
      momentLocale,
      claimTypes,
      {
        ...claimData,
        statusCode: 'APPROVED',
        approvedAmount: 200,
        paymentList: [
          {
            benefitDescEng: 'ACUPUNCTURE',
            benefitDescSch: '針灸',
            reimbursedCurrency: 'HK$',
            reimbursedAmount: 120.0,
          },
          {
            benefitDescEng: 'CHILDBIRTH',
            benefitDescSch: '產科',
            reimbursedCurrency: 'HK$',
            reimbursedAmount: 80.0,
          },
        ],
      },
    );

    const expected = [
      {
        title: '',
        items: [
          { label: 'claim.label.totalReimbursedAmount', value: 200 },
          { label: 'claim.label.reimbursed 針灸', value: 120 },
          { label: 'claim.label.reimbursed 產科', value: 80 },
          { label: 'claim.label.estimatedPaymentDate', value: '01-04-2019' },
        ],
      },
      {
        title: 'claim.section.patientDetails',
        items: [{ label: 'claim.label.patientName', value: 'mock user' }],
      },
      {
        title: 'claim.section.claimDetails',
        items: [
          { label: 'claim.label.benefitPlan', value: '2020' },
          { label: 'claim.label.consultationDate', value: '01-04-2019' },
          { label: 'claim.label.providerName', value: 'mock provider data' },
          { label: 'claim.label.claimType', value: 'mock type data', tags: [] },
          { label: 'claim.label.claimReason', value: 'mock reason data' },
          { label: 'claim.label.receiptNumber', value: '21312' },
          { label: 'claim.label.receiptAmount', value: 100 },
        ],
      },
    ];
    expect(actual).toEqual(expected);
  });

  it('should not show reimbursed data with processing status', () => {
    const intl = { formatMessage: ({ id }) => id, formatNumber: num => num };
    const momentLocale = 'en-HK';

    const actual = integrateClaimDetailSections(
      intl,
      momentLocale,
      claimTypes,
      {
        ...claimData,
        estimatedPaymentDate: undefined,
        statusCode: 'PROCESSING',
        approvedAmount: 200,
        paymentList: [
          {
            benefitDescEng: 'ACUPUNCTURE',
            benefitDescSch: '針灸',
            reimbursedCurrency: 'HK$',
            reimbursedAmount: 120.0,
          },
          {
            benefitDescEng: 'CHILDBIRTH',
            benefitDescSch: '產科,',
            reimbursedCurrency: 'HK$',
            reimbursedAmount: 80.0,
          },
        ],
      },
    );

    const expected = [
      {
        title: '',
        items: [
          { label: 'claim.label.claimSubmissionDate', value: '01-04-2019' },
          { label: 'claim.label.estimatedPaymentDate', value: '' },
        ],
      },
      {
        title: 'claim.section.patientDetails',
        items: [{ label: 'claim.label.patientName', value: 'mock user' }],
      },
      {
        title: 'claim.section.claimDetails',
        items: [
          { label: 'claim.label.benefitPlan', value: '2020' },
          { label: 'claim.label.consultationDate', value: '01-04-2019' },
          { label: 'claim.label.providerName', value: 'mock provider data' },
          { label: 'claim.label.claimType', value: 'mock type data', tags: [] },
          { label: 'claim.label.claimReason', value: 'mock reason data' },
          { label: 'claim.label.receiptNumber', value: '21312' },
          { label: 'claim.label.receiptAmount', value: 100 },
        ],
      },
    ];
    expect(actual).toEqual(expected);
  });

  it('should integrate claim documents', () => {
    const intl = { formatMessage: jest.fn(({ id }) => id) };
    const actual = integrateClaimDocuments(intl, {
      referrals: [{ item: 'test 1' }, { item: 'test 2' }],
      receipts: [{ item: 'test 1' }],
      settlementAdvices: [{ item: 'test 1' }],
      prescriptions: [{ item: 'test 1' }, { item: 'test 2' }],
    });

    const expected = [
      {
        title: 'claim.section.receipts',
        items: [{ item: 'test 1' }],
        field: 'claim.section.receipts',
        isDocumentSection: true,
        documentType: 'uploadBox.accessibilityLabel.type.document',
      },
      {
        title: 'claim.section.referrals',
        items: [{ item: 'test 1' }, { item: 'test 2' }],
        field: 'claim.section.referrals',
        isDocumentSection: true,
        documentType: 'uploadBox.accessibilityLabel.type.document',
      },
      {
        title: 'claim.section.settlementAdvices',
        items: [{ item: 'test 1' }],
        field: 'claim.section.settlementAdvices',
        isDocumentSection: true,
        documentType: 'uploadBox.accessibilityLabel.type.document',
      },
      {
        title: 'claim.section.prescriptions',
        items: [{ item: 'test 1' }, { item: 'test 2' }],
        field: 'claim.section.prescriptions',
        isDocumentSection: true,
        documentType: 'uploadBox.accessibilityLabel.type.document',
      },
    ];

    expect(actual).toEqual(expected);
  });

  it('should integrate empty claim documents', () => {
    const intl = { formatMessage: jest.fn(({ id }) => id) };
    const actual = integrateClaimDocuments(intl, {});
    const expected = [];
    expect(actual).toEqual(expected);
  });
});
