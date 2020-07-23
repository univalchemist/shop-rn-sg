import React from 'react';
import { renderForTest } from '@testUtils';
import ConfirmModal from '../ConfirmModal';
import messages from '@shops/locales/en-HK.json';
import { fireEvent } from 'react-native-testing-library';
import {  Button } from '@shops/wrappers/components';
import { Modal } from 'react-native';

describe('ConfirmModal', () => {
  it('should render properly', () => {
    const Comp = renderForTest(<ConfirmModal visible={true} />);
    expect(Comp.queryByText(messages['shop.confirm.title'])).toBeTruthy();
    expect(Comp.queryByText(messages['shop.confirm.content1'])).toBeTruthy();
    expect(Comp.queryByText(messages['shop.confirm.content2'])).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.confirm.buttonCancel']),
    ).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.confirm.buttonConfirm']),
    ).toBeTruthy();
    expect(Comp.queryAllByType(Button)).toHaveLength(2);
  });

  it('should hide modal when visible false', () => {
    const Comp = renderForTest(<ConfirmModal visible={false} />);
    const modal =Comp.queryByType(Modal);
    expect(modal.props.visible).toEqual(false);
  });

  it('should buttons work properly', () => {
    const onCancel= jest.fn();
    const onConfirm= jest.fn();
    const Comp = renderForTest(<ConfirmModal visible={false} onCancel={onCancel} onConfirm={onConfirm} />);
    const buttons = Comp.queryAllByType(Button);
    fireEvent.press(buttons[0]);
    expect(onCancel).toBeCalled();
    fireEvent.press(buttons[1]);
    expect(onConfirm).toBeCalled();
  });
});
