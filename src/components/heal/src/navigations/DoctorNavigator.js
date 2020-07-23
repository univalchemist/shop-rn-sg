import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { PANEL_SEARCH, DOCTOR_LANDING } from '@routes';
import { StackBackButton, ModalBackButton } from '@wrappers/components';
import PanelSearchScreen from '@heal/src/screens/Clinics/ClinicPanel';
import { DoctorLandingHeader } from '@screens/Panel';
import { useIntl } from '@wrappers/core/hooks';
import { truncate } from '@navigations/utils';
import {
  ClinicDetails,
  DoctorDetailScreen,
  DoctorListingScreen,
  SelectDoctor,
  CheckIn,
  ScanQRCodeScreen,
  CheckInSelectMemberScreen,
  CheckInFormScreen,
  TicketBooking,
  TicketBookingResult,
  ConfirmCheckInScreen,
  CheckInScreen,
  DeleteQueConfirmation,
  InvoiceDetailsScreen,
} from '@heal/src/screens';
import SpecialistScreen from '@heal/src/screens/SpecialistScreen';
import { healNavigationOptions } from '@heal/src/components';
import MultipleClinicsListView from '@heal/src/screens/Clinics/widgets/MultipleClinicsListView';
import PanelClinicDetails from '@heal/src/screens/Clinics/widgets/PanelClinicDetails';
import SelectFamilyMember from '@heal/src/screens/BookAppointment/SelectFamilyMember';
import SelectClinic from '@heal/src/screens/BookAppointment/SelectClinic';
import UnifySearchScreen from '@heal/src/screens/UnifySearchScreen';
import HealTabNavigator from '@heal/src/navigations/HealTabNavigator';
import {
  HEAL_APPOINTMENT_CONFIRMATION,
  HEAL_APPOINTMENT_DETAIL,
  HEAL_APPOINTMENT_LIST,
  HEAL_THANK_YOU,
  HEAL_MEDICATION,
  HEAL_CONFIRM_NEXT,
  HEAL_INVOICES,
  HEAL_DOCTOR_DETAIL,
  HEAL_MULTIPLE_CLINICS_LIST_VIEW,
  HEAL_CLINIC_DETAILS,
  HEAL_PANEL_CLINIC_DETAILS,
  HEAL_SELECT_FAMILY_MEMBER,
  HEAL_SELECT_CLINIC,
  HEAL_CHECK_IN_SELECT_MEMBER,
  HEAL_CHECK_IN_FORM,
  HEAL_APPOINTMENT_REQUESTED,
  HEAL_WALK_IN_SELECT_DOCTOR,
  HEAL_WALK_IN_CHECK_IN,
  HEAL_REMOTE_TICKET_BOOKING,
  HEAL_REMOTE_TICKET_BOOKING_RESULT,
  HEAL_CHECK_IN_CONFIRMATION,
  HEAL_CHECK_IN_SCREEN,
  HEAL_DELETE_QUEUE_CONFIRMATION,
  HEAL_INVOICE_DETAILS,
  HEAL_UNIFY_SEARCH,
  HEAL_DOCTOR_LISTING,
  HEAL_SPECIALITY_LISTING,
  HEAL_SCAN_QR_CODE,
  HEAL_CLINIC_INFORMATION,
} from '@heal/routes';
import AppointmentListingScreen from '@heal/src/screens/Appointment/AppointmentListingScreen';
import AppointmentDetailScreen from '@heal/src/screens/Appointment/AppointmentDetailScreen';
import AppointmentConfirmation from '@heal/src/screens/Appointment/AppointmentConfirmation';
import ThankYouScreen from '@heal/src/screens/Appointment/ThankYouScreen';
import MedicationScreen from '@heal/src/screens/Medication/MedicationScreen';
import AppointmentRequested from '@heal/src/screens/BookAppointment/AppointmentRequested';
import ConfirmNextScreen from '@heal/src/screens/WalkIn/ConfirmNextScreen';
import { InvoicesScreen } from '@heal/src/screens/Invoices';
import ClinicInformation from '@heal/src/screens/Clinics/ClinicInformation';
const Stack = createStackNavigator();

const HealthNavigator = () => {
  const intl = useIntl();

  return (
    <Stack.Navigator
      initialRouteName={DOCTOR_LANDING}
      screenOptions={{
        headerBackTitleVisible: false,
      }}
      headerMode="screen"
      keyboardHandlingEnabled={false}
    >
      <Stack.Screen
        name={DOCTOR_LANDING}
        component={HealTabNavigator}
        options={{
          headerBackImage: StackBackButton,
          title: intl.formatMessage({ id: 'health' }),
          ...TransitionPresets.SlideFromRightIOS,
          headerRight: () => <DoctorLandingHeader />,
        }}
      />
      <Stack.Screen
        name={HEAL_SCAN_QR_CODE}
        component={ScanQRCodeScreen}
        options={{
          headerBackImage: StackBackButton,
          title: intl.formatMessage({ id: 'heal.checkin.title' }),
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name={HEAL_CHECK_IN_SELECT_MEMBER}
        component={CheckInSelectMemberScreen}
        options={{
          headerBackImage: StackBackButton,
          title: intl.formatMessage({ id: 'heal.checkin.title' }),
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={HEAL_CHECK_IN_FORM}
        component={CheckInFormScreen}
        options={{
          headerBackImage: StackBackButton,
          title: intl.formatMessage({ id: 'heal.checkin.title' }),
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={HEAL_UNIFY_SEARCH}
        component={UnifySearchScreen}
        options={{
          cardStyleInterpolator,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={HEAL_SPECIALITY_LISTING}
        component={SpecialistScreen}
        options={{
          ...healNavigationOptions,
          title: intl.formatMessage({ id: 'heal.specialist' }),
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={HEAL_DOCTOR_LISTING}
        component={DoctorListingScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={HEAL_DOCTOR_DETAIL}
        component={DoctorDetailScreen}
        options={{
          ...healNavigationOptions,
          title: intl.formatMessage({ id: 'heal.doctor' }),
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={PANEL_SEARCH}
        component={PanelSearchScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={HEAL_CLINIC_DETAILS}
        component={ClinicDetails}
        options={({ route }) => {
          return {
            title: intl.formatMessage({ id: 'heal.clinic' }),
            headerBackImage: StackBackButton,
            ...TransitionPresets.SlideFromRightIOS,
          };
        }}
      />
      <Stack.Screen
        name={HEAL_PANEL_CLINIC_DETAILS}
        component={PanelClinicDetails}
        options={({ route }) => {
          const clinicName = route.params?.selectedClinic?.name;
          const title = truncate(clinicName, 20);
          return {
            title,
            headerBackImage: StackBackButton,
          };
        }}
      />

      <Stack.Screen
        name={HEAL_WALK_IN_SELECT_DOCTOR}
        component={SelectDoctor}
        options={{
          ...healNavigationOptions,
          title: intl.formatMessage({
            id: 'heal.walkInSelectDoctor.title',
          }),
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name={HEAL_WALK_IN_CHECK_IN}
        component={CheckIn}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name={HEAL_REMOTE_TICKET_BOOKING}
        component={TicketBooking}
        options={{
          title: intl.formatMessage({
            id: 'heal.ticketBooking.title',
          }),
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name={HEAL_REMOTE_TICKET_BOOKING_RESULT}
        component={TicketBookingResult}
        options={{
          headerShown: false,
          ...healNavigationOptions,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name={HEAL_MULTIPLE_CLINICS_LIST_VIEW}
        component={MultipleClinicsListView}
        options={({ route }) => ({
          title: intl.formatMessage(
            {
              id: 'panelSearch.multipleClinicsListViewTitle',
            },
            { noOfClinics: route.params?.clinics?.length },
          ),
          headerBackImage: StackBackButton,
        })}
      />
      <Stack.Screen
        name={HEAL_SELECT_FAMILY_MEMBER}
        component={SelectFamilyMember}
        options={({ route }) => ({
          title: intl.formatMessage({
            id: 'heal.doctor.scheduleAppointment',
          }),
          headerBackImage: StackBackButton,
          ...TransitionPresets.SlideFromRightIOS,
        })}
      />
      <Stack.Screen
        name={HEAL_SELECT_CLINIC}
        component={SelectClinic}
        options={({ route }) => ({
          title: intl.formatMessage({
            id: 'heal.doctor.scheduleAppointment',
          }),
          headerBackImage: StackBackButton,
          ...TransitionPresets.SlideFromRightIOS,
        })}
      />
      <Stack.Screen
        name={HEAL_APPOINTMENT_LIST}
        component={AppointmentListingScreen}
        options={{
          headerBackImage: StackBackButton,
          title: intl.formatMessage({ id: 'health' }),
          ...TransitionPresets.SlideFromRightIOS,
          headerRight: () => <DoctorLandingHeader />,
        }}
      />
      <Stack.Screen
        name={HEAL_APPOINTMENT_DETAIL}
        component={AppointmentDetailScreen}
        options={{
          headerBackImage: StackBackButton,
          title: 'Clinic',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={HEAL_CONFIRM_NEXT}
        component={ConfirmNextScreen}
        options={{
          headerBackImage: StackBackButton,
          title: 'Appointment schedule',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={HEAL_APPOINTMENT_CONFIRMATION}
        component={AppointmentConfirmation}
        options={{
          cardStyleInterpolator,
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={HEAL_THANK_YOU}
        component={ThankYouScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={HEAL_MEDICATION}
        component={MedicationScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={HEAL_APPOINTMENT_REQUESTED}
        component={AppointmentRequested}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={HEAL_CHECK_IN_SCREEN}
        component={CheckInScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerBackImage: StackBackButton,
          title: intl.formatMessage({ id: 'heal.checkin.title' }),
        }}
      />
      <Stack.Screen
        name={HEAL_CHECK_IN_CONFIRMATION}
        component={ConfirmCheckInScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={HEAL_DELETE_QUEUE_CONFIRMATION}
        component={DeleteQueConfirmation}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={HEAL_INVOICE_DETAILS}
        component={InvoiceDetailsScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          ...healNavigationOptions,
          title: intl.formatMessage({ id: 'heal.invoices.summary.title' }),
        }}
      />
      <Stack.Screen
        name={HEAL_INVOICES}
        component={InvoicesScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={HEAL_CLINIC_INFORMATION}
        component={ClinicInformation}
        options={{
          cardStyleInterpolator,
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};

const cardStyleInterpolator = ({ current: { progress } }) => ({
  cardStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 0.5, 0.9, 1],
      outputRange: [0, 0.25, 0.7, 1],
    }),
  },
  overlayStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.85],
      extrapolate: 'clamp',
    }),
  },
});

export default HealthNavigator;
