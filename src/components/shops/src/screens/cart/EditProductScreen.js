import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Box, TrackedButton, Footer, Text } from '@shops/wrappers/components';
import {
  BorderInput,
  QuantityButton,
  ProductHeader,
  DeliverySelfCollection,
} from '@shops/components';
import {
  getProductBySku,
  updateCart,
  getCartTotals,
} from '@shops/store/actions';
import { useTheme, useIntl } from '@shops/wrappers/core/hooks';
import { SnackBar } from '@shops/components';
import {
  ADD_TO_CART_FAILED,
  AddToCartSnackView,
} from '../home/ProductDetailsScreen/AddToCartSnackView';
import { getMessageKey } from '@shops/utils';
import { DELIVERY_TYPE, PRODUCT_TYPE } from '@shops/utils/constant';
import { validateRequired } from '@wrappers/core/validations';
import Spinner from '@shops/components/Spinner';
import { SHOP_CART_SCREEN } from '@shops/navigation/routes';

const SNACK_VIEW_HIDING_TIME = 3000;
const DEFAULT_MAX_QUANTITY = 20;
const DEFAULT_MIN_QUANTITY = 1;

const EditItemScreen = ({
  navigation,
  product,
  cartItem,
  getProductBySku,
  updateCart,
  getCartTotals,
  onUpdateFinish,
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const [quantity, setQuantity] = useState(cartItem?.quantity);
  const [snackBar, setSnackBar] = useState(false);
  const [err, setErr] = useState('');
  const [redemptionPoint, setRedemptionPoint] = useState('');
  const [deliveryType, setDeliveryType] = useState('');
  const [error, setError] = useState('');
  const [warningMsg, setWarningMsg] = useState('');
  const minQuantity = cartItem?.stock?.minSaleQuantity || DEFAULT_MIN_QUANTITY;
  const maxQuantity = cartItem?.stock?.maxSaleQuantity || DEFAULT_MAX_QUANTITY;
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (cartItem?.deliveryMethodSelected) {
      setInitialCheckBox(cartItem.deliveryMethodSelected);
    } else {
      setInitialCheckBox(product?.deliveryMethod);
    }
  }, []);
  const setInitialCheckBox = deliveryMethod => {
    if (deliveryMethod?.includes(DELIVERY_TYPE.DELIVERY)) {
      setDeliveryType(DELIVERY_TYPE.DELIVERY);
    } else if (deliveryMethod?.includes(DELIVERY_TYPE.SELF_COLLECTION)) {
      setDeliveryType(DELIVERY_TYPE.SELF_COLLECTION);
    }
  };

  useEffect(() => {
    if (cartItem?.redemptionPointSelected) {
      const redemptionLocation = product?.redemptionPoint?.find(
        o => cartItem.redemptionPointSelected === o.redemptId,
      );
      setRedemptionPoint(redemptionLocation);
    } else if (product?.redemptionPoint?.length === 1) {
      setRedemptionPoint(product.redemptionPoint[0]);
    }
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      getProductBySku(cartItem.sku);
    };
    if (!product) getProduct();
  }, [cartItem.sku, getProductBySku, product]);

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

  const decreaseAmount = () => {
    if (quantity <= minQuantity) {
      setWarningMsg(
        intl.formatMessage(
          { id: 'shop.editProduct.reachMinimumQuantity' },
          { minQuantity },
        ),
      );

      return;
    }

    setWarningMsg('');
    setQuantity(quantity - 1);
  };

  const increaseAmount = () => {
    if (quantity >= maxQuantity) {
      setWarningMsg(
        intl.formatMessage(
          { id: 'shop.editProduct.reachMaximumQuantity' },
          { maxQuantity },
        ),
      );

      return;
    }

    setWarningMsg('');
    setQuantity(quantity + 1);
  };

  const onPressApply = () => {
    if (!validate()) return;
    setLoading(true);
    updateCart({
      sku: cartItem.sku,
      quantity,
      productType: product.type,
      redemptionPoint,
      deliveryType,
    })
      .then(() => {
        getCartTotals();
        onUpdateFinish?.();
        navigation.navigate(SHOP_CART_SCREEN);
      })
      .catch(error => {
        if (getMessageKey(error) === 'InvalidQuantity') {
          setErr(
            intl.formatMessage(
              { id: 'shop.editProduct.invalidQuantity' },
              { maxQuantity },
            ),
          );
          setSnackBar(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Box flex={1} backgroundColor={theme.colors.background}>
      <SnackBar
        visible={snackBar}
        position="top"
        autoHidingTime={SNACK_VIEW_HIDING_TIME}
        onSnackBarHided={() => setSnackBar(false)}
      >
        <AddToCartSnackView
          type={ADD_TO_CART_FAILED}
          onCancelPress={() => setSnackBar(false)}
          text={err}
        />
      </SnackBar>
      <Box flex={1} px={4} pt={4}>
        <ProductHeader product={product} />
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
              width={70}
              height={56}
              keyboardType={'numeric'}
              onChangeText={text => {
                if (!text) {
                  setQuantity(DEFAULT_MIN_QUANTITY);
                } else {
                  const quantity = parseInt(text.replace(/[^0-9]/g, ''), 10);
                  if (quantity < DEFAULT_MIN_QUANTITY) {
                    setWarningMsg(
                      intl.formatMessage(
                        { id: 'shop.editProduct.reachMinimumQuantity' },
                        { minQuantity },
                      ),
                    );

                    setQuantity(DEFAULT_MIN_QUANTITY);
                  } else {
                    if (quantity > DEFAULT_MAX_QUANTITY) {
                      setWarningMsg(
                        intl.formatMessage(
                          { id: 'shop.editProduct.reachMaximumQuantity' },
                          { maxQuantity },
                        ),
                      );
                      setQuantity(DEFAULT_MAX_QUANTITY);
                    } else {
                      setWarningMsg('');
                      setQuantity(quantity);
                    }
                  }
                }
              }}
            />
            <QuantityButton text="+" onPress={increaseAmount} />
          </Box>
        </Box>
        {!!warningMsg && (
          <Text color={theme.colors.primary[0]} ml="35%" mt="-8" mb="8">
            {warningMsg}
          </Text>
        )}
        {product?.type === PRODUCT_TYPE.SIMPLE && (
          <DeliverySelfCollection
            product={product}
            currentSelected={redemptionPoint}
            deliveryType={deliveryType}
            onSelectLocation={location => {
              setRedemptionPoint(location);
              setError(false);
            }}
            setDeliveryType={setDeliveryType}
            error={error}
            navigation={navigation}
          />
        )}
      </Box>
      <Footer
        flexDirection="row"
        style={[styles.footer, { backgroundColor: theme.colors.white }]}
      >
        <Box flex={1}>
          {isLoading ? (
            <Spinner size={'small'} />
          ) : (
            <TrackedButton
              primary
              onPress={onPressApply}
              title={intl.formatMessage({ id: 'shop.common.apply' })}
            />
          )}
        </Box>
      </Footer>
    </Box>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingBottom: 16,
  },
});

const mapStateToProps = (
  { shop: { home, cart } },
  {
    route: {
      params: { productSku, onUpdateFinish },
    },
  },
) => {
  return {
    product: home.productMap[productSku],
    cartItem: cart.items.find(i => i.sku === productSku),
    onUpdateFinish,
  };
};

export default connect(mapStateToProps, {
  getProductBySku,
  updateCart,
  getCartTotals,
})(EditItemScreen);
