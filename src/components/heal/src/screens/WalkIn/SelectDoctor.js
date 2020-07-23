import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useIntl, useTheme } from '@heal/src/wrappers/core/hooks';
import {
  ScrollView,
  Box,
  TrackedCarousel,
  PlainText,
} from '@heal/src/wrappers/components';
import {
  checkInTicket,
  cancelAppointment,
  cancelVisit,
} from '@heal/src/store/actions';
import { DoctorCard, SpinningLoader } from '@heal/src/components';
import {
  HEAL_CHECK_IN_CONFIRMATION,
  HEAL_WALK_IN_CHECK_IN,
} from '@heal/routes';
import { iconCheckMark } from '@heal/images';

const viewportWidth = Dimensions.get('window').width;
const distanceBetweenCard = 16;
const DOCTOR_CARD_WIDTH = 190;
const DOCTOR_CARD_HEIGHT = 314;
const DOCTOR_CARD_WIDTH_WITH_MARGIN = DOCTOR_CARD_WIDTH + distanceBetweenCard;

const styles = StyleSheet.create({
  slideStyle: {
    left: -72,
    minHeight: DOCTOR_CARD_HEIGHT,
  },
  containerCustomStyle: {
    paddingBottom: 4,
  },
  bookButton: {
    height: 48,
    marginVertical: 16,
    marginHorizontal: 32,
  },
  spinner: {
    position: 'absolute',
    top: 0,
  },
});

const SelectDoctor = ({
  route,
  navigation,
  qrCodeData,
  checkInTicket,
  cancelAppointment,
  clinicQrCode,
  membersMap,
  cancelVisit,
}) => {
  const theme = useTheme();
  const intl = useIntl();

  const { type, appointment, data } = route.params;
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const checkIn = async () => {
    const checkedInData = await checkInTicket({
      clinicId: qrCodeData.clinic.id,
      clinicProviderId: qrCodeData.clinic.clinicProviderId,
      doctorId: qrCodeData.doctors[currentDoctorIndex].id,
    });

    if (checkedInData.value && checkedInData.value.token) {
      navigation.navigate(HEAL_CHECK_IN_CONFIRMATION, {
        clinicQrCode,
        type,
        ticket: {
          ...qrCodeData,
          doctor: qrCodeData.doctors[currentDoctorIndex],
        },
      });
    }
  };

  const updateDoctor = async () => {
    if (type === 'appointment' && appointment && appointment.id) {
      await cancelAppointment(appointment.id);
      await checkIn();
    } else if (type === 'remote' && appointment.type === 'RemoteTicket') {
      await cancelVisit(appointment.clinicProviderId, appointment.id);
      await checkIn();
    } else if (type === 'walkin') {
      setLoading(true);
      const checkedInData = await checkInTicket({
        clinicId: qrCodeData.clinic.id,
        clinicProviderId: qrCodeData.clinic.clinicProviderId,
        doctorId: qrCodeData.doctors[currentDoctorIndex].id,
      });
      setLoading(false);
      if (checkedInData.value && checkedInData.value.token) {
        navigation.navigate(HEAL_WALK_IN_CHECK_IN, {
          selectedDoctor: qrCodeData.doctors[currentDoctorIndex],
        });
      }
    }
  };

  return (
    <Box flex={1} as={SafeAreaView}>
      <ScrollView>
        <Box px={32} py={24}>
          <PlainText color={theme.colors.black} fontWeight={'bold'}>
            {intl.formatMessage({ id: 'heal.walkInSelectDoctor.selectTitle' })}
          </PlainText>
        </Box>
        <TrackedCarousel
          useScrollView
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          data={qrCodeData.doctors}
          sliderWidth={viewportWidth}
          itemWidth={DOCTOR_CARD_WIDTH_WITH_MARGIN}
          slideStyle={styles.slideStyle}
          containerCustomStyle={styles.containerCustomStyle}
          renderItem={({ item, index }) => {
            return (
              <DoctorCard
                doctor={item}
                showIcon={index === currentDoctorIndex}
                icon={iconCheckMark}
                width={DOCTOR_CARD_WIDTH}
                height={DOCTOR_CARD_HEIGHT}
                selected={currentDoctorIndex === index}
                onPress={() => {
                  setCurrentDoctorIndex(index);
                }}
              />
            );
          }}
        />
      </ScrollView>
      <TouchableOpacity onPress={updateDoctor}>
        <Box
          style={styles.bookButton}
          backgroundColor={theme.colors.red}
          alignItems="center"
          justifyContent="center"
        >
          <PlainText color={theme.colors.white}>
            {intl.formatMessage({
              id: 'heal.walkInSelectDoctor.confirmButton',
            })}
          </PlainText>
        </Box>
      </TouchableOpacity>
      {isLoading ? <SpinningLoader style={styles.spinner} /> : null}
    </Box>
  );
};

const mapStateToProps = ({
  user: { membersMap },
  heal: {
    scannedData: { qrCodeData, clinicQrCode },
  },
}) => ({
  membersMap,
  qrCodeData,
  clinicQrCode,
});

export default connect(mapStateToProps, {
  checkInTicket,
  cancelAppointment,
  cancelVisit,
})(SelectDoctor);
