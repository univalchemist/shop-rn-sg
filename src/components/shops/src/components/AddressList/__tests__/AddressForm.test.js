import React from 'react';
import { renderForTest } from '@testUtils';
import AddressForm, { initialForm } from '../AddressForm';
import messages from '@shops/locales/en-HK.json';
import { fireEvent } from 'react-native-testing-library';
import {
  Input,
  CustomSelectField,
} from '@shops/wrappers/components';
import { SHOP_SINGLE_SELECT_MODAL } from '@shops/navigation/routes';

const initialState = {
  shop: {
    config: {
      countryIds: ['SG'],
      countryMap: { SG: { id: 'SG', abbreviation: 'SG', name: 'Singapore' } },
    },
  },
};
const countries = initialState.shop.config.countryIds.map(id => {
  const country = initialState.shop.config.countryMap[id];
  return {
    value: country.id,
    label: country.name || country.abbreviation,
  };
});

describe('AddressForm', () => {
  it('should render properly', () => {
    const Comp = renderForTest(<AddressForm />, { initialState });
    expect(Comp.queryAllByType(Input)).toHaveLength(7);
    expect(Comp.queryByType(CustomSelectField)).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.address.firstName'] + '*'),
    ).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.address.lastName'] + '*'),
    ).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.address.addressLine1'] + '*'),
    ).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.address.addressLine2']),
    ).toBeTruthy();
    expect(Comp.queryByText(messages['shop.address.city'] + '*')).toBeTruthy();
    expect(Comp.queryByText(messages['shop.address.telephone'])+'*').toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.address.selectCountry'] + '*'),
    ).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.address.zipCode'] + '*'),
    ).toBeTruthy();
  });

  it('firstName should change text  properly', () => {
    const onChange = jest.fn();
    const Comp = renderForTest(<AddressForm onChange={onChange} />, {
      initialState,
    });
    const inputs = Comp.queryAllByType(Input);
    const addressLine1 = inputs[0];
    expect(addressLine1.props.label).toEqual(
      messages['shop.address.firstName'] + '*',
    );
    fireEvent(addressLine1, 'changeText', 'firstName');
    expect(onChange).toBeCalledWith({ ...initialForm, firstName: 'firstName' });
  });

  it('lastName should change text  properly', () => {
    const onChange = jest.fn();
    const Comp = renderForTest(<AddressForm onChange={onChange} />, {
      initialState,
    });
    const inputs = Comp.queryAllByType(Input);
    const addressLine1 = inputs[1];
    expect(addressLine1.props.label).toEqual(
      messages['shop.address.lastName'] + '*',
    );
    fireEvent(addressLine1, 'changeText', 'lastName');
    expect(onChange).toBeCalledWith({ ...initialForm, lastName: 'lastName' });
  });

  it('addressLine1 should change text  properly', () => {
    const onChange = jest.fn();
    const Comp = renderForTest(<AddressForm onChange={onChange} />, {
      initialState,
    });
    const inputs = Comp.queryAllByType(Input);
    const addressLine1 = inputs[2];
    expect(addressLine1.props.label).toEqual(
      messages['shop.address.addressLine1'] + '*',
    );
    fireEvent(addressLine1, 'changeText', 'address1');
    expect(onChange).toBeCalledWith({ ...initialForm, address1: 'address1' });
  });

  it('addressLine2 should change text  properly', () => {
    const onChange = jest.fn();
    const Comp = renderForTest(<AddressForm onChange={onChange} />, {
      initialState,
    });
    const inputs = Comp.queryAllByType(Input);
    const addressLine1 = inputs[3];
    expect(addressLine1.props.label).toEqual(
      messages['shop.address.addressLine2'],
    );
    fireEvent(addressLine1, 'changeText', 'address2');
    expect(onChange).toBeCalledWith({ ...initialForm, address2: 'address2' });
  });

  it('city should change text  properly', () => {
    const onChange = jest.fn();
    const Comp = renderForTest(<AddressForm onChange={onChange} />, {
      initialState,
    });
    const inputs = Comp.queryAllByType(Input);
    const addressLine1 = inputs[4];
    expect(addressLine1.props.label).toEqual(
      messages['shop.address.city'] + '*',
    );
    fireEvent(addressLine1, 'changeText', 'city');
    expect(onChange).toBeCalledWith({ ...initialForm, city: 'city' });
  });

  it('province should change text  properly', () => {
    const onChange = jest.fn();
    const Comp = renderForTest(<AddressForm onChange={onChange} />, {
      initialState,
    });
    const inputs = Comp.queryAllByType(Input);
    const addressLine1 = inputs[5];
    expect(addressLine1.props.label).toEqual(messages['shop.address.zipCode']+'*');
    fireEvent(addressLine1, 'changeText', 'zipCode');
    expect(onChange).toBeCalledWith({ ...initialForm, zipCode: 'zipCode' });
  });

  it('zipCode should change text  properly', () => {
    const onChange = jest.fn();
    const Comp = renderForTest(<AddressForm onChange={onChange} />, {
      initialState,
    });
    const inputs = Comp.queryAllByType(Input);
    const addressLine1 = inputs[6];
    expect(addressLine1.props.label).toEqual(
      messages['shop.address.telephone'] + '*',
    );
    fireEvent(addressLine1, 'changeText', 'telephone');
    expect(onChange).toBeCalledWith({ ...initialForm, telephone: 'telephone' });
  });

  it('CustomSelectField should change properly', () => {
    const onChange = jest.fn();
    const navigation = {
      navigate: jest.fn(),
    };
    const Comp = renderForTest(
      <AddressForm onChange={onChange} navigation={navigation} />,
      {
        initialState,
      },
    );
    const selectField = Comp.queryByType(CustomSelectField);
    fireEvent.press(selectField);
    expect(navigation.navigate).toBeCalledWith(SHOP_SINGLE_SELECT_MODAL, {
      fieldKey: 'countryId',
      data: countries,
      initialSelected: undefined,
      onChange: expect.any(Function),
      title: messages['shop.address.selectCountry'],
    });
  });

  it('CustomSelectField should show country name when country selected', () => {
    const onChange = jest.fn();
    const navigation = {
      navigate: jest.fn(),
    };
    const Comp = renderForTest(
      <AddressForm
        onChange={onChange}
        navigation={navigation}
        initialValue={{ ...initialForm, countryId: 'SG' }}
      />,
      {
        initialState,
      },
    );
    const selectField = Comp.queryByType(CustomSelectField);
    expect(selectField.props.input).toEqual({
      value: initialState.shop.config.countryMap['SG'].name,
    });
  });

  it('CustomSelectField should show country abbreviation when country selected', () => {
    const initialState = {
      shop: {
        config: {
          countryIds: ['SG'],
          countryMap: { SG: { id: 'SG', abbreviation: 'SG' } },
        },
      },
    };
    const onChange = jest.fn();
    const navigation = {
      navigate: jest.fn(),
    };
    const Comp = renderForTest(
      <AddressForm onChange={onChange} navigation={navigation} />,
      {
        initialState,
      },
    );
    const selectField = Comp.queryByType(CustomSelectField);
    fireEvent.press(selectField);
    expect(navigation.navigate).toBeCalledWith(SHOP_SINGLE_SELECT_MODAL, {
      fieldKey: 'countryId',
      data: [{value:'SG',label:'SG'}],
      initialSelected: undefined,
      onChange: expect.any(Function),
      title: messages['shop.address.selectCountry'],
    });
  });
});
