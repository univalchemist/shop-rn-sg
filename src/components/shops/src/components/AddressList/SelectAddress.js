import React, { useEffect, useState, useCallback } from 'react';
import { RadioGroup, RadioButton } from '@shops/components';
import { useTheme, usePrevious } from '@shops/wrappers/core/hooks';
import { StyleSheet } from 'react-native';

const SelectAddress = ({ addresses, onSelectChange }) => {
  const theme = useTheme();
  const [selected, setSelected] = useState(
    addresses?.length && addresses[0].id,
  );
  const prevAddresses = usePrevious(addresses);

  useEffect(() => {
    if (addresses?.length === 1) {
      onRadioGroupChange?.(0);
    }
  }, [addresses]);
  useEffect(() => {
    if (prevAddresses?.length === 1 && addresses.length > 1) {
      onRadioGroupChange(addresses[0].id);
    }
  }, [addresses, prevAddresses]);

  const onRadioGroupChange = useCallback(
    value => {
      setSelected(value);
      onSelectChange?.(value);
    },
    [onSelectChange],
  );

  return (
    <RadioGroup value={selected} onChange={onRadioGroupChange}>
      {addresses?.map(address => {
        return (
          <RadioButton
            key={address.id.toString()}
            text={address.text}
            value={address.id}
            textStyle={[styles.radioText, { color: theme.colors.label }]}
          />
        );
      })}
    </RadioGroup>
  );
};

const styles = StyleSheet.create({
  radioText: {
    marginLeft: 8,
    flex: 1,
  },
});

export default SelectAddress;
