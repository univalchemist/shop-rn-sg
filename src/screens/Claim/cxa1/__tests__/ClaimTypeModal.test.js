import React from 'react';
import { render } from '@testUtils';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import ClaimTypeModal from '../ClaimTypeModal';
import { Box } from '@cxa-rn/components';

const navigation = {
  addListener: jest.fn(),
  navigate: jest.fn(),
};

describe('ClaimTypeModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const claimType = {
    categories: {
      all: [1],
      byId: {
        1: {
          claimCategory: 'Outpatient',
          claimTypeIds: ['MO-GP', 'MO-SP'],
          code: 'outpatient',
          displayOrder: 1,
          id: 1,
          isInsuranceClaim: true,
        },
      },
    },
    types: {
      byId: {
        'MO-GP': {
          claimCategoryId: 1,
          claimReasonIds: [],
          claimType: 'Outpatient GP',
          code: 'MO-GP',
          cpfContributable: false,
          id: null,
          isInsuranceClaim: true,
          isTaxable: false,
          maxAdditionalDocument: 5,
          maxAmountPerClaim: null,
          referralRequired: null,
        },
        'MO-SP': {
          claimCategoryId: 1,
          claimReasonIds: [],
          claimType: 'Outpatient SP',
          code: 'MO-SP',
          cpfContributable: true,
          id: null,
          isInsuranceClaim: true,
          isTaxable: true,
          maxAdditionalDocument: 5,
          maxAmountPerClaim: null,
          referralRequired: null,
        },
      },
    },
  };

  const initialState = {
    form: {
      claimDetailsForm: {
        values: { claimTypeId: 'MO-GP' },
      },
    },
    claimType: { cxa1: claimType },
  };

  it('should indicate the selected claim item', async () => {
    const [Component] = render(<ClaimTypeModal navigation={navigation} />, {
      initialState,
    });
    await flushMicrotasksQueue();

    const selection = Component.getByText('Outpatient GP');
    await fireEvent.press(selection);
    await flushMicrotasksQueue();
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });

  it('should render Consult Types and Claim Types', async () => {
    const [Component] = render(<ClaimTypeModal />, {
      api: {
        getClaimTypes: () =>
          Promise.resolve({
            data: [],
          }),
      },
      initialState,
    });
    await flushMicrotasksQueue();

    const consultType = Component.queryAllByText('Outpatient');
    const claimType = Component.queryAllByText('Dental');
    expect(consultType).toBeDefined();
    expect(claimType).toBeDefined();
  });

  it('should render CPF Contributable and Taxable', async () => {
    const [Component] = render(<ClaimTypeModal />, {
      api: {
        getClaimTypes: () =>
          Promise.resolve({
            data: [],
          }),
      },
      initialState,
    });
    await flushMicrotasksQueue();

    const consultType = Component.queryAllByText('Taxable');
    const claimType = Component.queryAllByText('CPF Contributable');
    expect(consultType).toBeDefined();
    expect(claimType).toBeDefined();
  });

  it('ContainerText should render properly when no  props top pass', () => {
    const [Component] = render(<ClaimTypeModal />, {
      initialState,
    });
    const box = Component.getByType(Box);
    expect(box.props.flexDirection).toEqual(undefined);
  });
});
