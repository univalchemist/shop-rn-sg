import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Box, ScrollView } from '@shops/wrappers/components';
import ProductDetails from './ProductDetails';
import { MoreDetails } from './MoreDetails';
import CustomOrder from './CustomOrder';
import { connect } from 'react-redux';
import {
  AddToCartButton,
  BackButton,
  SnackBar,
  Spinner,
} from '@shops/components';
import {
  ADD_TO_CART_FAILED,
  AddToCartSnackView,
  ADD_TO_CART_SUCCESS,
} from './AddToCartSnackView';
import { getCartTotals, getProductBySku } from '@shops/store/actions';
import { SHOP_CART_SCREEN } from '@shops/navigation/routes';
import { DELIVERY_TYPE } from '@shops/utils/constant';

const SNACK_VIEW_HIDING_TIME = 3000;

export const ProductDetailsScreen = ({
  navigation,
  product,
  route: {
    params: { productSku },
  },
  getCartTotals,
  getProductBySku,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedRedemptionPoint, setSelectedRedemptionPoint] = useState('');
  const [snackBar, setSnackBar] = useState(false);
  const [deliveryType, setDeliveryType] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product?.deliveryMethod?.includes(DELIVERY_TYPE.DELIVERY)) {
      setDeliveryType(DELIVERY_TYPE.DELIVERY);
    } else if (
      product?.deliveryMethod?.includes(DELIVERY_TYPE.SELF_COLLECTION)
    ) {
      setDeliveryType(DELIVERY_TYPE.SELF_COLLECTION);
    }
  }, [product?.deliveryMethod]);

  useEffect(() => {
    const getProduct = () => {
      getProductBySku(productSku);
    };
    getProduct();
  }, [productSku]);

  useEffect(() => {
    if (product?.redemptionPoint?.length === 1) {
      setSelectedRedemptionPoint(product.redemptionPoint[0]);
    }
  }, []);
  if (!product) return <Spinner size={'small'} />; //make better UI later
  return (
    <Box flex={1}>
      <BackButton navigation={navigation} />
      <SnackBar
        visible={snackBar}
        position="top"
        autoHidingTime={SNACK_VIEW_HIDING_TIME}
        onSnackBarHided={() => setSnackBar(false)}
      >
        <AddToCartSnackView
          onContainerPress={() => {
            navigation.navigate(SHOP_CART_SCREEN);
          }}
          type={snackBar}
          onCancelPress={() => setSnackBar(false)}
          quantity={quantity}
        />
      </SnackBar>
      <ScrollView contentContainerStyle={style.scrollView}>
        <ProductDetails product={product} />
        <CustomOrder
          quantity={quantity}
          onChangeQuantity={setQuantity}
          product={product}
          navigation={navigation}
          currentSelected={selectedRedemptionPoint}
          onSelectLocation={location => {
            setSelectedRedemptionPoint(location);
            setError(false);
          }}
          deliveryType={deliveryType}
          setDeliveryType={setDeliveryType}
          error={error}
        />
        <MoreDetails product={product} navigation={navigation} />
      </ScrollView>
      <AddToCartButton
        quantity={quantity}
        sku={product.sku}
        productType={product.type}
        offerType={product.offerType}
        redemptionPoint={selectedRedemptionPoint}
        deliveryType={deliveryType}
        error={error}
        setError={setError}
        onAddToCartSuccess={() => {
          setSnackBar(ADD_TO_CART_SUCCESS);
          getCartTotals();
        }}
        onAddToCartFailed={() => {
          setSnackBar(ADD_TO_CART_FAILED);
        }}
      />
    </Box>
  );
};

const style = StyleSheet.create({
  scrollView: {
    marginHorizontal: 32,
    marginTop: 10,
  },
});

const mapStateToProps = (
  {
    shop: {
      home: { productMap },
    },
  },
  {
    route: {
      params: { productSku },
    },
  },
) => {
  return {
    product: productMap[productSku],
  };
};

export default connect(mapStateToProps, { getCartTotals, getProductBySku })(
  ProductDetailsScreen,
);
