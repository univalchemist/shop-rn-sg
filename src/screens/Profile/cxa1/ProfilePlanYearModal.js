import React from 'react';
import { connect } from 'react-redux';
import { ListPicker } from '@wrappers/components';
import { change } from 'redux-form';
import { PROFILE_MY_BENEFITS } from '@routes';
import { formatPlanYear } from '@utils/date';
import { fetchCxa1BenefitsSimplified } from '@store/benefit/actions';

const ProfilePlanYearModal = ({
  change,
  planPeriodsList,
  selectedPlanYearId,
  navigation,
  fetchCxa1BenefitsSimplified,
}) => {
  const onPressItem = id => {
    const selectedPlanYear = planPeriodsList.find(p => p.id === id);
    change('memberForm', 'planYearName', formatPlanYear(selectedPlanYear.name));
    change('memberForm', 'selectedPlanYearId', id);

    fetchCxa1BenefitsSimplified(id);
    navigation.navigate(PROFILE_MY_BENEFITS);
  };

  const data = planPeriodsList.map(p => ({
    key: p.id,
    value: formatPlanYear(p.name),
  }));

  return (
    <ListPicker
      data={data}
      onPressItem={onPressItem}
      selectedKey={selectedPlanYearId}
    />
  );
};

const mapStateToProps = ({
  benefit: {
    cxa1Benefit: { planPeriodsList },
  },
  form: {
    memberForm: { values },
  },
}) => ({
  planPeriodsList,
  selectedPlanYearId: values?.selectedPlanYearId,
});

export default connect(mapStateToProps, {
  change,
  fetchCxa1BenefitsSimplified,
})(ProfilePlanYearModal);
