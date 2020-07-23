import { useIntl, useTheme } from '@wrappers/core/hooks';
import {
  Box,
  Image,
  PlainText,
  withTracking,
  TrackedListItem,
  Icon,
  LabelValueText,
  Text,
  FormattedMoney,
  ErrorPanel,
  SectionListSkeletonPlaceholder,
  IconSkeletonPlaceholder,
  TextSkeletonPlaceholder,
} from '@wrappers/components';
import { FlatList } from 'react-native';
import React from 'react';
import { CLAIM_STATUS } from '@store/claim/constants';
import moment from 'moment/min/moment-with-locales';
import {
  Approved,
  claimNoHistory,
  Paid,
  Pending,
  Rejected,
} from '@images/claim';
import { categories } from '@store/analytics/trackingActions';
import { CLAIM_DETAILS } from '@routes';
import { PromiseStatus } from '@middlewares/index';
import { FormattedMessage } from 'react-intl';

const RenderingList = ({
  navigation,
  data,
  status: getCXA1ClaimListCompleted,
}) => {
  const theme = useTheme();
  const intl = useIntl();

  const getIconForStatus = claimStatus => {
    switch (claimStatus) {
      case CLAIM_STATUS.APPROVED:
        return Approved;
      case CLAIM_STATUS.REJECTED:
        return Rejected;
      case CLAIM_STATUS.PAID:
        return Paid;
      case CLAIM_STATUS.PENDING:
      case CLAIM_STATUS.SUBMMITED:
      default:
        return Pending;
    }
  };

  const ClaimsListItem = withTracking(
    React.memo(props => {
      const {
        claimId,
        type,
        statusCode,
        receiptDate,
        paymentDate,
        estimatedPaymentDate,
        amount,
        approvedAmount,
        onPress,
        isCashlessClaim,
      } = props;

      const claimStatus = statusCode.toUpperCase();
      let processingOrHistory =
        claimStatus === CLAIM_STATUS.SUBMMITED ||
        claimStatus === CLAIM_STATUS.PROCESSING;

      let amountDisplay = processingOrHistory ? amount : approvedAmount;
      return (
        <TrackedListItem
          withFullDivider
          leftIcon={<Image source={getIconForStatus(claimStatus)} />}
          rightIcon={<Icon name="chevron-right" variant="default" />}
          onPress={onPress}
          leftIconAccessibilityLabel={statusCode}
          event="view_submitted_claim"
          eventParams={{
            category: 'Claims',
            action: `View ${statusCode} ${claimId}`,
          }}
        >
          <LabelValueText label={moment(receiptDate).format('ll')} />
          <PlainText color={theme.colors.gray[0]}>{type}</PlainText>
          {!isCashlessClaim && (
            <PlainText color={theme.colors.gray[0]}>
              <FormattedMoney value={amountDisplay} />
            </PlainText>
          )}
          {((claimStatus === CLAIM_STATUS.PAID && paymentDate) ||
            (claimStatus === CLAIM_STATUS.APPROVED &&
              estimatedPaymentDate)) && (
            <Box paddingVertical={5}>
              <Box borderWidth={1} width={41} />
              <Box top={5}>
                <PlainText fontSize={12} color={theme.colors.gray[3]}>
                  {intl.formatMessage({
                    id:
                      claimStatus === CLAIM_STATUS.APPROVED
                        ? 'claim.label.estimatedPaymentDateSnake'
                        : 'claim.label.paymentDateSnake',
                  })}
                </PlainText>
                <PlainText fontSize={12} color={theme.colors.gray[3]}>
                  {moment(
                    claimStatus === CLAIM_STATUS.APPROVED
                      ? estimatedPaymentDate
                      : paymentDate,
                  ).format('ll')}
                </PlainText>
              </Box>
            </Box>
          )}
        </TrackedListItem>
      );
    }),
  );

  const ClaimListSkeletonPlaceholder = () => (
    <SectionListSkeletonPlaceholder
      leftIcon={<IconSkeletonPlaceholder borderRadius={12} />}
      count={3}
    >
      <TextSkeletonPlaceholder width={108} />
      <Box mt={1}>
        <TextSkeletonPlaceholder width={240} />
      </Box>
      <Box mt={1}>
        <TextSkeletonPlaceholder width={90} />
      </Box>
    </SectionListSkeletonPlaceholder>
  );

  const NoClaims = () => {
    return (
      <Box height="100%" justifyContent="center" alignItems="center">
        <Box>
          <Image
            maxWidth={215}
            maxHeight={215}
            source={claimNoHistory}
            resizeMode="contain"
          />
        </Box>
        <Text
          fontWeight={300}
          fontSize={32}
          lineHeight={37}
          letterSpacing={-1.5}
        >
          <FormattedMessage id="claim.noClaimsText" />
        </Text>
      </Box>
    );
  };

  let component;
  if (getCXA1ClaimListCompleted === PromiseStatus.START) {
    component = <ClaimListSkeletonPlaceholder />;
  } else if (getCXA1ClaimListCompleted === PromiseStatus.ERROR) {
    component = (
      <ErrorPanel
        heading={intl.formatMessage({
          id: 'claim.noResultsAvailable',
        })}
        description={intl.formatMessage({
          id: 'claim.noFilteredClaimResults',
        })}
      />
    );
  } else if (data && data.length) {
    component = (
      <FlatList
        data={data}
        initialNumToRender={100}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <ClaimsListItem
              {...item}
              onPress={() => {
                const splits = item.claimId.split('-');
                navigation.navigate(CLAIM_DETAILS, {
                  objectId: item.objectId || splits[splits.length - 1],
                  claimId: item.claimId,
                });
              }}
              actionParams={{
                category: categories.CLAIMS,
                action: 'View claim',
              }}
            />
          );
        }}
      />
    );
  } else {
    component = <NoClaims />;
  }

  return (
    <Box style={{ backgroundColor: theme.backgroundColor.default }}>
      {component}
    </Box>
  );
};

export default RenderingList;
