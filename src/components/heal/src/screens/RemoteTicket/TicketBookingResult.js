import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import { useIntl, useTheme } from '@heal/src/wrappers/core/hooks';
import {
  Box,
  PlainText,
  TrackedCarousel,
  Flex,
  Text,
  SectionHeadingText,
  Divider,
} from '@heal/src/wrappers/components';
import { ClinicInfo } from '@heal/src/components';

import { successImage } from '@heal/images';
import { HEAL_APPOINTMENT_LIST } from '@heal/routes';
import { DOCTOR_LANDING } from '@routes';
import theme from '@theme';

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  successImage: {
    alignSelf: 'center',
    marginTop: 26,
  },
  clinicInfo: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  appointmentButton: {
    height: 48,
    marginVertical: 16,
    marginHorizontal: 32,
  },
});

const TicketBookingResult = ({
  route,
  navigation,
  bookedData,
  detailsClinic,
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const { doctorIndex } = route.params;

  return (
    <Box flex={1} as={SafeAreaView}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text
          fontSize={32}
          fontWeight={300}
          lineHeight={37}
          letterSpacing={-1.5}
          textAlign="center"
          color={theme.heal.colors.gray[3]}
        >
          {intl.formatMessage({ id: 'heal.ticketBookingResult.thankYou' })}
        </Text>
        <Image source={successImage} style={styles.successImage} />
        <ClinicInfo
          style={styles.clinicInfo}
          doctorName={detailsClinic.doctors[doctorIndex].name}
          address={detailsClinic.address}
          date={detailsClinic.date}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(DOCTOR_LANDING, { tab: 1 });
        }}
      >
        <Divider full />
        <Box
          style={styles.appointmentButton}
          backgroundColor={theme.colors.red}
          alignItems="center"
          justifyContent="center"
        >
          <PlainText color={theme.colors.white}>
            {intl.formatMessage({
              id: 'heal.ticketBookingResult.viewButton',
            })}
          </PlainText>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

const mapStateToProps = ({
  heal: {
    detailsClinic,
    remoteTicket: { bookedData },
  },
}) => ({ detailsClinic, bookedData });

export default connect(mapStateToProps, {})(TicketBookingResult);
