import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import {
  Box,
  Text,
  PlainText,
  Divider,
  SectionHeadingText,
} from '@wrappers/components';
import theme from '@theme';

const Label = ({ text }) => {
  return (
    <Box
      py={1}
      px={2}
      mr={2}
      borderRadius={50}
      backgroundColor={theme.colors.gray[10]}
    >
      <PlainText fontSize={12} color={theme.colors.gray[8]}>
        {text}
      </PlainText>
    </Box>
  );
};

const ClaimDetailsList = ({ sectionsList }) => {
  const renderSection = (section, index) => (
    <Box key={`section-${index}`}>
      {section.title ? (
        <Box py={3}>
          <SectionHeadingText>{section.title}</SectionHeadingText>
        </Box>
      ) : null}

      {section.items.map((item, index) => (
        <Box key={`item-${index}`}>
          <Box py={3} key={`${item.label}`}>
            <Text>{item.label}</Text>
            <Text color={theme.colors.gray[0]}>{item.value || '-'}</Text>
            {item.tags?.length ? (
              <Box flexDirection="row" paddingTop={8}>
                {item.tags.map((tag, index) => (
                  <Label key={`tag-${index}`} text={tag} />
                ))}
              </Box>
            ) : null}
          </Box>
          <Divider full />
        </Box>
      ))}
    </Box>
  );

  return (
    <Box style={styles.container}>
      {sectionsList.map((section, index) => renderSection(section, index))}
    </Box>
  );
};

ClaimDetailsList.defaultProps = {
  sectionsList: [],
};

ClaimDetailsList.propTypes = {
  sectionsList: PropTypes.arrayOf(PropTypes.shape({})),
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default ClaimDetailsList;
