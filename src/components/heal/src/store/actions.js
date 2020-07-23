import * as types from './types';
import moment from 'moment';

export const getDoctors = specialityCode => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId } = getState().user;
    const { doctorData } = getState().heal;
    let page = doctorData.page + 1;
    if (doctorData.specialityCode !== specialityCode) {
      page = 1;
    }
    const { data } = await api.getDoctors({ clientId, page, specialityCode });
    return { ...data, specialityCode };
  };
  return dispatch({
    type: types.GET_DOCTORS,
    payload: getPromise(),
  });
};

export const getClinics = ({
  searchTerm,
  searchBy,
  forceReload,
} = {}) => async (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId } = getState().user;
    const { location, clinicData } = getState().heal;
    let page = clinicData.page + 1;
    if (
      searchTerm !== clinicData.searchTerm ||
      searchBy !== clinicData.searchBy
    )
      page = 1;

    if (forceReload) page = 1;

    const response = await api.getClinicsWithObject({
      clientId,
      lat: location.latitude,
      lng: location.longitude,
      page,
      searchTerm,
      searchBy,
    });
    response.data.items = transformClinicForCluster(response.data.items);
    return { ...response.data, searchTerm, searchBy, forceReload };
  };

  return dispatch({
    type: types.FETCH_CLINICS,
    payload: getPromise(),
  });
};

export const fetchLocation = () => async (dispatch, getState, { api }) => {
  const position = {
    coords: {
      latitude: 0,
      longitude: 0,
    },
  };
  const getPromise = async () => {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => resolve(position),
      );
    });
  };

  return dispatch({
    type: types.FETCH_LOCATION,
    payload: getPromise(),
  });
};

export const getSpecialities = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId } = getState().user;
    const { data } = await api.getSpecialities(clientId);
    return data;
  };
  return dispatch({
    type: types.GET_SPECIALITIES,
    payload: getPromise(),
  });
};

export const getDoctorsInfo = clinic => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId, userId } = getState().user;
    const clinicProviderId = clinic.clinicProviderId;
    const clinicId = clinic.id;
    let promiseArray = [];

    for (let i = 0; i < clinic.doctors.length; i += 1) {
      const doctor = clinic.doctors[i];
      promiseArray.push(
        api.getDoctorInfo({
          clientId,
          userId,
          clinicProviderId,
          clinicId,
          doctorId: doctor.id,
        }),
      );
    }
    const data = await Promise.all(promiseArray);
    return data;
  };
  return dispatch({
    type: types.GET_DOCTORS_INFO,
    payload: getPromise(),
  });
};

export const setDetailsClinic = clinic => (dispatch, getState, { api }) => {
  return dispatch({
    type: types.SET_DETAILS_CLINIC,
    payload: clinic,
  });
};

export const search = ({ searchTerm, latitude, longitude }) => (
  dispatch,
  getState,
  { api },
) => {
  const searchClinics = async ({
    searchBy,
    searchTerm,
    searchType,
    lat = null,
    lng = null,
    nearBy = null,
  }) => {
    const { clientId } = getState().user;
    const { data } = await api.getClinicsWithObject({
      clientId,
      lat,
      lng,
      page: 1,
      itemPerPage: types.GET_ALL,
      nearBy,
      searchBy,
      searchTerm,
    });
    return { ...data, searchType };
  };

  const searchDoctors = async ({
    searchBy,
    searchTerm,
    specialityCode,
    searchType,
  }) => {
    const { clientId } = getState().user;
    const { data } = await api.getDoctors({
      clientId,
      page: 1,
      itemPerPage: types.GET_ALL,
      searchBy,
      searchTerm,
      specialityCode,
    });
    if (specialityCode) return { ...data, specialityCode, searchType };
    else return { ...data, searchType };
  };

  const doSearch = async () => {
    const { specialities, specialitiesByCode } = getState().heal;

    let data = [];
    let raw;
    let specialitySearchResult = [];

    if (searchTerm === types.SearchItemType.NearMe) {
      raw = await searchClinics({
        searchType: types.SearchItemType.NearMe,
        nearBy: types.UNIFY_SEARCH_DISTANCE,
        lat: latitude,
        lng: longitude,
      });
    } else {
      const filteredSpecialities = specialities.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      raw = await Promise.all([
        searchDoctors({
          searchTerm,
          searchBy: types.DoctorSearchType.Name,
          searchType: types.SearchItemType.Doctor,
        }),
        ...filteredSpecialities.map(f =>
          searchDoctors({
            specialityCode: f.code,
            searchType: types.SearchItemType.Speciality,
          }),
        ),
        searchClinics({
          searchBy: types.ClinicSearchType.Name,
          searchTerm,
          searchType: types.SearchItemType.Clinic,
        }),
        searchClinics({
          searchBy: types.ClinicSearchType.Location,
          searchTerm,
          searchType: types.SearchItemType.Location,
        }),
      ]);
    }

    for (let i = 0; i < raw.length; i++) {
      const res = raw[i];
      switch (res.searchType) {
        case types.SearchItemType.Doctor:
          if (res.items?.length > 0)
            data.push({
              title: 'heal.UnifySearch.DoctorName',
              data: res.items.map(d => ({
                title: d.name,
                subtitle: null,
                data: { ...d, type: types.SearchItemType.Doctor },
              })),
            });
          break;
        case types.SearchItemType.Speciality:
          if (res.totalCount > 0) {
            specialitySearchResult.push({
              title: specialitiesByCode[res.specialityCode].name,
              subtitle: res.totalCount,
              data: {
                specialityCode: res.specialityCode,
                type: types.SearchItemType.Speciality,
              },
            });
          }
          const s = data.find(d => d.title === 'heal.UnifySearch.Speciality');
          if (!s && specialitySearchResult.length > 0)
            data.push({
              title: 'heal.UnifySearch.Speciality',
              data: specialitySearchResult,
            });
          break;
        case types.SearchItemType.Location:
          if (res.totalCount > 0) {
            let location = {};
            const items = res.items;
            for (let i = 0; i < items.length; i++) {
              if (!location[items[i].district]) location[items[i].district] = 0;
              location[items[i].district] += 1;
            }
            data.push({
              title: 'heal.UnifySearch.Location',
              data: Object.keys(location).map(k => ({
                title: k,
                subtitle: location[k],
                data: {
                  districtCode: k,
                  type: types.SearchItemType.Location,
                },
              })),
            });
          }
          break;
        case types.SearchItemType.Clinic:
          if (res.items?.length > 0)
            data.push({
              title: 'heal.UnifySearch.ClinicName',
              data: res.items.map(c => ({
                title: c.name,
                subtitle: null,
                data: { ...c, type: types.SearchItemType.Clinic },
              })),
            });
          break;
      }
    }

    console.log(data);
    return data;
  };

  return dispatch({
    type: types.SEARCH,
    payload: doSearch(),
  });
};

export const clearSearch = () => (dispatch, getState, { api }) => {
  return dispatch({ type: types.CLEAR_SEARCH });
};

const transformClinicForCluster = clinics => {
  const data = clinics.map(clinic => ({
    ...clinic,
    location: { longitude: clinic.longitude, latitude: clinic.latitude },
  }));
  return data;
};

export const updateSelectedClinic = clinic => dispatch => {
  return dispatch({
    type: types.UPDATE_SELECTED_CLINIC,
    payload: clinic,
  });
};

export const updateSelectedClinics = clinics => dispatch => {
  return dispatch({
    type: types.UPDATE_SELECTED_CLINICS,
    payload: clinics,
  });
};

export const updateClinicPage = () => dispatch => {
  return dispatch({
    type: types.UPDATE_CLINIC_PAGE,
  });
};

export const scanQRCode = clinicQrCode => (dispatch, getState, { api }) => {
  const scan = async () => {
    const { clientId, userId } = getState().user;
    let promiseArray = [];
    let qrCodeData = await api.scanQRCode({
      clientId,
      userId,
      clinicQrCode,
    });
    qrCodeData = qrCodeData.data;

    if (qrCodeData.doctors) {
      for (let i = 0; i < qrCodeData.doctors.length; i += 1) {
        const doctor = qrCodeData.doctors[i];
        promiseArray.push(
          api.getDoctorInfo({
            clientId,
            userId,
            clinicProviderId: qrCodeData.clinic.clinicProviderId,
            clinicId: qrCodeData.clinic.id,
            doctorId: doctor.id,
          }),
        );
      }
    }

    let doctorsInfo = await Promise.all(promiseArray);
    let newDoctors = [];

    for (let i = 0; i < doctorsInfo.length; i += 1) {
      const doctorInfo = doctorsInfo[i].data;
      for (let j = 0; j < qrCodeData.doctors.length; j += 1) {
        let doctor = qrCodeData.doctors[j];
        if (doctorInfo.id === doctor.id) {
          doctor = { ...doctorInfo, ...doctor };
          newDoctors.push(doctor);
          break;
        }
      }
    }

    qrCodeData.doctors = newDoctors;

    return { ...qrCodeData, clinicQrCode };
  };

  return dispatch({
    type: types.SCAN_QR_CODE,
    payload: scan(),
  });
};

export const checkInTicket = ({
  clinicProviderId,
  clinicId,
  doctorId,
  dependentId,
}) => (dispatch, getState, { api }) => {
  const checkIn = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.checkInTicket({
      clientId,
      userId,
      clinicProviderId,
      clinicId,
      doctorId,
      dependentId,
    });
    return data;
  };

  return dispatch({
    type: types.CHECK_IN_TICKET,
    payload: checkIn(),
  });
};

export const getMedicalProfile = ({ dependentId }) => (
  dispatch,
  getState,
  { api },
) => {
  const fetchProfile = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.getMedicalProfile(clientId, userId, dependentId);
    return data;
  };
  return dispatch({
    type: types.GET_MEDICAL_PROFILE,
    payload: fetchProfile(),
  });
};

export const updateMedicalProfile = () => (dispatch, getState, { api }) => {
  const updateProfile = async () => {
    const { clientId, userId } = getState().user;
    const { values } = getState().form.checkinForm;
    const { data } = await api.updateMedicalProfile({
      clientId,
      userId,
      dependentId: values.memberId !== userId ? values.memberId : undefined,
      ...values,
    });
    return data;
  };
  return dispatch({
    type: types.UPDATE_MEDICAL_PROFILE,
    payload: updateProfile(),
  });
};

export const getAppointmentList = () => (dispatch, getState, { api }) => {
  const fetchAppointment = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.getAppointmentList(clientId, userId);
    dispatch({
      type: types.GET_APPOINTMENT_LIST,
      payload: data,
    });
  };
  fetchAppointment();
};

export const acceptAppointment = (confirm, appointmentId) => (
  dispatch,
  getState,
  { api },
) => {
  const updateAppointment = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.acceptAppointment({
      clientId,
      userId: userId,
      appointmentId,
      isConfirmed: confirm,
    });
    return data;
  };
  return dispatch({
    type: types.ACCEPT_APPOINTMENT,
    payload: updateAppointment(),
  });
};

export const takeQueueRemoteTicket = ({
  clinicProviderId,
  clinicId,
  doctorId,
  dependentId,
}) => (dispatch, getState, { api }) => {
  const takeQueue = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.takeQueueRemoteTicket({
      clientId,
      userId,
      clinicProviderId,
      clinicId,
      doctorId,
      dependentId,
    });
    return data;
  };

  return dispatch({
    type: types.TAKE_QUEUE_REMOTE_TICKET,
    payload: takeQueue(),
  });
};

export const getRemoteTickets = () => (dispatch, getState, { api }) => {
  const getTickets = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.getRemoteTickets(clientId, userId);
    return data;
  };
  return dispatch({
    type: types.GET_REMOTE_TICKETS,
    payload: getTickets(),
  });
};

export const cancelAppointment = appointmentId => (
  dispatch,
  getState,
  { api },
) => {
  const updateAppointment = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.cancelAppointment({
      clientId,
      userId: userId,
      appointmentId,
    });
    return data;
  };
  return dispatch({
    type: types.CANCEL_APPOINTMENT,
    payload: updateAppointment(),
  });
};

export const getMembers = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId, userId } = getState().user;
    const response = await api.fetchMemberProfile(clientId, userId);
    return response.data;
  };
  return dispatch({
    type: types.GET_MEMBER,
    payload: getPromise(),
  });
};

export const requestAppointment = (
  clinicProviderId,
  doctorId,
  clinicId,
  dates,
  dependentId,
) => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId, userId } = getState().user;
    let datesObj = {};
    dates.map((item, index) => {
      if (index === 0) {
        datesObj.firstPreferredTime = moment(item.date).toISOString();
        datesObj.firstSession = item.time;
      }
      if (index === 1) {
        datesObj.secondPreferredTime = moment(item.date).toISOString();
        datesObj.secondSession = item.time;
      }
      if (index === 2) {
        datesObj.thirdPreferredTime = moment(item.date).toISOString();
        datesObj.thirdSession = item.time;
      }
    });
    const appointmentData = {
      clinicProviderId: clinicProviderId,
      doctorId: doctorId,
      clinicId: clinicId,
      ...datesObj,
    };
    const { data } = await api.requestAppointment({
      clientId,
      userId,
      dependentId,
      appointmentData,
    });
    return data;
  };
  return dispatch({
    type: types.REQUEST_APPOINTMENT,
    payload: getPromise(),
  });
};

export const getVisits = ({ userIds }) => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId } = getState().user;
    let apiList = [];
    let dataList = [];

    userIds.forEach(userId => {
      apiList.push(api.getVisits({ clientId, userId }));
    });

    const allResponses = await Promise.all(apiList);
    allResponses.forEach(response => {
      const { data } = response;
      // if (data && data.length > 0) {
      //   dataList[`${data[0].memberId}`] = data;
      // }
      dataList = [...dataList, ...data];
    });

    return dataList;
  };

  return dispatch({
    type: types.GET_VISITS,
    payload: getPromise(),
  });
};

export const resetVisitList = () => (dispatch, getState, { api }) => {
  return dispatch({
    type: types.RESET_VISIT_LIST,
  });
};

export const cancelVisit = (providerId, visitId) => (
  dispatch,
  getState,
  { api },
) => {
  const updateVisit = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.cancelVisit({
      clientId,
      userId: userId,
      providerId,
      visitId,
    });
    return data;
  };
  return dispatch({
    type: types.CANCEL_VISIT,
    payload: updateVisit(),
  });
};

export const checkInRemoteTicket = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const { clientId, userId } = getState().user;
    const { data } = await api.checkInRemoteTicket({ clientId, userId });
    return data;
  };

  return dispatch({
    type: types.CONFIRM_REMOTE_TICKET,
    payload: getPromise(),
  });
};

export const getInvoices = () => (dispatch, getState, { api }) => {
  const getPromise = async () => {
    const data = [
      {
        visit_token: '304|1582267509|479',
        message_code: '0000',
        error_messages: [],
        invoice: {
          id: 1928,
          invoice_code: '304202002210001',
          state: 'DONE',
          copay_amount: 0,
          total_amount: 100,
          items: [
            {
              name: 'One Care Clinic',
              amount: 100,
              treatment_code: '1',
            },
          ],
          diagnosis: [
            {
              name: 'diagnosis abc, diagnosis def',
              scheme: null,
              code: null,
            },
          ],
          service_date: '2020-02-21',
          transactions: [
            {
              id: '20200221144935379133479',
              type: 'VISIT',
              amount: 100,
              state: 'DONE',
              method: 'INSURER',
              method_ids: [],
              reference_no: null,
            },
          ],
        },
      },
      {
        visit_token: '304|1582267509|479',
        message_code: '0000',
        error_messages: [],
        invoice: {
          id: 1928,
          invoice_code: '304202002210001',
          state: 'DONE',
          copay_amount: 0,
          total_amount: 100,
          items: [
            {
              name: 'Parkway East Hospital',
              amount: 100,
              treatment_code: '1',
            },
          ],
          diagnosis: [
            {
              name: 'diagnosis abc, diagnosis def',
              scheme: null,
              code: null,
            },
          ],
          service_date: '2020-02-21',
          transactions: [
            {
              id: '20200221144935379133479',
              type: 'VISIT',
              amount: 100,
              state: 'DONE',
              method: 'INSURER',
              method_ids: [],
              reference_no: null,
            },
          ],
        },
      },
      {
        visit_token: '304|1582267509|479',
        message_code: '0000',
        error_messages: [],
        invoice: {
          id: 1928,
          invoice_code: '304202002210001',
          state: 'PENDING',
          copay_amount: 0,
          total_amount: 234.21,
          items: [
            {
              name: 'Consultation fee',
              amount: 150,
              treatment_code: '1',
            },
            {
              name: 'X-ray',
              amount: 55,
              treatment_code: '2',
            },
            {
              name: 'Medicine',
              amount: 29.21,
              treatment_code: '3',
            },
            {
              name: 'Special discount',
              amount: 20,
              treatment_code: '3',
            },
          ],
          diagnosis: [
            {
              name: 'diagnosis abc, diagnosis def',
              scheme: null,
              code: null,
            },
          ],
          service_date: '2020-02-21',
          transactions: [
            {
              id: '20200221144935379133479',
              type: 'VISIT',
              amount: 100,
              state: 'DONE',
              method: 'INSURER',
              method_ids: [],
              reference_no: null,
            },
          ],
        },
      },
    ];

    return data;
  };

  return dispatch({
    type: types.GET_INVOICES,
    payload: getPromise(),
  });
};
