import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import {
  Image,
  Box,
  SectionHeadingText,
  PlainText,
} from '@heal/src/wrappers/components';
import { useTheme, useIntl } from '@heal/src/wrappers/core/hooks';
import {
  appointmentCalendar,
  appointmentCancel,
  appointmentFinish,
  appointmentTimer,
  chevronRight,
} from '@heal/images';
import { HEAL_APPOINTMENT_DETAIL } from '../../../routes';
import { connect } from 'react-redux';
import { getAppointmentList, getRemoteTickets } from '@heal/src/store/actions';

const AppointmentListingScreen = ({ navigation, route, ...props }) => {
  const theme = useTheme();
  const intl = useIntl();
  const [refreshing, setRefreshing] = useState(false);
  const informationArray = [
    {
      image: appointmentTimer,
      title: intl.formatMessage({
        id: 'heal.appointmentListingScreen.pendingAcceptance',
      }),
      type: [
        intl.formatMessage({
          id: 'heal.appointmentListingScreen.doctorConfirmed',
        }),
        intl.formatMessage({
          id: 'heal.appointmentListingScreen.notCompleted',
        }),
      ],
      isArrow: true,
    },
    {
      image: appointmentCalendar,
      title: intl.formatMessage({ id: 'heal.appointmentListingScreen.upcoming' }),
      type: [
        intl.formatMessage({
          id: 'heal.appointmentListingScreen.accepted',
        }),
        intl.formatMessage({
          id: 'heal.appointmentListingScreen.checkedIn',
        }),
      ],
      isArrow: true,
    },
    {
      image: appointmentTimer,
      title: intl.formatMessage({
        id: 'heal.appointmentListingScreen.pendingConfirmation',
      }),
      type: intl.formatMessage({
        id: 'heal.appointmentListingScreen.requested',
      }),
      isArrow: true,
    },
    {
      image: appointmentFinish,
      title: intl.formatMessage({ id: 'heal.appointmentListingScreen.finished' }),
      type: [
        intl.formatMessage({ id: 'heal.appointmentListingScreen.finished' }),
        intl.formatMessage({ id: 'heal.appointmentListingScreen.completed' }),
      ],
    },
    {
      image: appointmentCancel,
      title: intl.formatMessage({
        id: 'heal.appointmentListingScreen.cancelledRejected',
      }),
      type: [
        intl.formatMessage({ id: 'heal.appointmentListingScreen.doctorRejected' }),
        intl.formatMessage({ id: 'heal.appointmentListingScreen.cancelled' }),
        intl.formatMessage({ id: 'heal.appointmentListingScreen.rejected' }),
      ],
    },
  ];
  let { appointmentList, remoteTickets, getRemoteTickets } = props;
  let combineAppointmentArray = [...appointmentList, ...remoteTickets];
  let sortedArray = combineAppointmentArray.slice().sort((a, b) => {
    let dateA, dateB;
    if (a.firstPreferredTime) {
      dateA = new Date(a.firstPreferredTime);
      dateB = new Date(b.firstPreferredTime);
    } else if (a.date) {
      dateA = new Date(a.date);
      dateB = new Date(b.date);
    }
    return dateA - dateB;
  });

  const group = informationArray.reduce((acc, item) => {
    if (!acc[item.title]) {
      acc[item.title] = [];
    }

    acc[item.title].push(item);

    return acc;
  }, {});

  const fetchAppointment = async () => {
    await props.getAppointmentList();
    await getRemoteTickets();
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAppointment().then(() => {
      setRefreshing(false);
    });
  };

  const cardContainer = (innerItem, i, infoData) => {
    const {
      doctor,
      firstPreferredTime,
      firstSession,
      clinic,
      date,
    } = innerItem;

    return (
      <Box key={i} pb={32}>
        {doctor && (
          <Box flexDirection={'row'}>
            <Box justifyContent={'center'} pr={16}>
              <Image source={infoData.image} />
            </Box>
            <Box width={'85%'} mr={8}>
              <PlainText color={theme.colors.gray[0]} fontWeight={500}>
                {clinic.name || ''}
              </PlainText>
              <PlainText color={theme.colors.gray[0]}>
                {intl.formatMessage({ id: 'heal.appointment.doctorPrefix' }) +
                  doctor.name || ''}
              </PlainText>
              <PlainText color={theme.colors.gray[0]}>
                {intl.formatMessage({
                  id: `heal.speciality.name.${doctor.specialityCode}`,
                })}
              </PlainText>
              {(firstPreferredTime && (
                <PlainText color={theme.colors.gray[8]}>
                  {moment(firstPreferredTime).format('DD MMM YYYY') +
                    ', ' +
                    firstSession}
                </PlainText>
              )) ||
                (date && (
                  <PlainText color={theme.colors.gray[8]}>
                    {moment(date).format('DD MMM YYYY')}
                  </PlainText>
                ))}
            </Box>
            <Box justifyContent={'center'}>
              {infoData.isArrow && (
                <Image
                  marginLeft="auto"
                  source={chevronRight}
                  style={styles.chevron}
                />
              )}
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  if (sortedArray.length === 0) {
    return (
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <PlainText color={theme.heal.colors.gray[0]}>
          {intl.formatMessage({ id: 'heal.appointmentListingScreen.noData' })}
        </PlainText>
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Box mt={24}>
          {[group].map((data, ind) => {
            return (
              <Box mt={16} key={ind} px={4}>
                {Object.keys(data).map(innerData =>
                  data[innerData].map(infoData => (
                    <Box>
                      <SectionHeadingText
                        key={ind}
                        fontSize={16}
                        lineHeight={22}
                        letterSpacing={0.3}
                        pb={32}
                      >
                        {infoData.title}
                      </SectionHeadingText>
                      {sortedArray
                        .filter(
                          app =>
                            app.clinic &&
                            app.clinic.name &&
                            app.doctor &&
                            app.doctor.name,
                        )
                        .map((item, i) =>
                          (item.status === infoData.type ||
                            infoData.type.includes(item.status)) &&
                          infoData.isArrow ? (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate(HEAL_APPOINTMENT_DETAIL, {
                                  data: { [innerData]: item },
                                });
                              }}
                            >
                              {cardContainer(item, i, infoData)}
                            </TouchableOpacity>
                          ) : (
                            (item.status === infoData.type ||
                              infoData.type.includes(item.status)) &&
                            cardContainer(item, i, infoData)
                          ),
                        )}
                    </Box>
                  )),
                )}
              </Box>
            );
          })}
        </Box>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  chevron: { color: '#666666', height: 16, width: 10 },
});

const mapStateToProps = ({ heal: { appointmentList, remoteTickets } }) => ({
  appointmentList,
  remoteTickets,
});

export default connect(mapStateToProps, {
  getAppointmentList,
  getRemoteTickets,
})(AppointmentListingScreen);
