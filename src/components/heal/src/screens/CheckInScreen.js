import React, { useCallback, useState } from 'react';
import {
  Box,
  PlainText as Text,
  Image,
  ScrollView,
} from '@wrappers/components';
import { connect } from 'react-redux';
import { useIntl, useTheme } from '@wrappers/core/hooks';
import { detailAppointment, location, chevronRight } from '@heal/images';
import styled from 'styled-components/native';
import moment from 'moment';
import { isIphoneX } from '@utils';
import { Button } from '@heal/src/wrappers/components';
import { checkInWalkIn } from '@heal/src/store/actions';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import { HEAL_CHECK_IN_CONFIRMATION } from '@heal/routes';

const Card = styled(Box)`
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05px;
  shadow-color: #000;
  border-radius: 4px;
`;

const CheckInScreen = ({ route, navigation, specialitiesByCode }) => {
  const ticket = route?.params?.ticket;
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const intl = useIntl();

  const confirm = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1000));

      await checkInWalkIn({
        clinicProviderId: ticket.clinic.clinicProviderId,
        clinicId: ticket.clinic.clientId,
        doctorId: ticket.doctor.doctorId,
      });
      navigation.navigate(HEAL_CHECK_IN_CONFIRMATION, { ticket: ticket });
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Box flex={1} backgroundColor={theme.heal.colors.backgroundColor}>
      {!isLoading ? (
        <Box flex={1}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text>{intl.formatMessage({ id: 'heal.CheckIn.notice' })}</Text>
            <Text mt={48} textAlign={'center'}>
              {ticket.clinic?.name}
            </Text>
            <Card
              mt={48}
              backgroundColor={theme.heal.colors.white}
              px={24}
              py={44}
            >
              <Box mb={24} alignItems={'center'}>
                <Text fontWeight={'bold'} color={theme.heal.colors.black}>
                  {intl.formatMessage({
                    id: 'heal.CheckIn.estConsultationTime',
                  })}
                </Text>
                <Text fontSize={32} lineHeight={32} mt={16}>
                  {moment(ticket?.estimatedConsultationTime).format('h:mm A')}
                </Text>
                <Text>
                  {moment(ticket?.estimatedConsultationTime).format(
                    'DD MMM YYYY',
                  )}
                </Text>
              </Box>

              <Box flexDirection={'row'} alignItems={'center'}>
                <Image source={detailAppointment} />
                <Box ml={16}>
                  <Text>{ticket?.doctor.name}</Text>
                  <Text>
                    {specialitiesByCode[ticket?.doctor.specialityCode].name}
                  </Text>
                </Box>
              </Box>
              <Box flexDirection={'row'} mt={16}>
                <Image source={location} />
                <Text ml={16}>{ticket?.clinic.address}</Text>
              </Box>
            </Card>
            <TouchableOpacity onPress={() => navigation.navigate('')}>
              <Box
                mt={44}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text color={theme.heal.colors.gray[3]}>
                  {intl.formatMessage({ id: 'heal.CheckIn.seeAnotherDoctors' })}
                </Text>
                <Image source={chevronRight} mr={2} />
              </Box>
            </TouchableOpacity>
          </ScrollView>
          <Box
            backgroundColor="white"
            position="absolute"
            bottom={0}
            width="100%"
            paddingBottom={isIphoneX() ? 44 : 0}
            borderTopWidth={1}
            borderTopColor={theme.colors.gray[10]}
            paddingHorizontal={32}
            paddingVertical={16}
          >
            <Button
              primary
              title={intl.formatMessage({
                id: 'heal.CheckInForm.confirmAndNext',
              })}
              onPress={confirm}
            />
          </Box>
        </Box>
      ) : (
        <Box flex={1} justifyContent={'center'} alignItems={'center'}>
          {Platform.OS === 'ios' ? (
            <Spinner
              isVisible={true}
              color={theme.heal.colors.crimson}
              size={36}
              type={'Arc'}
            />
          ) : (
            <ActivityIndicator size="large" color={theme.heal.colors.crimson} />
          )}
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1, padding: 32 },
});

export default connect(
  state => ({
    specialitiesByCode: state.heal.specialitiesByCode,
  }),
  { checkInWalkIn },
)(CheckInScreen);
