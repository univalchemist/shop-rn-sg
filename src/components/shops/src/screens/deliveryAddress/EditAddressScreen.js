import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Box, Footer, TrackedButton } from '@shops/wrappers/components';
import { useIntl, useTheme } from '@shops/wrappers/core/hooks';
import { AddressForm, CheckBox } from '@shops/components';
import { updateDeliveryAddress } from '@shops/store/actions';
import useValidateForm from '@shops/components/AddressList/useValidateForm';

const EditAddressScreen = ({ navigation, address, updateDeliveryAddress }) => {
  const intl = useIntl();
  const theme = useTheme();
  const [isDefault, setIsDefault] = useState(address.isDefaultShipping);
  const [errors, validate] = useValidateForm();
  const [form, setForm] = useState({
    firstName: address.firstName,
    lastName: address.lastName,
    telephone: address.telephone,
    address1: address.street[0],
    address2: address.street?.[1],
    city: address.city,
    countryId: address.countryId,
    zipCode: address.postCode,
    province: address.region?.region,
  });

  const onFormChange = form => {
    setForm(form);
    validate(form);
  };

  const toggleIsDefault = () => {
    setIsDefault(!isDefault);
  };

  const onSubmit = async () => {
    if (validate(form)) {
      const street = [form.address1];
      if (form.address2) {
        street.push(form.address2);
      }

      const region = address.region;
      if (form.province) {
        region.code = form.province;
        region.region = form.province;
      } else {
        delete address.region?.code;
        delete address.region?.region;
      }

      await updateDeliveryAddress({
        ...address,
        countryId: form.countryId,
        postCode: form.zipCode,
        city: form.city,
        isDefaultShipping: isDefault,
        street,
        firstName: form.firstName,
        lastName: form.lastName,
        telephone: form.telephone,
      });

      navigation.goBack();
    }
  };

  return (
    <Box flex={1} backgroundColor={theme.colors.background}>
      <Box flex={1} px={32} py={32}>
        <AddressForm
          navigation={navigation}
          onChange={onFormChange}
          initialValue={form}
          errors={errors}
        />
        <CheckBox
          onPress={toggleIsDefault}
          checked={isDefault}
          label={intl.formatMessage({ id: 'shop.address.setDeliveryDefault' })}
        />
      </Box>
      <Footer
        flexDirection="row"
        style={[styles.footer, { backgroundColor: theme.colors.white }]}
      >
        <Box flex={1} flexDirection="row">
          <Box flex={1}>
            <TrackedButton
              primary
              onPress={onSubmit}
              title={intl.formatMessage({ id: 'shop.common.save' })}
            />
          </Box>
        </Box>
      </Footer>
    </Box>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingBottom: 16,
  },
  setDefaultContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (
  {
    shop: {
      deliveryAddress: { addressMap },
    },
  },
  { route },
) => {
  return {
    address: addressMap[route.params.addressId],
  };
};

export default connect(mapStateToProps, { updateDeliveryAddress })(
  EditAddressScreen,
);
