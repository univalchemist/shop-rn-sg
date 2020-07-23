import React from 'react';
import { renderForTest } from '@testUtils';

import FastImage, { BaseImage } from '../index';

describe('FastImage', () => {
  it('should render properly', () => {
    const Comp = renderForTest(<FastImage source={'source'} />);
    const imagePure = Comp.queryByType(BaseImage);
    expect(imagePure.props.source).toEqual('source');
  });

  it('should render properly with image have secure', () => {
    const Comp = renderForTest(<FastImage secure authToken={'authToken'} />);
    const imagePure = Comp.queryByType(BaseImage);
    expect(imagePure.props.source).toEqual({
      headers: { Authorization: 'Bearer authToken' },
    });
  });
});
