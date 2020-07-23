/* istanbul ignore file */
//TODO update unit test
import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { connect } from 'react-redux';
import { useIntl } from '@shops/wrappers/core/hooks';
import {
  HomeScreen,
  SelectCategoryScreen,
  FilterByScreen,
  SortByScreen,
  ProductDetailsScreen,
  ReviewScreen,
} from '@shops/screens/home';
import {
  AddAddressScreen,
  DeliveryAddressesScreen,
  EditAddressScreen,
} from '@shops/screens/deliveryAddress';
import { ModalBackButton } from '@shops/wrappers/components';
import { ShopHeader, ClearAllButton } from '@shops/components';
import {
  CartScreen,
  EditProductScreen,
  CheckoutScreen,
  PaymentScreen,
  PaymentSuccessScreen,
  PaymentFailedScreen,
  PaymentPendingScreen,
} from '@shops/screens/cart';
import { updateSortType, updateFilterTypes } from '@shops/store/actions';
import { StackBackButton } from '@shops/wrappers/components';
import * as routes from './routes';
import {
  OrderHistoryDetailScreen,
  OrderHistoryScreen,
  ReviewSubmittedScreen,
  TrackOrderScreen,
  WriteReviewScreen,
} from '@shops/screens/orderhistory';
import { SingleSelectModal } from '@wrappers/components/form';
import LogScreen from '@shops/screens/log/LogScreen';
import SelectAddressModal from '@shops/screens/home/ProductDetailsScreen/SelectAddressModal';

const Stack = createStackNavigator();

const Navigator = ({ updateSortType, updateFilterTypes }) => {
  const intl = useIntl();

  const onClearAllSortByPress = () => {
    updateSortType(null);
  };

  const onClearAllFilterByPress = () => {
    updateFilterTypes({});
  };

  return (
    <Stack.Navigator
      initialRouteName={routes.NAVIGATION_HOME_SCREEN_PATH}
      screenOptions={{ headerBackTitleVisible: false }}
      headerMode="float"
    >
      <Stack.Screen
        name={routes.NAVIGATION_HOME_SCREEN_PATH}
        component={HomeScreen}
        options={({ navigation }) => ({
          header: () => <ShopHeader navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={routes.NAVIGATION_HOME_PRODUCT_PATH}
        component={ProductDetailsScreen}
        options={({ navigation }) => ({
          header: () => <ShopHeader navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={routes.SHOP_CART_SCREEN}
        component={CartScreen}
        options={({ navigation }) => ({
          header: () => <ShopHeader navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={routes.SHOP_CHECKOUT_SCREEN}
        component={CheckoutScreen}
        options={({ navigation }) => ({
          header: () => <ShopHeader navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={routes.SHOP_EDIT_PRODUCT_SCREEN}
        component={EditProductScreen}
        options={({ route, navigation }) => {
          const onUpdateFinish = route?.params?.onUpdateFinish;
          return {
            title: intl.formatMessage({ id: 'shop.screenTitle.editProduct' }),
            headerLeft: () => (
              <StackBackButton
                icName={'close'}
                onPress={() => {
                  navigation.goBack();
                  onUpdateFinish?.();
                }}
              />
            ),
            ...TransitionPresets.ModalTransition,
          };
        }}
      />
      <Stack.Screen
        name={routes.SHOP_SELECT_CATEGORY_MODAL}
        component={SelectCategoryScreen}
        options={{
          title: intl.formatMessage({ id: 'shop.screenTitle.selectCategory' }),
          headerBackImage: () => <ModalBackButton />,
          ...TransitionPresets.ModalTransition,
        }}
      />
      <Stack.Screen
        name={routes.SHOP_SORT_MODAL}
        component={SortByScreen}
        options={({ navigation }) => ({
          title: intl.formatMessage({ id: 'shop.screenTitle.sortBy' }),
          headerBackImage: () => <ModalBackButton />,
          headerRight: () => (
            <ClearAllButton
              navigation={navigation}
              text={intl.formatMessage({ id: 'shop.common.clearAll' })}
              onPress={onClearAllSortByPress}
            />
          ),
          ...TransitionPresets.ModalTransition,
        })}
      />
      <Stack.Screen
        name={routes.SHOP_FILTER_MODAL}
        component={FilterByScreen}
        options={({ navigation }) => ({
          title: intl.formatMessage({ id: 'shop.screenTitle.filterBy' }),
          headerBackImage: () => <ModalBackButton />,
          headerRight: () => (
            <ClearAllButton
              navigation={navigation}
              text={intl.formatMessage({ id: 'shop.common.clearAll' })}
              onPress={onClearAllFilterByPress}
            />
          ),
          ...TransitionPresets.ModalTransition,
        })}
      />

      <Stack.Screen
        name={routes.SELECT_ADDRESS_MODAL}
        component={SelectAddressModal}
        options={() => ({
          title: intl.formatMessage({ id: 'shop.product.selectionLocation' }),
          headerBackImage: () => <ModalBackButton />,
          ...TransitionPresets.ModalTransition,
        })}
      />
      <Stack.Screen
        name={routes.SHOP_REVIEW_SCREEN}
        component={ReviewScreen}
        options={({ route }) => {
          const ratingCount = route.params?.reviews?.length || 0;
          const title = intl.formatMessage(
            {
              id: 'shop.review.title',
              defaultMessage: `Review(${ratingCount})`,
            },
            { ratingCount },
          );

          return {
            title,
            headerBackImage: () => <ModalBackButton />,
            ...TransitionPresets.ModalTransition,
          };
        }}
      />
      <Stack.Screen
        name={routes.SHOP_DELIVERY_ADDRESSES_SCREEN}
        component={DeliveryAddressesScreen}
        options={({ navigation }) => ({
          header: () => <ShopHeader navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={routes.SHOP_ADD_ADDRESS_SCREEN}
        component={AddAddressScreen}
        options={{
          title: intl.formatMessage({ id: 'shop.screenTitle.addNewAddress' }),
          headerBackImage: () => <ModalBackButton />,
          ...TransitionPresets.ModalTransition,
        }}
      />
      <Stack.Screen
        name={routes.SHOP_EDIT_ADDRESS_SCREEN}
        component={EditAddressScreen}
        options={{
          title: intl.formatMessage({ id: 'shop.screenTitle.editAddress' }),
          headerBackImage: () => <ModalBackButton />,
          ...TransitionPresets.ModalTransition,
        }}
      />
      <Stack.Screen
        name={routes.ORDER_HISTORY_SCREEN}
        component={OrderHistoryScreen}
        options={({ navigation }) => ({
          header: () => <ShopHeader navigation={navigation} />,
        })}
      />
      <Stack.Screen
        component={OrderHistoryDetailScreen}
        name={routes.ORDER_HISTORY_DETAIL_SCREEN}
        options={({ navigation }) => ({
          header: () => <ShopHeader navigation={navigation} />,
        })}
      />
      <Stack.Screen
        component={TrackOrderScreen}
        name={routes.TRACK_ORDER_SCREEN}
        options={{
          title: intl.formatMessage({
            id: 'shop.orderHistory.trackOrderTitle',
          }),
          headerBackImage: () => <ModalBackButton />,
          ...TransitionPresets.ModalTransition,
        }}
      />
      <Stack.Screen
        component={WriteReviewScreen}
        name={routes.WRITE_REVIEW_SCREEN}
        options={({ navigation }) => ({
          header: () => <ShopHeader navigation={navigation} />,
        })}
      />
      <Stack.Screen
        component={ReviewSubmittedScreen}
        name={routes.REVIEW_SUBMITTED_SCREEN}
        options={({ navigation }) => ({
          header: () => <ShopHeader navigation={navigation} />,
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        component={PaymentScreen}
        name={routes.PAYMENT_SCREEN}
        options={({ navigation }) => ({
          headerLeft: () => (
            <StackBackButton
              onPress={() => {
                navigation.navigate(routes.SHOP_CART_SCREEN);
              }}
            />
          ),
          title: intl.formatMessage({
            id: 'shop.payment.title',
          }),
        })}
      />
      <Stack.Screen
        component={PaymentSuccessScreen}
        name={routes.PAYMENT_SUCCESS_SCREEN}
        options={({ navigation }) => ({
          header: () => <ShopHeader navigation={navigation} />,
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        component={PaymentFailedScreen}
        name={routes.PAYMENT_FAILED_SCREEN}
        options={({ navigation }) => ({
          header: () => <ShopHeader navigation={navigation} />,
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        component={PaymentPendingScreen}
        name={routes.PAYMENT_PENDING_SCREEN}
        options={({ navigation }) => ({
          header: () => <ShopHeader navigation={navigation} />,
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        component={LogScreen}
        name={'LogScreen'}
        options={({ navigation }) => ({
          header: () => <ShopHeader navigation={navigation} />,
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        name={routes.SHOP_SINGLE_SELECT_MODAL}
        component={SingleSelectModal}
        options={({ route }) => ({
          title: route.params?.title,
          headerBackImage: ModalBackButton,
          ...TransitionPresets.ModalTransition,
        })}
      />
    </Stack.Navigator>
  );
};

export const ShopNavigator = connect(null, {
  updateSortType,
  updateFilterTypes,
})(Navigator);
