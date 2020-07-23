import React from 'react';
import { Linking, Platform, TouchableOpacity } from 'react-native';
import { render, renderForTest } from '@testUtils';
import navigation from '@testUtils/__mocks__/navigation';
import { flushMicrotasksQueue, fireEvent } from 'react-native-testing-library';

import CheckIn from '../CheckIn';
import { DOCTOR_LANDING } from '@routes';

const qrCodeData = {
  clinic: {
    id: 506,
    name: 'Clinic Icity',
    latitude: 3.1267439,
    longitude: 101.6424801,
    qrCode: '2502',
    district: 'Klang',
    area: null,
  },
  doctors: [
    {
      isOpen: false,
      isRemoteFull: false,
      isRemoteTicketEnabled: true,
      isAppointmentEnabled: false,
      position: 9999,
      estimatedConsultationTime: '7:30 pm',
      ticketDepositAmount: 0.0,
      canGetRefundOnCancellation: false,
      cancellationGraceMinutes: 0,
      id: 472,
      name: 'Clinic Icity',
      specialityCode: 'generalpractitio',
      gender: 'Male',
      locale: 'en-HK',
    },
    {
      isOpen: false,
      isRemoteFull: false,
      isRemoteTicketEnabled: true,
      isAppointmentEnabled: true,
      position: 9999,
      estimatedConsultationTime: '7:30 pm',
      ticketDepositAmount: 0.0,
      canGetRefundOnCancellation: false,
      cancellationGraceMinutes: 0,
      id: 463,
      name: 'Yeo An Shin',
      specialityCode: 'generalpractitio',
      gender: 'Male',
      locale: 'en-HK',
    },
  ],
};

const checkedInData = {
  token: '304|1590425263|601',
  type: 'WalkIn',
  estimatedConsultationTime: 'TBC',
  state: 'STARTED',
  arrivalTime: '2020-05-27T00:47:43',
};

const selectedDoctor = {
  isOpen: false,
  isRemoteFull: false,
  isRemoteTicketEnabled: true,
  isAppointmentEnabled: true,
  position: 9999,
  estimatedConsultationTime: '7:30 pm',
  ticketDepositAmount: 0.0,
  canGetRefundOnCancellation: false,
  cancellationGraceMinutes: 0,
  id: 463,
  name: 'Yeo An Shin',
  specialityCode: 'generalpractitio',
  gender: 'Male',
  locale: 'en-HK',
};

describe('CheckIn', () => {
  test('Render CheckIn', async () => {
    const component = renderForTest(
      <CheckIn
        navigation={navigation}
        route={{ params: { selectedDoctor } }}
      />,
      {
        initialState: {
          heal: {
            scannedData: {
              qrCodeData,
            },
            checkedInData,
          },
        },
      },
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should press doctor card', async () => {
    const [screen] = render(
      <CheckIn
        navigation={navigation}
        route={{ params: { selectedDoctor } }}
      />,
      {
        initialState: {
          heal: {
            scannedData: {
              qrCodeData,
            },
            checkedInData,
          },
        },
      },
    );

    await flushMicrotasksQueue();

    const items = screen.queryAllByType(TouchableOpacity);
    fireEvent.press(items[0]);
    expect(navigation.navigate).toBeCalledWith(DOCTOR_LANDING);
  });
});
