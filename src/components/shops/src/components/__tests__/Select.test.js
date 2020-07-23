import React from 'react';
import { renderForTest } from '@testUtils';
import Select from '../Select';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@shops/wrappers/components';


describe('Select', () => {
  it('should render properly', () => {
    const Comp = renderForTest(<Select />);
    expect(Comp.queryByType(TouchableOpacity)).toBeTruthy();
    const icon = Comp.queryByType(Icon);
    expect(icon.props.name).toEqual('expand-more');
  });

  it('should disable select properly', () => {
    const Comp = renderForTest(<Select disabled={true} />);
    const touchable =Comp.queryByType(TouchableOpacity);
    expect(touchable.props.disabled).toEqual(true);

  });
});
