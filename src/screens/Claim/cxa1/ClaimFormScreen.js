/* istanbul ignore file */

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Datepicker,
  ScrollView,
  StepProgressBar,
  Text,
  Icon,
} from '@wrappers/components';
import {
  CheckBoxField,
  InputField,
  SelectField,
} from '@wrappers/components/form';
import { normalizeAmount } from '@wrappers/core/normalizers';
import {
  validateConsultationDate,
  validateClaimType,
  validateClaimReason,
  validateDiagnosisText,
  hasValue,
  validateRequired,
} from '@wrappers/core/validations';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components/native';
import WalletBalancePanel, {
  WalletBalancePanelError,
  WalletBalanceSkeletonPlaceholder,
} from '@components/WalletBalancePanel';
import { useFetchActions, useIntl, useTheme } from '@wrappers/core/hooks';
import { fetchWallet } from '@store/wallet/actions';
import {
  getCXA1ClaimProvider,
  getCXA1ClaimReasons,
} from '@store/claim/actions';
import { CLAIM_REASON_OTHERS } from '../constants';
import { categories, logAction } from '@store/analytics/trackingActions';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import {
  CLAIM_HOSPITAL_CLINIC_MODAL,
  CLAIM_REASON_MODAL,
  CLAIM_TYPE_MODAL,
  CLAIM_UPLOAD_DOCUMENTS,
} from '@routes';

const daysAgo = days => {
  const today = new Date();
  const priorDate = new Date().setDate(today.getDate() - days);
  return new Date(priorDate);
};

const PrefixLeftText = styled(Text)`
  font-size: 16px;
  font-weight: 300;
  ${({ theme }) => `
    color: ${theme.inputField.rightText}
  `};
`;

const CXA1ClaimFormScreen = ({
  claimType,
  fetchWallet,
  getCXA1ClaimProvider,
  getCXA1ClaimReasons,
  claimReasonByClaimTypeId,
  handleSubmit,
  change,
  claimTypeId,
  claimReason,
  touch,
  terminationDate,
  navigation,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const intlMsg = (field, options) =>
    intl.formatMessage({ id: `claim.${field}` }, options);

  const { types } = claimType;
  const selectedClaimType = types.byId[claimTypeId];
  const isInsuranceClaim = selectedClaimType?.isInsuranceClaim ?? true;

  const { maxAmountPerClaim: maxReceiptAmount, referralRequired } =
    selectedClaimType || {};

  const receiptAmountHint = maxReceiptAmount
    ? intlMsg('label.hint.receiptAmount', {
        maxReceiptAmount: intl.formatNumber(maxReceiptAmount, {
          format: 'money',
        }),
      })
    : undefined;

  const maxDate = () => {
    return terminationDate &&
      new Date(terminationDate).getTime() < new Date().getTime()
      ? moment
          .utc(terminationDate)
          .local()
          .toDate()
      : new Date();
  };

  const validateMaxAmount = value => {
    if (
      typeof maxReceiptAmount === 'number' &&
      Number(value) &&
      Number(value) > maxReceiptAmount
    ) {
      const formattedAmount = intl.formatNumber(maxReceiptAmount, {
        format: 'money',
      });
      return intl.formatMessage(
        { id: 'exceedsMaximumAmount' },
        { amount: formattedAmount },
      );
    }
    return '';
  };

  const validateMoneyAmount = value => {
    if (!hasValue(value))
      return intl.formatMessage({ id: 'receiptAmountRequired' });
    else if (Number.isNaN(Number(value)))
      return intl.formatMessage({ id: 'moneyAmountInvalid' });
    else if (value > 0) return '';
    else return intl.formatMessage({ id: 'moneyAmountGreaterThanZero' });
  };

  const validateDischargeDate = value =>
    hasValue(value) ? '' : 'dischargeDateRequired';
  const validateHospitalClinic = value =>
    hasValue(value) ? '' : 'hospitalClinicRequired';

  const [isInpatientClaimType, setIsInPatientClaimType] = useState();
  useEffect(() => {
    const getProviders = async () => {
      if (claimTypeId) {
        const claimCategoryId =
          claimType.types.byId[claimTypeId].claimCategoryId;
        setIsInPatientClaimType(
          claimType.categories.byId[claimCategoryId].code === 'inpatient',
        );
        await getCXA1ClaimProvider(claimTypeId);
        await getCXA1ClaimReasons(claimTypeId);
      }
    };
    getProviders();
  }, [claimTypeId]);

  return (
    <ScrollView>
      <Container>
        <Box mt={2}>
          <Box>
            <Datepicker
              maximumDate={maxDate()}
              minimumDate={daysAgo(90)}
              onConfirm={date => {
                change('consultationDate', moment(date).toISOString());
              }}
              onCancel={() => touch('consultationDate')}
              field={({ setIsVisible }) => (
                <SelectField
                  name="consultationDate"
                  validate={validateConsultationDate}
                  format={date => date && moment(date).format('ll')}
                  label={intlMsg('label.consultationDate')}
                  hint={intlMsg('label.hint.consultationDate')}
                  onPress={() => setIsVisible(true)}
                  onRight={({ color }) => <Icon name="event" color={color} />}
                />
              )}
            />
          </Box>
          <Box>
            <SelectField
              name="claimType"
              validate={validateClaimType}
              label={intlMsg('label.claimType')}
              onPress={() => navigation.navigate(CLAIM_TYPE_MODAL)}
              onRight={({ color }) => <Icon name="expand-more" color={color} />}
            />
          </Box>
          {!isInpatientClaimType && (
            <Box>
              <InputField
                name="provider"
                validate={[validateRequired]}
                validationErrorsLocalized
                label={'Provider Name'}
                customStyles={theme.customInputStyles}
              />
            </Box>
          )}
          <Box>
            <SelectField
              name="claimReason"
              format={value => {
                return (
                  value &&
                  claimReasonByClaimTypeId[claimTypeId].byCode[value]
                    .claimReason
                );
              }}
              validate={validateClaimReason}
              disabled={!claimTypeId}
              label={intlMsg('label.claimReason')}
              onPress={() => navigation.navigate(CLAIM_REASON_MODAL)}
              onRight={({ color }) => <Icon name="expand-more" color={color} />}
            />
          </Box>
          <Box>
            <InputField
              name="receiptNo"
              validate={[validateRequired]}
              validationErrorsLocalized
              keyboardType="numeric"
              returnKeyType="done"
              normalize={normalizeAmount}
              label={intlMsg('label.receiptNumber')}
              hint={receiptAmountHint}
              customStyles={theme.customInputStyles}
            />
          </Box>
          <Box>
            <InputField
              name="receiptAmount"
              validate={[validateMoneyAmount, validateMaxAmount]}
              validationErrorsLocalized
              keyboardType="numeric"
              returnKeyType="done"
              normalize={normalizeAmount}
              leftIcon={<PrefixLeftText>HK$ </PrefixLeftText>}
              label={
                isInsuranceClaim
                  ? intlMsg('label.receiptAmount')
                  : intlMsg('label.claimAmount')
              }
              hint={receiptAmountHint}
              customStyles={theme.customInputStyles}
            />
          </Box>
          {isInpatientClaimType && (
            <>
              <Box>
                <Datepicker
                  defaultDate={maxDate()}
                  onConfirm={date => {
                    change('dischargeDate', moment(date).toISOString());
                    logAction({
                      category: categories.CLAIMS_SUBMISSION,
                      action: 'Select discharge date',
                    });
                  }}
                  onCancel={() => touch('dischargeDate')}
                  field={({ setIsVisible }) => (
                    <SelectField
                      name="dischargeDate"
                      validate={validateDischargeDate}
                      format={date => date && moment(date).format('ll')}
                      label={intlMsg('label.dischargeDate')}
                      onPress={() => setIsVisible(true)}
                      onRight={({ color }) => (
                        <Icon name="event" color={color} />
                      )}
                    />
                  )}
                />
              </Box>
              <Box>
                <SelectField
                  name="hospitalClinic"
                  validate={validateHospitalClinic}
                  label={intlMsg('label.hospital_clinic')}
                  onPress={() =>
                    navigation.navigate(CLAIM_HOSPITAL_CLINIC_MODAL)
                  }
                  onRight={({ color }) => (
                    <Icon name="expand-more" color={color} />
                  )}
                />
              </Box>
            </>
          )}
          <Box>
            <Button
              primary
              onPress={handleSubmit(() => {
                if (!referralRequired) {
                  change('referrals', []);
                }
                navigation.navigate(CLAIM_UPLOAD_DOCUMENTS);
              })}
              title={intlMsg('uploadDocuments')}
              // disabled={
              //   showWalletBallance
              //     ? isWalletLoading || availableBalance <= 0
              //     : false
              // }
            />
          </Box>
        </Box>
      </Container>
    </ScrollView>
  );
};

const mapStateToProps = ({
  claimType,
  form: { claimDetailsForm },
  wallet: { balanceMap },
  user: { membersMap },
  claim: {
    cxa1: { claimReasonByClaimTypeId },
  },
}) => {
  const {
    values: { claimTypeId, selectedPatientId = '', claimReason } = {},
  } = claimDetailsForm;
  return {
    claimReasonByClaimTypeId,
    claimType: claimType.cxa1,
    claimTypeId,
    claimReason,
    availableBalance: balanceMap[selectedPatientId],
    terminationDate: membersMap[selectedPatientId].terminationDate,
  };
};

const enhance = compose(
  connect(mapStateToProps, {
    fetchWallet,
    getCXA1ClaimProvider,
    getCXA1ClaimReasons,
  }),
  reduxForm({
    form: 'claimDetailsForm',
    destroyOnUnmount: false,
  }),
);
export default enhance(CXA1ClaimFormScreen);
