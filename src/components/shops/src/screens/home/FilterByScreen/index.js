/* istanbul ignore file */
//TODO update uni test
import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Footer,
  Box,
  SectionHeadingText,
  ListItem,
  Flex,
  SecondaryText,
  TrackedButton,
  CheckBox,
  Input,
  Text,
} from '@shops/wrappers/components';
import { useIntl, useTheme } from '@shops/wrappers/core/hooks';
import { updateFilterTypes } from '@shops/store/actions';
import {
  FILTER_TYPES,
  MAX_RANGE_PRICE,
  MIN_RANGE_PRICE,
} from '@shops/config/constants';

const FilterByScreen = ({
  filterTypes,
  updateFilterTypes,
  navigation,
  defaultCurrencySymbol,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const [rangePrice, setRangePrice] = useState(
    filterTypes[FILTER_TYPES.RANGE_PRICE] || [MIN_RANGE_PRICE, MAX_RANGE_PRICE],
  );
  const [isRatings, setIsRatings] = useState(
    filterTypes[FILTER_TYPES.RATINGS] || false,
  );
  const [minError, setMinError] = useState(false);
  const [maxError, setMaxError] = useState(false);

  const getNumber = val => parseInt(val.replace(/[^0-9]/g, ''), 10) || 0;
  const dismissKeyboard = () => Keyboard.dismiss();
  const toggleRatings = () => {
    setIsRatings(!isRatings);
  };

  const onPressApply = () => {
    const updatedData = {};

    if (isRatings) {
      updatedData[FILTER_TYPES.RATINGS] = true;
    }
    if (
      rangePrice[0] !== MIN_RANGE_PRICE ||
      rangePrice[1] !== MAX_RANGE_PRICE
    ) {
      updatedData[FILTER_TYPES.RANGE_PRICE] = rangePrice;
    }

    updateFilterTypes(updatedData);
    navigation.goBack();
  };
  const onChangeMax = useCallback(
    val => {
      setMaxError(rangePrice[0] > getNumber(val));
      setRangePrice(previousVal => [previousVal[0], getNumber(val)]);
    },
    [setRangePrice, setMaxError, rangePrice],
  );
  const leftIcon = () => <Text mr={2}>{defaultCurrencySymbol}</Text>;
  return (
    <Box flex={1} backgroundColor={theme.colors.background}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <Box flex={1}>
          <Box px={4} pt={32} pb={8}>
            <SectionHeadingText>
              {intl.formatMessage({ id: 'shop.filter.showProductWith' })}
            </SectionHeadingText>
          </Box>
          <ListItem onPress={toggleRatings} showDivider={false}>
            <Flex as={View} flexDirection="row" alignItems="flex-start">
              <Box flex={1} paddingRight={10}>
                <SecondaryText accessibilityLabel="Ratings">
                  {intl.formatMessage({ id: 'shop.filter.ratings' })}
                </SecondaryText>
              </Box>
              <CheckBox
                containerStyle={styles.checkBoxContainer}
                checked={isRatings}
                onPress={toggleRatings}
              />
            </Flex>
          </ListItem>
          <Box px={4} pt={32} pb={8}>
            <SectionHeadingText>
              {intl.formatMessage({ id: 'shop.filter.priceRange' })}
            </SectionHeadingText>
          </Box>

          <Box mx={4} mt={16} flexDirection={'row'}>
            <Box flex={1}>
              <Input
                value={rangePrice[0]?.toString()}
                keyboardType={'numeric'}
                leftIcon={leftIcon}
                label={intl.formatMessage({ id: 'shop.filter.min' })}
                onChangeText={val => {
                  setMinError(rangePrice[1] < getNumber(val));
                  setRangePrice(previousVal => [
                    getNumber(val),
                    previousVal[1],
                  ]);
                }}
              />
            </Box>
            <Box mx={16} mt={16}>
              <Text>{intl.formatMessage({ id: 'shop.common.to' })}</Text>
            </Box>
            <Box flex={1}>
              <Input
                value={rangePrice[1]?.toString()}
                keyboardType={'numeric'}
                leftIcon={leftIcon}
                label={intl.formatMessage({ id: 'shop.filter.max' })}
                onChangeText={onChangeMax}
              />
            </Box>
          </Box>
          {(minError || maxError) && (
            <Box mx={4} mt={-30}>
              <Text style={{ color: theme.colors.primary[0] }}>
                {intl.formatMessage({
                  id: maxError
                    ? 'shop.filter.maxWarning'
                    : 'shop.filter.minWarning',
                })}
              </Text>
            </Box>
          )}
        </Box>
      </TouchableWithoutFeedback>
      <Footer
        flexDirection="row"
        style={[styles.footer, { backgroundColor: theme.colors.white }]}
      >
        <Box flex={1} flexDirection="row">
          <Box flex={1}>
            <TrackedButton
              primary
              onPress={onPressApply}
              title={intl.formatMessage({ id: 'shop.common.apply' })}
              disabled={minError || maxError}
            />
          </Box>
        </Box>
      </Footer>
    </Box>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    padding: 0,
    margin: 0,
  },
  footer: {
    paddingBottom: 16,
  },
});

const mapStateToProps = ({ shop: { filters, config } }) => {
  const { currency } = config;
  return {
    filterTypes: filters.filterTypes,
    defaultCurrencySymbol: currency.defaultCurrencySymbol,
  };
};

export default connect(mapStateToProps, { updateFilterTypes })(FilterByScreen);
