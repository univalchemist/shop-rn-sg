import reducer from '../reducer';
import * as types from '../types';

const initialState = reducer(undefined, {});

describe('Benefit reducer', () => {
  it('should return the initialState', () => {
    const expectedState = {
      byMemberId: {},
      policy: {},
      coPayments: {},
      coPaymentsText: {},
      healthcards: [],
      plansById: {},
      documents: [],
      cxa1Benefit: {
        benefits: [],
        planPeriod: null,
        planPeriodsList: [],
        statementDate: null,
      },
    };
    expect(reducer(undefined, {})).toEqual(expectedState);
  });

  it('should handle FETCH_BENEFITS_SUCCESS', () => {
    const initialState = {
      policy: {
        policyNumber: '10288801GH',
        insurer: {
          code: 2251,
          name: 'HSBC Insurance',
        },
        expiryDate: '2019-12-31T00:00:00',
        initialDate: '2019-01-01T00:00:00',
        plans: {
          1: {
            name: 'I',
            products: [
              {
                name: 'Outpatient',
                panelLabel: '100% coverage',
                nonPanelLabel: '80% reimbursement',
                freeChoiceLabel: null,
                ehealthcard: true,
                services: [
                  {
                    name: 'General medical practitioner',
                    id: 'GP',
                    metaText: 'Consultation inclusive of medications',
                    details: [
                      {
                        coPayment: 50,
                        coPaymentText: 'HK$50',
                        description: '',
                        panelVisit: '$20 co-payment per visit',
                        nonPanelVisit: 'Up to $750 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 30,
                          limit: 30,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Specialist',
                    id: 'SP',
                    metaText:
                      'Consultation inclusive of medications, referral required¹',
                    details: [
                      {
                        coPayment: 20,
                        coPaymentText: 'HK$20',
                        description: '',
                        panelVisit: '$20 co-payment per visit',
                        nonPanelVisit: 'Up to $1,200 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 20,
                          limit: 20,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Physiotherapy',
                    id: 'PHY',
                    metaText:
                      'Includes occupational therapy, referral required¹',
                    details: [
                      {
                        coPayment: 20,
                        coPaymentText: 'HK$20',
                        description: '',
                        panelVisit:
                          '$20 co-payment per visit, referral by panel doctor',
                        nonPanelVisit: 'Up to $750 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 25,
                          limit: 25,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Mental illness & emotional disorder',
                    id: 'MIED',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: '',
                        panelVisit: '$20 co-payment per visit',
                        nonPanelVisit: 'Up to $2,000 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 25,
                          limit: 25,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Diagnostic x-ray, laboratory tests & imaging',
                    id: 'DXRAY',
                    metaText: 'Referral required¹',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: '',
                        panelVisit: 'Referral by panel doctor',
                        nonPanelVisit: 'Up to $5,000 per year',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: "Medication purchased outside doctor's clinic",
                    id: 'MED',
                    metaText: 'Prescription required¹',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: '',
                        panelVisit:
                          'Max 2 month’s supply for per visit to panel doctor',
                        nonPanelVisit: 'Up to $4,000 per year',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote:
                  '¹ Written referral (except for those waived under “Specialist consultation” of Section 5) / prescription is required from a registered medical practitioner in western medicine.',
                productType: 'Outpatient',
              },
              {
                name: 'Hospital and Surgical',
                panelLabel: '100% coverage',
                nonPanelLabel: '80% reimbursement',
                freeChoiceLabel: null,
                ehealthcard: false,
                services: [
                  {
                    name: 'Room, board & general nursing care',
                    id: 'RB',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per day',
                        panelVisit: 'Basic private ward',
                        nonPanelVisit: '$3200',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max days per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '100',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Intensive care',
                    id: 'IC',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$62,400',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Meal subsidy',
                    id: 'MS',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per day',
                        panelVisit:
                          '$200 (if meal is not included in the room & board charge)',
                        nonPanelVisit: 'Under room & board benefit limit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Hospital services',
                    id: 'HS',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$65,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Physician services³',
                    id: 'PS',
                    metaText: 'Non-surgical case only',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per day',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$3,200',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '100',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'In-hospital specialist fees',
                    id: 'IHSF',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$13,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Surgeon fees',
                    id: 'SF',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Complex',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$240,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Major',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$96,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Inter',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$48,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Minor',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$19,200',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: "Anaesthetist's fees",
                    id: 'AF',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Complex',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$72,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Major',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$28,800',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Inter',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$14,400',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Minor',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$5,760',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Operating theatre charge',
                    id: 'OTC',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Complex',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$72,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Major',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$28,800',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Inter',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$14,400',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Minor',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$5,760',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Annual overall limit⁴',
                    id: 'AOL',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: '',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$1,500,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote:
                  '² Disability means injury, sickness, disease or illness and shall include all disabilities rising from the same cause including any and all complications arising therefrom, except that where after 90 days following the latest medical treatment or consultation no further treatment for that disability is required, any subsequent disability from the same cause shall be considered a separate disability.\n\n³ Visit(s) by Registered Medical Practitioner other than Surgeon(s) who perform(s) the operation(s). No payment shall be made for visits or treatment related to the Disability which required such operation or during convalescence.\n\n⁴ An annual overall limit means the aggregate sum of benefits during the twelve months period measured from the commencement date of each plan year.',
                productType: 'HospitalSurgical',
              },
              {
                name: 'Supplemental major medical',
                panelLabel: '100% coverage',
                nonPanelLabel: '70% reimbursement',
                freeChoiceLabel: null,
                ehealthcard: false,
                services: [
                  {
                    name: 'Supplmentary major medical',
                    id: 'SMM',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$400,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote: null,
                productType: 'SupplementalMajorMedical',
              },
              {
                name: 'Maternity subsidy',
                panelLabel: null,
                nonPanelLabel: null,
                freeChoiceLabel: '80% reimbursement',
                ehealthcard: false,
                services: [
                  {
                    name: 'Antenatal / post-natal check up',
                    id: 'ANT',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Consultation inclusive of medicine',
                        panelVisit: null,
                        nonPanelVisit: 'Up to $1,200 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max number of visits per pregnancy',
                        panelVisit: null,
                        nonPanelVisit: '20',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Lump sum benefit max limit per pregnancy',
                    id: 'LUMP',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: '',
                        panelVisit: null,
                        nonPanelVisit: '$75,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote: null,
                productType: 'MaternitySubsidy',
              },
              {
                name: 'Wellness claim amount',
                panelLabel: null,
                nonPanelLabel: null,
                freeChoiceLabel: '100% reimbursement',
                ehealthcard: false,
                services: [
                  {
                    name: 'Max limit',
                    id: 'MAX',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: null,
                        panelVisit: null,
                        nonPanelVisit: '$8,0000 per year per member',
                        annualLimit: 80000.0,
                        forRelationship: 'Employee',
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: null,
                        panelVisit: null,
                        nonPanelVisit: '$80000 per year per member',
                        annualLimit: 80000.0,
                        forRelationship: 'Spouse',
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: null,
                        panelVisit: null,
                        nonPanelVisit: '$40000 per year per member',
                        annualLimit: 40000.0,
                        forRelationship: 'Child',
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote: null,
                productType: 'WellnessFlexibleSpending',
              },
            ],
          },
          2: {
            name: 'I',
            products: [
              {
                name: 'Outpatient',
                panelLabel: '100% coverage',
                nonPanelLabel: '80% reimbursement',
                freeChoiceLabel: null,
                ehealthcard: true,
                services: [
                  {
                    name: 'General medical practitioner',
                    id: 'GP',
                    metaText: 'Consultation inclusive of medications',
                    details: [
                      {
                        coPayment: 50,
                        coPaymentText: 'HK$50',
                        description: '',
                        panelVisit: '$20 co-payment per visit',
                        nonPanelVisit: 'Up to $750 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 30,
                          limit: 30,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Specialist',
                    id: 'SP',
                    metaText:
                      'Consultation inclusive of medications, referral required¹',
                    details: [
                      {
                        coPayment: 20,
                        coPaymentText: 'HK$20',
                        description: '',
                        panelVisit: '$20 co-payment per visit',
                        nonPanelVisit: 'Up to $1,200 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 20,
                          limit: 20,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Physiotherapy',
                    id: 'PHY',
                    metaText:
                      'Includes occupational therapy, referral required¹',
                    details: [
                      {
                        coPayment: 20,
                        coPaymentText: 'HK$20',
                        description: '',
                        panelVisit:
                          '$20 co-payment per visit, referral by panel doctor',
                        nonPanelVisit: 'Up to $750 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 25,
                          limit: 25,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Mental illness & emotional disorder',
                    id: 'MIED',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: '',
                        panelVisit: '$20 co-payment per visit',
                        nonPanelVisit: 'Up to $2,000 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 25,
                          limit: 25,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Diagnostic x-ray, laboratory tests & imaging',
                    id: 'DXRAY',
                    metaText: 'Referral required¹',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: '',
                        panelVisit: 'Referral by panel doctor',
                        nonPanelVisit: 'Up to $5,000 per year',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: "Medication purchased outside doctor's clinic",
                    id: 'MED',
                    metaText: 'Prescription required¹',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: '',
                        panelVisit:
                          'Max 2 month’s supply for per visit to panel doctor',
                        nonPanelVisit: 'Up to $4,000 per year',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote:
                  '¹ Written referral (except for those waived under “Specialist consultation” of Section 5) / prescription is required from a registered medical practitioner in western medicine.',
                productType: 'Outpatient',
              },
              {
                name: 'Hospital and Surgical',
                panelLabel: '100% coverage',
                nonPanelLabel: '80% reimbursement',
                freeChoiceLabel: null,
                ehealthcard: false,
                services: [
                  {
                    name: 'Room, board & general nursing care',
                    id: 'RB',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per day',
                        panelVisit: 'Basic private ward',
                        nonPanelVisit: '$3200',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max days per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '100',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Intensive care',
                    id: 'IC',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$62,400',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Meal subsidy',
                    id: 'MS',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per day',
                        panelVisit:
                          '$200 (if meal is not included in the room & board charge)',
                        nonPanelVisit: 'Under room & board benefit limit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Hospital services',
                    id: 'HS',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$65,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Physician services³',
                    id: 'PS',
                    metaText: 'Non-surgical case only',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per day',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$3,200',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '100',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'In-hospital specialist fees',
                    id: 'IHSF',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$13,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Surgeon fees',
                    id: 'SF',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Complex',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$240,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Major',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$96,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Inter',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$48,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Minor',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$19,200',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: "Anaesthetist's fees",
                    id: 'AF',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Complex',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$72,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Major',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$28,800',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Inter',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$14,400',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Minor',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$5,760',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Operating theatre charge',
                    id: 'OTC',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Complex',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$72,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Major',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$28,800',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Inter',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$14,400',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability - Minor',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$5,760',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Annual overall limit⁴',
                    id: 'AOL',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: '',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$1,500,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote:
                  '² Disability means injury, sickness, disease or illness and shall include all disabilities rising from the same cause including any and all complications arising therefrom, except that where after 90 days following the latest medical treatment or consultation no further treatment for that disability is required, any subsequent disability from the same cause shall be considered a separate disability.\n\n³ Visit(s) by Registered Medical Practitioner other than Surgeon(s) who perform(s) the operation(s). No payment shall be made for visits or treatment related to the Disability which required such operation or during convalescence.\n\n⁴ An annual overall limit means the aggregate sum of benefits during the twelve months period measured from the commencement date of each plan year.',
                productType: 'HospitalSurgical',
              },
              {
                name: 'Supplemental major medical',
                panelLabel: '100% coverage',
                nonPanelLabel: '70% reimbursement',
                freeChoiceLabel: null,
                ehealthcard: false,
                services: [
                  {
                    name: 'Supplmentary major medical',
                    id: 'SMM',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max limit per disability',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$400,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote: null,
                productType: 'SupplementalMajorMedical',
              },
              {
                name: 'Maternity subsidy',
                panelLabel: null,
                nonPanelLabel: null,
                freeChoiceLabel: '80% reimbursement',
                ehealthcard: false,
                services: [
                  {
                    name: 'Antenatal / post-natal check up',
                    id: 'ANT',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Consultation inclusive of medicine',
                        panelVisit: null,
                        nonPanelVisit: 'Up to $1,200 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: 'Max number of visits per pregnancy',
                        panelVisit: null,
                        nonPanelVisit: '20',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Lump sum benefit max limit per pregnancy',
                    id: 'LUMP',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: '',
                        panelVisit: null,
                        nonPanelVisit: '$75,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote: null,
                productType: 'MaternitySubsidy',
              },
              {
                name: 'Wellness claim amount',
                panelLabel: null,
                nonPanelLabel: null,
                freeChoiceLabel: '100% reimbursement',
                ehealthcard: false,
                services: [
                  {
                    name: 'Max limit',
                    id: 'MAX',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: null,
                        panelVisit: null,
                        nonPanelVisit: '$8,0000 per year per member',
                        annualLimit: 80000.0,
                        forRelationship: 'Employee',
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: null,
                        panelVisit: null,
                        nonPanelVisit: '$80000 per year per member',
                        annualLimit: 80000.0,
                        forRelationship: 'Spouse',
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        coPaymentText: null,
                        description: null,
                        panelVisit: null,
                        nonPanelVisit: '$40000 per year per member',
                        annualLimit: 40000.0,
                        forRelationship: 'Child',
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote: null,
                productType: 'WellnessFlexibleSpending',
              },
            ],
          },
        },
      },
    };
    const expectedState = {
      ...initialState,
      byMemberId: {
        '3': {
          memberId: '3',
          membershipNumber: '0000123',
          certificateNumber: '0000123',
          planId: 1,
          checkpointVisits: [],
        },
        '111': {
          memberId: '111',
          membershipNumber: '0000124',
          certificateNumber: '0000124',
          planId: 2,
          checkpointVisits: [],
        },
        '112': {
          memberId: '112',
          membershipNumber: '0000125',
          certificateNumber: '0000125',
          planId: 2,
          checkpointVisits: [],
        },
      },
      coPayments: {
        1: { GP: 50, SP: 20, PHY: 20 },
        2: { GP: 50, SP: 20, PHY: 20 },
      },
      coPaymentsText: {
        1: { GP: 'HK$50', SP: 'HK$20', PHY: 'HK$20' },
        2: { GP: 'HK$50', SP: 'HK$20', PHY: 'HK$20' },
      },
    };

    const action = {
      type: types.FETCH_BENEFITS_SUCCESS,
      payload: {
        member: {
          memberId: '3',
          membershipNumber: '0000123',
          certificateNumber: '0000123',
          planId: 1,
          checkpointVisits: [],
        },
        relationships: [
          {
            memberId: '111',
            membershipNumber: '0000124',
            certificateNumber: '0000124',
            planId: 2,
            checkpointVisits: [],
          },
          {
            memberId: '112',
            membershipNumber: '0000125',
            certificateNumber: '0000125',
            planId: 2,
            checkpointVisits: [],
          },
        ],
      },
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_POLICY_DETAILS_SUCCESS', () => {
    const expectedState = {
      ...initialState,
      policy: {
        policyNumber: '10288801GH',
        insurer: {
          code: 2251,
          name: 'HSBC Insurance',
        },
        expiryDate: '2019-12-31T00:00:00',
        initialDate: '2019-01-01T00:00:00',
        plans: {
          1: {
            name: 'I',
            products: [
              {
                name: 'Outpatient',
                panelLabel: '100% coverage',
                nonPanelLabel: '80% reimbursement',
                freeChoiceLabel: null,
                ehealthcard: true,
                services: [
                  {
                    name: 'General medical practitioner',
                    id: 'GP',
                    metaText: 'Consultation inclusive of medications',
                    details: [
                      {
                        coPayment: 50,
                        description: '',
                        panelVisit: '$20 co-payment per visit',
                        nonPanelVisit: 'Up to $750 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 30,
                          limit: 30,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Specialist',
                    id: 'SP',
                    metaText:
                      'Consultation inclusive of medications, referral required¹',
                    details: [
                      {
                        coPayment: 20,
                        description: '',
                        panelVisit: '$20 co-payment per visit',
                        nonPanelVisit: 'Up to $1,200 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 20,
                          limit: 20,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Physiotherapy',
                    id: 'PHY',
                    metaText:
                      'Includes occupational therapy, referral required¹',
                    details: [
                      {
                        coPayment: 20,
                        description: '',
                        panelVisit:
                          '$20 co-payment per visit, referral by panel doctor',
                        nonPanelVisit: 'Up to $750 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 25,
                          limit: 25,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Mental illness & emotional disorder',
                    id: 'MIED',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: '',
                        panelVisit: '$20 co-payment per visit',
                        nonPanelVisit: 'Up to $2,000 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 25,
                          limit: 25,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Diagnostic x-ray, laboratory tests & imaging',
                    id: 'DXRAY',
                    metaText: 'Referral required¹',
                    details: [
                      {
                        coPayment: null,
                        description: '',
                        panelVisit: 'Referral by panel doctor',
                        nonPanelVisit: 'Up to $5,000 per year',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: "Medication purchased outside doctor's clinic",
                    id: 'MED',
                    metaText: 'Prescription required¹',
                    details: [
                      {
                        coPayment: null,
                        description: '',
                        panelVisit:
                          'Max 2 month’s supply for per visit to panel doctor',
                        nonPanelVisit: 'Up to $4,000 per year',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote:
                  '¹ Written referral (except for those waived under “Specialist consultation” of Section 5) / prescription is required from a registered medical practitioner in western medicine.',
                productType: 'Outpatient',
              },
              {
                name: 'Hospital and Surgical',
                panelLabel: '100% coverage',
                nonPanelLabel: '80% reimbursement',
                freeChoiceLabel: null,
                ehealthcard: false,
                services: [
                  {
                    name: 'Room, board & general nursing care',
                    id: 'RB',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per day',
                        panelVisit: 'Basic private ward',
                        nonPanelVisit: '$3200',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max days per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '100',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Intensive care',
                    id: 'IC',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$62,400',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Meal subsidy',
                    id: 'MS',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per day',
                        panelVisit:
                          '$200 (if meal is not included in the room & board charge)',
                        nonPanelVisit: 'Under room & board benefit limit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Hospital services',
                    id: 'HS',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$65,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Physician services³',
                    id: 'PS',
                    metaText: 'Non-surgical case only',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per day',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$3,200',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '100',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'In-hospital specialist fees',
                    id: 'IHSF',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$13,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Surgeon fees',
                    id: 'SF',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Complex',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$240,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Major',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$96,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Inter',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$48,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Minor',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$19,200',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: "Anaesthetist's fees",
                    id: 'AF',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Complex',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$72,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Major',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$28,800',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Inter',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$14,400',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Minor',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$5,760',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Operating theatre charge',
                    id: 'OTC',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Complex',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$72,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Major',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$28,800',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Inter',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$14,400',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Minor',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$5,760',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Annual overall limit⁴',
                    id: 'AOL',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: '',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$1,500,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote:
                  '² Disability means injury, sickness, disease or illness and shall include all disabilities rising from the same cause including any and all complications arising therefrom, except that where after 90 days following the latest medical treatment or consultation no further treatment for that disability is required, any subsequent disability from the same cause shall be considered a separate disability.\n\n³ Visit(s) by Registered Medical Practitioner other than Surgeon(s) who perform(s) the operation(s). No payment shall be made for visits or treatment related to the Disability which required such operation or during convalescence.\n\n⁴ An annual overall limit means the aggregate sum of benefits during the twelve months period measured from the commencement date of each plan year.',
                productType: 'HospitalSurgical',
              },
              {
                name: 'Supplemental major medical',
                panelLabel: '100% coverage',
                nonPanelLabel: '70% reimbursement',
                freeChoiceLabel: null,
                ehealthcard: false,
                services: [
                  {
                    name: 'Supplmentary major medical',
                    id: 'SMM',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$400,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote: null,
                productType: 'SupplementalMajorMedical',
              },
              {
                name: 'Maternity subsidy',
                panelLabel: null,
                nonPanelLabel: null,
                freeChoiceLabel: '80% reimbursement',
                ehealthcard: false,
                services: [
                  {
                    name: 'Antenatal / post-natal check up',
                    id: 'ANT',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Consultation inclusive of medicine',
                        panelVisit: null,
                        nonPanelVisit: 'Up to $1,200 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max number of visits per pregnancy',
                        panelVisit: null,
                        nonPanelVisit: '20',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Lump sum benefit max limit per pregnancy',
                    id: 'LUMP',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: '',
                        panelVisit: null,
                        nonPanelVisit: '$75,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote: null,
                productType: 'MaternitySubsidy',
              },
              {
                name: 'Wellness claim amount',
                panelLabel: null,
                nonPanelLabel: null,
                freeChoiceLabel: '100% reimbursement',
                ehealthcard: false,
                services: [
                  {
                    name: 'Max limit',
                    id: 'MAX',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: null,
                        panelVisit: null,
                        nonPanelVisit: '$8,0000 per year per member',
                        annualLimit: 80000.0,
                        forRelationship: 'Employee',
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: null,
                        panelVisit: null,
                        nonPanelVisit: '$80000 per year per member',
                        annualLimit: 80000.0,
                        forRelationship: 'Spouse',
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: null,
                        panelVisit: null,
                        nonPanelVisit: '$40000 per year per member',
                        annualLimit: 40000.0,
                        forRelationship: 'Child',
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote: null,
                productType: 'WellnessFlexibleSpending',
              },
            ],
          },
        },
      },
    };

    const action = {
      type: types.FETCH_POLICY_DETAILS_SUCCESS,
      payload: {
        policyNumber: '10288801GH',
        insurer: {
          code: 2251,
          name: 'HSBC Insurance',
        },
        expiryDate: '2019-12-31T00:00:00',
        initialDate: '2019-01-01T00:00:00',
        plans: [
          {
            id: 1,
            name: 'I',
            products: [
              {
                name: 'Outpatient',
                panelLabel: '100% coverage',
                nonPanelLabel: '80% reimbursement',
                freeChoiceLabel: null,
                ehealthcard: true,
                services: [
                  {
                    name: 'General medical practitioner',
                    id: 'GP',
                    metaText: 'Consultation inclusive of medications',
                    details: [
                      {
                        coPayment: 50,
                        description: '',
                        panelVisit: '$20 co-payment per visit',
                        nonPanelVisit: 'Up to $750 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 30,
                          limit: 30,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Specialist',
                    id: 'SP',
                    metaText:
                      'Consultation inclusive of medications, referral required¹',
                    details: [
                      {
                        coPayment: 20,
                        description: '',
                        panelVisit: '$20 co-payment per visit',
                        nonPanelVisit: 'Up to $1,200 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 20,
                          limit: 20,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Physiotherapy',
                    id: 'PHY',
                    metaText:
                      'Includes occupational therapy, referral required¹',
                    details: [
                      {
                        coPayment: 20,
                        description: '',
                        panelVisit:
                          '$20 co-payment per visit, referral by panel doctor',
                        nonPanelVisit: 'Up to $750 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 25,
                          limit: 25,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Mental illness & emotional disorder',
                    id: 'MIED',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: '',
                        panelVisit: '$20 co-payment per visit',
                        nonPanelVisit: 'Up to $2,000 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: {
                          active: 25,
                          limit: 25,
                        },
                      },
                    ],
                  },
                  {
                    name: 'Diagnostic x-ray, laboratory tests & imaging',
                    id: 'DXRAY',
                    metaText: 'Referral required¹',
                    details: [
                      {
                        coPayment: null,
                        description: '',
                        panelVisit: 'Referral by panel doctor',
                        nonPanelVisit: 'Up to $5,000 per year',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: "Medication purchased outside doctor's clinic",
                    id: 'MED',
                    metaText: 'Prescription required¹',
                    details: [
                      {
                        coPayment: null,
                        description: '',
                        panelVisit:
                          'Max 2 month’s supply for per visit to panel doctor',
                        nonPanelVisit: 'Up to $4,000 per year',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote:
                  '¹ Written referral (except for those waived under “Specialist consultation” of Section 5) / prescription is required from a registered medical practitioner in western medicine.',
                productType: 'Outpatient',
              },
              {
                name: 'Hospital and Surgical',
                panelLabel: '100% coverage',
                nonPanelLabel: '80% reimbursement',
                freeChoiceLabel: null,
                ehealthcard: false,
                services: [
                  {
                    name: 'Room, board & general nursing care',
                    id: 'RB',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per day',
                        panelVisit: 'Basic private ward',
                        nonPanelVisit: '$3200',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max days per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '100',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Intensive care',
                    id: 'IC',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$62,400',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Meal subsidy',
                    id: 'MS',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per day',
                        panelVisit:
                          '$200 (if meal is not included in the room & board charge)',
                        nonPanelVisit: 'Under room & board benefit limit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Hospital services',
                    id: 'HS',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$65,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Physician services³',
                    id: 'PS',
                    metaText: 'Non-surgical case only',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per day',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$3,200',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '100',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'In-hospital specialist fees',
                    id: 'IHSF',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability²',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$13,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Surgeon fees',
                    id: 'SF',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Complex',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$240,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Major',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$96,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Inter',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$48,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Minor',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$19,200',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: "Anaesthetist's fees",
                    id: 'AF',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Complex',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$72,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Major',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$28,800',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Inter',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$14,400',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Minor',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$5,760',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Operating theatre charge',
                    id: 'OTC',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Complex',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$72,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Major',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$28,800',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Inter',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$14,400',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max limit per disability - Minor',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$5,760',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Annual overall limit⁴',
                    id: 'AOL',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: '',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$1,500,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote:
                  '² Disability means injury, sickness, disease or illness and shall include all disabilities rising from the same cause including any and all complications arising therefrom, except that where after 90 days following the latest medical treatment or consultation no further treatment for that disability is required, any subsequent disability from the same cause shall be considered a separate disability.\n\n³ Visit(s) by Registered Medical Practitioner other than Surgeon(s) who perform(s) the operation(s). No payment shall be made for visits or treatment related to the Disability which required such operation or during convalescence.\n\n⁴ An annual overall limit means the aggregate sum of benefits during the twelve months period measured from the commencement date of each plan year.',
                productType: 'HospitalSurgical',
              },
              {
                name: 'Supplemental major medical',
                panelLabel: '100% coverage',
                nonPanelLabel: '70% reimbursement',
                freeChoiceLabel: null,
                ehealthcard: false,
                services: [
                  {
                    name: 'Supplmentary major medical',
                    id: 'SMM',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Max limit per disability',
                        panelVisit: 'N/A',
                        nonPanelVisit: '$400,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote: null,
                productType: 'SupplementalMajorMedical',
              },
              {
                name: 'Maternity subsidy',
                panelLabel: null,
                nonPanelLabel: null,
                freeChoiceLabel: '80% reimbursement',
                ehealthcard: false,
                services: [
                  {
                    name: 'Antenatal / post-natal check up',
                    id: 'ANT',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: 'Consultation inclusive of medicine',
                        panelVisit: null,
                        nonPanelVisit: 'Up to $1,200 per visit',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: 'Max number of visits per pregnancy',
                        panelVisit: null,
                        nonPanelVisit: '20',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                  {
                    name: 'Lump sum benefit max limit per pregnancy',
                    id: 'LUMP',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: '',
                        panelVisit: null,
                        nonPanelVisit: '$75,000',
                        annualLimit: null,
                        forRelationship: null,
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote: null,
                productType: 'MaternitySubsidy',
              },
              {
                name: 'Wellness claim amount',
                panelLabel: null,
                nonPanelLabel: null,
                freeChoiceLabel: '100% reimbursement',
                ehealthcard: false,
                services: [
                  {
                    name: 'Max limit',
                    id: 'MAX',
                    metaText: '',
                    details: [
                      {
                        coPayment: null,
                        description: null,
                        panelVisit: null,
                        nonPanelVisit: '$8,0000 per year per member',
                        annualLimit: 80000.0,
                        forRelationship: 'Employee',
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: null,
                        panelVisit: null,
                        nonPanelVisit: '$80000 per year per member',
                        annualLimit: 80000.0,
                        forRelationship: 'Spouse',
                        checkpointVisits: null,
                      },
                      {
                        coPayment: null,
                        description: null,
                        panelVisit: null,
                        nonPanelVisit: '$40000 per year per member',
                        annualLimit: 40000.0,
                        forRelationship: 'Child',
                        checkpointVisits: null,
                      },
                    ],
                  },
                ],
                footnote: null,
                productType: 'WellnessFlexibleSpending',
              },
            ],
          },
        ],
      },
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_HEALTHCARDS_SUCCESS', () => {
    const expectedState = {
      ...initialState,
      healthcards: [
        {
          memberId: '3',
          type: 'PRIMARY',
        },
        {
          memberId: '27',
          type: 'PRIMARY',
        },
        {
          memberId: '28',
          type: 'PRIMARY',
        },
        {
          memberId: '29',
          type: 'PRIMARY',
        },
        {
          memberId: '30',
          type: 'SECONDARY',
        },
        {
          memberId: '68',
          type: 'PRIMARY',
        },
      ],
    };

    const action = {
      type: types.FETCH_HEALTHCARDS_SUCCESS,
      payload: [
        {
          memberId: '3',
          type: 'PRIMARY',
        },
        {
          memberId: '27',
          type: 'PRIMARY',
        },
        {
          memberId: '28',
          type: 'PRIMARY',
        },
        {
          memberId: '29',
          type: 'PRIMARY',
        },
        {
          memberId: '30',
          type: 'SECONDARY',
        },
        {
          memberId: '68',
          type: 'PRIMARY',
        },
      ],
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_CXA1_BENEFITS_SIMPLIFIED_SUCCESS', () => {
    const expectedState = {
      ...initialState,
      cxa1Benefit: {
        planPeriod: {
          id: '2020',
          name: '2020',
          startDate: '2019-12-31T16:00:00Z',
          endDate: '2020-12-30T16:00:00Z',
        },
        planPeriodsList: [
          {
            id: '2020',
            name: '2020',
            startDate: '2019-12-31T16:00:00Z',
            endDate: '2020-12-30T16:00:00Z',
          },
          {
            id: '2019',
            name: '2019',
            startDate: '2018-12-31T16:00:00Z',
            endDate: '2019-12-30T16:00:00Z',
          },
        ],
        statementDate: '2020-05-14T16:00:00Z',
        benefits: [
          {
            benefitId: 'GTL',
            benefitName: 'Group Term Life',
            type: 'SumAssuredBased',
            selectedPlan: '36x Basic Monthly Salary',
            members: [
              {
                name: 'DemoEmp141',
                uwLimitation: '',
                externalId: 'cxa2oncxa1_126',
                externalMemberType: 'Employee',
              },
            ],
            guaranteedAcceptance: '$183,600.00',
            pendingAcceptance: 'Not Applicable',
            sortOrder: 1,
            uwLetters: [],
            completedUwForms: [],
          },
          {
            benefitId: 'GPA',
            benefitName: 'Group Personal Accident',
            type: 'SumAssuredBased',
            selectedPlan: '$300,000',
            members: [
              {
                name: 'DemoEmp141',
                uwLimitation: '',
              },
            ],
            guaranteedAcceptance: '$300,000.00',
            pendingAcceptance: 'Not Applicable',
            sortOrder: 5,
            uwLetters: [],
            completedUwForms: [],
          },
          {
            benefitId: 'GCI_ADD',
            benefitName: 'Group Critical Illness Additional',
            type: 'SumAssuredBased',
            selectedPlan: '$100,000',
            members: [
              {
                name: 'DemoEmp141',
                uwLimitation: '',
              },
            ],
            guaranteedAcceptance: '$100,000.00',
            pendingAcceptance: 'Not Applicable',
            sortOrder: 13,
            uwLetters: [],
            completedUwForms: [],
          },
          {
            benefitId: 'GHS',
            benefitName: 'Group Hospital & Surgical',
            type: 'PlanBased',
            selectedPlan: '2 Bed - Private (Employee and Family)',
            members: [
              {
                name: 'DemoEmp141',
                uwLimitation: '',
              },
              {
                name: 'demo141_224',
                uwLimitation: '',
              },
              {
                name: 'demo141_225',
                uwLimitation: '',
              },
            ],
            guaranteedAcceptance: '2 Bed - Private (Employee and Family)',
            pendingAcceptance: 'Not Applicable',
            sortOrder: 21,
            uwLetters: [],
            completedUwForms: [],
          },
          {
            benefitId: 'GMM',
            benefitName: 'Group Major Medical',
            type: 'PlanBased',
            selectedPlan:
              '2 Bed - Private - Annual Limit $60,000 (Employee and Family)',
            members: [
              {
                name: 'DemoEmp141',
                uwLimitation: '',
              },
              {
                name: 'demo141_224',
                uwLimitation: '',
              },
              {
                name: 'demo141_225',
                uwLimitation: '',
              },
            ],
            guaranteedAcceptance:
              '2 Bed - Private - Annual Limit $60,000 (Employee and Family)',
            pendingAcceptance: 'Not Applicable',
            sortOrder: 25,
            uwLetters: [],
            completedUwForms: [],
          },
        ],
      },
    };

    const action = {
      type: types.FETCH_CXA1_BENEFITS_SIMPLIFIED_SUCCESS,
      payload: {
        planPeriod: {
          id: '2020',
          name: '2020',
          startDate: '2019-12-31T16:00:00Z',
          endDate: '2020-12-30T16:00:00Z',
        },
        planPeriodsList: [
          {
            id: '2020',
            name: '2020',
            startDate: '2019-12-31T16:00:00Z',
            endDate: '2020-12-30T16:00:00Z',
          },
          {
            id: '2019',
            name: '2019',
            startDate: '2018-12-31T16:00:00Z',
            endDate: '2019-12-30T16:00:00Z',
          },
        ],
        employeeId: 'DemoEmp141',
        employeeName: 'DemoEmp141',
        statementDate: '2020-05-14T16:00:00Z',
        benefits: [
          {
            benefitId: 'GTL',
            benefitName: 'Group Term Life',
            type: 'SumAssuredBased',
            selectedPlan: '36x Basic Monthly Salary',
            members: [
              {
                name: 'DemoEmp141',
                uwLimitation: '',
                externalId: 'cxa2oncxa1_126',
                externalMemberType: 'Employee',
              },
            ],
            guaranteedAcceptance: '$183,600.00',
            pendingAcceptance: 'Not Applicable',
            sortOrder: 1,
            uwLetters: [],
            completedUwForms: [],
          },
          {
            benefitId: 'GPA',
            benefitName: 'Group Personal Accident',
            type: 'SumAssuredBased',
            selectedPlan: '$300,000',
            members: [
              {
                name: 'DemoEmp141',
                uwLimitation: '',
              },
            ],
            guaranteedAcceptance: '$300,000.00',
            pendingAcceptance: 'Not Applicable',
            sortOrder: 5,
            uwLetters: [],
            completedUwForms: [],
          },
          {
            benefitId: 'GCI_ADD',
            benefitName: 'Group Critical Illness Additional',
            type: 'SumAssuredBased',
            selectedPlan: '$100,000',
            members: [
              {
                name: 'DemoEmp141',
                uwLimitation: '',
              },
            ],
            guaranteedAcceptance: '$100,000.00',
            pendingAcceptance: 'Not Applicable',
            sortOrder: 13,
            uwLetters: [],
            completedUwForms: [],
          },
          {
            benefitId: 'GHS',
            benefitName: 'Group Hospital & Surgical',
            type: 'PlanBased',
            selectedPlan: '2 Bed - Private (Employee and Family)',
            members: [
              {
                name: 'DemoEmp141',
                uwLimitation: '',
              },
              {
                name: 'demo141_224',
                uwLimitation: '',
              },
              {
                name: 'demo141_225',
                uwLimitation: '',
              },
            ],
            guaranteedAcceptance: '2 Bed - Private (Employee and Family)',
            pendingAcceptance: 'Not Applicable',
            sortOrder: 21,
            uwLetters: [],
            completedUwForms: [],
          },
          {
            benefitId: 'GMM',
            benefitName: 'Group Major Medical',
            type: 'PlanBased',
            selectedPlan:
              '2 Bed - Private - Annual Limit $60,000 (Employee and Family)',
            members: [
              {
                name: 'DemoEmp141',
                uwLimitation: '',
              },
              {
                name: 'demo141_224',
                uwLimitation: '',
              },
              {
                name: 'demo141_225',
                uwLimitation: '',
              },
            ],
            guaranteedAcceptance:
              '2 Bed - Private - Annual Limit $60,000 (Employee and Family)',
            pendingAcceptance: 'Not Applicable',
            sortOrder: 25,
            uwLetters: [],
            completedUwForms: [],
          },
        ],
        otherBenefits: [],
        benefitStatementConfirmMessage: '',
        noteForProduct:
          '<b><i>Please take note that your coverage may require proof of insurability as per insurer’s request & subjected to insurer’s acceptance.</i></b>',
        pageFields: [
          {
            fieldID: 'BenefitName',
            displayLabel: 'Benefits',
            shouldDisplay: true,
            displayOrder: 1,
            format: '',
            type: 'String',
          },
          {
            fieldID: 'SelectedPlan',
            displayLabel: 'Selected Plan',
            shouldDisplay: true,
            displayOrder: 2,
            format: '',
            type: 'String',
          },
          {
            fieldID: 'Members',
            displayLabel: 'Members',
            shouldDisplay: true,
            displayOrder: 3,
            format: '',
            type: 'String',
          },
          {
            fieldID: 'GuaranteedAcceptance',
            displayLabel: 'Guaranteed Acceptance',
            shouldDisplay: true,
            displayOrder: 4,
            format: '',
            type: 'String',
          },
          {
            fieldID: 'PendingAcceptance',
            displayLabel: 'Pending Acceptance',
            shouldDisplay: true,
            displayOrder: 5,
            format: '',
            type: 'String',
          },
          {
            fieldID: 'Members',
            displayLabel: 'Coverage Information',
            shouldDisplay: true,
            displayOrder: 6,
            format: '',
            type: 'List',
          },
          {
            fieldID: 'UwLetters',
            displayLabel: 'Underwriting Docs and Details',
            shouldDisplay: true,
            displayOrder: 7,
            format: '',
            type: 'File',
          },
        ],
      },
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_BENEFIT_DOCUMENTS_SUCCESS', () => {
    const expectedState = {
      ...initialState,
      documents: [
        {
          id: '1',
          type: 'pdf',
        },
      ],
    };

    const action = {
      type: types.FETCH_BENEFIT_DOCUMENTS_SUCCESS,
      payload: [
        {
          id: '1',
          type: 'pdf',
        },
      ],
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});
