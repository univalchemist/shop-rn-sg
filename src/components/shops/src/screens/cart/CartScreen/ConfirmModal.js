import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import {
  Box,
  Button,
  SectionHeadingText,
  Text,
} from '@shops/wrappers/components';
import { useTheme, useIntl } from '@shops/wrappers/core/hooks';

const ConfirmModal = ({ visible, onConfirm, onCancel }) => {
  const theme = useTheme();
  const intl = useIntl();
  return (
    <Modal
      visible={visible}
      animated={'slide'}
      statusBarTranslucent={true}
      transparen={true}
      presentationStyle={'fullScreen'}
    >
      <Box
        flex={1}
        bg={theme.colors.modal}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          width={'80%'}
          py={20}
          bg={theme.colors.white}
          px={32}
          borderRadius={4}
        >
          <SectionHeadingText mt={16} fontSize={20}>
            {intl.formatMessage({ id: 'shop.confirm.title' })}
          </SectionHeadingText>
          <Text mt={16} color={theme.colors.text}>
            {intl.formatMessage({ id: 'shop.confirm.content1' })}
          </Text>
          <Text mt={16}>
            {intl.formatMessage({ id: 'shop.confirm.content2' })}
          </Text>
          <Box my={16} alignItems={'center'} flexDirection={'row'}>
            <Box flex={1}>
              <Button
                outline
                title={intl.formatMessage({ id: 'shop.confirm.buttonCancel' })}
                onPress={onCancel}
                titleStyle={styles.titleButton}
              />
            </Box>

            <Box width={20} />
            <Box flex={1}>
              <Button
                primary
                title={intl.formatMessage({ id: 'shop.confirm.buttonConfirm' })}
                onPress={onConfirm}
                titleStyle={styles.titleButton}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleButton: {
    fontSize: 18,
  },
});

export default ConfirmModal;
