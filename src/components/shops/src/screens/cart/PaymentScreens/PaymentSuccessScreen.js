import React from 'react';
import { Box, Text, Image, Button } from '@shops/wrappers/components';
import { balloon } from '@shops/assets/images';
import { useTheme, useIntl } from '@shops/wrappers/core/hooks';
import {
  NAVIGATION_HOME_SCREEN_PATH,
  ORDER_HISTORY_SCREEN,
} from '@shops/navigation/routes';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const PaymentSuccessScreen = ({
  route: {
    params: { order },
  },
  navigation,
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const imageWidth = width * 0.56;
  return (
    <Box flex={1} m={32} alignItems={'center'}>
      <Image
        mt={55}
        source={balloon}
        width={imageWidth}
        height={imageWidth}
        resizeMode={'contain'}
      />
      <Text fontWeight={'bold'} mt={34}>
        {intl.formatMessage({ id: 'shop.paymentSuccess.title' })}
      </Text>
      <Text mt={8} fontSize={14} color={theme.colors.textLowEmphasis}>
        {intl.formatMessage(
          { id: 'shop.paymentSuccess.orderNumber' },
          { orderNumber: order.orderIdText },
        )}
      </Text>
      <Text
        mt={32}
        color={theme.colors.textMediumEmphasis}
        fontSize={14}
        textAlign={'center'}
      >
        {intl.formatMessage({ id: 'shop.paymentSuccess.thankMessage' })}
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
              navigation.navigate(ORDER_HISTORY_SCREEN);
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

export default PaymentSuccessScreen;
