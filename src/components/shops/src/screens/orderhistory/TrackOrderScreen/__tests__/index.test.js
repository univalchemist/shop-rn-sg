import React from 'react';
import { renderForTest } from '@testUtils';
import TrackOrderScreen, {Section} from '../index';
import { GET_TRACK_ORDER } from '@shops/__mocks__/data';
import { fireEvent, flushMicrotasksQueue } from 'react-native-testing-library';
import { buildAddress } from '@shops/helper/address';
import {  Clipboard } from 'react-native';
jest.mock('react-native-simple-toast',()=>({
  show:jest.fn()
}))
import Toast from 'react-native-simple-toast';
const api = {
  getTrackOrder: jest.fn(() => Promise.resolve({ data: GET_TRACK_ORDER })),
};

describe('TrackOrderScreen', () => {
  it('should render properly', async () => {
    const Comp = renderForTest(
      <TrackOrderScreen route={{ params: { orderId: '1' } }} />,
      {
        api,
      },
    );
    await flushMicrotasksQueue();
    expect(Comp.queryByText('Tracking details')).toBeTruthy();
    expect(Comp.queryByText('Shipping details')).toBeTruthy();
    expect(Comp.queryByText('Status')).toBeTruthy();
    expect(Comp.queryByText(GET_TRACK_ORDER[0].status)).toBeTruthy();
    expect(Comp.queryByText('Delivery partner')).toBeTruthy();
    expect(
      Comp.queryByText(GET_TRACK_ORDER[0].shipments[0].deliveryPartner),
    ).toBeTruthy();
    expect(Comp.queryByText('Tracking number')).toBeTruthy();
    expect(
      Comp.queryByText(GET_TRACK_ORDER[0].shipments[0].trackingNumber),
    ).toBeTruthy();
    expect(Comp.queryByText('Provider name')).toBeTruthy();
    expect(Comp.queryByText('Receiver')).toBeTruthy();
    expect(Comp.queryByText('Thuong Hoang')).toBeTruthy();
    expect(Comp.queryByText('Delivery address')).toBeTruthy();
    expect(
      Comp.queryByText(buildAddress(GET_TRACK_ORDER[0].shipments[0].address)),
    ).toBeTruthy();
    expect(Comp.queryByText('Phone number')).toBeTruthy();
    expect(
      Comp.queryByText(GET_TRACK_ORDER[0].shipments[0].address.telephone),
    ).toBeTruthy();
  });

  it('should press phone number properly', async () => {
    jest.spyOn(Clipboard,'setString').mockReturnValue(true);
    const Comp = renderForTest(
      <TrackOrderScreen route={{ params: { orderId: '1' } }} />,
      {
        api,
      },
    );
    await flushMicrotasksQueue();
    const sections = Comp.queryAllByType(Section);
    const trackingNumberSection = sections[2];
    fireEvent.press(trackingNumberSection);
    expect(Toast.show).toBeCalledWith('Tracking number is copied to clipboard.',1)
    expect(Clipboard.setString).toBeCalledWith('HKP-1233455')
  });
});
