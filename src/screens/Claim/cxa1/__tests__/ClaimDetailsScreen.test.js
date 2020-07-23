import React from 'react';
import { render, renderForTest } from '@testUtils';
import { act, flushMicrotasksQueue } from 'react-native-testing-library';
import messages from '@messages/en-HK.json';
import navigation from '@testUtils/__mocks__/navigation';
import ClaimDetailsScreen from '../ClaimDetailsScreen';

jest.useFakeTimers();

describe('ClaimDetailsScreen', () => {
  const route = {
    params: {
      claimId: 'test-id',
      title: 'test-id',
    },
  };

  const config = {
    initialState: {
      claim: { singleCXA1Claim: {} },
      claimType: {
        cxa1: {
          types: {},
        },
      },
      user: {
        membersMap: {
          192510: {
            fullName: 'Test Member Name',
          },
        },
      },
      intl: {
        messages,
        intlLocale: 'en-HK',
        momentLocale: 'en-HK',
      },
    },
  };

  const mockClaimDetails = {
    claimId: 'ADJUSTED_31092386--f2637d36-1a8f-40ef-a8a8-b82cb894e8ba',
    clientId: 'cxadevclient1',
    memberId: '192510',
    claimantId: '192510',
    receiptDate: '2019-06-29T00:00:00',
    amount: 300.0,
    reason: null,
    reasonCode: null,
    diagnosisText: null,
    type: 'Clinical',
    typeCode: 'Clinical',
    category: 'Outpatient',
    categoryCode: 'Outpatient',
    status: 'APPROVED',
    statusCode: 'REJECTED',
    approvedAmount: 300.0,
    acceptTermsAndConditions: true,
    contactNumber: '',
    otherInsurerAmount: 0.0,
    documents: {
      receipts: [
        {
          id: 'documentid2',
          contentType: 'image',
          fileName: 'image2.png',
          uri: 'mock_uri',
        },
        {
          id: 'documentid1',
          contentType: 'image',
          fileName: 'image2.png',
          uri: 'mock_uri',
        },
      ],
      referrals: [],
      settlementAdvices: [],
      prescriptions: [],
    },
    claimFeedStatus: null,
    processingStatus: 'SUBMITTEDTOINSURER',
    lastUpdatedOn: '2017-02-23T00:00:00',
    createdOn: '2020-01-01T00:00:00',
    remark: 'More information is required. We will contact you soon.',
    isMaternity: false,
    isCashlessClaim: false,
  };

  it('should render claim details screen', async () => {
    const getClaim = jest.fn().mockResolvedValue({ data: mockClaimDetails });
    const getClaimTypes = jest.fn().mockResolvedValue({ data: [] });
    const [component] = render(
      <ClaimDetailsScreen navigation={navigation} route={route} />,
      { ...config, api: { getClaim, getClaimTypes } },
    );

    await act(() => flushMicrotasksQueue());
    expect(component.getByText('Test Member Name')).toBeDefined();
  });

  it('should render error panel if get claim failed', async () => {
    const getClaim = jest.fn().mockRejectedValueOnce();
    const getClaimTypes = jest.fn().mockRejectedValueOnce();
    const component = renderForTest(
      <ClaimDetailsScreen navigation={navigation} route={route} />,
      { ...config, api: { getClaim, getClaimTypes } },
    );

    await act(() => flushMicrotasksQueue());
    expect(component.toJSON()).toMatchSnapshot();
  });
});
