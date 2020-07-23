/* istanbul ignore file */

import { ListPicker } from '@wrappers/components';
import { CLAIM_DETAILS_FORM } from '@routes';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { useIntl } from '@wrappers/core/hooks';
import { CLAIM_REASON_OTHERS } from '../constants';
import { categories } from '@store/analytics/trackingActions';

const ClaimReasonModal = ({
  claimTypeId,
  claimReasonByClaimTypeId,
  change,
  claimReason,
  touch,
  untouch,
  navigation,
}) => {
  const intl = useIntl();
  useEffect(() => {
    setTimeout(() => touch('claimReason'), 1000);
  }, []);

  const onPressItem = id => {
    change('claimReason', id);
    if (
      claimReasonByClaimTypeId[claimTypeId].byCode[id].code !==
      CLAIM_REASON_OTHERS
    ) {
      change('diagnosisText', '');
      untouch('diagnosisText');
    }
    navigation.navigate(CLAIM_DETAILS_FORM);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const data = claimReasonByClaimTypeId?.[claimTypeId]?.data
      ?.map(item => {
        return {
          key: item.code,
          value: item.claimReason,
        };
      })
      ?.sort((a, b) => a.value.localeCompare(b.value, intl.locale));
    setData(data);
  }, [claimReasonByClaimTypeId, claimTypeId]);

  const getActionParams = () => ({
    category: categories.CLAIMS_SUBMISSION,
    action: 'Select diagnosis',
  });

  return (
    <ListPicker
      data={data}
      onPressItem={onPressItem}
      selectedKey={claimReason}
      getActionParams={getActionParams}
    />
  );
};

ClaimReasonModal.propTypes = {
  claimReason: PropTypes.number,
  change: PropTypes.func,
  touch: PropTypes.func,
  untouch: PropTypes.func,
};

const mapStateToProps = ({
  form: {
    claimDetailsForm: {
      values: { claimTypeId, claimReason },
    },
  },
  claim: {
    cxa1: { claimReasonByClaimTypeId },
  },
}) => {
  return {
    claimReasonByClaimTypeId,
    claimTypeId,
    claimReason,
  };
};

const enhance = compose(
  connect(mapStateToProps, null),
  reduxForm({
    form: 'claimDetailsForm',
    destroyOnUnmount: false,
  }),
);

export default enhance(ClaimReasonModal);
