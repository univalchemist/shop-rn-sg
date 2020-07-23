import * as actions from '../actions';
import * as types from '../types';
import { configureMockStore, configureStore } from '@testUtils';
import { PromiseStatus } from '@middlewares';
import { flushMicrotasksQueue } from 'react-native-testing-library';

const initialState = {
  user: {
    clientId: 'testClient',
    userId: 'client-001',
  },
  heal: {
    searchResult: [{}, {}],
    location: {
      latitude: 0,
      longitude: 0,
    },
    clinicData: {
      page: 0,
    },
    detailsClinic: {},
    doctorData: {
      doctors: [],
      page: 0,
      total: 0,
      specialityCode: '',
    },
    doctorInfo: {},
    scannedData: {
      selectData: [],
    },
  },
};

const api = {
  getClinicsWithObject: jest.fn(() => ({
    data: {
      totalCount: 2,
      page: 1,
      items: [
        {
          id: 336,
          name: 'Clinic Bukit Rimau',
          latitude: 3.1275345,
          longitude: 101.6412337,
          distanceToClient: 11300034.6201797,
          location: {
            latitude: 3.1275345,
            longitude: 101.6412337,
          },
          address: 'Ho Chi Minh City, Vietnam',
          doctors: [
            {
              id: 322,
              locale: 'en-HK',
              name: 'Anna Tan',
              gender: 'Female',
              isActive: true,
              clinics: [],
            },
          ],
        },
        {
          id: 335,
          name: 'Clinic Jelutong Shah Alam',
          latitude: 3.1277049,
          longitude: 101.6416511,
          qrCode: '1771',
          district: 'Shah Alam',
          location: {
            latitude: 3.1277049,
            longitude: 101.6412337,
          },
          distanceToClient: 11300080.7479106,
          address: 'Taipei, Taiwan',
          doctors: [
            {
              id: 321,
              locale: 'en-HK',
              name: 'Clinic Jelutong Shah Alam',
              gender: 'Male',
              isActive: true,
              clinics: [],
            },
          ],
        },
      ],
    },
  })),
  getClinics: jest.fn(() => ({
    data: {
      totalCount: 2,
      page: 1,
      items: [
        {
          id: 336,
          name: 'Clinic Bukit Rimau',
          latitude: 3.1275345,
          longitude: 101.6412337,
          distanceToClient: 11300034.6201797,
          location: {
            latitude: 3.1275345,
            longitude: 101.6412337,
          },
          address: 'Ho Chi Minh City, Vietnam',
          doctors: [
            {
              id: 322,
              locale: 'en-HK',
              name: 'Anna Tan',
              gender: 'Female',
              isActive: true,
              clinics: [],
            },
          ],
        },
        {
          id: 335,
          name: 'Clinic Jelutong Shah Alam',
          latitude: 3.1277049,
          longitude: 101.6416511,
          qrCode: '1771',
          district: 'Shah Alam',
          location: {
            latitude: 3.1277049,
            longitude: 101.6412337,
          },
          distanceToClient: 11300080.7479106,
          address: 'Taipei, Taiwan',
          doctors: [
            {
              id: 321,
              locale: 'en-HK',
              name: 'Clinic Jelutong Shah Alam',
              gender: 'Male',
              isActive: true,
              clinics: [],
            },
          ],
        },
      ],
    },
  })),
  getDoctorInfo: jest.fn(
    ({ clientId, userId, clinicProviderId, clinicId, doctorId }) => ({
      data: {
        isOpen: true,
        isRemoteFull: false,
        isRemoteTicketEnabled: true,
        isAppointmentEnabled: true,
        position: 0,
        estimatedConsultationTime: '12:49 pm',
        ticketDepositAmount: 0,
        canGetRefundOnCancellation: false,
        cancellationGraceMinutes: 60,
        id: doctorId,
        gender: 'Female',
        locale: 'en-HK',
        name: 'Chan Tai Man',
        specialityCode: 'generalpractitio',
        isActive: true,
        clinics: [],
        clinicProviderId: 1,
      },
    }),
  ),
  getSpecialities: jest.fn().mockResolvedValue({
    data: {
      totalCount: 4,
      page: 1,
      items: [
        { name: 'generalsurgery', code: 'generalsurgery' },
        { name: 'generalpractitio', code: 'generalpractitio' },
        { name: 'dentist', code: 'dentist' },
        { name: 'cxaSpeciality', code: 'cxaSpeciality' },
      ],
    },
  }),
  scanQRCode: jest.fn().mockResolvedValue({
    data: {
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
      doctors: [
        {
          id: 694,
          locale: 'en-HK',
          name: 'CXA2',
          specialityCode: 'generalpractitio',
          gender: 'Female',
          isActive: true,
          clinics: [],
          clinicProviderId: 1,
        },
        {
          id: 703,
          locale: 'en-HK',
          name: 'Chan Tai Man',
          specialityCode: 'generalpractitio',
          gender: 'Female',
          isActive: true,
          clinics: [],
          clinicProviderId: 1,
        },
      ],
    },
  }),
  checkInTicket: jest.fn().mockResolvedValue({
    data: {
      token: '304|1590425263|601',
      type: 'WalkIn',
      estimatedConsultationTime: 'TBC',
      state: 'STARTED',
      arrivalTime: '2020-05-27T00:47:43',
    },
  }),
  takeQueueRemoteTicket: jest.fn().mockResolvedValue({
    data: {
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
  }),
  getVisits: jest.fn(({ userId }) => ({
    data: [
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
        memberId: userId,
        clinicProviderId: 1,
        doctorId: 694,
        clinicId: 748,
      },
    ],
  })),
};

describe('getClinics', () => {
  it('should fetch location', () => {
    global.navigator = {
      geolocation: {
        getCurrentPosition: jest.fn().mockImplementation(successCallback => {
          successCallback({
            coords: {
              latitude: 2,
              longitude: 3,
            },
          });
        }),
      },
    };

    const store = configureMockStore(api)(initialState);
    const expectedActions = [
      { type: types.FETCH_LOCATION_START },
      {
        type: types.FETCH_LOCATION_SUCCESS,
        payload: {
          coords: {
            latitude: 2,
            longitude: 3,
          },
        },
      },
    ];

    return store.dispatch(actions.fetchLocation()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should create action to get clinics data', () => {
    const store = configureMockStore(api)(initialState);
    const expectedActions = [
      { type: types.FETCH_CLINICS_START },
      {
        type: types.FETCH_CLINICS_SUCCESS,
        payload: {
          totalCount: 2,
          page: 1,
          items: [
            {
              id: 336,
              name: 'Clinic Bukit Rimau',
              latitude: 3.1275345,
              longitude: 101.6412337,
              distanceToClient: 11300034.6201797,
              location: {
                latitude: 3.1275345,
                longitude: 101.6412337,
              },
              address: 'Ho Chi Minh City, Vietnam',
              doctors: [
                {
                  id: 322,
                  locale: 'en-HK',
                  name: 'Anna Tan',
                  gender: 'Female',
                  isActive: true,
                  clinics: [],
                },
              ],
            },
            {
              id: 335,
              name: 'Clinic Jelutong Shah Alam',
              latitude: 3.1277049,
              longitude: 101.6416511,
              qrCode: '1771',
              district: 'Shah Alam',
              distanceToClient: 11300080.7479106,
              address: 'Taipei, Taiwan',
              location: {
                latitude: 3.1277049,
                longitude: 101.6416511,
              },
              doctors: [
                {
                  id: 321,
                  locale: 'en-HK',
                  name: 'Clinic Jelutong Shah Alam',
                  gender: 'Male',
                  isActive: true,
                  clinics: [],
                },
              ],
            },
          ],
        },
      },
    ];
    return store.dispatch(actions.getClinics()).then(() => {
      expect(api.getClinicsWithObject).toHaveBeenCalledTimes(1);
      expect(api.getClinicsWithObject).toHaveBeenCalledWith({
        clientId: 'testClient',
        lat: 0,
        lng: 0,
        page: 1,
      });
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetch specialities', async () => {
    const store = configureMockStore(api)(initialState);
    const expectedActions = [
      { type: types.GET_SPECIALITIES_START },
      {
        type: types.GET_SPECIALITIES_SUCCESS,
        payload: {
          totalCount: 4,
          page: 1,
          items: [
            { name: 'generalsurgery', code: 'generalsurgery' },
            { name: 'generalpractitio', code: 'generalpractitio' },
            { name: 'dentist', code: 'dentist' },
            { name: 'cxaSpeciality', code: 'cxaSpeciality' },
          ],
        },
      },
    ];
    return store.dispatch(actions.getSpecialities()).then(() => {
      expect(api.getSpecialities).toBeCalledTimes(1);
      expect(api.getSpecialities).toBeCalledWith(initialState.user.clientId);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('clearSearch', async () => {
    const store = configureStore(api, initialState);
    store.dispatch(actions.clearSearch());
    expect(store.getState().heal.searchResult.length).toEqual(0);
  });
});

describe('setDetailsClinic', () => {
  it('should create action to set details clinic', async () => {
    const store = configureMockStore(api)(initialState);
    const clinic = {
      id: 336,
      name: 'Clinic Bukit Rimau',
      latitude: 3.1275345,
      longitude: 101.6412337,
      distanceToClient: 11300034.6201797,
      location: {
        latitude: 3.1275345,
        longitude: 101.6412337,
      },
      address: 'Ho Chi Minh City, Vietnam',
      doctors: [
        {
          id: 322,
          locale: 'en-HK',
          name: 'Anna Tan',
          gender: 'Female',
          isActive: true,
          clinics: [],
        },
      ],
    };
    const expectedActions = [
      {
        type: types.SET_DETAILS_CLINIC,
        payload: {
          id: 336,
          name: 'Clinic Bukit Rimau',
          latitude: 3.1275345,
          longitude: 101.6412337,
          distanceToClient: 11300034.6201797,
          location: {
            latitude: 3.1275345,
            longitude: 101.6412337,
          },
          address: 'Ho Chi Minh City, Vietnam',
          doctors: [
            {
              id: 322,
              locale: 'en-HK',
              name: 'Anna Tan',
              gender: 'Female',
              isActive: true,
              clinics: [],
            },
          ],
        },
      },
    ];

    await store.dispatch(actions.setDetailsClinic(clinic));
    await flushMicrotasksQueue();
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('getDoctorsInfo', () => {
  it('should create action to get doctors info', () => {
    const store = configureMockStore(api)(initialState);
    const clinic = {
      id: 336,
      name: 'Clinic Bukit Rimau',
      latitude: 3.1275345,
      longitude: 101.6412337,
      distanceToClient: 11300034.6201797,
      address: 'Ho Chi Minh City, Vietnam',
      clinicProviderId: 1,
      doctors: [
        {
          id: 322,
          locale: 'en-HK',
          name: 'Chan Tai Man',
          gender: 'Female',
          isActive: true,
          clinics: [],
        },
        {
          id: 323,
          locale: 'en-HK',
          name: 'Chan Tai Man',
          gender: 'Female',
          isActive: true,
          clinics: [],
        },
      ],
    };
    const expectedActions = [
      { type: types.GET_DOCTORS_INFO_START },
      {
        type: types.GET_DOCTORS_INFO_SUCCESS,
        payload: [
          {
            data: {
              isOpen: true,
              isRemoteFull: false,
              isRemoteTicketEnabled: true,
              isAppointmentEnabled: true,
              position: 0,
              estimatedConsultationTime: '12:49 pm',
              ticketDepositAmount: 0,
              canGetRefundOnCancellation: false,
              cancellationGraceMinutes: 60,
              id: 322,
              gender: 'Female',
              locale: 'en-HK',
              name: 'Chan Tai Man',
              specialityCode: 'generalpractitio',
              isActive: true,
              clinics: [],
              clinicProviderId: 1,
            },
          },
          {
            data: {
              isOpen: true,
              isRemoteFull: false,
              isRemoteTicketEnabled: true,
              isAppointmentEnabled: true,
              position: 0,
              estimatedConsultationTime: '12:49 pm',
              ticketDepositAmount: 0,
              canGetRefundOnCancellation: false,
              cancellationGraceMinutes: 60,
              id: 323,
              gender: 'Female',
              locale: 'en-HK',
              name: 'Chan Tai Man',
              specialityCode: 'generalpractitio',
              isActive: true,
              clinics: [],
              clinicProviderId: 1,
            },
          },
        ],
      },
    ];
    return store.dispatch(actions.getDoctorsInfo(clinic)).then(() => {
      expect(api.getDoctorInfo).toHaveBeenCalledTimes(clinic.doctors.length);
      clinic.doctors.forEach(doctor => {
        expect(api.getDoctorInfo).toHaveBeenCalledWith({
          clientId: initialState.user.clientId,
          userId: initialState.user.userId,
          clinicProviderId: clinic.clinicProviderId,
          clinicId: clinic.id,
          doctorId: doctor.id,
        });
      });
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('scanQRCode', () => {
  it('should create action to scan qr code', () => {
    const store = configureMockStore(api)(initialState);
    const clinicQrCode = 'qrCode';
    const data = {
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
      doctors: [
        {
          isOpen: true,
          isRemoteFull: false,
          isRemoteTicketEnabled: true,
          isAppointmentEnabled: true,
          position: 0,
          estimatedConsultationTime: '12:49 pm',
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
          position: 0,
          estimatedConsultationTime: '12:49 pm',
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
    };
    const expectedActions = [
      { type: types.SCAN_QR_CODE_START },
      {
        type: types.SCAN_QR_CODE_SUCCESS,
        payload: { ...data, clinicQrCode },
      },
    ];
    return store.dispatch(actions.scanQRCode(clinicQrCode)).then(() => {
      expect(api.getDoctorInfo).toHaveBeenCalledTimes(4);
      data.doctors.forEach(doctor => {
        expect(api.getDoctorInfo).toHaveBeenCalledWith({
          clientId: initialState.user.clientId,
          userId: initialState.user.userId,
          clinicProviderId: data.clinic.clinicProviderId,
          clinicId: data.clinic.id,
          doctorId: doctor.id,
        });
      });
      expect(api.scanQRCode).toHaveBeenCalledTimes(1);
      expect(api.scanQRCode).toHaveBeenCalledWith({
        clientId: initialState.user.clientId,
        userId: initialState.user.userId,
        clinicQrCode,
      });
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('checkInTicket', () => {
  it('should create action to checkInTicket', () => {
    const store = configureMockStore(api)(initialState);
    const clinicProviderId = 1;
    const clinicId = 1;
    const doctorId = 1;

    const expectedActions = [
      { type: types.CHECK_IN_TICKET_START },
      {
        type: types.CHECK_IN_TICKET_SUCCESS,
        payload: {
          token: '304|1590425263|601',
          type: 'WalkIn',
          estimatedConsultationTime: 'TBC',
          state: 'STARTED',
          arrivalTime: '2020-05-27T00:47:43',
        },
      },
    ];
    return store
      .dispatch(actions.checkInTicket({ clinicProviderId, clinicId, doctorId }))
      .then(() => {
        expect(api.checkInTicket).toHaveBeenCalledTimes(1);
        expect(api.checkInTicket).toHaveBeenCalledWith({
          clientId: initialState.user.clientId,
          userId: initialState.user.userId,
          clinicProviderId,
          clinicId,
          doctorId,
        });
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('TicketBooking', () => {
  it('should create action to take queue for remote ticket', () => {
    const store = configureMockStore(api)(initialState);
    const clinicProviderId = 1;
    const clinicId = 1;
    const doctorId = 1;

    const expectedActions = [
      { type: types.TAKE_QUEUE_REMOTE_TICKET_START },
      {
        type: types.TAKE_QUEUE_REMOTE_TICKET_SUCCESS,
        payload: {
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
      },
    ];
    return store
      .dispatch(
        actions.takeQueueRemoteTicket({
          userId: initialState.user.userId,
          clinicProviderId,
          clinicId,
          doctorId,
        }),
      )
      .then(() => {
        expect(api.takeQueueRemoteTicket).toHaveBeenCalledTimes(1);
        expect(api.takeQueueRemoteTicket).toHaveBeenCalledWith({
          clientId: initialState.user.clientId,
          userId: initialState.user.userId,
          clinicProviderId,
          clinicId,
          doctorId,
        });
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('it should create action to get visit list', () => {
    const store = configureMockStore(api)(initialState);
    const userIds = ['client-001', 'client-002'];
    const expectedActions = [
      { type: types.GET_VISITS_START },
      {
        type: types.GET_VISITS_SUCCESS,
        payload: [
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
            memberId: 'client-001',
            clinicProviderId: 1,
            doctorId: 694,
            clinicId: 748,
          },
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
            memberId: 'client-002',
            clinicProviderId: 1,
            doctorId: 694,
            clinicId: 748,
          },
        ],
      },
    ];

    return store
      .dispatch(
        actions.getVisits({
          userIds,
        }),
      )
      .then(() => {
        expect(api.getVisits).toHaveBeenCalledTimes(2);
        userIds.forEach(userId => {
          expect(api.getVisits).toHaveBeenCalledWith({
            clientId: initialState.user.clientId,
            userId,
          });
        });
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('it should reset visit list', async () => {
    const store = configureMockStore(api)(initialState);
    const expectedActions = [{ type: types.RESET_VISIT_LIST }];

    await store.dispatch(actions.resetVisitList());
    await flushMicrotasksQueue();
    expect(store.getActions()).toEqual(expectedActions);
  });
});
