import React from 'react';
import {
  Box,
  PlainText,
  ScrollView,
  SectionHeadingText,
} from '@cxa-rn/components';
import { useGetFormattedPrice } from '@heal/src/screens/Invoices/utils/getFormatedPrice';
import { useTheme, useIntl } from '@heal/src/wrappers/core/hooks';
import { connect } from 'react-redux';
const InvoiceDetailsScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const intl = useIntl();
  const invoice = route.params.invoice && route.params.invoice;
  const totalAmount = useGetFormattedPrice(invoice?.total_amount);

  const Summary = (item, index) => {
    const formatedPrice = useGetFormattedPrice(item.amount);
    return (
      <Box
        flex={2}
        key={index}
        mt={24}
        justifyContent={'space-between'}
        flexDirection={'row'}
      >
        <Box flex={1.4}>
          <PlainText color={theme.colors.gray[8]}>{item.name}</PlainText>
          {index === invoice.items.length - 1 && (
            <PlainText
              color={'#9E9E9E'}
              lineHeight={16}
              letterSpacing={0.4}
              mt={8}
              fontSize={12}
            >
              {intl.formatMessage({
                id: 'heal.invoices.summary.availableOnlyDescription',
              })}
            </PlainText>
          )}
        </Box>
        <Box alignItems={'flex-end'} flex={0.6}>
          <PlainText color={theme.colors.gray[8]}>{formatedPrice}</PlainText>
        </Box>
      </Box>
    );
  };

  return (
    <Box backgroundColor={theme.backgroundColor.default} flex={1} p={32}>
      <ScrollView>
        <Box>
          <SectionHeadingText>
            {intl.formatMessage({
              id: 'heal.invoices.summary.paymentSummary',
            })}
          </SectionHeadingText>
        </Box>
        {invoice?.items?.map((item, index) => {
          return Summary(item, index);
        })}
        <Box mt={24} backgroundColor={'#9e9e9e'} width={'100%'} height={1} />
        <Box justifyContent={'space-between'} flexDirection={'row'} mt={16}>
          <Box>
            <SectionHeadingText
              letterSpacing={0.3}
              lineHeight={22}
              fontWeight={'600'}
            >
              {intl.formatMessage({
                id: 'heal.invoices.summary.amountToPay',
              })}
            </SectionHeadingText>
          </Box>
          <Box>
            <PlainText color={theme.colors.gray[0]}>{totalAmount}</PlainText>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default connect(null, null)(InvoiceDetailsScreen);
