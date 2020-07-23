import { renderForTest } from '@testUtils';
import { TouchableContainer } from '@cxa-rn/components';
import ImageSlider from '../ImageSlider';
import React from 'react';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
const images = [
  { file: 'image1', id: '1' },
  { file: 'image2', id: '2' },
];
import FastImage from '@shops/components/FastImage';
describe('ImageSlider', () => {
  it('should render properly', async () => {
    const imageSlider = renderForTest(<ImageSlider images={images} />);
    const buttons = imageSlider.getAllByType(TouchableContainer);
    fireEvent.press(buttons[1]);
    await flushMicrotasksQueue();
    const image = imageSlider.queryAllByType(FastImage);
    expect(image[0].props.source.uri).toEqual(images[1].file);
    fireEvent.press(buttons[0]);
    await flushMicrotasksQueue();
    expect(image[0].props.source.uri).toEqual(images[0].file);
  });

  it('should render null when no image', async () => {
    const imageSlider = renderForTest(<ImageSlider />);


    expect(imageSlider.queryByType(FastImage)).toBeNull();
  });
});
