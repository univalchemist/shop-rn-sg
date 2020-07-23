import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, PlainText, Image } from '@heal/src/wrappers/components';
import { location, iconDoctor, appointmentCalendar } from '@heal/images';
import theme from '@theme';
import moment from 'moment';
import { useIntl } from '@heal/src/wrappers/core/hooks';

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: theme.colors.gray[2],
  },
});

const ClinicInfo = ({
  doctorName,
  speciality,
  address,
  showSpeciality,
  style,
  date,
}) => {
  const intl = useIntl();
  const dateFormat = 'DD MMM YYYY';

  return (
    <Box style={style}>
      <Box flexDirection={'row'} pt={20} mb={25}>
        <Image
          source={appointmentCalendar}
          style={{ tintColor: theme.colors.gray[0] }}
        />
        <Box>
          <PlainText style={styles.text} ml={18}>
            {moment(date).format(dateFormat)}
          </PlainText>
        </Box>
      </Box>
      <Box flexDirection="row" mr="auto" alignItems="center">
        <Image source={iconDoctor} />
        <Box ml={18}>
          <PlainText style={styles.text}>
            {intl.formatMessage({ id: 'heal.appointment.doctorPrefix' }) +
              ' ' +
              doctorName}
          </PlainText>
          {showSpeciality ? (
            <PlainText style={styles.text}>{speciality}r</PlainText>
          ) : null}
        </Box>
      </Box>
      <Box flexDirection="row" mt={24} mr="auto" alignItems="center">
        <Image source={location} />
        <PlainText ml={18} style={styles.text}>
          {address}
        </PlainText>
      </Box>
    </Box>
  );
};

export default ClinicInfo;
