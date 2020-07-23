import React from 'react';
import { renderForTest } from '@testUtils';

import InformationBox from '../InformationBox';

describe('ClaimsListScreenHeader', () => {
  it('should render default information box', () => {
    const component = renderForTest(<InformationBox text="Testing" />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render processing information box', () => {
    const component = renderForTest(
      <InformationBox text="Testing" type="PROCESSING" />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render rejected information box', () => {
    const component = renderForTest(
      <InformationBox text="Testing" type="REJECTED" />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should  not render information box without text', () => {
    const component = renderForTest(<InformationBox text="" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
