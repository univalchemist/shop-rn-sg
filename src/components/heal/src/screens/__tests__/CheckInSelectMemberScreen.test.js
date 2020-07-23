import React from 'react';
import { renderForTest } from '@testUtils';
import {
  flushMicrotasksQueue,
  fireEvent,
  act,
} from 'react-native-testing-library';
import { CheckInSelectMemberScreen } from '@heal/src/screens';
import { RadioBoxesWithForm } from '@heal/src/components';
import * as checkIphone from '@utils/isIphoneX';
import { Button } from '@heal/src/wrappers/components';
import { HEAL_CONFIRM_NEXT } from '@heal/routes';
import { CheckBox } from 'react-native-elements';

jest.mock('@utils/isIphoneX');

describe('CheckInSelectMemberScreen', () => {
  test('render myself and dependents', async () => {
    checkIphone.isIphoneX.mockReturnValue(false);
    const initialState = {
      user: {
        userId: 1,
        membersMap: {
          1: { fullName: 'test', memberId: 1 },
          2: {
            fullName: 'dep2',
            memberId: 2,
            relationshipToEmployee: 'Child',
          },
          3: {
            fullName: 'dep3',
            memberId: 3,
            relationshipToEmployee: 'Child',
          },
        },
      },
    };
    const nav = { navigate: jest.fn() };
    const screen = renderForTest(
      <CheckInSelectMemberScreen
        route={{ params: { type: 'appointment' } }}
        navigation={nav}
      />,
      {
        initialState,
      },
    );
    await flushMicrotasksQueue();
    const radioGroup = screen.getByType(RadioBoxesWithForm);
    const expected = [
      { value: 'Myself', key: '1' },
      { value: 'dep2 (Child)', key: 2 },
      { value: 'dep3 (Child)', key: 3 },
    ];
    expect(radioGroup.props.data).toEqual(expected);
    const myself = screen.getAllByType(CheckBox)[0];
    const button = screen.getByType(Button);
    fireEvent(myself, 'press');
    await flushMicrotasksQueue();
    fireEvent(button, 'press');
    await flushMicrotasksQueue();
    // expect(nav.navigate).toBeCalledWith(HEAL_CHECK_IN_FORM, {
    //   member: { fullName: 'test', memberId: 1 },
    expect(nav.navigate).toBeCalledWith(HEAL_CONFIRM_NEXT, {
      data: undefined,
      type: 'appointment',
    });
  });

  test('render no user', async () => {
    const nav = { navigate: jest.fn() };
    checkIphone.isIphoneX.mockReturnValue(true);
    const initialState = {
      user: {
        userId: 1,
        membersMap: {},
      },
    };
    const screen = renderForTest(
      <CheckInSelectMemberScreen
        route={{ params: { type: 'appointment' } }}
        navigation={nav}
      />,
      {
        initialState,
      },
    );
    await flushMicrotasksQueue();
    const radioGroup = screen.getByType(RadioBoxesWithForm);
    expect(radioGroup.props.data).toEqual([]);
  });
});
