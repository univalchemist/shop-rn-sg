import React from 'react';
import { useIntl } from '@shops/wrappers/core/hooks';
import CartAddresses from './CartAddresses';
import { buildAddress } from '@shops/helper/address';
import { connect } from 'react-redux';
import { getDeliveryAddressesSelector } from '@shops/store/selectors';

const BillingAddresses = ({
  addresses,
  onChange,
  onFormChange,
  navigation,
  errors,
  onCheckboxChange,
}) => {
  const intl = useIntl();

  // TODO: connect billing address reducer

  const onAddressChange = id => {
    onChange && onChange(id);
  };

  return (
    <CartAddresses
      addresses={addresses}
      title={intl.formatMessage({ id: 'shop.address.billing' })}
      saveAddressLabel={intl.formatMessage({
        id: 'shop.address.saveBilling',
      })}
      onChange={onAddressChange}
      onFormChange={onFormChange}
      navigation={navigation}
      errors={errors}
      onCheckboxChange={onCheckboxChange}
    />
  );
};

const mapStateToProps = ({ shop, intl }) => {
  const deliveryAddress = getDeliveryAddressesSelector(shop);
  const addresses = [
    {
      id: -1,
      text: intl.messages['shop.address.sameAsDelivery'],
    },
  ];
  addresses.push(
    ...deliveryAddress.map(address => ({
      id: address.id,
      text: buildAddress(address),
    })),
  );
  addresses.push({
    id: 0,
    text: intl.messages['shop.address.newBilling'],
  });
  return { addresses };
};

export default connect(mapStateToProps)(BillingAddresses);
