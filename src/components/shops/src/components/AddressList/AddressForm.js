import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Input,
  CustomSelectField,
  Icon,
  Text,
} from '@shops/wrappers/components';
import { useIntl } from '@shops/wrappers/core/hooks';
import { useTheme } from '@wrappers/core/hooks';
import { SHOP_SINGLE_SELECT_MODAL } from '@shops/navigation/routes';

export const initialForm = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  province: '',
  countryId: undefined,
  zipCode: '',
  telephone: '',
};

export const AddressForm = ({
  navigation,
  onChange,
  initialValue = initialForm,
  errors = {},
  countries,
  countryMap,
}) => {
  const [form, setForm] = useState(initialValue);
  const intl = useIntl();
  const theme = useTheme();
  const updateForm = (key, value) => {
    const newForm = {
      ...form,
      [key]: value,
    };
    setForm(newForm);

    onChange && onChange(newForm);
  };

  const customInputStyles = {
    inputContainerStyle: {
      height: 56,
      width: '100%',
    },
    errorMessage: {
      margin: 0,
    },
  };

  return (
    <Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Box flex={1}>
          <Input
            value={form.firstName}
            label={intl.formatMessage({ id: 'shop.address.firstName' }) + '*'}
            autoCapitalize="none"
            onChangeText={val => updateForm('firstName', val)}
            error={errors?.firstName}
            touched
            customStyles={customInputStyles}
          />
        </Box>
        <Box width={16} />
        <Box flex={1}>
          <Input
            value={form.lastName}
            label={intl.formatMessage({ id: 'shop.address.lastName' }) + '*'}
            autoCapitalize="none"
            onChangeText={val => updateForm('lastName', val)}
            error={errors?.lastName}
            touched
            customStyles={customInputStyles}
          />
        </Box>
      </Box>
      <Input
        value={form.address1}
        label={intl.formatMessage({ id: 'shop.address.addressLine1' }) + '*'}
        autoCapitalize="none"
        onChangeText={val => updateForm('address1', val)}
        error={errors?.address1}
        touched
        customStyles={{
          inputContainerStyle: {
            height: 56,
            width: '100%',
          },
          errorMessage: {
            margin: 0,
          },
        }}
      />
      <Input
        value={form.address2}
        label={intl.formatMessage({ id: 'shop.address.addressLine2' })}
        autoCapitalize="none"
        onChangeText={val => updateForm('address2', val)}
        customStyles={{
          inputContainerStyle: {
            height: 56,
            width: '100%',
          },
          errorMessage: {
            margin: 0,
          },
        }}
      />

      <Box flexDirection="row" justifyContent="space-between">
        <Box flex={1}>
          <Input
            value={form.city}
            label={intl.formatMessage({ id: 'shop.address.city' }) + '*'}
            autoCapitalize="none"
            onChangeText={val => updateForm('city', val)}
            error={errors?.city}
            touched
            customStyles={customInputStyles}
          />
        </Box>
        <Box width={16} />
        <Box flex={1}>
          <CustomSelectField
            labelEmptyComponent={
              <Text
                fontSize={18}
                ellipsizeMode="tail"
                numberOfLines={1}
                color={theme.inputField.inputText}
              >
                {intl.formatMessage({
                  id: 'shop.address.selectCountry',
                }) + '*'}
              </Text>
            }
            label={
              intl.formatMessage({
                id: 'shop.address.selectCountry',
              }) + '*'
            }
            input={{
              value: form.countryId && countryMap[form.countryId]?.name,
            }}
            intl={intl}
            theme={theme}
            meta={{ error: errors?.countryId, touched: true }}
            onPress={() =>
              navigation.navigate(SHOP_SINGLE_SELECT_MODAL, {
                fieldKey: 'countryId',
                data: countries,
                initialSelected: form.countryId,
                onChange: updateForm,
                title: intl.formatMessage({
                  id: 'shop.address.selectCountry',
                }),
              })
            }
            onRight={({ color }) => <Icon name="expand-more" color={color} />}
          />
        </Box>
      </Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Box flex={1}>
          <Input
            value={form.zipCode}
            label={intl.formatMessage({ id: 'shop.address.zipCode' }) + '*'}
            autoCapitalize="none"
            onChangeText={val => updateForm('zipCode', val)}
            error={errors?.zipCode}
            touched
            customStyles={customInputStyles}
          />
        </Box>
        <Box width={16} />
        <Box flex={1}>
          <Input
            value={form.telephone}
            label={intl.formatMessage({ id: 'shop.address.telephone' }) + '*'}
            autoCapitalize="none"
            error={errors?.telephone}
            touched
            onChangeText={val => updateForm('telephone', val)}
            customStyles={customInputStyles}
          />
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = ({
  shop: {
    config: { countryIds, countryMap },
  },
}) => {
  return {
    countries: countryIds.map(id => {
      const country = countryMap[id];
      return {
        value: country.id,
        label: country.name || country.abbreviation,
      };
    }),
    countryMap,
  };
};

export default connect(mapStateToProps)(AddressForm);
