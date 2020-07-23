import { render } from '@testUtils';
import React from 'react';
import RenderingList from '../RenderingList';
import { flushMicrotasksQueue } from 'react-native-testing-library';
import { PromiseStatus } from '@middlewares/index';

const initialState = {
  user: {
    clientId: 'testclient',
    userId: '3',
    membersMap: {
      '3': {
        fullName: 'Employee 3',
      },
      '4': {
        fullName: 'Dependent 4',
      },
    },
  },
};

describe('Rendering List', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  let data = [
    {
      claimId: '1',
      categoryCode: 'General Medical Practitioner',
      type: 'General Medical Practitioner',
      createdOn: '2019-04-23T06:20:30.61Z',
      status: 'Approved',
      statusCode: 'APPROVED',
      approvedAmount: 5,
      amount: 5,
      memberId: '3',
      claimantId: '3',
      documents: {
        receipts: [],
        referrals: [],
      },
      estimatedPaymentDate: '2019-04-30T06:20:30.61Z',
      receiptDate: '2019-04-25T06:20:30.61Z',
    },
    {
      claimId: '2',
      categoryCode: 'General Medical Practitioner',
      type: 'General Medical Practitioner',
      createdOn: '2019-04-23T06:20:30.61Z',
      status: 'Rejected',
      statusCode: 'REJECTED',
      approvedAmount: 5,
      amount: 5,
      memberId: '3',
      claimantId: '3',
      documents: {
        receipts: [],
        referrals: [],
      },
      paymentDate: '2019-04-30T06:20:30.61Z',
      receiptDate: '2019-04-25T06:20:30.61Z',
    },
    {
      claimId: '3',
      categoryCode: 'General Medical Practitioner',
      type: 'General Medical Practitioner',
      createdOn: '2019-04-23T06:20:30.61Z',
      status: 'Paid',
      statusCode: 'PAID',
      approvedAmount: 5,
      amount: 5,
      memberId: '3',
      claimantId: '3',
      documents: {
        receipts: [],
        referrals: [],
      },
      estimatedPaymentDate: '2019-04-30T06:20:30.61Z',
      receiptDate: '2019-04-25T06:20:30.61Z',
    },
    {
      claimId: '4',
      categoryCode: 'General Medical Practitioner',
      type: 'General Medical Practitioner',
      createdOn: '2019-04-23T06:20:30.61Z',
      status: 'Pending',
      statusCode: 'PENDING',
      approvedAmount: 5,
      amount: 5,
      memberId: '3',
      claimantId: '3',
      documents: {
        receipts: [],
        referrals: [],
      },
      estimatedPaymentDate: '2019-04-30T06:20:30.61Z',
      receiptDate: '2019-04-25T06:20:30.61Z',
    },
  ];

  it('should render claims list', async () => {
    const [Component] = render(
      <RenderingList data={data} status={PromiseStatus.SUCCESS} />,
      {
        initialState,
      },
    );
    await flushMicrotasksQueue();

    const claimItemName = Component.getAllByText(
      'General Medical Practitioner',
    );
    expect(claimItemName).toBeDefined();
    expect(Component.toJSON()).toMatchSnapshot();
  });
});
