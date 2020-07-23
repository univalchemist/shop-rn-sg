import React, { useState } from 'react';
import { Alert } from 'react-native';
import { HEAL_REMOTE_TICKET_BOOKING } from '../../../routes';
import { Box } from '@heal/src/wrappers/components';
import { useIntl } from '@wrappers/core/hooks';

const ClinicInformation = ({ navigation, route }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const { doctorIndex } = route.params || '';
  const intl = useIntl();

  const displyAlert = () => {
    Alert.alert(
      intl.formatMessage({
        id: 'heal.clinic.clinicInformation.title',
      }),
      intl.formatMessage({
        id: 'heal.clinic.clinicInformation.message',
      }),
      [
        {
          text: intl.formatMessage({
            id: 'heal.clinic.clinicInformation.continue',
          }),
          onPress: () => {
            navigation.navigate(HEAL_REMOTE_TICKET_BOOKING, {
              doctorIndex,
            });
            setIsAlertVisible(false);
            setIsVisible(false);
          },
        },
        {
          text: intl.formatMessage({
            id: 'heal.clinic.clinicInformation.cancel',
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

export default ClinicInformation;
