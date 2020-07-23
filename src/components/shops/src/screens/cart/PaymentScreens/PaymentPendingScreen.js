import React from 'react';
import { Box, Text, Image, Button } from '@shops/wrappers/components';
import { error } from '@shops/assets/images';
import { useTheme, useIntl } from '@shops/wrappers/core/hooks';
import {
  NAVIGATION_HOME_SCREEN_PATH,
  ORDER_HISTORY_SCREEN,
} from '@shops/navigation/routes';

const PaymentPendingScreen = ({
  navigation,
}) => {
  const theme = useTheme();
  const intl = useIntl();
  return (
    <Box flex={1} m={32} alignItems={'center'}>
      <Image
        source={error}
        width={220}
        height={213}
        mt={55}
        resizeMode={'contain'}
      />
      <Text fontWeight={'bold'} mt={34}>
        {intl.formatMessage({ id: 'shop.paymentPending.title' })}
      </Text>
      <Text
        mt={32}
        color={theme.colors.textMediumEmphasis}
        fontSize={14}
        textAlign={'center'}
      >
        {intl.formatMessage({ id: 'shop.paymentPending.info' })}
      </Text>
      <Box flex={1} width={'100%'} justifyContent={'flex-end'}>
        <Button
          onPress={() => navigation.navigate(NAVIGATION_HOME_SCREEN_PATH)}
          primary
          title={intl.formatMessage({ id: 'shop.paymentSuccess.btnContinue' })}
        />
        <Box mt={16}>
          <Button
            outline
            onPress={() => {
              navigation.popToTop();
              navigation.navigate(ORDER_HISTORY_SCREEN)
            }}
            title={intl.formatMessage({
              id: 'shop.paymentSuccess.btnViewOrder',
            })}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentPendingScreen;
