import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import {
  Box,
  SectionHeadingText,
  DocumentUploader,
} from '@wrappers/components';
import { CLAIM_DETAILS_DOCUMENT_VIEWER_MODAL } from '@routes';

const ClaimDocuments = ({ sections, navigation }) => {
  const renderSection = (section, index) => {
    const { items, field, documentType } = section;
    return (
      <Box key={`section-${index}`}>
        {section.title ? (
          <Box py={3}>
            <SectionHeadingText>{section.title}</SectionHeadingText>
          </Box>
        ) : null}

        <DocumentUploader
          size={items.length}
          data={items.map(file => ({
            ...file,
            type: file.contentType,
            uri: file.uri || '',
            secure: true,
          }))}
          onView={idx => {
            navigation.navigate(CLAIM_DETAILS_DOCUMENT_VIEWER_MODAL, {
              ...items[idx],
              secure: true,
            });
          }}
          accessibilityDocumentType={documentType}
          accessibilityField={field}
          displayDot={false}
        />
      </Box>
    );
  };

  return (
    <Box style={styles.container}>
      {sections.map((section, index) => renderSection(section, index))}
    </Box>
  );
};

ClaimDocuments.defaultProps = {
  sections: [],
};

ClaimDocuments.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({})),
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default ClaimDocuments;
