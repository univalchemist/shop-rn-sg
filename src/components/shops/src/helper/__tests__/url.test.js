import { buildProductsUrl } from '../url';

describe('url', () => {
  it('should work properly', () => {
    const url = 'localhost';
    const params = {
      key1: ['value11', 'value12'],
      key2: 'value2',
    };
    const expected = 'localhost?key1=value11&key1=value12&key2=value2';
    const res = buildProductsUrl(url, params);
    expect(res).toEqual(expected);
  });

  it('should behave normally when pass no params', () => {
    const url = 'localhost';
    const expected = 'localhost';
    const res = buildProductsUrl(url);
    expect(res).toEqual(expected);
  });
});
