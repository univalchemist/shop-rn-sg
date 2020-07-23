import React from 'react';
import {
  Box,
  PlainText,
  Image,
  Button as CoreButton,
  ScrollView,
} from '@cxa-rn/components';
import { claimSuccessImage } from '@images/claim';
import { useTheme } from '@wrappers/core/hooks';
import { SafeAreaView } from 'react-native';
import { useIntl } from '@heal/src/wrappers/core/hooks';
import { HEAL_DOCTOR_DETAIL } from '@heal/routes';
import { DOCTOR_LANDING } from '@routes';

const AppointmentRequested = ({ navigation }) => {
  const theme = useTheme();
  const intl = useIntl();
  const buttonContainer = {
    backgroundColor: theme.colors.primary[0],
    borderRadius: 0,
    borderColor: theme.colors.gray[0],
  };

  const backButton = {
    borderColor: theme.colors.gray[0],
    backgroundColor: 'transparent',
    borderWidth: 1,
    marginTop: 16,
  };
  return (
    <Box flex={1} as={SafeAreaView} backgroundColor={theme.colors.white}>
      <ScrollView backgroundColor={theme.colors.white}>
        <Box pt={92} pb={20} flex={1} px={32}>
          <Box alignItems={'center'}>
            <Image source={claimSuccessImage} />
          </Box>
          <Box pt={32} alignItems={'center'}>
            <PlainText
              fontWeight={'100'}
              lineHeight={37}
              color={theme.colors.gray[0]}
              textAlign={'center'}
              fontSize={32}
            >
              {intl.formatMessage({
                id: 'heal.doctor.scheduleAppointment.appointmentRequested',
              })}
            </PlainText>
            <PlainText
              mt={10}
              color={theme.colors.gray[8]}
              textAlign={'center'}
            >
              {intl.formatMessage({
                id: 'heal.doctor.scheduleAppointment.scheduleConfirmation',
              })}
            </PlainText>
          </Box>
          <Box mt={46}>
            <CoreButton
              onPress={() => {
                navigation.navigate(DOCTOR_LANDING, { tab: 1 });
              }}
              buttonStyle={buttonContainer}
              titleStyle={{
                color: theme.colors.white,
              }}
              title={intl.formatMessage({
                id: 'heal.doctor.scheduleAppointment.viewAppointment',
              })}
            />
            <CoreButton
              onPress={() => {
                navigation.navigate(HEAL_DOCTOR_DETAIL);
              }}
              buttonStyle={backButton}
              titleStyle={{
                color: theme.colors.gray[0],
              }}
              title={intl.formatMessage({
                id: 'heal.doctor.scheduleAppointment.back',
              })}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default AppointmentRequested;
