import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import {
  Box,
  Divider,
  Flex,
  Footer,
  ScrollView,
  SecondaryText,
  Text,
  TrackedButton,
} from '@shops/wrappers/components';
import { SHOP_CHECKOUT_SCREEN } from '@shops/navigation/routes';
import { ShippingAddresses, Spinner, WalletHeader } from '@shops/components';
import {
  useGetFormattedPrice,
  useIntl,
  useTheme,
} from '@shops/wrappers/core/hooks';
import {
  getCart,
  getCartTotals,
  getDeliveryAddresses,
  postCartShipping,
  addDeliveryAddress,
} from '@shops/store/actions';
import { useFocusEffect } from '@react-navigation/native';
import CartEmpty from './CartEmpty';
import ItemList from './ItemList';
import DiscountCode from './DiscountCode';
import useValidateForm, {
  formattedAddress,
} from '@shops/components/AddressList/useValidateForm';
import { getDeliveryAddressesSelector } from '@shops/store/selectors';
import { OFFER_TYPE } from '@shops/utils/constant';

const SubTotal = ({ numberItems, price }) => {
  const intl = useIntl();

  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Text fontWeight={600}>
        {intl.formatMessage(
          { id: 'shop.cart.subtotal' },
          { number_items: numberItems },
        )}
      </Text>
      <Text fontWeight={600}>{price}</Text>
    </Flex>
  );
};

const PaymentSummaryLine = ({ labelId, value }) => {
  const intl = useIntl();

  return (
    <Flex mb={8} flexDirection="row" justifyContent="space-between">
      <SecondaryText>{intl.formatMessage({ id: labelId })}</SecondaryText>
      <SecondaryText>{value}</SecondaryText>
    </Flex>
  );
};

const CartScreen = ({
  navigation,
  addressMap,
  isCartEmpty,
  itemsCount,
  grandTotal,
  subTotal,
  discount,
  discountedSubTotal,
  getCart,
  getCartTotals,
  postCartShipping,
  getDeliveryAddresses,
  deliveryAddress,
  user,
  shipping,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      Promise.all([getCartTotals(), getCart(), getDeliveryAddresses()]);
    }, [getCart, getCartTotals, getDeliveryAddresses]),
  );
  const intl = useIntl();
  const theme = useTheme();
  const [isLoading, setLoading] = useState();
  const chosenAddressId = useRef(deliveryAddress?.[0]?.id || 0);
  const checkBoxForm = useRef(false);
  const [form, setForm] = useState();
  const [errors, validate] = useValidateForm();
  const subTotalPrice = useGetFormattedPrice(subTotal);
  const grandTotalPrice = useGetFormattedPrice(grandTotal);
  const shippingPrice = useGetFormattedPrice(shipping);
  const discountPrice = useGetFormattedPrice(discount);
  const discountedSubTotalPrice = useGetFormattedPrice(discountedSubTotal);

  if (isCartEmpty) {
    return <CartEmpty navigation={navigation} />;
  }

  const onAddressChange = addressId => {
    chosenAddressId.current = addressId;
  };

  const onAddressFormChange = addressForm => {
    setForm(addressForm);
    validate(addressForm);
  };

  const goToCheckout = async () => {
    try {
      let address;
      if (chosenAddressId.current === 0) {
        if (!validate(form)) return;
        setLoading(true);
        address = formattedAddress({ form, user });
      } else {
        setLoading(true);
        address = addressMap[chosenAddressId.current];
      }
      const { value } = await postCartShipping(address, checkBoxForm.current);

      navigation.navigate(SHOP_CHECKOUT_SCREEN, {
        shippingAddress: value?.shippingAddress,
      });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box flex={1}>
      <WalletHeader />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text fontWeight={600} fontSize={18}>
          {intl.formatMessage({ id: 'shop.common.cart' })}
        </Text>
        <SubTotal numberItems={itemsCount} price={subTotalPrice} />
        <ItemList
          navigation={navigation}
          offerType={OFFER_TYPE.DELIVERABLE}
          title={intl.formatMessage({ id: 'shop.common.deliveryCollection' })}
        />
        <ItemList
          navigation={navigation}
          offerType={OFFER_TYPE.E_VOUCHER}
          title={intl.formatMessage({ id: 'shop.common.evoucher' })}
        />
        <Divider full mt={32} mb={32} />
        <DiscountCode />
        <Divider full mt={32} mb={32} />
        <ShippingAddresses
          onChange={onAddressChange}
          onFormChange={onAddressFormChange}
          navigation={navigation}
          errors={errors}
          onCheckboxChange={value => {
            checkBoxForm.current = value;
          }}
        />
        <Divider full mt={32} mb={32} />
        <Box>
          <Text fontWeight={600} fontSize={18} mb={24}>
            {intl.formatMessage({ id: 'shop.cart.paymentSummary' })}
          </Text>
          <Box>
            <Box flexDirection={'row'}>
              <Box flex={1}>
                <Text>
                  {intl.formatMessage({
                    id: 'shop.cart.totalPayment',
                  })}
                </Text>
              </Box>
              <Text>{grandTotalPrice}</Text>
            </Box>

            <SecondaryText ml={16} fontSize={12}>
              {intl.formatMessage(
                {
                  id: 'shop.cart.inclDeliveryFee',
                },
                {
                  deliveryFeeFormatted: shippingPrice,
                },
              )}
            </SecondaryText>
          </Box>
          {!!discount && (
            <PaymentSummaryLine
              labelId="shop.cart.discountCode"
              value={discountPrice}
            />
          )}

          <Box mt={8} mb={16}>
            <SubTotal
              numberItems={itemsCount}
              price={discountedSubTotalPrice}
            />
          </Box>
          <Box mt={8}>
            <SecondaryText fontSize={14} fontWeight={600}>
              {intl.formatMessage({ id: 'shop.common.note' })}
            </SecondaryText>
            <SecondaryText fontSize={14}>
              {intl.formatMessage({ id: 'shop.cart.noteDesc' })}
            </SecondaryText>
          </Box>
        </Box>
      </ScrollView>
      <Footer
        flexDirection="row"
        style={[
          styles.footerContainer,
          { backgroundColor: theme.colors.white },
        ]}
      >
        <Box flex={1} flexDirection="row">
          <Box flex={1}>
            {isLoading ? (
              <Spinner size="small" />
            ) : (
              <TrackedButton
                primary
                onPress={goToCheckout}
                title={intl.formatMessage({
                  id: 'shop.cart.proceedToCheckout',
                })}
              />
            )}
          </Box>
        </Box>
      </Footer>
    </Box>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 32,
  },
  footerContainer: {
    paddingBottom: 16,
  },
});

const mapStateToProps = ({ shop, user: { userId, membersMap } }) => {
  const {
    cart,
    deliveryAddress: { addressMap },
  } = shop;
  const deliveryAddress = getDeliveryAddressesSelector(shop);
  const { itemsQty, itemsCount, isActive, totals } = cart;
  return {
    isCartEmpty: itemsCount === 0 || !isActive,
    itemsQty,
    itemsCount,
    shipping: totals.shipping || 0,
    grandTotal: totals.grandTotal || 0,
    subTotal: totals.subTotal || 0,
    discount: totals.discount || 0,
    discountedSubTotal: totals.discountedSubTotal || 0,
    addressMap,
    deliveryAddress,
    user: membersMap?.[userId],
  };
};

export default connect(mapStateToProps, {
  getCart,
  getCartTotals,
  postCartShipping,
  getDeliveryAddresses,
  addDeliveryAddress,
})(CartScreen);
