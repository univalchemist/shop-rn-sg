import { useTheme } from '@shops/wrappers/core/hooks';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Box } from '@shops/wrappers/components';
import React from 'react';

const Select = ({ children, onPress, disabled = false }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.selectContainer, { borderColor: theme.colors.border }]}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Box flex={1}>{children}</Box>

      <Icon name="expand-more" size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 16,
    flex: 1,
  },
  padding: { marginHorizontal: 20 },
});

export default Select;
