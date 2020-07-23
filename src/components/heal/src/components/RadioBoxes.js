import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Flex, Text } from '@heal/src/wrappers/components';
import { CheckBox } from 'react-native-elements';

import theme from '@theme';

/*
  data: format [{key, value, forceSelected, disable, disableMessage}]
  value: selected key
  onValueChange: return key
*/

const styles = StyleSheet.create({
  radioBox: {
    marginTop: 'auto',
  },
  text: {
    marginTop: 'auto',
  },
});

const RadioBoxes = ({ data, style, value, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <Box style={style}>
      {data.map(
        ({ key, value, forceSelected, disable, disableMessage }, index) => {
          return (
            <Box ml={-20} alignItems="center" flexDirection="row">
              <CheckBox
                containerStyle={disable ? styles.radioBox : null}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={forceSelected ? true : key === selectedValue}
                checkedColor={
                  disable
                    ? theme.heal.radioButton.disable
                    : theme.heal.radioButton.checked
                }
                onPress={() => {
                  if (disable) return;
                  setSelectedValue(key);
                  if (onValueChange) onValueChange({ key, index });
                }}
              />
              <Box paddingRight={10} style={disable ? styles.text : null}>
                <Text
                  fontSize={16}
                  color={
                    disable
                      ? theme.heal.radioButton.disable
                      : theme.heal.colors.gray[3]
                  }
                >
                  {value}
                </Text>
                {disable ? (
                  <Text
                    color={theme.heal.colors.gray[0]}
                    fontSize={14}
                    lineHeight={20}
                    letterSpacing={0.25}
                  >
                    {disableMessage}
                  </Text>
                ) : null}
              </Box>
            </Box>
          );
        },
      )}
    </Box>
  );
};

export default RadioBoxes;
