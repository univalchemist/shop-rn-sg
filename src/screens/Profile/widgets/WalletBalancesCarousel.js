/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { Pagination } from 'react-native-snap-carousel';
import moment from 'moment/min/moment-with-locales';

import { useIntl, useTheme, useFetchActions } from '@wrappers/core/hooks';
import { walletIcon } from '@images';
import theme from '@theme';
import {
  PlainText,
  Box,
  Image,
  ProgressBar,
  Carousel,
  TextSkeletonPlaceholder,
} from '@wrappers/components';
import { fetchEwallet } from '@store/wallet/actions';

const WalletCardLayout = ({
  nameRow,
  balanceRow,
  progressBar,
  expiredRow,
  currency,
  ...rest
}) => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Box
      m={10}
      p={20}
      borderRadius={4}
      backgroundColor={colors.white}
      boxShadow="0px 2px 6px rgba(0, 0, 0, 0.05)"
      {...rest}
    >
      <Box mb={2} flexDirection="row" alignItems="center">
        <Image source={walletIcon} mr={8} />
        {nameRow}
      </Box>
      <Box mb={2}>
        <PlainText fontSize={12} color={colors.gray[3]}>
          <FormattedMessage
            id="walletBalanceSubTitle"
            values={{
              currency: currency || 'HK$',
            }}
          />
        </PlainText>
      </Box>
      <Box mb={2}>{balanceRow}</Box>
      <Box mb={2}>{progressBar}</Box>
      <Box>{expiredRow}</Box>
    </Box>
  );
};

const WalletCard = ({
  memberId,
  name,
  currency,
  balance,
  openBalance,
  validTo,
  userId,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const { colors } = theme;
  const balanceFormatted = balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  });
  const openBalanceFormatted = openBalance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  });
  const expirationDateFormatted = validTo
    ? moment(validTo).format('DD MMM YYYY')
    : '';

  return (
    <WalletCardLayout
      nameRow={
        <PlainText fontSize={16} fontWeight="bold" color={colors.gray[0]}>
          {memberId === userId ? (
            <FormattedMessage id="mywallet.title" />
          ) : (
            name
          )}
        </PlainText>
      }
      currency={currency}
      balanceRow={
        <PlainText fontSize={20}>
          <PlainText fontSize={20} fontWeight="bold">
            {balanceFormatted}
          </PlainText>{' '}
          <FormattedMessage id="profile.myWallet.of" /> {openBalanceFormatted}
        </PlainText>
      }
      progressBar={
        <ProgressBar
          activeColor={colors.primary[0]}
          progress={balance / openBalance}
          mt={2}
        />
      }
      expiredRow={
        <PlainText fontSize={12} color={colors.gray[3]}>
          {intl.formatMessage(
            {
              id: 'profile.myWallet.expiredTime',
              defaultMessage: 'Expire on ' + expirationDateFormatted,
            },
            {
              expirationDateFormatted,
            },
          )}
        </PlainText>
      }
    />
  );
};

export const WalletCardSkeletonPlaceholder = ({ width, margin }) => (
  <Box width={width} mx={margin}>
    <WalletCardLayout
      nameRow={
        <TextSkeletonPlaceholder fontSize={16} lineHeight={16} width={128} />
      }
      progressBar={null}
      balanceRow={
        <TextSkeletonPlaceholder fontSize={20} width={width - margin * 2} />
      }
      expiredRow={
        <TextSkeletonPlaceholder fontSize={12} width={width - margin * 2} />
      }
    />
  </Box>
);

const WalletBalances = ({ fetchEwallet, walletBalances, userId }) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoadingWallet, isLoadWalletError] = useFetchActions([fetchEwallet]);

  const viewportWidth = Dimensions.get('window').width;
  const viewportPadding = theme.space[4];
  const cardWidth = viewportWidth - viewportPadding * 2;
  const horizontalMarginBetweenCards = theme.space[3];
  const cardWidthWithSpacing = cardWidth + horizontalMarginBetweenCards;

  useEffect(() => {
    const getWallet = async () => {
      try {
        await fetchEwallet();
      } catch (e) {}
    };

    getWallet();
  }, []);

  if (isLoadingWallet) {
    return (
      <WalletCardSkeletonPlaceholder
        width={cardWidth}
        margin={viewportPadding}
      />
    );
  }

  if (isLoadWalletError) {
    return null;
  }

  if (walletBalances?.length) {
    return (
      <>
        <Carousel
          useScrollView
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          data={walletBalances}
          sliderWidth={viewportWidth}
          itemWidth={cardWidthWithSpacing}
          onSnapToItem={index => setActiveIndex(index)}
          renderItem={({ item, index }) => (
            <WalletCard key={`card-${index}`} {...item} userId={userId} />
          )}
        />
        <Pagination
          dotStyle={styles.dots}
          inactiveDotStyle={styles.inactiveDots}
          containerStyle={styles.paginationContainer}
          inactiveDotScale={1}
          dotsLength={walletBalances.length}
          activeDotIndex={activeIndex}
        />
      </>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  paginationContainer: {
    paddingVertical: 10,
  },
  dots: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  inactiveDots: {
    backgroundColor: theme.colors.gray[3],
  },
});

export default connect(
  state => ({
    walletBalances: state.wallet?.walletBalances,
    userId: state.user?.userId,
  }),
  {
    fetchEwallet,
  },
)(WalletBalances);
