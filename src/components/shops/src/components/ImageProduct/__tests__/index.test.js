import React from 'react';
import { renderForTest } from '@testUtils';
import ImageProduct from '../index';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import { ImageErrorCard } from '@shops/wrappers/components';
import FastImage from '@shops/components/FastImage';

const imageModel = {
  file: 'url',
};

describe('ImageProduct', () => {
  it('should render image when have imageModel', () => {
    const Comp = renderForTest(<ImageProduct imageModel={imageModel} />);
    const image = Comp.queryByType(FastImage);
    expect(image.props.source).toEqual({ uri: imageModel.file });
  });

  it('should render image error when load error', async () => {
    const Comp = renderForTest(<ImageProduct imageModel={imageModel} />);
    const image = Comp.queryByType(FastImage);
    fireEvent(image,'onError');
    await flushMicrotasksQueue();
    expect(Comp.queryByType(ImageErrorCard)).toBeTruthy();
  });

  it('should render image error when doesnt pass image', async () => {
    const Comp = renderForTest(<ImageProduct />);
    expect(Comp.queryByType(ImageErrorCard)).toBeTruthy();
  });
});
