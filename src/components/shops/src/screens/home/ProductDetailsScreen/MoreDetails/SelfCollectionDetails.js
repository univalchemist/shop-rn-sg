import React from 'react';
import { Box, PlainText, SecondaryText } from '@shops/wrappers/components';
import { useIntl, useTheme } from '@shops/wrappers/core/hooks';
import { DATE_FORMAT_1, OFFER_TYPE } from '@shops/utils/constant';
import moment from 'moment';

const offerTypeMap = {
  [OFFER_TYPE.DELIVERABLE]: 'shop.product.deliverable',
  [OFFER_TYPE.E_VOUCHER]: 'shop.product.eVoucher',
};
export const getOfferTypeMap = (offerType, intl) => {
  if (!offerType) return null;
  return offerTypeMap[offerType]
    ? intl?.formatMessage({
        id: offerTypeMap[offerType],
      })
    : offerType;
};

export const SelfCollectionDetailContent = ({ item }) => {
  const intl = useIntl();
  return (
    <Box>
      <Section
        title={intl.formatMessage({ id: 'shop.product.offerType' })}
        content={getOfferTypeMap(item?.offerType, intl)}
      />
      <Section
        title={intl.formatMessage({
          id: 'shop.product.voucherValidityRedemption',
        })}
        content={intl.formatMessage(
          {
            id: 'shop.product.voucherValidityRedemptionValue',
          },
          {
            voucherValidityRedemption: item.voucherValidityRedemption,
          },
        )}
      />
      {item.promoExpiryDate && (
        <Section
          title={intl.formatMessage({
            id: 'shop.product.promoExpiryDate',
          })}
          content={moment(item.promoExpiryDate).format(DATE_FORMAT_1)}
        />
      )}
    </Box>
  );
};

const Section = ({ title, content }) => {
  const theme = useTheme();
  return (
    <Box pb={8}>
      <SecondaryText fontSize={14} lineHeight={20} letterSpacing={0.25}>
        {title}
      </SecondaryText>
      <PlainText
        fontSize={14}
        lineHeight={24}
        color={theme.colors.text}
        letterSpacing={0.1}
        fontWeight={600}
      >
        {content}
      </PlainText>
    </Box>
  );
};
