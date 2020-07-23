import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { renderForTest } from '@testUtils';
import navigation from '@testUtils/__mocks__/navigation';
import { flushMicrotasksQueue, fireEvent } from 'react-native-testing-library';
import ScanQRCodeScreen, { WrappedSvg } from '../ScanQRCodeScreen';
import {
  HEAL_CHECK_IN_SELECT_MEMBER,
  HEAL_WALK_IN_SELECT_DOCTOR,
} from '@heal/routes';
import { RNCamera } from 'react-native-camera';
import theme from '@theme';
import Spinner from 'react-native-spinkit';

jest.mock('react-native-camera', () => {
  const ReactR = require.requireActual('react');
  const RNCamera = props => {
    // ReactR.useEffect(() => {
    //   props.onBarCodeRead({ data: '304' });
    // }, []);
    return ReactR.createElement('View', props, props.children);
  };
  RNCamera.Constants = {
    Type: {
      back: 'back',
      front: 'front',
    },
    FlashMode: {
      on: 'on',
      off: 'off',
    },
  };

  return {
    RNCamera,
  };
});

describe('ScanQRCodeScreen', () => {
  test('navigate to checkin form if there is no dependents', async () => {
    const screen = renderForTest(<ScanQRCodeScreen navigation={navigation} />, {
      initialState: {
        user: {
          userId: 1,
          membersMap: { 1: { memberId: 1, name: 'test' } },
        },
        heal: {
          clinicQrCode: '304',
          appointmentList: [],
        },
      },
      api: { scanQRCode: jest.fn().mockResolvedValue({ data: '' }) },
    });
    await flushMicrotasksQueue();
    const cam = screen.queryByType(RNCamera);
    cam.props.onBarCodeRead({ data: '304' });
    await flushMicrotasksQueue();
    expect(navigation.navigate).toBeCalledWith(HEAL_WALK_IN_SELECT_DOCTOR, {
      data: { memberId: 1, dependentId: false },
      type: 'walkin',
    });
  });

  test('navigate to select member if there are dependents', async () => {
    const screen = renderForTest(<ScanQRCodeScreen navigation={navigation} />, {
      initialState: {
        user: {
          userId: 1,
          membersMap: { 1: { name: 'test' }, 2: { name: 'dep' } },
        },
        heal: {
          clinicQrCode: '304',
          appointmentList: [],
        },
      },
      api: { scanQRCode: jest.fn().mockResolvedValue({ data: '' }) },
    });
    await flushMicrotasksQueue();
    const cam = screen.queryByType(RNCamera);
    cam.props.onBarCodeRead({ data: '304' });
    await flushMicrotasksQueue();
    expect(navigation.navigate).toBeCalledWith(HEAL_CHECK_IN_SELECT_MEMBER, {
      type: 'walkin',
      data: {
        memberId: undefined,
        dependentId: false,
      },
    });
  });

  test('display spinner on iOS', async () => {
    Platform.OS = 'ios';
    const screen = renderForTest(
      <WrappedSvg isFetching={true} theme={theme} />,
    );
    await flushMicrotasksQueue();
    expect(screen.getByType(Spinner)).toBeDefined();
  });

  test('display loading indicator on Android', async () => {
    Platform.OS = 'android';
    const screen = renderForTest(
      <WrappedSvg isFetching={true} theme={theme} />,
    );
    await flushMicrotasksQueue();
    expect(screen.getByType(ActivityIndicator)).toBeDefined();
  });
});
