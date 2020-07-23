import React from 'react';
import { renderForTest, renderForTestWithStore } from '@testUtils';
import { CustomMultiselectCheckBox } from '@wrappers/components/form';
import messages from '@messages/en-HK.json';
import { flushMicrotasksQueue } from 'react-native-testing-library';
import { SectionListSkeletonPlaceholder } from '@wrappers/components';
import ClaimFiltersModal from '../ClaimFiltersModal';

describe('ClaimFiltersModal', () => {
  const api = {
    getClaimFilters: jest.fn(() => Promise.resolve({})),
    fetchMemberProfile: jest.fn(() => Promise.resolve({})),
  };

  const initialState = {
    initialState: {
      claim: {
        filters: {
          claimPlanFilters: [
            {
              code: '2020',
              text: '2020',
            },
            {
              code: '2019',
              text: '2019',
            },
            {
              code: '2017',
              text: '2017',
            },
          ],
          claimCategoryFilters: [
            {
              code: 'outpatient',
              text: 'Outpatient',
            },
            {
              code: 'wellness',
              text: 'Wellness',
            },
          ],
          claimStatusFilters: [
            {
              code: 'PENDING',
              text: 'Pending',
            },
            {
              code: 'APPROVED',
              text: 'Approved',
            },
            {
              code: 'REJECTED',
              text: 'Rejected',
            },
            {
              code: 'REQUEST FOR INFORMATION',
              text: 'More information required',
            },
          ],
        },
      },
      user: {
        membersProfileOrder: ['3', '27'],
        membersMap: {
          '3': {
            fullName: 'William Brown',
            memberId: '3',
          },
          '27': {
            fullName: 'Catherine Brown',
            memberId: '27',
          },
        },
      },
    },
  };

  it('should contain correct button labels', async () => {
    const component = renderForTest(<ClaimFiltersModal />, {
      ...initialState,
      api,
    });
    await flushMicrotasksQueue();

    const customMultiCheckbox = component.queryAllByType(
      CustomMultiselectCheckBox,
    )[0];

    expect(customMultiCheckbox.props.buttonLabel).toEqual(messages.showResults);

    expect(customMultiCheckbox.props.clearAllButtonLabel).toEqual(
      messages.clearAll,
    );
  });

  it('should render MultiSelectCheckbox', async () => {
    const component = renderForTest(<ClaimFiltersModal />, {
      ...initialState,
      api,
    });
    await flushMicrotasksQueue();

    expect(component.queryAllByType(CustomMultiselectCheckBox).length).toBe(1);
  });

  it('should render skeleton loader when isLoading', async () => {
    const component = renderForTest(<ClaimFiltersModal />, {
      ...initialState,
      api,
    });

    expect(
      component.getAllByType(SectionListSkeletonPlaceholder).length,
    ).toEqual(1);
    await flushMicrotasksQueue();
    expect(component.queryByType(SectionListSkeletonPlaceholder)).toBeNull();
  });

  it('should trigger getClaimFilters', async () => {
    renderForTestWithStore(<ClaimFiltersModal />, {
      ...initialState,
      api,
    });

    api.getClaimFilters();
    await flushMicrotasksQueue();

    expect(api.getClaimFilters).toHaveBeenCalled();
  });

  it('should render MultiSelectCheckbox with a list of claim filters', async () => {
    const expected = [
      {
        title: messages['claim.claimFilters.claimPlanFilters'],
        titleValue: 'claimPlanFilters',
        label: '2020',
        value: '2020',
      },
      {
        title: messages['claim.claimFilters.claimPlanFilters'],
        titleValue: 'claimPlanFilters',
        label: '2019',
        value: '2019',
      },
      {
        title: messages['claim.claimFilters.claimPlanFilters'],
        titleValue: 'claimPlanFilters',
        label: '2017',
        value: '2017',
      },
      {
        title: messages['claim.claimFilters.claimCategoryFilters'],
        titleValue: 'claimCategoryFilters',
        label: 'Outpatient',
        value: 'outpatient',
      },
      {
        title: messages['claim.claimFilters.claimCategoryFilters'],
        titleValue: 'claimCategoryFilters',
        label: 'Wellness',
        value: 'wellness',
      },
      {
        title: messages['claim.claimFilters.claimStatusFilters'],
        titleValue: 'claimStatusFilters',
        label: 'Pending',
        value: 'PENDING',
      },
      {
        title: messages['claim.claimFilters.claimStatusFilters'],
        titleValue: 'claimStatusFilters',
        label: 'Approved',
        value: 'APPROVED',
      },
      {
        title: messages['claim.claimFilters.claimStatusFilters'],
        titleValue: 'claimStatusFilters',
        label: 'Rejected',
        value: 'REJECTED',
      },
      {
        title: messages['claim.claimFilters.patient'],
        titleValue: 'patient',
        label: 'William Brown',
        value: '3',
      },
      {
        title: messages['claim.claimFilters.patient'],
        titleValue: 'patient',
        label: 'Catherine Brown',
        value: '27',
      },
    ];

    const component = renderForTest(<ClaimFiltersModal />, {
      ...initialState,
      api,
    });
    await flushMicrotasksQueue();

    const customMultiCheckbox = component.queryAllByType(
      CustomMultiselectCheckBox,
    )[0];

    const customMultiCheckboxData = customMultiCheckbox.props.data;
    expect(customMultiCheckboxData).toEqual(expected);
  });
});
