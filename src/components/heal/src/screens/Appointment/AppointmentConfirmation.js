import React, { useState } from 'react';
import { Alert } from 'react-native';
import { HEAL_THANK_YOU } from '../../../routes';
import { DOCTOR_LANDING } from '@routes';
import { Box } from '@heal/src/wrappers/components';
import { useIntl } from '@wrappers/core/hooks';
import { connect } from 'react-redux';
import {
  cancelAppointment,
  cancelVisit,
  acceptAppointment,
} from '@heal/src/store/actions';

const AppointmentConfirmation = ({
  navigation,
  route,
  cancelAppointment,
  cancelVisit,
  acceptAppointment,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const { id, type, data, isRemote } = route.params || '';
  const intl = useIntl();

  const displyAlert = () => {
    let typeCheck = type === 'reject' || type === 'upcomingReject';
    Alert.alert(
      intl.formatMessage({
        id: !typeCheck
          ? 'heal.appointmentConfirmation.pendingConfirmationTittle'
          : 'heal.appointmentConfirmation.rejectTittle',
      }),
      intl.formatMessage({
        id: !typeCheck
          ? 'heal.appointmentConfirmation.pendingConfirmationMessage'
          : 'heal.appointmentConfirmation.rejectMessage',
      }),
      !typeCheck
        ? [
            {
              text: intl.formatMessage({
                id: 'heal.appointmentConfirmation.Ok',
              }),
              onPress: () => {
                navigation.navigate(HEAL_THANK_YOU, { data: data });
                setIsAlertVisible(false);
                setIsVisible(false);
              },
            },
          ]
        : [
            {
              text: intl.formatMessage({
                id: 'heal.appointmentConfirmation.confirm',
              }),
              onPress: () => {
                if (isRemote && data && data.type === 'RemoteTicket') {
                  cancelVisit(data.clinicProviderId, id);
                } else if (
                  (!data || data.type !== 'WalkIn') &&
                  type !== 'reject'
                ) {
                  cancelAppointment(id);
                } else if (type === 'reject') {
                  acceptAppointment(false, id);
                }
                navigation.navigate(DOCTOR_LANDING);
                setIsAlertVisible(false);
                setIsVisible(false);
              },
            },
            {
              text: intl.formatMessage({
                id: 'heal.appointmentConfirmation.cancel',
              }),
              onPress: () => {
                navigation.goBack();
                setIsAlertVisible(false);
                setIsVisible(false);
              },
            },
          ],
    );
  };

  return (
    <Box
      flex={1}
      alignItems={'center'}
      justifyContent={'center'}
      backgroundColor={'rgba(0,0,0,0.2)'}
    >
      {isAlertVisible && isVisible && displyAlert()}
    </Box>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  cancelAppointment,
  cancelVisit,
  acceptAppointment,
})(AppointmentConfirmation);
