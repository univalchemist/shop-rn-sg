/* istanbul ignore file */
//TODO update uni test
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, SectionList } from 'react-native';
import { connect } from 'react-redux';
import { SectionHeadingText, Box, Text } from '@shops/wrappers/components';
import { NAVIGATION_HOME_PRODUCT_PATH } from '@shops/navigation/routes';
import { useTheme, useIntl } from '@shops/wrappers/core/hooks';
import {
  getSuggestedOffers,
  getProducts,
  getProductBySearchTerm,
  initSuggestedOfferPagination,
} from '@shops/store/actions';
import {
  getSuggestedProductsSelector,
  getGroupedProductsSelector,
  getSearchedProductsSelector,
} from '@shops/store/selectors';
import { Spinner, WalletHeader } from '@shops/components';
import FeaturedProducts from './FeaturedProducts';
import FilterGroup from './FilterGroup';
import Banners from './Banners';

const HomeScreen = ({
  navigation,
  errorMessage,
  getSuggestedOffers,
  selectedCategories,
  sortType,
  filterTypes,
  searchTerm,
  getProducts,
  getProductBySearchTerm,
  groupedProducts,
  initSuggestedOfferPagination,
  suggestedProducts,
  productsPagination,
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestedOffers = useCallback(async () => {
    setIsLoading(true);
    try {
      await getSuggestedOffers();
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, getSuggestedOffers]);

  useEffect(() => {
    if (
      searchTerm?.length < 3 &&
      selectedCategories?.length === 0 &&
      Object.keys(filterTypes).length === 0 &&
      !sortType
    ) {
      initSuggestedOfferPagination();
      fetchSuggestedOffers();
    }
  }, [
    searchTerm,
    selectedCategories,
    sortType,
    filterTypes,
    fetchSuggestedOffers,
  ]);

  useEffect(() => {
    const data = [
      {
        title: intl.formatMessage({
          id: 'shop.homePage.suggestedItems',
          defaultMessage: 'Suggested Items',
        }),
        data: [suggestedProducts],
      },
    ];
    setData(data);
  }, [intl, suggestedProducts]);

  useEffect(() => {
    if (searchTerm !== null && searchTerm?.length >= 3) {
      getProductBySearchTerm();
    } else if (
      selectedCategories.length > 0 ||
      sortType ||
      Object.keys(filterTypes).length > 0
    ) {
      getProducts();
    }
  }, [
    selectedCategories,
    sortType,
    filterTypes,
    searchTerm,
    getProductBySearchTerm,
    getProducts,
  ]);

  const onProductPress = product => {
    navigation.navigate(NAVIGATION_HOME_PRODUCT_PATH, {
      productSku: product.sku,
    });
  };

  const renderList = ({ section, item }) => {
    const { categoryId } = section;
    return (
      <Box
        mt={8}
        pb={24}
        borderBottomWidth={1}
        borderColor={theme.colors.divider}
      >
        <FeaturedProducts
          searchTerm={searchTerm}
          categoryId={categoryId}
          products={item}
          onPress={onProductPress}
          navigation={navigation}
        />
      </Box>
    );
  };
  const isSearched = searchTerm !== '';
  const isCategory = selectedCategories?.length;
  const hasProducts = groupedProducts?.length;
  const sectionData =
    isSearched || isCategory
      ? hasProducts
        ? groupedProducts
        : [
            {
              title: '',
              data: [groupedProducts],
            },
          ]
      : data;

  if (errorMessage) {
    return (
      <View style={styles.errorContainer}>
        <Text>{errorMessage}</Text>
      </View>
    );
  }
  return (
    <Box flex={1}>
      <WalletHeader />
      <SectionList
        contentContainerStyle={[
          styles.sectionList,
          { backgroundColor: theme.colors.background },
        ]}
        sections={sectionData}
        keyExtractor={(item, index) => item + index}
        renderItem={renderList}
        ListHeaderComponent={
          <>
            {!hasProducts && !searchTerm && <Banners />}
            <FilterGroup
              sortType={sortType}
              filterTypes={filterTypes}
              products={sectionData}
              searchTerm={searchTerm}
              selectedCategories={selectedCategories}
            />
          </>
        }
        renderSectionHeader={({ section: { title, data } }) => (
          <Box mx={32}>
            <SectionHeadingText
              backgroundColor={theme.colors.background}
              fontWeight={'bold'}
              lineHeight={37}
              textAlign={isSearched || isCategory ? 'left' : 'center'}
            >
              {title}{' '}
              {(isSearched || isCategory) && hasProducts
                ? `(${data?.[0].length})`
                : ''}
            </SectionHeadingText>
          </Box>
        )}
        style={{ backgroundColor: theme.colors.background }}
        renderSectionFooter={() =>
          isLoading || productsPagination?.isLoading ? (
            <Spinner size="small" />
          ) : null
        }
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  sectionList: {
    paddingBottom: 16,
  },
});

HomeScreen.propTypes = {
  getHomeData: PropTypes.func,
  navigation: PropTypes.object,
  featuredProducts: PropTypes.object,
  featuredCategories: PropTypes.object,
  refreshing: PropTypes.bool,
};

const mapStateToProps = ({ shop }) => {
  const { filters, paginations } = shop;
  const { selectedCategories, sortType, filterTypes, searchTerm } = filters;
  const { products: productsPagination } = paginations;

  const suggestedProducts = getSuggestedProductsSelector(shop);
  const groupedProducts = getGroupedProductsSelector(shop);
  const searchedProducts = getSearchedProductsSelector(shop);

  return {
    suggestedProducts,
    selectedCategories,
    sortType,
    filterTypes,
    searchTerm,
    groupedProducts,
    searchedProducts,
    productsPagination,
  };
};

export default connect(mapStateToProps, {
  getSuggestedOffers,
  getProducts,
  getProductBySearchTerm,
  initSuggestedOfferPagination,
})(HomeScreen);
