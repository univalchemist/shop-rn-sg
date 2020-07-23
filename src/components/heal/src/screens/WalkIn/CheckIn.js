import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

import { useIntl, useTheme } from '@heal/src/wrappers/core/hooks';
import { Box, PlainText } from '@heal/src/wrappers/components';
import { DOCTOR_LANDING } from '@routes';

import theme from '@theme';
import { location, iconDoctor } from '@heal/images';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  title: {
    marginTop: 24,
    fontStyle: 'normal',
    fontSize: 32,
    lineHeight: 37,
    letterSpacing: -1.5,
    fontWeight: '300',
    textAlign: 'center',
    color: theme.colors.gray[0],
  },
  contentBox: {
    marginHorizontal: 32,
    marginTop: 34,
    width: screenWidth - 32 * 2,
    backgroundColor: theme.colors.white,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowColor: theme.colors.black,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: theme.colors.gray[2],
  },
  backButton: {
    width: screenWidth - 32 * 2,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray[0],
    marginHorizontal: 32,
    position: 'absolute',
    bottom: 88,
  },
});

const CheckIn = ({ route, navigation, qrCodeData, checkedInData }) => {
  const theme = useTheme();
  const intl = useIntl();
  const { selectedDoctor } = route.params;

  const parseDateTimeToTime = time => {
    return moment(time, 'YYYY-MM-DDThh:mm:ss').format('hh:mm A');
  };

  const parseDateTimeToDate = time => {
    return moment(time, 'YYYY-MM-DDThh:mm:ss').format('DD MMM YYYY');
  };

  return (
    <Box flex={1} as={SafeAreaView}>
      <PlainText fontSize={32} style={styles.title}>
        {intl.formatMessage({ id: 'heal.walkInCheckIn.title' })}
      </PlainText>
      <Box style={styles.contentBox}>
        <Box mx={24} my={44} alignItems="center" justifyContent="center">
          <PlainText color={theme.colors.black} fontWeight="bold">
            {intl.formatMessage({
              id: 'heal.walkInCheckIn.estimatedConsultation',
            })}
          </PlainText>
          <PlainText style={styles.title}>
            {parseDateTimeToTime(checkedInData.arrivalTime)}
          </PlainText>
          <PlainText color={theme.colors.gray[2]} mt={8}>
            {parseDateTimeToDate(checkedInData.arrivalTime)}
          </PlainText>
          <Box flexDirection="row" mt={24} mr="auto" alignItems="center">
            <Image source={iconDoctor} />
            <Box ml={18}>
              <PlainText style={styles.text}>{selectedDoctor.name}</PlainText>
              <PlainText style={styles.text}>
                {selectedDoctor.specialityCode
                  ? intl.formatMessage({
                      id: `heal.speciality.name.${selectedDoctor.specialityCode}`,
                    })
                  : ''}
              </PlainText>
            </Box>
          </Box>
          <Box flexDirection="row" mt={24} mr="auto" alignItems="center">
            <Image source={location} />
            <PlainText ml={18} mr={18} style={styles.text} numberOfLines={4}>
              {qrCodeData.clinic.address}
            </PlainText>
          </Box>
        </Box>
      </Box>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.navigate(DOCTOR_LANDING);
        }}
      >
        <PlainText color={theme.colors.gray[0]}>
          {intl.formatMessage({ id: 'heal.walkInCheckIn.back' })}
        </PlainText>
      </TouchableOpacity>
    </Box>
  );
};

const mapStateToProps = ({
  heal: {
    checkedInData,
    scannedData: { qrCodeData },
  },
}) => ({
  qrCodeData,
  checkedInData,
});

export default connect(mapStateToProps, {})(CheckIn);
