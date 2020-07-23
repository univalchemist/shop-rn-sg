import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Box, Footer, TrackedButton } from '@shops/wrappers/components';
import { useIntl, useTheme } from '@shops/wrappers/core/hooks';
import { AddressForm, CheckBox } from '@shops/components';
import { addDeliveryAddress } from '@shops/store/actions';
import useValidateForm, {
  formattedAddress,
} from '@shops/components/AddressList/useValidateForm';

const AddAddressScreen = ({ navigation, addDeliveryAddress }) => {
  const intl = useIntl();
  const theme = useTheme();
  const [isDefault, setIsDefault] = useState(false);
  const [form, setForm] = useState(null);
  const [errors, validate] = useValidateForm();

  const onFormChange = form => {
    setForm(form);
    validate(form);
  };

  const toggleIsDefault = () => {
    setIsDefault(!isDefault);
  };

  const onSubmit = async () => {
    const isValidate = validate(form);
    if (isValidate) {
      const addressForm = formattedAddress({
        form,
        isDefaultShipping: isDefault,
      });
      await addDeliveryAddress(addressForm);
      navigation.goBack();
    }
  };
  return (
    <Box flex={1} backgroundColor={theme.colors.background}>
      <Box flex={1} px={32} py={32}>
        <AddressForm
          navigation={navigation}
          onChange={onFormChange}
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
});

export default connect(null, { addDeliveryAddress })(AddAddressScreen);
