import React from 'react';
import { useIntl } from '@shops/wrappers/core/hooks';
import CartAddresses from './CartAddresses';
import { connect } from 'react-redux';
import { buildAddress } from '@shops/helper/address';
import { getDeliveryAddressesSelector } from '@shops/store/selectors';

const ShippingAddresses = ({
  onChange,
  onFormChange,
  addresses,
  navigation,
  errors,
  onCheckboxChange,
}) => {
  const intl = useIntl();

  const onAddressChange = id => {
    onChange && onChange(id);
  };

  return (
    <CartAddresses
      errors={errors}
      addresses={addresses}
      title={intl.formatMessage({ id: 'shop.address.delivery' })}
      saveAddressLabel={intl.formatMessage({
        id: 'shop.address.saveDelivery',
      })}
      onChange={onAddressChange}
      onFormChange={onFormChange}
      onCheckboxChange={onCheckboxChange}
      navigation={navigation}
    />
  );
};

const mapStateToProps = ({ shop, intl }) => {
  const deliveryAddress = getDeliveryAddressesSelector(shop);
  const addresses = deliveryAddress.map(address => ({
    id: address.id,
    text: buildAddress(address),
  }));
  addresses.push({
    id: 0,
    text: intl.messages['shop.address.newDelivery'],
  });
  return { addresses };
};

export default connect(mapStateToProps)(React.memo(ShippingAddresses));
