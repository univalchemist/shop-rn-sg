import React from 'react';
import { renderForTest } from '@testUtils';
import SelectAddress from '../SelectAddress';
import { RadioGroup, RadioButton } from '@shops/components';
import { flushMicrotasksQueue } from 'react-native-testing-library';
import * as hooks from '@shops/wrappers/core/hooks';

const addresses = [
  { id: 0, text: 'address1' },
  { id: 1, text: 'address2' },
];
const onSelectChange = jest.fn();

describe('SelectAddress', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should render properly', async () => {
    const Comp = renderForTest(
      <SelectAddress addresses={addresses} onSelectChange={onSelectChange} />,
    );
    await flushMicrotasksQueue();
    const radioGroup = Comp.queryByType(RadioGroup);
    expect(radioGroup).toBeTruthy();
    expect(radioGroup.props.value).toEqual(0);
    const radioButtons = Comp.queryAllByType(RadioButton);
    expect(radioButtons.length).toEqual(addresses.length);
  });

  it('should change value when get new Address ', async () => {
    const initAddress = [
      {
        id: 0,
        text: 'address1',
      },
    ];
    jest.spyOn(hooks, 'usePrevious').mockImplementation(() => initAddress);
    renderForTest(
      <SelectAddress addresses={addresses} onSelectChange={onSelectChange} />,
    );
    await flushMicrotasksQueue();
    expect(onSelectChange).toBeCalledWith(addresses[0].id);
  });
});
