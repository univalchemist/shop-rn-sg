import React from 'react';
import { connect } from 'react-redux';
import { Box, Text } from '@shops/wrappers/components';
import CartItem from './CartItem';

const ItemList = ({ navigation, items, title }) => {
  if (items.length === 0) return null;

  return (
    <>
      <Text mt={24}>{title}</Text>
      <Box>
        {items.map(item => (
          <CartItem
            navigate={navigation.navigate}
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            sku={item.sku}
            thumbnail={item.thumbnail}
          />
        ))}
      </Box>
    </>
  );
};

const mapStateToProps = (
  {
    shop: {
      cart: { items },
    },
  },
  { offerType },
) => {
  return {
    items: items.filter(i => i.offerType === offerType),
  };
};

export default connect(mapStateToProps)(ItemList);
