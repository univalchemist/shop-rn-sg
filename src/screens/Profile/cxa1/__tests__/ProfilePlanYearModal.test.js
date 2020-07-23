import { renderForTest } from '@testUtils';
import React from 'react';
import {
  act,
  fireEvent,
  flushMicrotasksQueue,
} from 'react-native-testing-library';
import ProfilePlanYearModal from '../ProfilePlanYearModal';
import { TrackedListItemPicker } from '@wrappers/components';

const navigation = {
  navigate: jest.fn(),
};

jest.mock('redux-form', () => ({
  change: jest.fn(() => ({ type: 'OK' })),
}));

const benefit = {
  cxa1Benefit: {
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
  },
};

const form = {
  memberForm: {
    values: { selectedPlanYearId: null },
  },
};

const initialState = { form, benefit };

describe('ProfilePlanYearModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const component = renderForTest(
      <ProfilePlanYearModal navigation={navigation} />,
      {
        initialState,
      },
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should indicate the selected plan year field', async () => {
    const component = renderForTest(
      <ProfilePlanYearModal navigation={navigation} />,
      {
        initialState: {
          ...initialState,
          form: {
            memberForm: { values: { selectedPlanYearId: '2020' } },
          },
        },
      },
    );

    const listItems = component.getAllByType(TrackedListItemPicker);

    act(() => {
      fireEvent.press(listItems[0]);
    });

    await flushMicrotasksQueue();
    expect(component.toJSON()).toMatchSnapshot();
  });
});
