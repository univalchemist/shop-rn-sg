import React from 'react';
import { Box, Text, SectionHeadingText } from '@shops/wrappers/components';
import { BorderInput, QuantityButton } from '@shops/components';
import { useTheme, useIntl } from '@shops/wrappers/core/hooks';

import { PRODUCT_TYPE } from '@shops/utils/constant';
import { DeliverySelfCollection } from '@shops/components';

const CustomOrder = ({
  quantity,
  onChangeQuantity = () => {},
  navigation,
  product,
  currentSelected,
  deliveryType,
  setDeliveryType,
  onSelectLocation,
  error,
}) => {
  const theme = useTheme();
  const intl = useIntl();

  const decreaseAmount = () => {
    if (quantity <= 1) return;
    onChangeQuantity(quantity - 1);
  };

  const increaseAmount = () => {
    onChangeQuantity(quantity + 1);
  };

  return (
    <Box py={24} borderBottomWidth={1} borderColor={theme.colors.divider}>
      <Box>
        <SectionHeadingText>
          {intl.formatMessage({
            id: 'shop.product.customiseOrder',
            defaultMessage: 'Customise my order',
          })}
        </SectionHeadingText>
        <Box flexDirection="row" alignItems="center" my={24}>
          <Text width={'35%'}>
            {intl.formatMessage({
              id: 'shop.product.quantity',
              defaultMessage: 'Quantity',
            })}
          </Text>
          <Box
            width={'65%'}
            flexDirection={'row'}
            alignItems="center"
            justifyContent={'space-between'}
          >
            <QuantityButton text="-" onPress={decreaseAmount} />
            <BorderInput
              value={quantity}
              textAlign={'center'}
              color={theme.colors.text}
              width={70}
              height={56}
              keyboardType={'numeric'}
              onChangeText={text => {
                if (!text) return onChangeQuantity(1);
                onChangeQuantity(parseInt(text.replace(/[^0-9]/g, ''), 10));
              }}
            />
            <QuantityButton text="+" onPress={increaseAmount} />
          </Box>
        </Box>
        {product?.type === PRODUCT_TYPE.SIMPLE && (
          <DeliverySelfCollection
            product={product}
            currentSelected={currentSelected}
            deliveryType={deliveryType}
            onSelectLocation={onSelectLocation}
            setDeliveryType={setDeliveryType}
            error={error}
            navigation={navigation}
          />
        )}
      </Box>
    </Box>
  );
};

CustomOrder.propTypes = {};

export default CustomOrder;
