import React from 'react';
import { render } from '@testUtils';
import {
  act,
  fireEvent,
  flushMicrotasksQueue,
} from 'react-native-testing-library';
import { CLAIM_PATIENT_DETAILS } from '@routes';
import navigation from '@testUtils/__mocks__/navigation';
import ClaimsListScreen from '../ClaimsListScreen';
import RenderingList from '../RenderingList';

const claim = {
  processing: {
    orderAll: [],
  },
  approved: {
    orderAll: [],
  },
  rejected: {
    orderAll: [],
  },
  lastSubmittedClaim: { message: null, id: null },
  benefitPlanYear: null,
  claimsMap: {},
  selectedClaimFilters: [],
};

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

describe('ClaimsListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate to claim patient detail screen when click on "Make a Claim" button', async () => {
    const [Component] = render(<ClaimsListScreen navigation={navigation} />, {
      initialState: {
        claim: {
          ...claim,
          processingClaims: [],
          completedClaims: [],
        },
        user: initialState.user,
      },
      api: {
        getClaims: () =>
          Promise.resolve({
            data: [],
          }),
      },
    });
    const floatingActionButton = Component.getByTestId('iconIcon1');
    await fireEvent.press(floatingActionButton);
    await flushMicrotasksQueue();
    expect(navigation.navigate).toBeCalledWith(CLAIM_PATIENT_DETAILS);
  });

  it('should render the panel search in tab view', () => {
    const [Component] = render(<ClaimsListScreen navigation={navigation} />, {
      initialState: {
        claim: {
          ...claim,
          processingClaims: [],
          completedClaims: [],
        },
        user: initialState.user,
      },
      api: {
        getClaimsList: () =>
          Promise.resolve({
            data: [],
          }),
      },
    });

    const mapsTabText = Component.queryAllByText('Processing');
    const listTabText = Component.queryAllByText('History');
    expect(mapsTabText).not.toBeNull();
    expect(listTabText).not.toBeNull();
  });

  it('should render appropriate view before and after tab switching', () => {
    const [Component] = render(<ClaimsListScreen navigation={navigation} />, {
      initialState: {
        claim: {
          ...claim,
          processingClaims: [],
          completedClaims: [],
        },
        user: initialState.user,
      },
      api: {
        getClaimsList: () =>
          Promise.resolve({
            data: [],
          }),
      },
    });
    const mapView = Component.queryAllByType(RenderingList);

    expect(mapView.length).toBe(1);
  });
});
