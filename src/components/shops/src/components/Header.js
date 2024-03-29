import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Platform, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import PropTypes from 'prop-types';
import {
  NAVIGATION_HOME_SCREEN_PATH,
  ORDER_HISTORY_SCREEN,
  SHOP_CART_SCREEN,
  SHOP_DELIVERY_ADDRESSES_SCREEN,
} from '@shops/navigation/routes';
import {
  Box,
  TouchableContainer,
  Image,
  Text,
} from '@shops/wrappers/components';
import { SearchInput } from '@shops/components';
import { useTheme, useIntl } from '@shops/wrappers/core/hooks';
import {
  order,
  shop,
  delivery,
  search,
  xmark,
  menu,
  credit,
} from '@shops/assets/icons';
import { updateSearchString, updateSearchParam, clearFilter } from '@shops/store/actions';
import { CartBadge } from '@shops/screens/cart';
// TODO: should remove depends on parent
import { isIphoneX } from '@utils';
import { useRoute } from '@react-navigation/native';

const MENU_OPTIONS = [
  {
    image: shop,
    titleId: 'shop.menu.shopHome',
    navigateTo: NAVIGATION_HOME_SCREEN_PATH,
  },

  {
    image: order,
    titleId: 'shop.menu.orderHistory',
    navigateTo: ORDER_HISTORY_SCREEN,
  },
  {
    image: credit,
    titleId: 'shop.menu.creditCards',
    navigateTo: 'LogScreen',
  },
  {
    image: delivery,
    titleId: 'shop.menu.deliveryAddress',
    navigateTo: SHOP_DELIVERY_ADDRESSES_SCREEN,
  },
];

const ShopHeader = ({
  navigation,
  searchString,
  updateSearchString,
  updateSearchParam,
  clearFilter
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const navRoute = useRoute();
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [isShowSearchPan, setIsShowSearchPan] = useState(false);
  const height = Platform.OS === 'android' ? 56 : isIphoneX() ? 88 : 64;

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setIsShowSearchPan(false);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (navRoute.name !== NAVIGATION_HOME_SCREEN_PATH) updateSearchString('');
  }, [navRoute, updateSearchString]);

  const onSubmit = useCallback(() => {
    setIsShowSearchPan(false);
    updateSearchParam();
  }, [updateSearchParam])

  const onSelect = useCallback((index) => {
    clearFilter()
    navigation.navigate(MENU_OPTIONS[index].navigateTo)
  }, [navigation, clearFilter])

  function renderMenuRow(option) {
    return (
      <Box
        py={3}
        pl={16}
        bg={theme.colors.primary[1]}
        flexDirection="row"
        alignItems="center"
      >
        <Image
          source={option.image}
          width={18}
          height={18}
          resizeMode={'contain'}
        />
        <Text color={theme.colors.white} ml={20}>
          {intl.formatMessage({ id: option.titleId })}
        </Text>
      </Box>
    );
  }

  const renderSeparator = () => <Box />;

  const onDropdownWillShow = () => {
    setIsShowDropdown(true);
  };

  const onDropdownWillHide = () => setIsShowDropdown(false);

  return (
    <Box>
      <Box testID="boxContainer" as={SafeAreaView} height={height}>
        <Box
          backgroundColor={theme.colors.primary[1]}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
        >
          <ModalDropdown
            testID="modalDropdown"
            dropdownStyle={styles.modalContainer}
            options={MENU_OPTIONS}
            renderRow={renderMenuRow}
            renderSeparator={renderSeparator}
            onDropdownWillShow={onDropdownWillShow}
            onDropdownWillHide={onDropdownWillHide}
            onSelect={index => onSelect(index)}
          >
            {isShowDropdown ? (
              <Image
                testID="leftIcon"
                source={xmark}
                height={18}
                width={18}
                ml={16}
                resizeMode={'contain'}
              />
            ) : (
              <Image
                source={menu}
                height={12}
                width={18}
                ml={16}
                resizeMode={'contain'}
              />
            )}
          </ModalDropdown>
          {!isShowDropdown && (
            <Box flexDirection="row" alignItems="center">
              <Box mr={16}>
                <TouchableContainer
                  testID="searchIcon"
                  onPress={() => setIsShowSearchPan(!isShowSearchPan)}
                  underlayColor={theme.colors.transparent}
                >
                  <Image
                    source={search}
                    height={18}
                    width={18}
                    mr={16}
                    resizeMode={'contain'}
                  />
                </TouchableContainer>
              </Box>
              <Box mr={16}>
                <TouchableContainer
                  testID="cartIcon"
                  onPress={() => {
                    navigation.navigate(SHOP_CART_SCREEN);
                  }}
                  underlayColor={theme.colors.transparent}
                >
                  <CartBadge />
                </TouchableContainer>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {isShowSearchPan && (
        <Box
          testID="searchPan"
          height={88}
          pl={32}
          pr={32}
          backgroundColor={theme.colors.primary[1]}
          justifyContent="center"
          alignItems="center"
        >
          <SearchInput
            value={searchString}
            onChangeText={value => updateSearchString(value)}
            onSubmit={onSubmit}
            placeholder="Search"
          />
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    borderWidth: 0,
    height: 350,
    backgroundColor: 'transparent',
    marginTop: 16,
  },
});

ShopHeader.propTypes = {
  navigation: PropTypes.any,
  searchString: PropTypes.string.isRequired,
  updateSearchString: PropTypes.func,
  updateSearchParam: PropTypes.func,
  clearFilter: PropTypes.func,
};

ShopHeader.defaultProps = {
  searchString: '',
};

const mapStateToProps = ({ shop: { filters } }) => {
  return {
    searchString: filters.searchString,
  };
};

export default connect(mapStateToProps, {
  updateSearchString,
  updateSearchParam,
  clearFilter
})(ShopHeader);
