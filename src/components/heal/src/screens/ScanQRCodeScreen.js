import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { PlainText, Box, StackBackButton } from '@wrappers/components';
import { RNCamera } from 'react-native-camera';
import { Svg, Defs, Rect, Mask } from 'react-native-svg';
import styled from 'styled-components/native';
import {
  HEAL_CONFIRM_NEXT,
  HEAL_CHECK_IN_SELECT_MEMBER,
  HEAL_WALK_IN_SELECT_DOCTOR,
} from '@heal/routes';
import { connect } from 'react-redux';
import {
  scanQRCode,
  getMedicalProfile,
  getRemoteTickets,
  getAppointmentList,
} from '@heal/src/store/actions';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import Spinner from 'react-native-spinkit';
import { useTheme, useIntl } from '@wrappers/core/hooks';
import { localizeServerError } from '@utils';
import { useIsFocused } from '@react-navigation/native';
import { MEMBER_ROLES } from '@heal/src/config';

const { width: ww } = Dimensions.get('window');
const SQUARE_LENGTH = 240;
const posX = (ww - SQUARE_LENGTH) / 2;
const posY = 180;
const LOADER_CONTAINER_LENGTH = 80;

const ScanQRCodeText = styled(PlainText)`
  position: absolute;
  color: white;
  text-align: center;
  z-index: 1;
  font-weight: bold;
  font-size: 16;
  width: 100%;
  top: ${posY - 40};
`;

export const BackButton = ({ disabled = false, onPress }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <StackBackButton style={{ paddingLeft: 10 }} />
  </TouchableOpacity>
);

export const WrappedSvg = ({ isFetching, theme }) => (
  <Box width="100%" height="100%">
    {isFetching && (
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        position="absolute"
        width={LOADER_CONTAINER_LENGTH}
        height={LOADER_CONTAINER_LENGTH}
        top={posY + (SQUARE_LENGTH - LOADER_CONTAINER_LENGTH) / 2}
        left={posX + (SQUARE_LENGTH - LOADER_CONTAINER_LENGTH) / 2}
        borderRadius={10}
      >
        <Box
          flex={1}
          position="absolute"
          width="100%"
          height="100%"
          backgroundColor="black"
          borderRadius={10}
          opacity={0.4}
        />
        {Platform.OS === 'ios' ? (
          <Spinner
            isVisible={true}
            color={theme.heal.colors.crimson}
            size={36}
            type={'Arc'}
          />
        ) : (
          <ActivityIndicator size="large" color={theme.heal.colors.crimson} />
        )}
      </Box>
    )}
    <ScanQRCodeText>Scan the QR code to check-in</ScanQRCodeText>
    <Svg height="100%" width="100%">
      <Defs>
        <Mask id="mask" x="0" y="0">
          <Rect height="100%" width="100%" fill="#fff" />
          <Rect
            x={posX}
            y={posY}
            rx={8}
            ry={8}
            height={SQUARE_LENGTH}
            width={SQUARE_LENGTH}
          />
        </Mask>
      </Defs>
      <Rect
        height="100%"
        width="100%"
        fill="rgba(0, 0, 0, 0.32)"
        mask="url(#mask)"
      />
      <Rect
        x={posX}
        y={posY}
        rx={8}
        ry={8}
        height="240"
        width="240"
        stroke="white"
        strokeWidth="2"
        fillOpacity={0}
      />
    </Svg>
  </Box>
);

const ScanQRCodeScreen = ({
  navigation,
  membersMap,
  change,
  scanQRCode,
  userId,
  clinicQrCode,
  appointmentList,
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const camera = useRef(null);
  const isFocused = useIsFocused();
  const [isFetching, setIsFetching] = useState(false);
  const remoteTicket = useRef(null);
  const { DEPENDENT } = MEMBER_ROLES;

  const acceptAppointmentArray = appointmentList.filter(
    item =>
      item.status === 'Accepted' &&
      item.clinic &&
      item.clinic.qrCode === clinicQrCode,
  );

  useEffect(() => {
    const fetchProfile = async () => {
      const member = membersMap[userId];
      await getMedicalProfile({
        dependentId: member.role === DEPENDENT && member.memberId,
      });
      await getAppointmentList();
      const { value } = await getRemoteTickets();
      const remoteTicketArr = value
        ? (value.remoteTickets && value.remoteTickets) || value
        : null;
      const tick = remoteTicketArr
        ? remoteTicketArr.find(
            t => t.clinic.qrCode.toLowerCase() === clinicQrCode.toLowerCase(),
          )
        : null;

      if (tick !== null) remoteTicket.current = tick;
    };
    fetchProfile();
  }, [DEPENDENT, clinicQrCode, membersMap, userId]);

  useEffect(() => {
    if (isFocused) {
      setIsFetching(false);
      navigation.setOptions({
        headerLeft: props => <BackButton {...props} />,
      });
    }
  }, [isFocused, navigation]);

  const cb = async ({ data: qrCode }) => {
    if (!isFetching) {
      const member = membersMap[userId];
      setIsFetching(true);
      try {
        navigation.setOptions({
          headerLeft: props => <BackButton {...props} disabled={true} />,
        });
        await scanQRCode(qrCode);
        const hasDependents = Object.keys(membersMap).length > 1;
        if (
          remoteTicket &&
          remoteTicket.current &&
          remoteTicket.current !== null
        ) {
          if (hasDependents)
            navigation.navigate(HEAL_CHECK_IN_SELECT_MEMBER, {
              type: 'remote',
              data: [remoteTicket.current],
            });
          else {
            change('memberId', userId);
            navigation.navigate(HEAL_CONFIRM_NEXT, {
              type: 'remote',
              data: [remoteTicket.current],
            });
          }
        } else if (acceptAppointmentArray.length > 0) {
          if (hasDependents)
            navigation.navigate(HEAL_CHECK_IN_SELECT_MEMBER, {
              type: 'appointment',
              data: acceptAppointmentArray,
            });
          else {
            change('memberId', userId);
            navigation.navigate(HEAL_CONFIRM_NEXT, {
              type: 'appointment',
              data: acceptAppointmentArray,
            });
          }
        } else {
          if (hasDependents) {
            navigation.navigate(HEAL_CHECK_IN_SELECT_MEMBER, {
              type: 'walkin',
              data: {
                memberId: member.memberId,
                dependentId: member.role === 'Dependent' && member.memberId,
              },
            });
          } else {
            change('memberId', userId);
            navigation.navigate(HEAL_WALK_IN_SELECT_DOCTOR, {
              type: 'walkin',
              data: {
                memberId: member.memberId,
                dependentId: member.role === 'Dependent' && member.memberId,
              },
            });
          }
        }
      } catch (error) {
        Alert.alert(
          intl.formatMessage({ id: 'heal.serverErrors.scanQrCode.title' }),
          intl.formatMessage({ id: 'heal.serverErrors.scanQrCode.default' }),
          [
            {
              onPress: () => {
                navigation.setOptions({
                  headerLeft: props => <BackButton {...props} />,
                });
                setIsFetching(false);
              },
            },
          ],
        );
      }
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await scanQRCode('304');
  //     const hasDependents = Object.keys(membersMap).length > 1;
  //     if (hasDependents) navigation.navigate(HEAL_CHECK_IN_SELECT_MEMBER);
  //     else {
  //       console.log(membersMap, userId, membersMap[userId]);
  //       change('memberId', userId);
  //       navigation.navigate(HEAL_CHECK_IN_FORM, { member: membersMap[userId] });
  //     }
  //   };
  //   fetchData();
  // }, [membersMap]);

  return (
    <Box flex={1}>
      <RNCamera
        ref={camera}
        onBarCodeRead={!isFetching ? cb : null}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        <WrappedSvg isFetching={isFetching} theme={theme} />
      </RNCamera>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default compose(
  connect(
    state => ({
      membersMap: state.user.membersMap,
      userId: state.user.userId,
      clinicQrCode: state.heal.clinicQrCode,
      appointmentList: state.heal.appointmentList,
    }),
    { scanQRCode },
  ),
  reduxForm({ form: 'checkinForm' }),
)(ScanQRCodeScreen);
