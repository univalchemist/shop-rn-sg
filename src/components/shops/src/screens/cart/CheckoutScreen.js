import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Alert, StyleSheet } from 'react-native';
import {
  Box,
  Footer,
  ScrollView,
  Text,
  Divider,
  TrackedButton,
  Flex,
} from '@shops/wrappers/components';
import {
  useGetFormattedPrice,
  useIntl,
  useTheme,
} from '@shops/wrappers/core/hooks';
import { BillingAddresses, BackButton, Spinner } from '@shops/components';
import {
  makePayment,
  postCartBilling,
  getCart,
  getDeliveryAddresses,
} from '@shops/store/actions';
import {
  PAYMENT_SCREEN,
  PAYMENT_SUCCESS_SCREEN,
} from '@shops/navigation/routes';
import ConfirmModal from '@shops/screens/cart/CartScreen/ConfirmModal';
import useValidateForm, {
  formattedAddress,
} from '@shops/components/AddressList/useValidateForm';
import { getLocalizeServerError } from '@shops/utils/localizeServerError';
import { getOrder } from '@shops/store/order/actions';

const CheckoutScreen = ({
  navigation,
  grandTotal,
  makePayment,
  postCartBilling,
  addressMap,
  getCart,
  getDeliveryAddresses,
  route: { params },
  user,
  getOrder,
}) => {
  const shippingAddress = params?.shippingAddress;
  const intl = useIntl();
  const theme = useTheme();
  const [isLoading, setLoading] = useState(false);
  const [isShowModal, showModal] = useState(false);
  const [form, setForm] = useState(shippingAddress);
  const [errors, validate] = useValidateForm();
  const checkBoxForm = useRef(false);
  const chosenAddressId = useRef(-1);
  const grandTotalPrice = useGetFormattedPrice(grandTotal);
  useEffect(() => {
    getDeliveryAddresses();
  }, []);

  const onAddressChange = addressId => {
    chosenAddressId.current = addressId;
  };

  const onAddressFormChange = addressForm => {
    setForm(addressForm);
    validate(addressForm);
  };
  const tryToProcessPayment = () => {
    if (chosenAddressId.current === 0) {
      if (!validate(form)) return;
    }
    showModal(true);
  };
  const onConfirm = () => {
    showModal(false);
    proceedToPayment();
  };
  const proceedToPayment = async () => {
    try {
      setLoading(true);
      let address;
      if (chosenAddressId.current === -1) {
        address = shippingAddress;
      } else if (chosenAddressId.current === 0) {
        address = formattedAddress({ form, user });
      } else {
        address = addressMap[chosenAddressId.current];
      }
      await postCartBilling(
        address,
        chosenAddressId.current === 0 && checkBoxForm.current,
      );
      const { value } = await makePayment();
      getCart();
      if (value.paymentUrl) {
        navigation.navigate(PAYMENT_SCREEN, {
          paymentUrl: value.paymentUrl,
          orderId: value.orderId,
        });
      } else {
        const orderResult = await getOrder(value.orderId);
        navigation.navigate(PAYMENT_SUCCESS_SCREEN, { order: orderResult.value });
      }
    } catch (error) {
      const { subject, message } = getLocalizeServerError(
        error,
        {
          subjectPrefix: 'shop.serverErrors.processToPayment.subject',
          prefix: 'shop.serverErrors.processToPayment',
        },
        intl,
      );
      Alert.alert(subject, message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1}>
      <ConfirmModal
        visible={isShowModal}
        onConfirm={onConfirm}
        onCancel={() => showModal(false)}
      />
      <BackButton navigation={navigation} labelId="shop.common.cart" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text fontWeight={600} fontSize={18}>
          {intl.formatMessage({ id: 'shop.common.checkout' })}
        </Text>
        <Flex flexDirection="row" justifyContent="space-between">
          <Text fontWeight={600}>
            {intl.formatMessage({ id: 'shop.checkout.orderTotal' })}
          </Text>
          <Text fontWeight={600}>{grandTotalPrice}</Text>
        </Flex>
        <Divider full mt={32} mb={32} />
        <BillingAddresses
          onChange={onAddressChange}
          onFormChange={onAddressFormChange}
          onCheck
          navigation={navigation}
          errors={errors}
          onCheckboxChange={value => (checkBoxForm.current = value)}
        />
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
              <Spinner size={'small'} />
            ) : (
              <TrackedButton
                primary
                onPress={tryToProcessPayment}
                title={intl.formatMessage({ id: 'shop.checkout.payNow' })}
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

const mapStateToProps = ({
  shop: {
    cart,
    deliveryAddress: { addressMap },
  },
  user: { userId, membersMap },
}) => {
  const { totals } = cart;
  return {
    grandTotal: totals.grandTotal || 0,
    addressMap,
    user: membersMap?.[userId],
  };
};

export default connect(mapStateToProps, {
  makePayment,
  postCartBilling,
  getCart,
  getDeliveryAddresses,
  getOrder,
})(CheckoutScreen);
