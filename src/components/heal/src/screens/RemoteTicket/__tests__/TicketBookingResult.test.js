import React from 'react';
import { TouchableOpacity } from 'react-native';
import { render, renderForTest } from '@testUtils';
import navigation from '@testUtils/__mocks__/navigation';
import { flushMicrotasksQueue, fireEvent } from 'react-native-testing-library';

import TicketBookingResult from '../TicketBookingResult';
import { DOCTOR_LANDING } from '@routes';
import { HEAL_APPOINTMENT_LIST } from '@heal/routes';

const detailsClinic = {
  id: 532,
  name: 'Clinic Icity',
  latitude: 3.1267439,
  longitude: 101.6424801,
  qrCode: '2502',
  district: 'Klang',
  distanceToClient: 11300173.986425,
  address: '2502, JALAN ICITY',
  openingHours:
    'Sun: 00:00-00:00, 00:00-00:00\nMon: 08:00-13:00, 14:00-23:00\nTue: 08:00-13:00, 14:00-23:00\nWed: 08:00-13:00, 14:00-23:00\nThu: 08:00-13:00, 14:00-23:00\nFri: 08:00-13:00, 14:00-23:00\nSat: 00:00-00:00, 08:00-13:00\nPublic Holiday: 00:00-00:00, 00:00-00:00\n',
  clinicProviderId: 1,
  isActive: true,
  phoneNumber: '0703610700',
  doctors: [
    {
      id: 322,
      locale: 'en-HK',
      name: 'Yeo An Shin',
      gender: 'Male',
      isActive: true,
      clinics: [],
      clinicProviderId: 1,
    },
    {
      id: 323,
      locale: 'en-HK',
      name: 'Clinic Icity',
      gender: 'Male',
      isActive: true,
      clinics: [],
      clinicProviderId: 1,
    },
  ],
};

const bookedData = {
  value: {
    id: 27,
    status: 'Requested',
    token: '304|1590597845|602',
    estimatedConsultationTime: '12:44 am',
    position: 0,
    type: 'RemoteTicket',
    memberId: 392,
    clinicProviderId: 1,
    doctorId: 694,
    clinicId: 748,
  },
};

describe('TicketBookingResult', () => {
  test('Render TicketBookingResult', async () => {
    const component = renderForTest(
      <TicketBookingResult
        navigation={navigation}
        route={{ params: { doctorIndex: 0 } }}
      />,
      {
        initialState: {
          heal: {
            detailsClinic,
            remoteTicket: { bookedData },
          },
        },
      },
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should press view appointment button', async () => {
    const [screen] = render(
      <TicketBookingResult
        navigation={navigation}
        route={{ params: { doctorIndex: 0 } }}
      />,
      {
        initialState: {
          heal: {
            detailsClinic,
            remoteTicket: { bookedData },
          },
        },
      },
    );

    await flushMicrotasksQueue();

    const items = screen.queryAllByType(TouchableOpacity);
    fireEvent.press(items[0]);
    expect(navigation.navigate).toBeCalledWith(DOCTOR_LANDING, { tab: 1 });
  });
});
