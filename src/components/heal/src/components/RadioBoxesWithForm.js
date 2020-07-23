import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Flex, Text } from '@heal/src/wrappers/components';
import { CheckBox } from 'react-native-elements';
import { Field } from 'redux-form';

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

const CustomRadioBoxes = props => {
  const {
    input: { value, onChange, name, ...restInput },
    data,
    style,
    ...restProps
  } = props;

  const renderCheckBox = ({
    optionKey,
    optionValue,
    forceSelected,
    disable,
    disableMessage,
    index,
  }) => {
    return (
      <Box ml={-20} alignItems="center" flexDirection="row">
        <CheckBox
          name={name}
          containerStyle={disable ? styles.radioBox : null}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={forceSelected ? true : optionKey === value}
          checkedColor={
            disable
              ? theme.heal.radioButton.disable
              : theme.heal.radioButton.checked
          }
          onPress={() => {
            if (disable) return;
            onChange(optionKey);
          }}
          {...restInput}
          {...restProps}
        />
        <Box paddingRight={30} style={disable ? styles.text : null}>
          <Text
            fontSize={16}
            color={
              disable
                ? theme.heal.radioButton.disable
                : theme.heal.colors.gray[3]
            }
          >
            {optionValue}
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
  };

  return (
    <Box style={style}>
      {data.map(
        ({ key, value, forceSelected, disable, disableMessage }, index) => {
          return renderCheckBox({
            optionKey: key,
            optionValue: value,
            forceSelected,
            disable,
            disableMessage,
          });
        },
      )}
    </Box>
  );
};

const RadioBoxesWithForm = props => {
  return <Field {...props} component={CustomRadioBoxes} />;
};

export default RadioBoxesWithForm;
