import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import {
  Box,
  Image,
  ErrorPanel,
  SecondaryText,
  ScreenHeadingText,
  TextSkeletonPlaceholder,
  ListSkeletonPlaceholder,
  ImageSkeletonPlaceholder,
} from '@wrappers/components';
import { useIntl, useTheme, useFetchActions } from '@wrappers/core/hooks';
import { getCXA1Claim } from '@store/claim/actions';
import { fetchCXA1ClaimTypes } from '@store/claimType/actions';
import { CLAIM_STATUS } from '@store/claim/constants';
import { InformationBox, ClaimDetailsList, ClaimDocuments } from './widgets';
import {
  getHeaderTitle,
  integrateClaimDetailSections,
  integrateClaimDocuments,
} from './utils';
import {
  cxa1ClaimPaidClaim,
  cxa1ClaimPendingClaim,
  cxa1ClaimRejectedClaim,
  cxa1ClaimApprovedClaim,
} from '@images/claim';

const statusImageMap = {
  [CLAIM_STATUS.PENDING]: cxa1ClaimPendingClaim,
  [CLAIM_STATUS.PAID]: cxa1ClaimPaidClaim,
  [CLAIM_STATUS.APPROVED]: cxa1ClaimApprovedClaim,
  [CLAIM_STATUS.REJECTED]: cxa1ClaimRejectedClaim,
  [CLAIM_STATUS.PROCESSING]: cxa1ClaimPendingClaim,
  [CLAIM_STATUS.REQUEST_FOR_INFORMATION]: cxa1ClaimPendingClaim,
};

const ClaimDetailsScreen = ({
  claim,
  claimId,
  claimTypes,
  getClaim,
  fetchClaimTypes,
  claimantName,
  momentLocale,
  navigation,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const [isLoading, isError] = useFetchActions(
    [getClaim],
    true,
    [claimId],
    [claimId],
  );
  const [isClaimTypesLoading, isClaimTypesError] = useFetchActions([
    fetchClaimTypes,
  ]);

  if (isClaimTypesLoading || isLoading) {
    return (
      <Box backgroundColor="gray.7" flex={1}>
        <Box alignItems="center">
          <Box mb={4} mt={4}>
            <ImageSkeletonPlaceholder />
          </Box>
          <Box mb={4}>
            <TextSkeletonPlaceholder />
          </Box>
        </Box>
        <ListSkeletonPlaceholder count={5} />
      </Box>
    );
  }

  if (isClaimTypesError || isError) {
    return <ErrorPanel />;
  }

  const { remark, category, statusCode } = claim;
  const claimStatus = statusCode.toUpperCase();
  const imageSrc = statusImageMap[claimStatus];
  const claimDetails = integrateClaimDetailSections(
    intl,
    momentLocale,
    claimTypes,
    {
      ...claim,
      user: claimantName,
    },
  );
  const claimDocuments = integrateClaimDocuments(intl, claim.documents);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Box style={styles.container}>
        <Box mb={4}>
          <Image width={215} source={imageSrc} resizeMode="contain" />
        </Box>
        <ScreenHeadingText>
          {getHeaderTitle({ intl, statusCode: claimStatus })}
        </ScreenHeadingText>
        <Box mt={1} mb={3}>
          <SecondaryText color={theme.colors.gray[8]}>
            {intl.formatMessage(
              { id: 'claim.label.categoryClaim' },
              { category },
            )}
          </SecondaryText>
        </Box>
        <Box my={3} width="100%">
          <InformationBox text={remark} type={claimStatus} />
        </Box>
        <ClaimDetailsList sectionsList={claimDetails} claimTypes={claimTypes} />
        <ClaimDocuments sections={claimDocuments} navigation={navigation} />
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});

const mapStateToProps = (state, { route }) => {
  const {
    user: { membersMap },
    claimType: { cxa1 },
    claim: { singleCXA1Claim },
    intl: { momentLocale },
  } = state;
  const {
    params: { objectId },
  } = route;
  const claimantName = membersMap[singleCXA1Claim.claimantId]?.fullName;
  return {
    claimId: objectId,
    claim: singleCXA1Claim,
    claimTypes: cxa1.types?.byId || {},
    claimantName,
    momentLocale,
  };
};

export default connect(mapStateToProps, {
  getClaim: getCXA1Claim,
  fetchClaimTypes: fetchCXA1ClaimTypes,
})(ClaimDetailsScreen);
