/* istanbul ignore file */

import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import {
  Box,
  TrackedButton,
  ListContainer,
  StepProgressBar,
  DocumentUploader,
} from '@wrappers/components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedNumber, injectIntl } from 'react-intl';
import { ClaimReviewListItem } from '@screens/Claim';
import {
  CLAIM_TERMS_CONDITIONS_MODAL,
  CLAIM_DOCUMENT_VIEWER_MODAL,
} from '@routes';
import moment from 'moment/min/moment-with-locales';
import { useIntl } from '@wrappers/core/hooks';
import { CLAIM_REASON_OTHERS } from '../constants';
import { categories } from '@store/analytics/trackingActions';

const mapStateToProps = ({
  form: { claimDetailsForm = { values: {} } },
  claimType: {
    cxa1: { types, reasons },
  },
  claim: {
    cxa1: { claimReasonByClaimTypeId, claimProviderByClaimTypeId },
  },
}) => {
  const claimTypeId = claimDetailsForm.values.claimTypeId;
  return {
    formData: claimDetailsForm.values,
    selectedClaimType: types.byId[claimDetailsForm.values.claimTypeId],
    selectedClaimReason:
      claimReasonByClaimTypeId[claimTypeId].byCode[
        claimDetailsForm.values.claimReason
      ],
  };
};

const enhance = compose(connect(mapStateToProps, null), injectIntl);

const Cxa1ClaimReviewScreen = ({
  formData: {
    patientName,
    contactNumber,
    claimType,
    claimReason,
    consultationDate,
    documents = [],
    settlementAdvices = [],
    prescriptions = [],
    referrals = [],
    receiptAmount: amount,
    otherInsurerAmount: amountO,
    diagnosisText = '',
    dischargeDate,
    hospitalClinic,
    provider,
  } = {},
  selectedClaimType,
  selectedClaimReason,
  navigation,
}) => {
  const intl = useIntl();
  const receiptAmount = (
    <FormattedNumber
      format="money"
      minimumFractionDigits={2}
      maximumFractionDigits={2}
      value={amount}
    />
  );

  const otherInsurerAmount = amountO ? (
    <FormattedNumber
      format="money"
      minimumFractionDigits={2}
      maximumFractionDigits={2}
      value={amountO}
    />
  ) : (
    ''
  );
  const listData = Object.entries({
    patientName,
    contactNumber,
    claimType: claimType,
    claimReason:
      selectedClaimReason.code !== CLAIM_REASON_OTHERS
        ? selectedClaimReason.claimReason
        : `${selectedClaimReason.claimReason} - ${diagnosisText}`,
    consultationDate: moment(consultationDate).format('ll'),
    receiptAmount,
    ...(selectedClaimType.isInsuranceClaim
      ? { otherInsurerAmount: otherInsurerAmount }
      : {}),
    dischargeDate: moment(dischargeDate).format('ll'),
    hospitalClinic,
  });

  const labelMap = {
    section: {
      receipts: intl.formatMessage({
        id: 'claim.section.receipts',
      }),
      settlementAdvice: intl.formatMessage({
        id: 'claim.section.settlementAdvices',
      }),
      prescriptions: intl.formatMessage({
        id: 'claim.section.prescriptions',
      }),
      referrals: intl.formatMessage({
        id: 'claim.section.referrals',
      }),
    },
    patientName: intl.formatMessage({ id: 'claim.label.patientName' }),
    contactNumber: intl.formatMessage({ id: 'claim.label.contactNumber' }),
    claimType: intl.formatMessage({
      id: 'claim.label.claimType',
    }),
    claimReason: intl.formatMessage({ id: 'claim.label.claimReason' }),
    consultationDate: intl.formatMessage({
      id: 'claim.label.consultationDate',
    }),
    receiptAmount: selectedClaimType.isInsuranceClaim
      ? intl.formatMessage({ id: 'claim.label.receiptAmount' })
      : intl.formatMessage({ id: 'claim.label.claimAmount' }),
    dischargeDate: intl.formatMessage({ id: 'claim.label.dischargeDate' }),
    hospitalClinic: intl.formatMessage({ id: 'claim.label.hospital_clinic' }),
    button: {
      submit: intl.formatMessage({
        id: 'claim.submitClaimButtonText',
      }),
    },
  };

  const viewDocument = uploadType => index => {
    let file;
    switch (uploadType) {
      case 'documents':
        file = documents[index];
        break;
      case 'referrals':
        file = referrals[index];
        break;
      case 'settlementAdvices':
        file = settlementAdvices[index];
        break;
      case 'prescriptions':
        file = prescriptions[index];
        break;
    }
    const { uri, type } = file;

    navigation.navigate(CLAIM_DOCUMENT_VIEWER_MODAL, {
      uri,
      contentType: type,
    });
  };

  return (
    <Box>
      <StepProgressBar currentStep={4} stepCount={4} />
      <ScrollView>
        <ListContainer>
          <FlatList
            data={listData}
            keyExtractor={item => item[0]}
            renderItem={({ item }) => (
              <ClaimReviewListItem
                field={labelMap[item[0]] || ''}
                value={item[1]}
              />
            )}
          />
        </ListContainer>
        <Box mt={4}>
          <DocumentUploader
            title={labelMap.section.receipts}
            size={documents.length}
            data={documents.map(file => ({ uri: file.uri, type: file.type }))}
            onView={viewDocument('documents')}
            accessibilityDocumentType={intl.formatMessage({
              id: 'uploadBox.accessibilityLabel.type.document',
            })}
            accessibilityField={intl.formatMessage({
              id: 'claim.section.receipts',
            })}
          />
        </Box>
        {settlementAdvices.length > 0 && (
          <Box mt={4}>
            <DocumentUploader
              title={labelMap.section.settlementAdvice}
              size={settlementAdvices.length}
              data={settlementAdvices.map(file => ({
                uri: file.uri,
                type: file.type,
              }))}
              onView={viewDocument('settlementAdvices')}
              accessibilityDocumentType={intl.formatMessage({
                id: 'uploadBox.accessibilityLabel.type.document',
              })}
              accessibilityField={intl.formatMessage({
                id: 'claim.section.settlementAdvices',
              })}
            />
          </Box>
        )}
        {prescriptions.length > 0 && (
          <Box mt={4}>
            <DocumentUploader
              title={labelMap.section.prescriptions}
              size={prescriptions.length}
              data={prescriptions.map(file => ({
                uri: file.uri,
                type: file.type,
              }))}
              onView={viewDocument('prescriptions')}
              accessibilityDocumentType={intl.formatMessage({
                id: 'uploadBox.accessibilityLabel.type.document',
              })}
              accessibilityField={intl.formatMessage({
                id: 'claim.section.prescriptions',
              })}
            />
          </Box>
        )}
        {referrals.length > 0 && (
          <Box mt={4}>
            <DocumentUploader
              title={labelMap.section.referrals}
              size={referrals.length}
              data={referrals.map(file => ({ uri: file.uri, type: file.type }))}
              onView={viewDocument('referrals')}
              accessibilityDocumentType={intl.formatMessage({
                id: 'uploadBox.accessibilityLabel.type.document',
              })}
              accessibilityField={intl.formatMessage({
                id: 'claim.section.referrals',
              })}
            />
          </Box>
        )}
        <ListContainer>
          <Box mt={3} mb={5}>
            <TrackedButton
              primary
              onPress={() => navigation.navigate(CLAIM_TERMS_CONDITIONS_MODAL)}
              title={labelMap.button.submit}
              actionParams={{
                category: categories.CLAIMS,
                action: 'Submit claims',
              }}
            />
          </Box>
        </ListContainer>
      </ScrollView>
    </Box>
  );
};

Cxa1ClaimReviewScreen.propTypes = {
  formData: PropTypes.shape({
    patientName: PropTypes.string,
    contactNumber: PropTypes.string,
    claimType: PropTypes.string,
    claimReason: PropTypes.number,
    consultationDate: PropTypes.string,
    receiptAmount: PropTypes.string,
    diagnosisText: PropTypes.string,
  }),
};

export default enhance(Cxa1ClaimReviewScreen);
