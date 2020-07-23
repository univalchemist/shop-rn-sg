import React from 'react';
import { connect } from 'react-redux';
import { ListPicker } from '@wrappers/components';
import PropTypes from 'prop-types';
import { change } from 'redux-form';
import { PROFILE_MY_BENEFITS } from '@routes';
import { categories } from '@store/analytics/trackingActions';

const ProfileMemberModal = ({
  change,
  membersProfileOrder,
  unterminatedMembersMap,
  selectedExternalMemberId,
  navigation,
}) => {
  if (!Object.keys(unterminatedMembersMap).length) return null;
  const onPressItem = externalId => {
    const selectedMember =
      unterminatedMembersMap[
        Object.keys(unterminatedMembersMap).find(
          memberId =>
            unterminatedMembersMap[memberId]?.externalId === externalId,
        )
      ];

    change('memberForm', 'memberName', selectedMember.fullName);
    change('memberForm', 'selectedExternalMemberId', externalId);
    navigation.navigate(PROFILE_MY_BENEFITS);
  };

  const data = membersProfileOrder
    .map(memberId => {
      if (!unterminatedMembersMap[memberId]) return null;
      const member = unterminatedMembersMap[memberId];

      return {
        key: member?.externalId,
        value: member?.fullName,
        role: member?.role,
      };
    })
    .filter(item => !!item);

  return (
    <ListPicker
      data={data}
      onPressItem={onPressItem}
      selectedKey={selectedExternalMemberId}
      getActionParams={item => {
        return {
          category: categories.PROFILE_BENEFITS_SUMMARY,
          action: `View ${item.role} benefit`,
        };
      }}
    />
  );
};

ProfileMemberModal.propTypes = {
  member: PropTypes.shape({
    dependentsMap: PropTypes.shape({}),
    employee: PropTypes.shape({}),
  }),
  change: PropTypes.func,
  unterminatedMembersMap: PropTypes.shape({}),
};

const mapStateToProps = ({
  user: { membersProfileOrder, unterminatedMembersMap },
  form: {
    memberForm: { values },
  },
}) => ({
  membersProfileOrder,
  unterminatedMembersMap,
  selectedExternalMemberId: values?.selectedExternalMemberId,
});

export default connect(mapStateToProps, { change })(ProfileMemberModal);
