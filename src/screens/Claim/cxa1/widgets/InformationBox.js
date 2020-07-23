import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import theme from '@theme';
import { Box, Text, Image } from '@wrappers/components';

import { warningMoreInfoIcon, infoIcon } from '@images';
import { CLAIM_STATUS } from '@store/claim/constants';

const InformationBox = ({ text, type }) => {
  if (!text) {
    return null;
  }

  const backgroundColor =
    type === CLAIM_STATUS.REJECTED
      ? theme.colors.banner.error
      : type === CLAIM_STATUS.PROCESSING
      ? theme.colors.banner.processing
      : theme.colors.banner.default;

  const iconSrc =
    type === CLAIM_STATUS.REJECTED
      ? warningMoreInfoIcon
      : type === CLAIM_STATUS.PROCESSING
      ? infoIcon
      : '';

  return (
    <Box style={styles.container} backgroundColor={backgroundColor}>
      {!!iconSrc && (
        <Box pt={1} pr={2}>
          <Image source={iconSrc} />
        </Box>
      )}
      <Text>{text}</Text>
    </Box>
  );
};

InformationBox.defaultProps = {
  text: '',
  type: 'default',
};

InformationBox.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default memo(InformationBox);
