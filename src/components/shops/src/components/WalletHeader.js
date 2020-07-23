import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  PlainText,
  Box,
  Image,
  TextSkeletonPlaceholder,
} from '@shops/wrappers/components';
import { useIntl, useTheme } from '@shops/wrappers/core/hooks';
import { walletIcon } from '@shops/assets/images';
import { getShopWallet } from '@shops/store/actions';
import { useGetFormattedPrice } from '@shops/wrappers/core/hooks';

const WalletHeader = ({ getShopWallet, wallet, isCXA1Integration }) => {
  const intl = useIntl();
  const theme = useTheme();
  const [isLoadingWallet, setIsLoadingWallet] = useState(true);
  const formattedPrice = useGetFormattedPrice(wallet?.balance);

  useEffect(() => {
    const getWallet = async () => {
      try {
        setIsLoadingWallet(true);
        await getShopWallet();
      } catch (e) {
      } finally {
        setIsLoadingWallet(false);
      }
    };

    getWallet();
  }, []);

  if (!isCXA1Integration) {
    return null;
  }

  return (
    <Box
      backgroundColor={theme.colors.white}
      height={54}
      alignItems="center"
      justifyContent="space-between"
      px={32}
      flexDirection="row"
      borderBottomWidth={1}
      borderBottomColor={theme.colors.walletBorder}
    >
      <Box flexDirection="row" alignItems="center">
        <Image source={walletIcon} mr={8} />
        <PlainText>
          {intl.formatMessage({ id: 'shop.common.wallet' })}
        </PlainText>
      </Box>
      {isLoadingWallet ? (
        <TextSkeletonPlaceholder fontSize={16} lineHeight={22} width={100} />
      ) : (
        <PlainText fontWeight="bold">{formattedPrice}</PlainText>
      )}
    </Box>
  );
};

export default connect(
  ({
    user: { isCXA1Integration },
    shop: {
      home: { wallet },
    },
  }) => ({
    wallet,
    isCXA1Integration,
  }),
  {
    getShopWallet,
  },
)(WalletHeader);
