import React from 'react';
import { connect } from 'react-redux';
import { useFetchActions, useIntl, useTheme } from '@wrappers/core/hooks';
import { CustomMultiselectCheckBox } from '@wrappers/components/form';
import {
  ErrorPanel,
  SectionListSkeletonPlaceholder,
} from '@wrappers/components';
import {
  getCXA1ClaimFilters,
  getCXA1Claims,
  updateCXA1ClaimFilters,
} from '@store/claim/actions';
import { categories, logAction } from '@store/analytics/trackingActions';

export const ClaimFiltersModal = ({
  typeAndStatusFilters,
  getCXA1ClaimFilters,
  membersMap,
  membersProfileOrder,
  updateCXA1ClaimFilters,
  selectedCXA1ClaimFilters,
  getCXA1Claims,
  navigation,
}) => {
  const theme = useTheme();
  const intl = useIntl();

  const [isLoading, isError] = useFetchActions([getCXA1ClaimFilters]);

  return isLoading ? (
    <SectionListSkeletonPlaceholder count={3} />
  ) : isError ? (
    <ErrorPanel />
  ) : (
    <CustomMultiselectCheckBox
      bodyBackgroundColor={theme.colors.gray[7]}
      buttonLabel={intl.formatMessage({ id: 'showResults' })}
      clearAllButtonLabel={intl.formatMessage({ id: 'clearAll' })}
      clearAllButtonTrackingActionParams={{
        category: categories.CLAIMS,
        action: 'Clear all filters',
      }}
      submitButtonTrackingActionParams={{
        category: categories.CLAIMS,
        action: 'Filter search',
      }}
      data={composeFilterData(
        intl,
        typeAndStatusFilters,
        membersMap,
        membersProfileOrder,
      )}
      selectedValues={selectedCXA1ClaimFilters}
      onSubmit={values => {
        const logActionParams = {
          category: categories.CLAIMS_FILTER,
          action: 'Filter by',
        };
        let filterTypes = [];
        if (values.length) {
          values.forEach(item => {
            let type = item.type.replace(/ /g, '_');
            type = `filter_${type}`.toLowerCase();
            filterTypes[type] = filterTypes[type] || [];
            filterTypes[type].push(item.value);
          });

          Object.keys(filterTypes).forEach(key => {
            logActionParams[key] = filterTypes[key].join(', ').toLowerCase();
          });
        }
        logAction(logActionParams);

        updateCXA1ClaimFilters(values);
        getCXA1Claims();
        navigation.goBack();
      }}
      isSectionList={true}
      onChange={() => {}}
    />
  );
};

const composeFilterData = (
  intl,
  typeAndStatusFilters,
  membersMap,
  membersProfileOrder,
) => {
  const formattedTypeAndStatusFilters = transformTypeAndStatusFilters(
    intl,
    typeAndStatusFilters,
  );
  const formattedPatientFilters = transformPatientFilters(
    intl,
    membersMap,
    membersProfileOrder,
  );

  return [].concat.apply(
    [],
    [...formattedTypeAndStatusFilters, ...formattedPatientFilters],
  );
};

const transformTypeAndStatusFilters = (intl, typeAndStatusFilters) => {
  const transformedObject = Object.keys(typeAndStatusFilters).map(key => {
    return typeAndStatusFilters[key]
      .map(filter => {
        return {
          title: intl.formatMessage({ id: `claim.claimFilters.${key}` }),
          titleValue: key,
          value: filter.code ? filter.code : filter.id,
          label: intl.formatMessage({
            id: `claim.claimFilters.${filter.code ? filter.code : filter.id}`,
            defaultMessage: filter.text,
          }),
        };
      })
      .filter(filter => filter.value !== 'REQUEST FOR INFORMATION');
  });

  return [].concat.apply([], transformedObject);
};

const transformPatientFilters = (intl, membersMap, membersProfileOrder) => {
  return membersProfileOrder.map(memberId => {
    return {
      title: intl.formatMessage({ id: 'claim.claimFilters.patient' }),
      titleValue: 'patient',
      value: memberId,
      label: membersMap[memberId].fullName,
    };
  });
};

const mapStateToProps = ({
  claim: { filters, selectedCXA1ClaimFilters },
  user: { membersMap, membersProfileOrder },
}) => {
  return {
    typeAndStatusFilters: filters,
    membersMap,
    membersProfileOrder,
    selectedCXA1ClaimFilters,
  };
};

const enhance = connect(mapStateToProps, {
  getCXA1ClaimFilters,
  updateCXA1ClaimFilters,
  getCXA1Claims,
});

export default enhance(ClaimFiltersModal);
