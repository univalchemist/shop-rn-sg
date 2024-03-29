import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Footer, TrackedButton } from '@shops/wrappers/components';
import { connect } from 'react-redux';
import { Spinner } from '@shops/components';
import { useIntl, useTheme } from '@shops/wrappers/core/hooks';
import { addToCart } from '@shops/store/actions';
import PropTypes from 'prop-types';
import { DELIVERY_TYPE } from '@shops/utils/constant';
import { validateRequired } from '@wrappers/core/validations';

export const AddCartButton = ({
  addToCart,
  quantity,
  productType,
  sku,
  redemptionPoint,
  deliveryType,
  onAddToCartSuccess,
  onAddToCartFailed,
  setError,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    if (deliveryType === DELIVERY_TYPE.DELIVERY) return true;
    const err = validateRequired(redemptionPoint);
    if (deliveryType === DELIVERY_TYPE.SELF_COLLECTION && err) {
      setError?.(err);
      return false;
    } else {
      return true;
    }
  };

  const onPressAddToCart = async () => {
    if (!validate()) return;

    try {
      setIsLoading(true);
      await addToCart({
        sku,
        quantity,
        productType,
        redemptionPoint,
        deliveryType
      });
      onAddToCartSuccess?.();
    } catch (e) {
      onAddToCartFailed?.(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Footer
      flexDirection="row"
      style={[styles.footer, { backgroundColor: theme.colors.white }]}
    >
      <Box flex={1} flexDirection="row">
        <Box flex={1}>
          {isLoading ? (
            <Spinner size={'small'} />
          ) : (
            <TrackedButton
              primary
              onPress={onPressAddToCart}
              title={intl.formatMessage({
                id: 'shop.productDetail.addToCart',
                defaultMessage: 'Add to Cart',
              })}
            />
          )}
        </Box>
      </Box>
    </Footer>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingBottom: 16,
  },
});

AddCartButton.propTypes = {
  sku: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onAddToCartSuccess: PropTypes.func,
  onAddToCartFailed: PropTypes.func,
};

export default connect(null, { addToCart })(AddCartButton);
