import axios from 'axios';
import Config from '@heal/src/config';
import { fetchTokens } from '@services/secureStore';

const getAuthHeaders = async () => {
  const { access_token } = await fetchTokens();
  return { Authorization: `Bearer ${access_token}` };
};

const getApi = async (url, options = { headers: {} }) => {
  const authHeaders = await getAuthHeaders();

  return axios.get(url, {
    ...options,
    headers: {
      ...authHeaders,
      ...options.headers,
    },
  });
};

const postApi = async (url, values, options = { headers: {} }) => {
  const authHeaders = await getAuthHeaders();

  return axios.post(url, values, {
    ...options,
    headers: {
      ...authHeaders,
      ...options.headers,
    },
  });
};

/*
const deleteApi = async (url, options = { headers: {} }) => {
  const authHeaders = await getAuthHeaders();

  return axios.delete(url, {
    ...options,
    headers: {
      ...authHeaders,
      ...options.headers,
    },
  });
};

// const putApi = async (url, values, options = { headers: {} }) => {
//   const authHeaders = await getAuthHeaders();

//   return axios.put(url, values, {
//     ...options,
//     headers: {
//       ...authHeaders,
//       ...options.headers,
//     },
//   });
// };

// const postFileDataApi = async (
//   url,
//   { uri, type, fileName },
//   options = { headers: {}, field: 'image' },
// ) => {
//   const bodyFormData = new FormData();
//   bodyFormData.append(options.field, {
//     uri,
//     type,
//     name: fileName,
//   });
//   const authHeaders = await getAuthHeaders();

//   return axios.post(url, bodyFormData, {
//     ...options,
//     headers: {
//       ...authHeaders,
//       ...(options.headers || {}),
//       'content-type': 'multipart/form-data',
//     },
//   });
// };

/* Endpoint definitions */
/* Clinics */
const getClinics = (
  clientId,
  lat,
  lng,
  page,
  limit,
  nearBy,
  searchBy,
  searchTerm,
) => {
  return getApi(
    Config.apiRoutes.getClinics(
      clientId,
      lat,
      lng,
      page,
      limit,
      nearBy,
      searchBy,
      searchTerm,
    ),
  );
};

const getClinicsWithObject = ({
  clientId,
  lat,
  lng,
  page,
  itemPerPage,
  nearBy,
  searchBy,
  searchTerm,
}) =>
  getApi(
    Config.apiRoutes.getClinicsWithObject({
      clientId,
      lat,
      lng,
      page,
      itemPerPage,
      nearBy,
      searchBy,
      searchTerm,
    }),
  );

const getDoctorInfo = ({
  clientId,
  userId,
  clinicProviderId,
  clinicId,
  doctorId,
}) => {
  return getApi(
    Config.apiRoutes.getDoctorInfo({
      clientId,
      userId,
      clinicProviderId,
      clinicId,
      doctorId,
    }),
  );
};

const getDoctors = ({
  clientId,
  page,
  itemPerPage = 20,
  specialityCode,
  searchBy,
  searchTerm,
}) =>
  getApi(
    Config.apiRoutes.getDoctors({
      clientId,
      page,
      itemPerPage,
      specialityCode,
      searchBy,
      searchTerm,
    }),
  );

const getSpecialities = clientId =>
  getApi(Config.apiRoutes.getSpecialities(clientId));

const scanQRCode = ({ clientId, userId, clinicQrCode }) =>
  postApi(Config.apiRoutes.scanQRCode({ clientId, userId, clinicQrCode }));

const checkInTicket = ({
  clientId,
  userId,
  clinicProviderId,
  clinicId,
  doctorId,
  dependentId,
}) =>
  postApi(Config.apiRoutes.checkInTicket({ clientId, userId, dependentId }), {
    clinicProviderId,
    clinicId,
    doctorId,
  });

const getMedicalProfile = (clientId, userId, dependentId) =>
  getApi(Config.apiRoutes.getMedicalProfile(clientId, userId, dependentId));
const updateMedicalProfile = ({
  clientId,
  userId,
  fullName,
  chineseName,
  address,
  emergencyContactName,
  emergencyContactNumber,
  emergencyRelationship,
  firstName,
  lastName,
  gender,
  dateOfBirth,
  email,
  identificationType = 'freetext',
  identificationNumber,
  contactNumber,
  dependentId,
}) =>
  postApi(
    Config.apiRoutes.updateMedicalProfile(clientId, userId, dependentId),
    {
      fullName,
      chineseName,
      address,
      emergencyContactName,
      emergencyContactNumber,
      emergencyRelationship,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      email,
      identificationType,
      identificationNumber,
      contactNumber,
    },
  );

const getAppointmentList = (clientId, userId) =>
  getApi(Config.apiRoutes.getAppointmentList(clientId, userId));

const acceptAppointment = ({
  clientId,
  userId,
  appointmentId,
  isConfirmed,
}) => {
  const data = Config.apiRoutes.acceptAppointment(
    clientId,
    userId,
    appointmentId,
  );
  return postApi(`${data}?isConfirmed=${isConfirmed}`, {});
};

const takeQueueRemoteTicket = ({
  clientId,
  userId,
  clinicProviderId,
  clinicId,
  doctorId,
  dependentId,
}) =>
  postApi(
    Config.apiRoutes.takeQueueRemoteTicket({
      clientId,
      userId,
      clinicProviderId,
      clinicId,
      doctorId,
      dependentId,
    }),
  );

const getRemoteTickets = (clientId, userId) =>
  getApi(Config.apiRoutes.getRemoteTickets(clientId, userId));

const cancelAppointment = ({ clientId, userId, appointmentId }) =>
  postApi(
    Config.apiRoutes.cancelAppointment(clientId, userId, appointmentId),
    {},
  );

const requestAppointment = ({
  clientId,
  userId,
  appointmentData,
  dependentId,
}) =>
  postApi(
    Config.apiRoutes.requestAppointment({ clientId, userId, dependentId }),
    appointmentData,
  );

const getVisits = ({ clientId, userId }) =>
  getApi(Config.apiRoutes.getVisits({ clientId, userId }));

const cancelVisit = ({ clientId, userId, providerId, visitId }) => {
  const data = Config.apiRoutes.cancelVisit({ clientId, userId });

  return postApi(
    `${data}?clinicProviderId=${providerId}&visitId=${visitId}`,
    {},
  );
};

const checkInRemoteTicket = ({ clientId, userId }) =>
  postApi(Config.apiRoutes.checkInRemoteTicket({ clientId, userId }));

export default {
  getDoctors,
  getSpecialities,
  getClinics,
  getDoctorInfo,
  getClinicsWithObject,
  checkInTicket,
  scanQRCode,
  getMedicalProfile,
  updateMedicalProfile,
  getAppointmentList,
  acceptAppointment,
  takeQueueRemoteTicket,
  getRemoteTickets,
  requestAppointment,
  cancelAppointment,
  getVisits,
  cancelVisit,
  checkInRemoteTicket,
};
