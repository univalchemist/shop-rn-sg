import { renderForTest } from '@testUtils';
import React from 'react';
import {
  act,
  fireEvent,
  flushMicrotasksQueue,
} from 'react-native-testing-library';
import ProfileMemberModal from '../ProfileMemberModal';
import { TrackedListItemPicker } from '@wrappers/components';

const navigation = {
  navigate: jest.fn(),
};

jest.mock('redux-form', () => ({
  change: jest.fn(() => ({ type: 'OK' })),
}));

const user = {
  membersMap: {
    3: {
      fullName: 'testfullname 3',
      role: 'Employee',
      relationshipToEmployee: 'Self',
      externalId: 'test_3',
    },
    27: {
      fullName: 'testdep fullname 27',
      role: 'Dependent',
      relationshipToEmployee: 'Spouse',
      externalId: 'test_dep27',
    },
    28: {
      fullName: 'testdep fullname 28',
      role: 'Dependent',
      relationshipToEmployee: 'Child',
      externalId: 'test_dep28',
    },
  },
  unterminatedMembersMap: {
    3: {
      fullName: 'testfullname 3',
      role: 'Employee',
      relationshipToEmployee: 'Self',
      externalId: 'test_3',
    },
    27: {
      fullName: 'testdep fullname 27',
      role: 'Dependent',
      relationshipToEmployee: 'Spouse',
      externalId: 'test_dep27',
    },
  },
  membersProfileOrder: ['3', '27', '28'],
};

const benefit = {
  byMemberId: {
    '3': {},
    '27': {},
  },
};

const form = {
  memberForm: {
    values: { selectedMemberId: 0 },
  },
};

const initialState = { user, form, benefit };

describe('ProfileMemberModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const component = renderForTest(
      <ProfileMemberModal navigation={navigation} />,
      {
        initialState,
      },
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should indicate the selected member field', async () => {
    const component = renderForTest(
      <ProfileMemberModal navigation={navigation} />,
      {
        initialState: {
          ...initialState,
          form: {
            memberForm: { values: { selectedExternalMemberId: 'test_3' } },
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
