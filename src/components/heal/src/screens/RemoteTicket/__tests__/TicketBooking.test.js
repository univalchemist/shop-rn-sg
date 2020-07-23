import React from 'react';
import { TouchableOpacity } from 'react-native';
import { render, renderForTest } from '@testUtils';
import navigation from '@testUtils/__mocks__/navigation';
import { flushMicrotasksQueue, fireEvent } from 'react-native-testing-library';

import TicketBooking from '../TicketBooking';
import { DoctorCard } from '@heal/src/components';
import { HEAL_REMOTE_TICKET_BOOKING_RESULT } from '@heal/routes';

const visitList = [
  {
    id: 7,
    date: '2020-05-23T00:20:14',
    status: 'CheckedIn',
    token: '304|1590078014|602',
    estimatedConsultationTime: 'TBC',
    position: 0,
    type: 'WalkIn',
    doctor: {
      id: 694,
      locale: 'en-HK',
      name: 'CXA2',
      specialityCode: 'generalpractitio',
      gender: 'Female',
      isActive: true,
      clinics: [],
      clinicProviderId: 1,
    },
    clinic: {
      id: 748,
      name: 'CXA (SG) Testing Clinic 1',
      latitude: 1.303007,
      longitude: 103.796334,
      qrCode: '304',
      district: 'CAUSEWAY BAY',
      address:
        'Kuala Lumpur City Centre, 50088 Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia',
      clinicProviderId: 1,
      isActive: true,
      phoneNumber: '+603 2331 8080',
      doctors: [],
    },
    memberId: 392,
    clinicProviderId: 1,
    doctorId: 694,
    clinicId: 748,
  },
  {
    id: 27,
    status: 'Requested',
    token: '304|1590597845|602',
    estimatedConsultationTime: '12:44 am',
    position: 0,
    type: 'RemoteTicket',
    doctor: {
      id: 694,
      locale: 'en-HK',
      name: 'CXA2',
      specialityCode: 'generalpractitio',
      gender: 'Female',
      isActive: true,
      clinics: [],
      clinicProviderId: 1,
    },
    clinic: {
      id: 748,
      name: 'CXA (SG) Testing Clinic 1',
      latitude: 1.303007,
      longitude: 103.796334,
      qrCode: '304',
      district: 'CAUSEWAY BAY',
      address:
        'Kuala Lumpur City Centre, 50088 Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia',
      clinicProviderId: 1,
      isActive: true,
      phoneNumber: '+603 2331 8080',
      doctors: [],
    },
    memberId: 392,
    clinicProviderId: 1,
    doctorId: 694,
    clinicId: 748,
  },
];

const detailsClinic = {
  id: 748,
  name: 'CXA (SG) Testing Clinic 1',
  latitude: 1.303007,
  longitude: 103.796334,
  qrCode: '304',
  district: 'CAUSEWAY BAY',
  address:
    'Kuala Lumpur City Centre, 50088 Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia',
  clinicProviderId: 1,
  isActive: true,
  phoneNumber: '+603 2331 8080',
  doctors: [
    {
      isOpen: true,
      isRemoteFull: false,
      isRemoteTicketEnabled: true,
      isAppointmentEnabled: true,
      position: 2,
      estimatedConsultationTime: '4:18 pm',
      ticketDepositAmount: 0,
      canGetRefundOnCancellation: false,
      cancellationGraceMinutes: 60,
      id: 694,
      gender: 'Female',
      locale: 'en-HK',
      name: 'CXA2',
      specialityCode: 'generalpractitio',
      isActive: true,
      clinics: [],
      clinicProviderId: 1,
    },
    {
      isOpen: true,
      isRemoteFull: false,
      isRemoteTicketEnabled: true,
      isAppointmentEnabled: true,
      position: 1,
      estimatedConsultationTime: '4:03 pm',
      ticketDepositAmount: 0,
      canGetRefundOnCancellation: false,
      cancellationGraceMinutes: 60,
      id: 703,
      gender: 'Female',
      locale: 'en-HK',
      name: 'Chan Tai Man',
      specialityCode: 'generalpractitio',
      isActive: true,
      clinics: [],
      clinicProviderId: 1,
    },
  ],
  location: {
    longitude: 103.796334,
    latitude: 1.303007,
  },
};

const membersMap = {
  '392': {
    memberId: '392',
    fullName: 'Cxa2dev Us11',
    hasLoggedIn: true,
    firstName: 'Cxa2dev',
    lastName: 'Us11',
    email: 'cxa2dev_us11@mailinator.com',
    workEmail: null,
    externalId: 'cxa2dev_us11',
    gender: 'Male',
    dateOfBirth: '2000-10-21T07:38:58.113',
    lastLogin: '2020-05-28T00:45:17.388696',
    role: 'Employee',
    category: 'B2C',
    relationshipToEmployee: 'Self',
    relationshipCategory: 'Self',
    contactNumber: '3847342',
    certificateNumber: '',
    dependentNumber: '',
    isEmailVerified: false,
    isTermsAccepted: true,
    isEdmOptedOut: false,
    isSelfRegisteredUser: true,
    status: 'None',
    accountStatus: 'Active',
    terminationDate: null,
    limitedAccessUntil: null,
    policyNumber: '',
    preferedEmail: 'cxa2dev_us11@mailinator.com',
    nationality: null,
    countryOfResidence: null,
    identificationNumber: null,
    identificationType: null,
  },
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

const takeQueueRemoteTicket = jest.fn().mockResolvedValue(bookedData);
const getVisits = jest.fn().mockResolvedValue(visitList);

describe('TicketBooking', () => {
  test('Render Doctor Card', async () => {
    const [screen] = render(
      <TicketBooking
        navigation={navigation}
        route={{
          params: { doctorIndex: 0 },
        }}
      />,
      {
        initialState: {
          heal: {
            detailsClinic,
            remoteTicket: {
              visitList,
            },
          },
          user: { membersMap },
        },
        api: { takeQueueRemoteTicket, getVisits },
      },
    );

    await flushMicrotasksQueue();
    const items = screen.queryAllByType(DoctorCard);
    expect(items).toHaveLength(2);
  });

  // it('should press booking button', async () => {
  //   const [screen] = render(
  //     <TicketBooking
  //       navigation={navigation}
  //       route={{
  //         params: { doctorIndex: 0 },
  //       }}
  //     />,
  //     {
  //       initialState: {
  //         heal: {
  //           detailsClinic,
  //           remoteTicket: {
  //             visitList,
  //           },
  //         },
  //         user: { membersMap },
  //       },
  //       api: { takeQueueRemoteTicket, getVisits },
  //     },
  //   );

  //   await flushMicrotasksQueue();

  //   const item = screen.queryByTestId('bookingButton');
  //   fireEvent.press(item);
  //   expect(navigation.navigate).toBeCalledWith(HEAL_REMOTE_TICKET_BOOKING_RESULT);
  // });

  it('should press doctor card', async () => {
    const [screen] = render(
      <TicketBooking
        navigation={navigation}
        route={{
          params: { doctorIndex: 0 },
        }}
      />,
      {
        initialState: {
          heal: {
            detailsClinic,
            remoteTicket: {
              visitList,
            },
          },
          user: { membersMap },
        },
        api: { takeQueueRemoteTicket, getVisits },
      },
    );

    await flushMicrotasksQueue();

    const items = screen.queryAllByType(DoctorCard);
    fireEvent.press(items[1]);
    expect(items[1].props.selected).toEqual(true);
  });
});
