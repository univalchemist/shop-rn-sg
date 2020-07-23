import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  Box,
  Text,
  SecondaryText,
  TrackedButton,
} from '@shops/wrappers/components';
import {
  useGetFormattedPrice,
  useIntl,
  useTheme,
} from '@shops/wrappers/core/hooks';
import moment from 'moment';
import { ORDER_HISTORY_DETAIL_SCREEN } from '@shops/navigation/routes';
import { DATE_FORMAT_LONG, ORDER_STATUS_STRING } from '@shops/utils/constant';
import { connect } from 'react-redux';
import { getOrderHistory } from '@shops/store/actions';
import { useFetchActions } from '@wrappers/core/hooks';
import { Spinner, WalletHeader } from '@shops/components';
import { getSymbolCurrencySelector } from '@shops/store/selectors';

const OrderHistoryScreen = ({
  navigation,
  orderHistory,
  getOrderHistory,
  currency,
}) => {
  const [isLoading] = useFetchActions([getOrderHistory]);

  const intl = useIntl();

  const renderHeader = () => (
    <Text fontSize={24} lineHeight={24} mt={32}>
      {intl.formatMessage({ id: 'shop.orderHistory.header' })}
    </Text>
  );

  return (
    <Box flex={1}>
      <WalletHeader />
      <FlatList
        ListHeaderComponent={renderHeader}
        style={style.flatList}
        data={orderHistory}
        renderItem={({ item }) => (
          <OrderHistoryItem
            item={item}
            navigation={navigation}
            currency={currency}
          />
        )}
        keyExtractor={item => item.orderIdText}
        ListFooterComponent={() => isLoading && <Spinner size={'small'} />}
      />
    </Box>
  );
};

const OrderHistoryItem = ({ item, navigation, currency }) => {
  const totalAmount = useGetFormattedPrice(item.grandTotal, currency);
  const theme = useTheme();
  const intl = useIntl();
  return (
    <Box borderBottomWidth={1} borderColor={theme.colors.divider} mt={32}>
      <Text mt={12}>
        {intl.formatMessage(
          { id: 'shop.orderHistory.orderNo' },
          { orderNo: item.orderIdText },
        )}
      </Text>
      <Text mt={12} fontSize={14}>
        {moment(item.orderDate).format(DATE_FORMAT_LONG)}
      </Text>
      <Box flexDirection={'row'} mt={1}>
        <Box flex={1}>
          <Text fontSize={14} flex={1}>
            {intl.formatMessage(
              {
                id: 'shop.orderHistory.totalItems',
                defaultMessage: `Total (${item.itemCount} items)`,
              },
              { item: item.itemCount },
            )}
          </Text>
        </Box>
        <Text>{totalAmount}</Text>
      </Box>
      <Box mt={8}>
        {item.items?.map(itemDetail => (
          <Box key={itemDetail.sku}>
            <Text fontSize={14} mt={2}>
              {itemDetail.name}
            </Text>
            <SecondaryText fontSize={12}>
              {intl.formatMessage(
                {
                  id: 'shop.orderHistory.qty',
                  defaultMessage: `Qty: ${itemDetail.quantity}`,
                },
                { quantity: itemDetail.quantity },
              )}
            </SecondaryText>
          </Box>
        ))}
        <Box mt={24} mb={32}>
          {item.status === ORDER_STATUS_STRING.COMPLETE ? (
            <TrackedButton
              primary
              title={intl.formatMessage({
                id: 'shop.orderHistory.viewOrderDetails',
              })}
              onPress={() => {
                navigation.navigate(ORDER_HISTORY_DETAIL_SCREEN, {
                  orderHistory: item,
                });
              }}
            />
          ) : (
            <Box
              height={48}
              width={'100%'}
              borderWidth={1}
              borderColor={theme.colors.primary[0]}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text>
                {intl.formatMessage({
                  id:
                    item.status === ORDER_STATUS_STRING.PENDING
                      ? 'shop.orderHistory.paymentPending'
                      : 'shop.orderHistory.paymentUnsuccessful',
                })}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
const style = StyleSheet.create({
  flatList: { paddingHorizontal: 32 },
});

const mapStateToProps = state => {
  const { orderHistory } = state.shop.orderHistory;
  const currency = getSymbolCurrencySelector(state);
  return {
    orderHistory,
    currency,
  };
};

export default connect(mapStateToProps, { getOrderHistory })(
  OrderHistoryScreen,
);
