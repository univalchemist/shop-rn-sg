import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-spinkit';

import { useIntl, useTheme } from '@heal/src/wrappers/core/hooks';
import {
  Box,
  PlainText,
  TrackedCarousel,
  Text,
  SectionHeadingText,
  Divider,
} from '@heal/src/wrappers/components';
import {
  DoctorCard,
  RadioBoxes,
  ErrorView,
  StackBackButton as BackButton,
} from '@heal/src/components';
import { takeQueueRemoteTicket, getVisits } from '@heal/src/store/actions';

import theme from '@theme';
import {} from '@heal/images';
import {
  HEAL_CLINIC_DETAILS,
  HEAL_REMOTE_TICKET_BOOKING_RESULT,
} from '@heal/routes';
import { isEmpty } from 'ramda';

const viewportWidth = Dimensions.get('window').width;
const distanceBetweenCard = 16;
const DOCTOR_CARD_WIDTH = 190;
const DOCTOR_CARD_HEIGHT = 314;
const DOCTOR_CARD_WIDTH_WITH_MARGIN = DOCTOR_CARD_WIDTH + distanceBetweenCard;

const styles = StyleSheet.create({
  slideStyle: {
    marginTop: 25,
    left: -102,
    minHeight: DOCTOR_CARD_HEIGHT,
  },
  scrollViewContainer: {
    paddingHorizontal: 32,
    paddingVertical: 32,
    backgroundColor: theme.heal.colors.gray[5],
  },
  queueButton: {
    height: 48,
    marginVertical: 16,
    marginHorizontal: 32,
  },
  activeButton: {
    opacity: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  spinner: {
    position: 'absolute',
    backgroundColor: theme.heal.colors.gray[5],
    width: '100%',
    height: '100%',
  },
});

const CircleSpinner = ({}) => {
  return (
    <Box style={styles.spinner} justifyContent="center" alignItems="center">
      <Spinner
        isVisible={true}
        color={theme.heal.colors.crimson}
        size={36}
        type={'Arc'}
      />
    </Box>
  );
};

const TicketBooking = ({
  route,
  navigation,
  visitList,
  detailsClinic,
  membersMap,
  takeQueueRemoteTicket,
  getVisits,
}) => {
  const theme = useTheme();
  const intl = useIntl();

  const { doctorIndex } = route.params;
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(doctorIndex);
  const [members, setMembers] = useState([]);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(-1);
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    prepareMemberData();
  }, [visitList]);

  useEffect(() => {
    const getVisitsFunc = async () => {
      let userIds = [];
      for (let key in membersMap) {
        const member = membersMap[key];
        if (member.role === 'Employee') {
          userIds.push(member.memberId);
        }
      }
      await getVisits({ userIds });
    };
    getVisitsFunc();
  }, []);

  const prepareMemberData = useCallback(() => {
    let data = [];
    const array = [];

    for (let key in membersMap) {
      const member = membersMap[key];
      array.push(member);
    }

    for (let i = 0; i < array.length; i += 1) {
      const member = array[i];
      const existedTickets =
        !isEmpty(visitList) &&
        visitList.filter(item => {
          return (
            item.memberId === parseInt(member.memberId, 0) &&
            item.status !== 'Completed' &&
            item.clinicProviderId === detailsClinic.clinicProviderId &&
            item.clinicId === detailsClinic.id &&
            item.type === 'RemoteTicket'
          );
        });

      const isExisted = existedTickets && existedTickets.length > 0;

      data.push({
        key: member.memberId,
        value: `${member.fullName} (${member.relationshipToEmployee})`,
        disable: isExisted,
        disableMessage: intl.formatMessage({
          id: 'heal.ticketBooking.patientDisableMessage',
        }),
        forceSelected: isExisted,
        isDependent: member.role === 'Dependent',
      });
    }

    setMembers(data);
  }, [visitList]);

  if (isLoading) {
    return <CircleSpinner />;
  }

  if (showError) {
    return (
      <Box flex={1}>
        <ErrorView
          showButton
          buttonTitle="Try again"
          onPress={() => {
            setShowError(false);
          }}
        />
      </Box>
    );
  }

  return (
    <Box flex={1} as={SafeAreaView} bg={theme.colors.white}>
      <Box
        py={3}
        flexDirection="row"
        alignItems="center"
        bg={theme.colors.white}
      >
        <BackButton onPress={() => navigation.navigate(HEAL_CLINIC_DETAILS)} />
        <Box alignItems={'center'} flex={0.85}>
          <Text
            fontWeight={'600'}
            fontSize={18}
            lineHeight={24}
            color={theme.colors.gray[0]}
            letterSpacing={-0.5}
          >
            {'Queue'}
          </Text>
        </Box>
      </Box>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <SectionHeadingText>
          {intl.formatMessage({ id: 'heal.ticketBooking.getQueueTitle' })}
        </SectionHeadingText>
        <Text mt={32} color={theme.colors.gray[0]}>
          {detailsClinic.name}
        </Text>
        <SectionHeadingText mt={56} mb={14}>
          {intl.formatMessage({ id: 'heal.ticketBooking.patientTitle' })}
        </SectionHeadingText>
        <RadioBoxes
          data={members}
          onValueChange={({ key, index }) => {
            setCurrentMemberIndex(index);
          }}
        />
        <Divider full mt={22} mb={24} />
        <Text
          fontSize={14}
          lineHeight={20}
          letterSpacing={0.25}
          color={theme.colors.gray[0]}
        >
          {intl.formatMessage({ id: 'heal.ticketBooking.noteMessage' })}
        </Text>
        <SectionHeadingText mt={56}>
          {intl.formatMessage({
            id: 'heal.ticketBooking.estimationTime',
          })}
        </SectionHeadingText>
        <Text
          fontSize={32}
          fontWeight="300"
          lineHeight={37}
          letterSpacing={-1.5}
          mt={16}
          color={theme.colors.gray[8]}
        >
          {detailsClinic.doctors[
            currentDoctorIndex
          ].estimatedConsultationTime.toUpperCase()}
        </Text>
        <SectionHeadingText mt={24}>
          {intl.formatMessage({ id: 'heal.ticketBooking.selectDoctor' })}
        </SectionHeadingText>
        <TrackedCarousel
          useScrollView
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          data={detailsClinic.doctors}
          sliderWidth={viewportWidth}
          itemWidth={DOCTOR_CARD_WIDTH_WITH_MARGIN}
          slideStyle={styles.slideStyle}
          containerCustomStyle={styles.containerCustomStyle}
          renderItem={({ item, index }) => {
            return (
              <DoctorCard
                doctor={item}
                showIcon
                width={DOCTOR_CARD_WIDTH}
                height={DOCTOR_CARD_HEIGHT}
                selected={currentDoctorIndex === index}
                onPress={() => {
                  setCurrentDoctorIndex(index);
                }}
              />
            );
          }}
        />
        <Divider full mt={34} mb={24} />
        <Text
          fontSize={14}
          lineHeight={20}
          letterSpacing={0.25}
          color={theme.colors.gray[0]}
        >
          {intl.formatMessage({ id: 'heal.ticketBooking.noteMessage2' })}
        </Text>
      </ScrollView>
      <TouchableOpacity
        testID={'bookingButton'}
        disabled={!(currentDoctorIndex >= 0 && currentMemberIndex >= 0)}
        style={
          currentDoctorIndex >= 0 && currentMemberIndex >= 0
            ? styles.activeButton
            : styles.disabledButton
        }
        onPress={async () => {
          try {
            setLoading(true);
            const { value } = await takeQueueRemoteTicket({
              clinicProviderId: detailsClinic.clinicProviderId,
              clinicId: detailsClinic.id,
              doctorId: detailsClinic.doctors[currentDoctorIndex].id,
              dependentId:
                members[currentMemberIndex].isDependent &&
                members[currentMemberIndex].key,
            });
            setLoading(false);

            if (value && value.id && value.token) {
              navigation.navigate(HEAL_REMOTE_TICKET_BOOKING_RESULT, {
                doctorIndex,
              });
            } else {
              setShowError(true);
            }
          } catch (error) {
            setShowError(true);
          }
        }}
      >
        <Divider full />
        <Box
          style={styles.queueButton}
          backgroundColor={theme.colors.red}
          alignItems="center"
          justifyContent="center"
        >
          <PlainText color={theme.colors.white}>
            {intl.formatMessage({ id: 'heal.clinic.queueButton' })}
          </PlainText>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

const mapStateToProps = ({
  heal: {
    detailsClinic,
    remoteTicket: { visitList },
  },
  user: { membersMap },
}) => ({ detailsClinic, membersMap, visitList });

export default connect(mapStateToProps, {
  takeQueueRemoteTicket,
  getVisits,
})(TicketBooking);
