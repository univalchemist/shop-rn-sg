/* istanbul ignore file */
import React from 'react';
import { useTheme } from '@shops/wrappers/core/hooks';

export {
  Box,
  TouchableContainer,
  Image,
  Card,
  ImageErrorCard,
  ListItem,
  Icon,
  Flex,
  Footer,
  ScrollView,
  Divider,
  Button,
  Input,
  CustomSelectField,
  Carousel,
  TextSkeletonPlaceholder,
} from '@cxa-rn/components';

import {
  Text as TextDefault,
  SectionHeadingText as SectionHeadingTextDefault,
  PlainText as PlainTextDefault,
  SecondaryText as SecondaryTextDefault,
  StackBackButton as StackBackButtonDefault,
} from '@cxa-rn/components';
import { TouchableOpacity } from 'react-native';

export { TrackedButton, ModalBackButton } from '@wrappers/components';
export { InputField } from '@wrappers/components/FinalForm';
export { CustomMultiselectCheckBox } from '@wrappers/components/form';

export const Text = props => {
  const theme = useTheme();

  return <TextDefault {...props} color={props.color || theme.colors.text} />;
};

export const StackBackButton = ({
  onPress,
  icName = 'keyboard-arrow-left',
  ...props
}) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} {...props}>
      <StackBackButtonDefault icName={icName} />
    </TouchableOpacity>
  );
};

export const SectionHeadingText = props => {
  const theme = useTheme();

  return (
    <SectionHeadingTextDefault
      {...props}
      color={props.color || theme.colors.text}
    />
  );
};

export const PlainText = props => {
  const theme = useTheme();

  return (
    <PlainTextDefault {...props} color={props.color || theme.colors.text} />
  );
};

export const SecondaryText = props => {
  const theme = useTheme();

  return (
    <SecondaryTextDefault
      {...props}
      color={props.color || theme.colors.label}
    />
  );
};

export { default as TextArea } from './TextArea';
export { default as TextAreaField } from './TextAreaField';
export { default as CheckBox } from './CheckBox';
