import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { formValueSelector, reduxForm, SubmissionError } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PlainText, Box } from '@wrappers/components';
import { isIphoneX } from '@utils';
import { Button } from '@heal/src/wrappers/components';
import { useIntl, useTheme } from '@wrappers/core/hooks';
import { validateRequired } from '@wrappers/core/validations';
import { RadioButtonGroup } from '@wrappers/components/form';
import { HEAL_WALK_IN_SELECT_DOCTOR, HEAL_CONFIRM_NEXT } from '@heal/routes';
import { isEmpty } from 'ramda';
import { RadioBoxesWithForm } from '@heal/src/components';

const CheckInSelectMemberScreen = ({
  navigation,
  userId,
  membersMap,
  checkInMemberSubmitCount,
  handleSubmit,
  route,
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const [options, setOptions] = useState([]);
  const [memberId, setMemberId] = useState();
  const type = route.params.type;

  useEffect(() => {
    const result = [];
    for (let k in membersMap) {
      if (k == userId)
        result.push({
          value: intl.formatMessage({ id: 'heal.myself' }),
          key: userId.toString(),
        });
      else
        result.push({
          value: `${membersMap[k].fullName} (${membersMap[k].relationshipToEmployee})`,
          key: membersMap[k].memberId,
        });
    }
    if (result.length > 0) setOptions(result);
  }, [membersMap]);

  return (
    <Box flex={1} pt={32}>
      <Box flex={1} px={32}>
        <PlainText fontWeight="bold" color={theme.heal.colors.gray[3]}>
          {intl.formatMessage({ id: 'heal.checkin.SelectMember' })}
        </PlainText>
        <PlainText mt={16} color={theme.heal.colors.gray[4]}>
          {intl.formatMessage({ id: 'heal.checkin.NoticeConfirmation' })}
        </PlainText>
        {/* <RadioButtonGroup
          onChange={value => setMemberId(value)}
          name={'memberId'}
          submitCount={checkInMemberSubmitCount}
          options={options}
          validate={[validateRequired]}
          errorMessageKey={'heal.CheckInForm.required'}
        /> */}
        <RadioBoxesWithForm
          data={options}
          name={'memberId'}
          onChange={key => {
            setMemberId(key);
          }}
          validate={[validateRequired]}
          errorMessageKey={'heal.CheckInForm.required'}
        />
      </Box>
      <Box
        backgroundColor="white"
        position="absolute"
        bottom={0}
        width="100%"
        paddingBottom={isIphoneX() ? 44 : 0}
        borderTopWidth={1}
        borderTopColor={theme.colors.gray[10]}
        paddingHorizontal={32}
        paddingVertical={16}
      >
        <Button
          primary
          title={intl.formatMessage({ id: 'heal.next' })}
          onPress={handleSubmit(data => {
            if (memberId) {
              const member = membersMap[memberId];
              if (type === 'walkin') {
                navigation.navigate(HEAL_WALK_IN_SELECT_DOCTOR, {
                  type: type,
                  data: {
                    memberId: memberId,
                    dependentId: member.role === 'Dependent' && member.memberId,
                  },
                });
              } else {
                navigation.navigate(HEAL_CONFIRM_NEXT, {
                  type: type,
                  data: route.params.data,
                });
              }
              setMemberId(null);
            } else {
              Alert.alert(
                intl.formatMessage({
                  id: 'heal.somethingWentWrong',
                }),
                intl.formatMessage({
                  id: 'heal.CheckInForm.required',
                }),
              );
              throw new SubmissionError({
                memberId: intl.formatMessage({
                  id: 'heal.CheckInForm.required',
                }),
              });
            }
          })}
        />
      </Box>
    </Box>
  );
};

export default compose(
  connect(state => {
    return {
      membersMap: state.user.membersMap,
      userId: state.user.userId,
      checkInMemberSubmitCount: 0,
    };
  }),
  reduxForm({
    form: 'checkinForm',
    enableReinitialize: true,
  }),
)(CheckInSelectMemberScreen);
