import React from 'react';
import { connect } from 'react-redux';
import { IsEmployee } from '@utils';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import {
  CLAIMS_LIST,
  CLAIM_DETAILS,
  CLAIM_DETAILS_DOCUMENT_VIEWER_MODAL,
  /* Submit Claim */
  CLAIM_PATIENT_DETAILS,
  CLAIM_DETAILS_FORM,
  CLAIM_REVIEW,
  CLAIM_PATIENT_MODAL,
  CLAIM_TYPE_MODAL,
  CLAIM_REASON_MODAL,
  CLAIM_UPLOAD_DOCUMENTS,
  CLAIM_DOCUMENT_VIEWER_MODAL,
  CLAIM_TERMS_CONDITIONS_MODAL,
  CLAIM_SUCCESS_MODAL,
  CLAIM_ERROR_MODAL,
  CLAIM_FILTERS_MODAL,
  CLAIM_HOSPITAL_CLINIC_MODAL,
} from '@routes';
import { DocumentViewerModal } from '@components';
import { StackBackButton, ModalBackButton } from '@wrappers/components';
import {
  ClaimsListScreen,
  ClaimDetailsScreen,
  /* Submit Claim */
  ClaimPatientDetailsScreen,
  ClaimDetailsFormScreen,
  ClaimReviewScreen,
  ClaimTypeModal,
  ClaimReasonModal,
  ClaimPatientModal,
  ClaimTermsConditionsModal,
  ClaimUploadDocumentsScreen,
  ClaimSuccessModal,
  ClaimErrorModal,
  ClaimPatientDetailBackButton,
  ClaimsListScreenHeader,
  ClaimFiltersModal,
  CXA1ClaimFiltersModal,
  CXA1ClaimsListScreen,
  CXA1ClaimTypeModal,
  CXA1ClaimDetailsScreen,
  CXA1ClaimHospitalClinicModal,
  CXA1ClaimReviewScreen,
  CXA1ClaimFormScreen,
  CXA1ClaimUploadDocumentsScreen,
  CXA1ClaimReasonModal,
} from '@screens/Claim';
import { useIntl } from '@wrappers/core/hooks';
import { getDocumentViewerModalOptions } from './utils';

const Stack = createStackNavigator();

const ClaimNavigator = ({ role, isCXA1Integration }) => {
  const intl = useIntl();

  return (
    <Stack.Navigator
      initialRouteName={CLAIMS_LIST}
      screenOptions={{
        headerBackTitleVisible: false,
      }}
      headerMode="float"
    >
      <Stack.Screen
        name={CLAIMS_LIST}
        component={isCXA1Integration ? CXA1ClaimsListScreen : ClaimsListScreen}
        options={({ navigation }) => ({
          title: intl.formatMessage({ id: 'claimTitle' }),
          headerRight: () => <ClaimsListScreenHeader navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={CLAIM_DETAILS}
        component={
          isCXA1Integration ? CXA1ClaimDetailsScreen : ClaimDetailsScreen
        }
        options={({ route }) => ({
          title: isCXA1Integration
            ? route.params?.claimId
            : intl.formatMessage({ id: 'claimDetailScreenTitle' }),
          headerBackTitle: null,
          headerBackImage: StackBackButton,
        })}
      />
      <Stack.Screen
        name={CLAIM_DETAILS_DOCUMENT_VIEWER_MODAL}
        component={DocumentViewerModal}
        options={({ route, navigation }) => ({
          ...getDocumentViewerModalOptions(route, navigation, intl),
          title: intl.formatMessage({ id: 'claimDetailScreenTitle' }),
          headerBackImage: StackBackButton,
        })}
      />
      <Stack.Screen
        name={CLAIM_FILTERS_MODAL}
        component={
          isCXA1Integration ? CXA1ClaimFiltersModal : ClaimFiltersModal
        }
        options={{
          title: intl.formatMessage({
            id: 'filterModalScreenTitle',
          }),
          headerBackImage: ModalBackButton,
          ...TransitionPresets.ModalTransition,
        }}
      />
      {IsEmployee(role) && (
        <>
          <Stack.Screen
            name={CLAIM_PATIENT_DETAILS}
            component={ClaimPatientDetailsScreen}
            options={({ navigation }) => ({
              title: intl.formatMessage({
                id: 'claimPatientDetailsScreenTitle',
              }),
              headerLeft: () => (
                <ClaimPatientDetailBackButton navigation={navigation} />
              ),
              gesturesEnabled: false,
            })}
          />
          <Stack.Screen
            name={CLAIM_DETAILS_FORM}
            component={
              isCXA1Integration ? CXA1ClaimFormScreen : ClaimDetailsFormScreen
            }
            options={{
              title: intl.formatMessage({ id: 'claimDetailScreenTitle' }),

              headerBackImage: StackBackButton,
            }}
          />
          <Stack.Screen
            name={CLAIM_REVIEW}
            component={
              isCXA1Integration ? CXA1ClaimReviewScreen : ClaimReviewScreen
            }
            options={{
              title: intl.formatMessage({ id: 'claimReviewScreenTitle' }),

              headerBackImage: StackBackButton,
            }}
          />
          <Stack.Screen
            name={CLAIM_PATIENT_MODAL}
            component={ClaimPatientModal}
            options={{
              title: intl.formatMessage({ id: 'claimPatientModalTitle' }),
              headerBackImage: ModalBackButton,
              ...TransitionPresets.ModalTransition,
            }}
          />
          <Stack.Screen
            name={CLAIM_TYPE_MODAL}
            component={isCXA1Integration ? CXA1ClaimTypeModal : ClaimTypeModal}
            options={{
              title: intl.formatMessage({
                id: 'claimTypeModalTitle',
              }),
              headerBackImage: ModalBackButton,
              ...TransitionPresets.ModalTransition,
            }}
          />
          <Stack.Screen
            name={CLAIM_REASON_MODAL}
            component={
              isCXA1Integration ? CXA1ClaimReasonModal : ClaimReasonModal
            }
            options={{
              title: intl.formatMessage({
                id: 'claimReasonModalTitle',
              }),
              headerBackImage: ModalBackButton,
              ...TransitionPresets.ModalTransition,
            }}
          />
          {isCXA1Integration && (
            <Stack.Screen
              name={CLAIM_HOSPITAL_CLINIC_MODAL}
              component={CXA1ClaimHospitalClinicModal}
              options={{
                title: intl.formatMessage({
                  id: 'claimHospitalClinicModalTitle',
                }),
                headerBackImage: ModalBackButton,
                ...TransitionPresets.ModalTransition,
              }}
            />
          )}
          <Stack.Screen
            name={CLAIM_UPLOAD_DOCUMENTS}
            component={
              isCXA1Integration
                ? CXA1ClaimUploadDocumentsScreen
                : ClaimUploadDocumentsScreen
            }
            options={{
              title: intl.formatMessage({
                id: 'uploadDocumentsScreenTitle',
              }),
              headerBackImage: StackBackButton,
            }}
          />
          <Stack.Screen
            name={CLAIM_DOCUMENT_VIEWER_MODAL}
            component={DocumentViewerModal}
            options={({ route, navigation }) => ({
              ...getDocumentViewerModalOptions(route, navigation, intl),
              headerTitle: () => null,
              headerBackImage: ModalBackButton,
            })}
          />
          <Stack.Screen
            name={CLAIM_TERMS_CONDITIONS_MODAL}
            component={ClaimTermsConditionsModal}
            options={{
              title: intl.formatMessage({
                id: 'claimTermsConditionsScreenTitle',
              }),
              headerBackImage: ModalBackButton,
              ...TransitionPresets.ModalTransition,
            }}
          />
          <Stack.Screen
            name={CLAIM_SUCCESS_MODAL}
            component={ClaimSuccessModal}
            options={{
              headerShown: false,
              gesturesEnabled: false,
              ...TransitionPresets.ModalTransition,
            }}
          />
          <Stack.Screen
            name={CLAIM_ERROR_MODAL}
            component={ClaimErrorModal}
            options={{
              headerShown: false,
              gesturesEnabled: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = ({ user }) => {
  const { role, isCXA1Integration } = user;

  return { role, isCXA1Integration };
};

export default connect(mapStateToProps)(ClaimNavigator);
