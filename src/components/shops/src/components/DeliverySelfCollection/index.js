import { Box, CustomSelectField, Icon, Text } from '@shops/wrappers/components';
import { RadioButton, RadioGroup } from '@shops/components';
import { DELIVERY_TYPE } from '@shops/utils/constant';
import { SELECT_ADDRESS_MODAL } from '@shops/navigation/routes';
import React from 'react';
import {
  useGetFormattedPrice,
  useIntl,
  useTheme,
} from '@shops/wrappers/core/hooks';

const DeliverySelfCollection = ({
  product,
  deliveryType,
  setDeliveryType,
  currentSelected,
  onSelectLocation,
  error,
  navigation,
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const deliveryFeeFormatted = useGetFormattedPrice(product.deliveryFee);
  return (
    <Box>
      <Box>
        <Text mb={24}>
          {intl.formatMessage({
            id: 'shop.product.deliveryType',
            defaultMessage: 'Delivery or Self-collection',
          })}
        </Text>
        {product.deliveryMethod && (
          <RadioGroup value={deliveryType} onChange={setDeliveryType}>
            {product.deliveryMethod?.includes(DELIVERY_TYPE.DELIVERY) ? (
              <RadioButton
                text={deliveryFeeFormatted}
                value={DELIVERY_TYPE.DELIVERY}
              />
            ) : (
              <></>
            )}
            {product.deliveryMethod?.includes(DELIVERY_TYPE.SELF_COLLECTION) ? (
              <RadioButton
                text={intl.formatMessage({
                  id: 'shop.product.selfCollection',
                })}
                value={DELIVERY_TYPE.SELF_COLLECTION}
              />
            ) : (
              <></>
            )}
          </RadioGroup>
        )}
      </Box>
      {deliveryType === DELIVERY_TYPE.SELF_COLLECTION && (
        <CustomSelectField
          labelEmptyComponent={
            <Text
              fontSize={18}
              ellipsizeMode="tail"
              numberOfLines={1}
              color={theme.text}
            >
              {intl.formatMessage({
                id: 'shop.product.selectLocation',
              })}
            </Text>
          }
          label={intl.formatMessage({
            id: 'shop.product.selectLocation',
          })}
          input={{
            value: currentSelected?.redemptValue,
          }}
          intl={intl}
          theme={{
            ...theme,
            colors: { ...theme.colors, gray: ['gray'] },
            inputField: { inputBorder: 'black' },
          }}
          meta={{ error, touched: true }}
          onPress={() =>
            navigation.navigate(SELECT_ADDRESS_MODAL, {
              onSelectLocation,
              currentSelected,
              redemptionPoint: product.redemptionPoint,
            })
          }
          onRight={({ color }) => <Icon name="expand-more" color={color} />}
        />
      )}
    </Box>
  );
};

export default DeliverySelfCollection;
