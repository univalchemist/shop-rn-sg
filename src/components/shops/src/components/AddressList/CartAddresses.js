import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Box, Text } from '@shops/wrappers/components';
import { CheckBox } from '@shops/components';
import SelectAddress from './SelectAddress';
import AddressForm from './AddressForm';

const CartAddresses = ({
  addresses,
  title,
  saveAddressLabel,
  onFormChange,
  onChange,
  navigation,
  errors,
  onCheckboxChange,
}) => {
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (addresses?.length === 1) {
      setShowForm(true);
    }
  }, [addresses]);
  const formRef = useRef();
  const [saveAddress, setSaveAddress] = useState(false);

  const onSelectAddressChange = id => {
    if (id === 0) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }

    onChange?.(id);
  };

  const toggleSaveAddress = () => {
    onCheckboxChange(!saveAddress);
    setSaveAddress(!saveAddress);
  };

  const onFormChangeValue = useCallback(newForm => {
    formRef.current = newForm;
    onFormChange?.(newForm);
  }, []);

  return (
    <Box>
      <Text fontWeight={600} fontSize={18} mb={24}>
        {title}
      </Text>
      <SelectAddress
        onSelectChange={onSelectAddressChange}
        addresses={addresses}
      />
      {!!showForm && (
        <>
          <AddressForm
            onChange={onFormChangeValue}
            navigation={navigation}
            errors={errors}
            initialValue={formRef.current}
          />
          <CheckBox
            onPress={toggleSaveAddress}
            checked={saveAddress}
            label={saveAddressLabel}
          />
        </>
      )}
    </Box>
  );
};

export default CartAddresses;
