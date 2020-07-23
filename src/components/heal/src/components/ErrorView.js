import React from 'react';
import { useIntl, useTheme } from '@heal/src/wrappers/core/hooks';
import { errorPanel } from '@heal/images';
import { Button, Image, StatusPanel } from '@heal/src/wrappers/components';

const ErrorView = ({
  image,
  heading,
  description,
  showButton,
  buttonTitle,
  onPress,
  style = {},
}) => {
  const intl = useIntl();
  const messageImage = image ?? errorPanel;
  const messageHeading =
    heading ?? intl.formatMessage({ id: 'errorPanel.title' });
  const messageDescription =
    description ?? intl.formatMessage({ id: 'errorPanel.message' });

  return (
    <StatusPanel
      style={style}
      image={<Image source={messageImage} />}
      heading={messageHeading}
      description={messageDescription}
      actions={
        showButton && (
          <Button
            primary
            title={
              buttonTitle ??
              intl.formatMessage({
                id: 'goBack',
              })
            }
            onPress={onPress}
          />
        )
      }
    />
  );
};

export default ErrorView;
