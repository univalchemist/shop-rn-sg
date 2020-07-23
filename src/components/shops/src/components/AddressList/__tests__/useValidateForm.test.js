import React from 'react';
import useValidateForm, { formattedAddress } from '../useValidateForm';
import { renderHook, act } from '@testing-library/react-hooks';

jest.mock('@shops/wrappers/core/hooks', () => ({
  useIntl: jest.fn(() => ({
    formatMessage: jest.fn(() => 'Required'),
  })),
}));

describe('useValidateForm', () => {
  let result, validate;
  beforeEach(() => {
    const hook = renderHook(() => useValidateForm());
    result = hook.result;
    validate = result.current[1];
  });
  it('should have correct init state', () => {
    const errors = result.current[0];
    expect(errors).toEqual(null);
    expect(typeof validate).toBe('function');
  });

  it('should return error when validate form empty', () => {
    act(() => {
      validate({});
    });
    const errors = result.current[0];
    expect(errors).toEqual({
      firstName: 'Required',
      lastName: 'Required',
      telephone: 'Required',
      address1: 'Required',
      city: 'Required',
      countryId: 'isRequired',
      zipCode: 'Required',
    });
  });
  it('should return error when form missing 6 requires fields', () => {
    act(() => {
      validate({ firstName: 'firstName' });
    });
    const errors = result.current[0];
    expect(errors).toEqual({
      firstName: '',
      lastName: 'Required',
      address1: 'Required',
      telephone: 'Required',
      city: 'Required',
      countryId: 'isRequired',
      zipCode: 'Required',
    });
  });

  it('should return error when form missing 5 requires fields', () => {
    act(() => {
      validate({ firstName: 'firstName', lastName: 'lastName' });
    });
    const errors = result.current[0];
    expect(errors).toEqual({
      firstName: '',
      lastName: '',
      address1: 'Required',
      telephone: 'Required',
      city: 'Required',
      countryId: 'isRequired',
      zipCode: 'Required',
    });
  });

  it('should return error when form missing 4 requires fields', () => {
    act(() => {
      validate({
        firstName: 'firstName',
        lastName: 'lastName',
        address1: 'Address',
      });
    });
    const errors = result.current[0];
    expect(errors).toEqual({
      firstName: '',
      lastName: '',
      address1: '',
      telephone: 'Required',
      city: 'Required',
      countryId: 'isRequired',
      zipCode: 'Required',
    });
  });

  it('should return error when form missing 3 requires fields', () => {
    act(() => {
      validate({
        firstName: 'firstName',
        lastName: 'lastName',
        address1: 'Address',
        city: 'city',
      });
    });
    const errors = result.current[0];
    expect(errors).toEqual({
      firstName: '',
      lastName: '',
      address1: '',
      telephone: 'Required',
      city: '',
      countryId: 'isRequired',
      zipCode: 'Required',
    });
  });

  it('should return error when form missing 2 requires fields', () => {
    act(() => {
      validate({
        firstName: 'firstName',
        lastName: 'lastName',
        address1: 'Address',
        city: 'city',
        countryId: 'SG',
      });
    });
    const errors = result.current[0];
    expect(errors).toEqual({
      firstName: '',
      lastName: '',
      address1: '',
      telephone: 'Required',
      city: '',
      zipCode: 'Required',
    });
  });

  it('should return error when form missing any 1 requires fields', () => {
    const { result } = renderHook(() => useValidateForm());
    const validate = result.current[1];
    act(() => {
      validate({
        firstName: 'firstName',
        lastName: 'lastName',
        address1: 'Address',
        city: 'city',
        zipCode: 'zipCode',
        countryId: 'SG',
      });
    });
    const errors = result.current[0];
    expect(errors).toEqual({
      firstName: '',
      lastName: '',
      address1: '',
      telephone: 'Required',
      city: '',
      zipCode: '',
    });
  });


  it('should return clean validate when form have all requires fields', () => {
    const { result } = renderHook(() => useValidateForm());
    const validate = result.current[1];
    act(() => {
      validate({
        firstName: 'firstName',
        lastName: 'lastName',
        address1: 'Address',
        city: 'city',
        zipCode: 'zipCode',
        countryId: 'SG',
        telephone:'telephone'
      });
    });
    const errors = result.current[0];
    expect(errors).toEqual(null);
  });
});

describe('formattedAddress', () => {
  it('should works properly when have all info', () => {
    const form = {
      firstName: 'firstName',
      lastName: 'lastName',
      telephone:'telephone',
      address1: 'address1',
      address2: 'address2',
      province: 'province',
      city: 'city',
      zipCode: 'zipCode',
      countryId: 'countryId',
    };
    const isDefaultShipping = true;
    const formatAddress = formattedAddress({ form, isDefaultShipping });
    expect(formatAddress).toEqual({
      firstName: 'firstName',
      lastName: 'lastName',
      telephone:'telephone',
      city: 'city',
      countryId: 'countryId',
      isDefaultShipping: true,
      postCode: 'zipCode',
      region: {
        code: 'province',
        id: 0,
        region: 'province',
      },
      regionId: 0,
      street: ['address1', 'address2'],
    });
  });

  it('should works properly when have requires info', () => {
    const form = {
      address1: 'address1',
      city: 'city',
      zipCode: 'zipCode',
      countryId: 'countryId',
    };
    const isDefaultShipping = false;
    const formatAddress = formattedAddress({ form, isDefaultShipping });
    expect(formatAddress).toEqual({
      city: 'city',
      countryId: 'countryId',
      postCode: 'zipCode',
      region: {
        id: 0,
      },
      regionId: 0,
      street: ['address1'],
    });
  });
});
