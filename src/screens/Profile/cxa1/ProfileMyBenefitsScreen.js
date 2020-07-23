/* istanbul ignore file */

import React from 'react';
import { SectionList } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import {
  Box,
  ErrorPanel,
  FieldSkeletonPlaceholder,
  SectionListSkeletonPlaceholder,
  SectionHeadingText,
  ListItem,
  LabelValueText,
  Icon,
} from '@wrappers/components';
import { SelectField } from '@wrappers/components/form';
import { useIntl, useFetchActions } from '@wrappers/core/hooks';
import { fetchCxa1BenefitsSimplified } from '@store/benefit/actions';
import { PROFILE_PLAN_YEAR_MODAL, PROFILE_MEMBER_MODAL } from '@routes';
import { formatPlanYear } from '@utils/date';
import moment from 'moment/min/moment-with-locales';
import styled from 'styled-components/native';

const Wrapper = styled(Box)`
  height: 56px;
`;

const ProfileMyBenefitsSkeletonPlaceholder = () => (
  <Box>
    <Box pt={4} pl={4} pr={4} mb={2}>
      <FieldSkeletonPlaceholder />
    </Box>
    <SectionListSkeletonPlaceholder count={4} />
  </Box>
);

const ProfileMyBenefitsScreen = ({
  loginExternalMemberId,
  loginMemberName,
  benefit,
  change,
  fetchCxa1BenefitsSimplified,
  selectedExternalMemberId,
  selectedPlanYearId,
  navigation,
}) => {
  const { planPeriod, statementDate, benefits } = benefit;
  const intl = useIntl();
  const [isLoading, isError] = useFetchActions([fetchCxa1BenefitsSimplified]);

  if (selectedExternalMemberId === undefined) {
    change('memberName', loginMemberName);
    change('selectedExternalMemberId', loginExternalMemberId);
  }

  if (planPeriod !== null && selectedPlanYearId === undefined) {
    change('planYearName', formatPlanYear(planPeriod.name));
    change('selectedPlanYearId', planPeriod.id);
  }

  const sections = benefits
    .filter(b =>
      b.members.find(m => m.externalId.toString() === selectedExternalMemberId),
    )
    .map(b => {
      return {
        title: b.benefitName,
        data: [
          {
            label: intl.formatMessage({
              id: 'profile.myBenefits.selectedPlan',
            }),
            value: b.selectedPlan,
          },
          {
            label: intl.formatMessage({
              id: 'profile.myBenefits.guaranteedAcceptance',
            }),
            value: b.guaranteedAcceptance,
          },
          {
            label: intl.formatMessage({
              id: 'profile.myBenefits.pendingAcceptance',
            }),
            value: b.pendingAcceptance,
          },
        ],
      };
    });

  return (
    <Box bg="gray.7" flex={1}>
      {isLoading ? (
        <ProfileMyBenefitsSkeletonPlaceholder />
      ) : isError ? (
        <ErrorPanel />
      ) : (
        <>
          {selectedExternalMemberId && selectedPlanYearId ? (
            <Box>
              <SectionList
                ListHeaderComponent={
                  <>
                    <Box px={4} pt={4}>
                      <SelectField
                        name="planYearName"
                        label={intl.formatMessage({
                          id: 'profile.myBenefits.select.planYear',
                        })}
                        onPress={() =>
                          navigation.navigate(PROFILE_PLAN_YEAR_MODAL)
                        }
                        onRight={({ color }) => (
                          <Icon name="expand-more" color={color} />
                        )}
                        wrapperComponent={Wrapper}
                      />
                    </Box>
                    {statementDate && (
                      <ListItem>
                        <LabelValueText
                          label={intl.formatMessage({
                            id: 'profile.myBenefits.statementDate',
                          })}
                        >
                          {moment(statementDate).format('DD MMMM YYYY')}
                        </LabelValueText>
                      </ListItem>
                    )}
                    <Box px={4} pt={4}>
                      <SelectField
                        name="memberName"
                        label={intl.formatMessage({
                          id: 'profile.myBenefits.select.member',
                        })}
                        onPress={() =>
                          navigation.navigate(PROFILE_MEMBER_MODAL)
                        }
                        onRight={({ color }) => (
                          <Icon name="expand-more" color={color} />
                        )}
                        wrapperComponent={Wrapper}
                      />
                    </Box>
                  </>
                }
                initialNumToRender={100}
                onEndReachedThreshold={0.5}
                stickySectionHeadersEnabled
                sections={sections}
                keyExtractor={(item, index) => item.label + index}
                renderItem={({ item }) => (
                  <ListItem>
                    <LabelValueText label={item.label}>
                      {item.value}
                    </LabelValueText>
                  </ListItem>
                )}
                renderSectionHeader={({ section: { title } }) =>
                  title && (
                    <Box backgroundColor="gray.7" px={4} pt={4} pb={3}>
                      <SectionHeadingText>{title}</SectionHeadingText>
                    </Box>
                  )
                }
                ListFooterComponent={<Box pb={80} />}
              />
            </Box>
          ) : (
            <>
              <ErrorPanel />
            </>
          )}
        </>
      )}
    </Box>
  );
};

const mapStateToProps = ({
  user: { membersMap, userId },
  benefit: { cxa1Benefit },
  form: { memberForm },
}) => {
  const member = membersMap[userId];
  return {
    loginExternalMemberId: member?.externalId,
    loginMemberName: member?.fullName,
    selectedExternalMemberId: memberForm?.values?.selectedExternalMemberId,
    selectedPlanYearId: memberForm?.values?.selectedPlanYearId,
    benefit: cxa1Benefit,
  };
};

const mapDispatchToProps = {
  fetchCxa1BenefitsSimplified,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'memberForm',
    destroyOnUnmount: false,
  }),
);

export { ProfileMyBenefitsSkeletonPlaceholder };
export default enhance(ProfileMyBenefitsScreen);
