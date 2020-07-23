import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { InputField, TrackedButton } from '@shops/wrappers/components';
import { Box } from '@shops/wrappers/components';
import { useIntl } from '@shops/wrappers/core/hooks';
import {
  getCartCoupons,
  addCartCoupon,
  removeCartCoupon,
  getCartTotals,
} from '@shops/store/actions';
import { getMessageKey } from '@shops/utils';
import { GreenTick } from '@shops/components';
import { Form } from 'react-final-form';

const DiscountCode = ({
  discountCode,
  getCartCoupons,
  addCartCoupon,
  removeCartCoupon,
  getCartTotals,
}) => {
  const intl = useIntl();
  const [error, setError] = useState(null);
  const isValid = !error && discountCode;
  const onSubmit = async values => {
    if (isValid) {
      await removeCartCoupon();
      getCartTotals();
    } else {
      if (values.discountCode) {
        try {
          await addCartCoupon(values.discountCode);
          setError(null);
        } catch (err) {
          if (getMessageKey(err) === 'NotFound') {
            setError(
              intl.formatMessage({ id: 'shop.cart.invalidDiscountCode' }),
            );
          }
        } finally {
          getCartTotals();
        }
      } else {
        setError(intl.formatMessage({ id: 'isRequired' }));
      }
    }
  };

  useEffect(() => {
    getCartCoupons();
  }, [getCartCoupons]);

  return (
    <Form
      initialValues={{ discountCode }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <Box>
            <InputField
              editable={!isValid}
              name="discountCode"
              autoCapitalize="none"
              label={intl.formatMessage({
                id: 'shop.cart.discountCode',
              })}
              returnKeyType="send"
              testID="discountCode"
              errorAfterSubmit={error && error}
              rightIcon={isValid && <GreenTick />}
            />
            <Box>
              <TrackedButton
                secondary
                onPress={handleSubmit}
                title={intl.formatMessage({
                  id: isValid
                    ? 'shop.cart.removeDiscountCode'
                    : 'shop.cart.applyDiscountCode',
                })}
              />
            </Box>
          </Box>
        );
      }}
    />
  );
};

const mapStateToProps = ({ shop: { cart } }) => {
  return {
    discountCode: cart.discountCode,
  };
};

export default connect(mapStateToProps, {
  getCartCoupons,
  addCartCoupon,
  removeCartCoupon,
  getCartTotals,
})(DiscountCode);
