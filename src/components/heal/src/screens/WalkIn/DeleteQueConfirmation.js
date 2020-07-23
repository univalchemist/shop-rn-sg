import React from 'react';
import { Box } from '@cxa-rn/components';
import { Alert, Platform } from 'react-native';
import { useIntl } from '@heal/src/wrappers/core/hooks';
import { connect } from 'react-redux';
import { cancelVisit, checkInRemoteTicket } from '@heal/src/store/actions';
import { HEAL_CHECK_IN_FORM } from '@heal/routes';
import { DOCTOR_LANDING } from '@routes';

const DeleteQueConfirmation = ({
  navigation,
  cancelVisit,
  checkInRemoteTicket,
}) => {
  const platform = Platform.OS === 'android';
  const intl = useIntl();

  const displayDialog = () => {
    setTimeout(() => {
      Alert.alert(
        !platform
          ? intl.formatMessage({
              id: 'heal.checkin.deleteExistingConfirmation',
            })
          : '',
        platform
          ? intl.formatMessage({
              id: 'heal.checkin.deleteExistingConfirmation',
            })
          : '',
        [
          {
            text: intl.formatMessage({
              id: 'heal.cancel',
            }),
            onPress: () => {
              navigation.navigate(DOCTOR_LANDING);
            },
            style: 'cancel',
          },
          {
            text: intl.formatMessage({
              id: 'heal.confirm',
            }),
            onPress: () => {
              cancelVisit();
              checkInRemoteTicket();
              navigation.navigate(HEAL_CHECK_IN_FORM);
            },
          },
        ],
      );
    }, 100);
  };

  return (
    <Box
      fle={1}
      alignItems={'center'}
      justifyContent={'center'}
      backgroundColor={'rgba(0,0,0,0.2)'}
    >
      {displayDialog()}
    </Box>
  );
};

export default connect(null, { cancelVisit, checkInRemoteTicket })(
  DeleteQueConfirmation,
);
