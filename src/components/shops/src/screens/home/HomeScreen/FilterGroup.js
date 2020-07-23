/* istanbul ignore file */
//TODO update unit test
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import {
  SHOP_SELECT_CATEGORY_MODAL,
  SHOP_FILTER_MODAL,
  SHOP_SORT_MODAL,
} from '@shops/navigation/routes';
import { Dimensions } from 'react-native';
import { Box, SecondaryText } from '@shops/wrappers/components';
import { useIntl, useTheme } from '@shops/wrappers/core/hooks';
import { useNavigation } from '@react-navigation/native';
import { Select } from '@shops/components';

const MAX_TEXT_WIDTH =
  (Dimensions.get('window').width - 32 * 2 - 16) / 2 - 32 * 2;

const FilterGroup = ({
  selectedCategories,
  sortType,
  searchTerm,
  products,
  filterTypes,
  sortings,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const { navigate } = useNavigation();
  const hasSelectedCategories = selectedCategories.length > 0;
  const hasFiltered = Object.keys(filterTypes).length > 0;
  const crrSorting = sortings[sortType];

  const isSearched = useMemo(() => searchTerm !== '', [searchTerm]);
  const isSelectedCategory = useMemo(
    () => products?.length > 0 && !!products[0].title,
    [products],
  );
  const onSelectCategoryPress = () => {
    navigate(SHOP_SELECT_CATEGORY_MODAL);
  };

  const onSortByPress = () => {
    navigate(SHOP_SORT_MODAL);
  };

  const onFilterByPress = () => {
    navigate(SHOP_FILTER_MODAL);
  };
  if (isSearched && !isSelectedCategory && !hasSelectedCategories) return null;

  return (
    <>
      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        paddingHorizontal={32}
        paddingVertical={20}
        backgroundColor={theme.colors.background}
      >
        {!isSearched && (
          <Select onPress={onSelectCategoryPress}>
            <SecondaryText>
              {hasSelectedCategories
                ? intl.formatMessage(
                    { id: 'shop.filterGroup.selected' },
                    { selected_categories_length: selectedCategories.length },
                  )
                : intl.formatMessage({ id: 'shop.filterGroup.selectCatgory' })}
            </SecondaryText>
          </Select>
        )}
      </Box>
      {(hasSelectedCategories || isSearched) && products?.length > 0 && (
        <Box
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          paddingHorizontal={32}
          paddingBottom={20}
          backgroundColor={theme.colors.background}
        >
          <Select onPress={onSortByPress}>
            <SecondaryText
              ellipsizeMode="tail"
              numberOfLines={1}
              width={MAX_TEXT_WIDTH}
            >
              {crrSorting
                ? crrSorting?.name
                : intl.formatMessage({
                    id: 'shop.filterGroup.sort',
                  })}
            </SecondaryText>
          </Select>
          <Box width={20} />
          <Select onPress={onFilterByPress}>
            <SecondaryText>
              {hasFiltered
                ? intl.formatMessage(
                    { id: 'shop.filterGroup.filtered' },
                    { number: Object.keys(filterTypes).length },
                  )
                : intl.formatMessage({ id: 'shop.filterGroup.filter' })}
            </SecondaryText>
          </Select>
        </Box>
      )}
    </>
  );
};

const mapStateToProps = ({ shop: { config } }) => {
  return { sortings: config.sortings };
};

export default connect(mapStateToProps)(FilterGroup);
