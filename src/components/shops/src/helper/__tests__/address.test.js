import { buildAddress } from '@shops/helper/address';

describe('address', () => {
  it('should return empty when dont pass params', () => {
    expect(buildAddress()).toEqual('');
  });
  it('should render properly', () => {
    const addressObject = {
      street: ['street'],
      region: 'region',
      city: 'city',
      countryId: 'countryId',
      postCode: 'postCode',
    };
    const addressOneLineExpected = 'street, city, countryId, postCode';
    expect(buildAddress(addressObject)).toEqual(addressOneLineExpected);
  });

  it('should render properly when props empty', () => {
    const addressObject = {};
    const addressOneLineExpected = '';
    expect(buildAddress(addressObject)).toEqual(addressOneLineExpected);
  });
});
