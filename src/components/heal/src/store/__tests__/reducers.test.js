import reducers from '../reducers';
import * as types from '../types';
import {
  appointmentCalendar,
  appointmentCancel,
  appointmentFinish,
  appointmentTimer,
} from '@heal/images';

const initialState = {
  searchResult: [],
  location: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
    changedLocation: false,
  },
  clinicData: {
    searchTerm: null,
    searchBy: null,
    clinics: [],
    page: 0,
    total: 0,
    selectedClinic: {},
    selectedClinics: [],
  },
  doctorInfo: {},
  doctorData: {
    doctors: [],
    page: 0,
    total: 0,
    specialityCode: '',
  },
  detailsClinic: {},
  remoteTicket: {
    bookedData: {},
    visitList: {},
  },
  scannedData: {
    qrCodeData: {},
  },
  checkedInData: {},
  appointmentList: [],
  appointmentTempType: '',
  remoteTickets: [],
  member: {},
  invoices: [],
};

const withDataInitialState = {
  location: {
    latitude: 0,
    longitude: 0,
  },
  clinicData: {
    clinics: [
      {
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
            name: 'Anna Tan',
            gender: 'Female',
            isActive: true,
            clinics: [],
          },
          {
            id: 323,
            locale: 'en-HK',
            name: 'Anna Tan',
            gender: 'Female',
            isActive: true,
            clinics: [],
          },
        ],
      },
    ],
    page: 0,
    total: 0,
  },
  doctorInfo: {},
  doctorData: {
    doctors: [],
    page: 0,
    total: 0,
    specialityCode: '',
  },
  detailsClinic: {
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
        name: 'Anna Tan',
        gender: 'Female',
        isActive: true,
        clinics: [],
      },
      {
        id: 323,
        locale: 'en-HK',
        name: 'Anna Tan',
        gender: 'Female',
        isActive: true,
        clinics: [],
      },
    ],
  },
};

describe('Heal reducer', () => {
  it('should return the initialState', () => {
    const state = reducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle fetch clinics success', () => {
    const action = {
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
    };

    const expectedData = {
      ...initialState,
      clinicData: {
        total: 2,
        page: 1,
        selectedClinic: {},
        selectedClinics: [],
        clinics: [
          {
            id: 336,
            name: 'Clinic Bukit Rimau',
            latitude: 3.1275345,
            longitude: 101.6412337,
            distanceToClient: 11300034.6201797,
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
    };

    const reducer = reducers(initialState, action);
    expect(reducer).toEqual(expectedData);
  });

  it('should set details clinic', () => {
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
          name: 'Anna Tan',
          gender: 'Female',
          isActive: true,
          clinics: [],
        },
        {
          id: 323,
          locale: 'en-HK',
          name: 'Anna Tan',
          gender: 'Female',
          isActive: true,
          clinics: [],
        },
      ],
    };
    const action = {
      type: types.SET_DETAILS_CLINIC,
      payload: clinic,
    };

    const expectedData = {
      ...initialState,
      detailsClinic: {
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
            name: 'Anna Tan',
            gender: 'Female',
            isActive: true,
            clinics: [],
          },
          {
            id: 323,
            locale: 'en-HK',
            name: 'Anna Tan',
            gender: 'Female',
            isActive: true,
            clinics: [],
          },
        ],
      },
    };

    const reducer = reducers(initialState, action);
    expect(reducer).toEqual(expectedData);
  });

  it('should handle get doctors info', () => {
    const action = {
      type: types.GET_DOCTORS_INFO_SUCCESS,
      payload: [
        {
          data: {
            isOpen: true,
            isRemoteFull: false,
            isRemoteTicketEnabled: true,
            isAppointmentEnabled: true,
            position: 0,
            estimatedConsultationTime: '3:23 pm',
            ticketDepositAmount: 0.0,
            canGetRefundOnCancellation: false,
            cancellationGraceMinutes: 60,
            id: 322,
            name: null,
            specialityCode: null,
            gender: 'Male',
            email: null,
            imageUrl: null,
            introduction: null,
          },
        },
        {
          data: {
            isOpen: true,
            isRemoteFull: false,
            isRemoteTicketEnabled: true,
            isAppointmentEnabled: true,
            position: 0,
            estimatedConsultationTime: '3:23 pm',
            ticketDepositAmount: 0.0,
            canGetRefundOnCancellation: false,
            cancellationGraceMinutes: 60,
            id: 323,
            name: null,
            specialityCode: null,
            gender: 'Male',
            email: null,
            imageUrl: null,
            introduction: null,
          },
        },
      ],
    };

    const expectedData = {
      ...withDataInitialState,
      detailsClinic: {
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
            name: 'Anna Tan',
            gender: 'Female',
            isActive: true,
            clinics: [],
            isOpen: true,
            isRemoteFull: false,
            isRemoteTicketEnabled: true,
            isAppointmentEnabled: true,
            position: 0,
            estimatedConsultationTime: '3:23 pm',
            ticketDepositAmount: 0.0,
            canGetRefundOnCancellation: false,
            cancellationGraceMinutes: 60,
            specialityCode: null,
            email: null,
            imageUrl: null,
            introduction: null,
          },
          {
            id: 323,
            locale: 'en-HK',
            name: 'Anna Tan',
            gender: 'Female',
            isActive: true,
            clinics: [],
            isOpen: true,
            isRemoteFull: false,
            isRemoteTicketEnabled: true,
            isAppointmentEnabled: true,
            position: 0,
            estimatedConsultationTime: '3:23 pm',
            ticketDepositAmount: 0.0,
            canGetRefundOnCancellation: false,
            cancellationGraceMinutes: 60,
            specialityCode: null,
            email: null,
            imageUrl: null,
            introduction: null,
          },
        ],
      },
    };

    const reducer = reducers(withDataInitialState, action);
    expect(reducer).toEqual(expectedData);
  });

  it('it should update location', () => {
    const action = {
      type: types.FETCH_LOCATION_SUCCESS,
      payload: {
        coords: { latitude: 51.50998, longitude: -0.1337 },
      },
    };
    const expectedData = {
      ...initialState,
      location: {
        latitude: 51.50998,
        longitude: -0.1337,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
        changedLocation: true,
      },
    };

    const reducer = reducers(initialState, action);
    expect(reducer).toEqual(expectedData);
  });

  it('it should get walk in select data', () => {
    const action = {
      type: types.SCAN_QR_CODE_SUCCESS,
      payload: {
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
      },
    };
    const expectedData = {
      ...initialState,
      scannedData: {
        qrCodeData: {
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
        },
      },
    };

    const reducer = reducers(initialState, action);
    expect(reducer).toEqual(expectedData);
  });

  it('it should get check in ticket data', () => {
    const action = {
      type: types.CHECK_IN_TICKET_SUCCESS,
      payload: {
        token: '304|1590425263|601',
        type: 'WalkIn',
        estimatedConsultationTime: 'TBC',
        state: 'STARTED',
        arrivalTime: '2020-05-27T00:47:43',
      },
    };
    const expectedData = {
      ...initialState,
      checkedInData: {
        token: '304|1590425263|601',
        type: 'WalkIn',
        estimatedConsultationTime: 'TBC',
        state: 'STARTED',
        arrivalTime: '2020-05-27T00:47:43',
      },
    };

    const reducer = reducers(initialState, action);
    expect(reducer).toEqual(expectedData);
  });

  it('it should handle take queue remote ticket', () => {
    const data = {
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
    };
    const action = {
      type: types.TAKE_QUEUE_REMOTE_TICKET_SUCCESS,
      payload: data,
    };
    const expectedData = {
      ...initialState,
      remoteTicket: { ...initialState.remoteTicket, bookedData: data },
    };

    const reducer = reducers(initialState, action);
    expect(reducer).toEqual(expectedData);
  });

  it('it should handle get visits', () => {
    const data = {
      392: [
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
      ],
    };
    const action = {
      type: types.GET_VISITS_SUCCESS,
      payload: data,
    };
    const expectedData = {
      ...initialState,
      remoteTicket: { ...initialState.remoteTicket, visitList: data },
    };

    const reducer = reducers(initialState, action);
    expect(reducer).toEqual(expectedData);
  });

  it('it should handle reset visit list', () => {
    const action = {
      type: types.RESET_VISIT_LIST,
    };
    const expectedData = {
      ...initialState,
      remoteTicket: {
        ...initialState.remoteTicket,
        visitList: {},
      },
    };

    const reducer = reducers(initialState, action);
    expect(reducer).toEqual(expectedData);
  });
});
