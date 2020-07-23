/* istanbul ignore file */
//TODO update unit test
import React, { useState, useCallback } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Box } from '@shops/wrappers/components';
import { useTheme } from '@shops/wrappers/core/hooks';
import { NAVIGATION_HOME_SCREEN_PATH } from '@shops/navigation/routes';
import { useNavigation } from '@react-navigation/native';

const SearchInput = ({ value, placeholder, onChangeText, onSubmit }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [focus, setFocus] = useState(false);

  const setFocusStatus = useCallback(() => {
    setFocus(!focus);
  }, [focus]);

  const onSubmitEditing = useCallback(() => {
    if (value?.length >= 3 || value?.length === 0) {
      onSubmit();
      navigation.navigate(NAVIGATION_HOME_SCREEN_PATH);
    }
  }, [value, onSubmit, navigation]);

  return (
    <Box
      width="100%"
      height={56}
      borderRadius={4}
      borderWidth={0.5}
      pl={16}
      borderColor={focus ? theme.colors.primary[1] : theme.colors.border}
      backgroundColor={focus ? theme.colors.white : theme.colors.primary[1]}
      justifyContent="center"
    >
      <TextInput
        value={value}
        onChangeText={value => onChangeText(value)}
        placeholder={placeholder}
        placeholderTextColor={focus ? theme.colors.text : theme.colors.white}
        style={[
          styles.input,
          { color: focus ? theme.colors.text : theme.colors.white },
        ]}
        autoCapitalize={'none'}
        onBlur={setFocusStatus}
        onFocus={setFocusStatus}
        returnKeyType="search"
        onSubmitEditing={onSubmitEditing}
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  input: {
    fontSize: 16,
  },
});

SearchInput.propTypes = {
  style: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  textStyle: PropTypes.object,
  onChangeText: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SearchInput;
