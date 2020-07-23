import React, { useCallback, useState } from 'react';
import {
  Box,
  PlainText as Text,
  Image,
  ScrollView,
} from '@wrappers/components';
import { connect } from 'react-redux';
import { useIntl, useTheme } from '@wrappers/core/hooks';
import { detailAppointment, location } from '@heal/images';
import styled from 'styled-components/native';
import moment from 'moment';
import { isIphoneX } from '@utils';
import { Button } from '@heal/src/wrappers/components';

const Card = styled(Box)`
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05px;
  shadow-color: #000;
  border-radius: 4px;
`;

const ConfirmCheckInScreen = ({ route, navigation, specialitiesByCode }) => {
  const ticket = route?.params?.ticket;
  const theme = useTheme();
  const intl = useIntl();

  return (
    <Box flex={1} backgroundColor={theme.heal.colors.backgroundColor}>
      <Box flex={1}>
        <ScrollView>
          <Box px={32} pt={80} mb={80} flex={1}>
            <Text fontSize={32} lineHeight={32} textAlign="center">
              {intl.formatMessage({
                id: 'heal.confirmation.checkedIn',
              })}
            </Text>
            <Card
              mt={48}
              backgroundColor={theme.heal.colors.white}
              px={24}
              py={44}
            >
              <Box mb={24} alignItems={'center'}>
                <Text fontWeight={'bold'} color={theme.heal.colors.black}>
                  {intl.formatMessage({
                    id: 'heal.CheckIn.estConsultationTime',
                  })}
                </Text>
                <Text fontSize={32} lineHeight={32} mt={16}>
                  {moment(ticket?.estimatedConsultationTime).format('h:mm A')}
                </Text>
                <Text>
                  {moment(ticket?.estimatedConsultationTime).format(
                    'DD MMM YYYY',
                  )}
                </Text>
              </Box>

              <Box flexDirection={'row'} alignItems={'center'}>
                <Image source={detailAppointment} />
                <Box ml={16}>
                  <Text>{ticket?.doctor.name}</Text>
                  <Text>
                    {specialitiesByCode[ticket?.doctor.specialityCode].name}
                  </Text>
                </Box>
              </Box>
              <Box flexDirection={'row'} mt={16}>
                <Image source={location} />
                <Text ml={16}>{ticket?.clinic.address}</Text>
              </Box>
            </Card>
          </Box>
        </ScrollView>
        <Box
          backgroundColor={theme.colors.white}
          position="absolute"
          bottom={0}
          width="100%"
          paddingBottom={isIphoneX() ? 44 : 16}
          paddingHorizontal={32}
          paddingVertical={16}
        >
          <Button
            outline
            title={intl.formatMessage({
              id: 'heal.backToHomepage',
            })}
            onPress={() => navigation.popToTop()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default connect(state => ({
  specialitiesByCode: state.heal.specialitiesByCode,
}))(ConfirmCheckInScreen);
