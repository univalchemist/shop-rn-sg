import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Alert } from 'react-native';
import {
  Box,
  Text,
  SecondaryText,
  Image,
  Flex,
} from '@shops/wrappers/components';
import { icEdit, icDelete } from '@shops/assets/icons';
import { SHOP_EDIT_PRODUCT_SCREEN } from '@shops/navigation/routes';
import { useGetFormattedPrice, useIntl } from '@shops/wrappers/core/hooks';
import { removeItemFromCart, getCartTotals } from '@shops/store/actions';
import { ImageProduct } from '@shops/components';
import Spinner from '@shops/components/Spinner';

export const CartItem = ({
  thumbnail,
  quantity,
  name,
  price,
  navigate,
  sku,
  removeItemFromCart,
  getCartTotals,
}) => {
  const intl = useIntl();
  const priceFmt = useGetFormattedPrice(price,null,true);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const onPressEdit = () => {
    setIsUpdating(true);
    navigate?.(SHOP_EDIT_PRODUCT_SCREEN, {
      productSku: sku,
      onUpdateFinish: () => setIsUpdating(false),
    });
  };

  const onRemoveItem = () => {
    Alert.alert(
      intl.formatMessage({ id: 'shop.cartItem.removeItemDialogTitle' }),
      intl.formatMessage(
        {
          id: 'shop.cartItem.removeItemDialogMessage',
        },
        { name },
      ),
      [
        {
          text: intl.formatMessage({ id: 'shop.common.cancel' }),
          style: 'cancel',
        },
        {
          text: intl.formatMessage({ id: 'shop.common.ok' }),
          onPress: performRemoveItem,
        },
      ],
      { cancelable: true },
    );
  };

  const performRemoveItem = async () => {
    try {
      setIsRemoving(true);
      await removeItemFromCart(sku);
      getCartTotals();
    } catch (e) {
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Flex flexDirection="row" mt={24}>
      <Box flex={1}>
        <ImageProduct
          imageModel={thumbnail}
          width={75}
          height={75}
          resizeMode="contain"
        />
      </Box>
      <Box flex={2} ml={16}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontWeight={600}>{priceFmt}</Text>
        <SecondaryText mt={8} size={12}>
          {`${intl.formatMessage({ id: 'shop.common.quantity' })}: ${quantity}`}
        </SecondaryText>
      </Box>
      <Box flex={0.5} alignItems="flex-end" mt={8}>
        <TouchableOpacity disabled={isRemoving} onPress={onPressEdit}>
          {isUpdating ? <Spinner size={'small'} /> : <Image source={icEdit} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemoveItem}>
          <Box mt={16}>
            {isRemoving ? (
              <Spinner size={'small'} />
            ) : (
              <Image source={icDelete} />
            )}
          </Box>
        </TouchableOpacity>
      </Box>
    </Flex>
  );
};

export default connect(null, {
  removeItemFromCart,
  getCartTotals,
})(CartItem);
