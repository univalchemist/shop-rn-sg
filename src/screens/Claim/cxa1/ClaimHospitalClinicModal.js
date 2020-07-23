/* istanbul ignore file */

import { ListPicker } from '@wrappers/components';
import { CLAIM_DETAILS_FORM } from '@routes';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { useIntl } from '@wrappers/core/hooks';
import { categories } from '@store/analytics/trackingActions';

const ClaimHospitalClinicModal = ({
  change,
  touch,
  providers,
  navigation,
  hospitalClinic,
}) => {
  const intl = useIntl();
  useEffect(() => {
    setTimeout(() => touch('hospitalClinic'), 1000);
  }, []);

  const onPressItem = id => {
    change('hospitalClinic', id);
    navigation.navigate(CLAIM_DETAILS_FORM);
  };

  const data = providers
    ?.map(p => ({ key: p.id, value: p.name }))
    ?.sort((a, b) => a.value.localeCompare(b.value, intl.locale));

  const getActionParams = () => ({
    category: categories.CLAIMS_SUBMISSION,
    action: 'Select claim hospital clinic',
  });

  return (
    <ListPicker
      data={data}
      onPressItem={onPressItem}
      selectedKey={hospitalClinic}
      getActionParams={getActionParams}
    />
  );
};

ClaimHospitalClinicModal.propTypes = {
  claimReason: PropTypes.number,
  change: PropTypes.func,
  touch: PropTypes.func,
  untouch: PropTypes.func,
};

const mapStateToProps = ({
  form: {
    claimDetailsForm: {
      values: { hospitalClinic, claimTypeId },
    },
  },
  claim: {
    cxa1: { claimProviderByClaimTypeId },
  },
}) => {
  return {
    hospitalClinic,
    providers: claimProviderByClaimTypeId[claimTypeId].data,
  };
};

const enhance = compose(
  connect(mapStateToProps, null),
  reduxForm({
    form: 'claimDetailsForm',
    destroyOnUnmount: false,
  }),
);

export default enhance(ClaimHospitalClinicModal);
