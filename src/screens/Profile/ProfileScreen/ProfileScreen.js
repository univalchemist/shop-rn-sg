import React from 'react';
import { FlatList, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import {
  Box,
  Icon,
  Image,
  ListItem,
  ScreenHeadingText,
  Text,
} from '@wrappers/components';
import PropTypes from 'prop-types';
import { profileMe } from '@images';
import { useIntl } from '@wrappers/core/hooks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import theme from '@theme';
import { buttons } from '@screens/Profile/ProfileScreen/buttons';
import { isTerminatedOrExtended } from '@utils';
import { WalletBalancesCarousel } from '@screens/Profile/widgets';

const ProfileScreen = ({
  firstName,
  isUserTerminatedOrExtend,
  navigation,
  isCXA1Integration,
}) => {
  const intl = useIntl();
  const viewportWidth = Dimensions.get('window').width;

  let data = [];
  // eslint-disable-next-line no-unused-vars
  for (let b of buttons) {
    if (b.id === 'profile.navigation.eHealthCard' && isUserTerminatedOrExtend)
      continue;
    data.push({
      label: intl.formatMessage({ id: b.id }),
      route: b.route,
    });
  }

  return (
    <Box
      as={SafeAreaView}
      backgroundColor={theme.colors.imageHeaderMatching}
      flexGrow={1}
      flex={1}
    >
      <FlatList
        contentContainerStyle={styles.flatListContentContainer}
        ListHeaderComponent={
          <Box>
            <Box height={200} backgroundColor={theme.colors.backgroundColor}>
              <Box position="absolute" right={0} top={0}>
                <Image width={viewportWidth} source={profileMe} />
              </Box>
              <Box position="absolute" pl={4} pr={136} bottom={75}>
                <ScreenHeadingText numberOfLines={1}>
                  {firstName}
                </ScreenHeadingText>
              </Box>
            </Box>
            {isCXA1Integration && <WalletBalancesCarousel />}
          </Box>
        }
        data={data}
        keyExtractor={item => item.route}
        renderItem={({ item }) => (
          <Box backgroundColor={theme.colors.backgroundColor}>
            <ListItem
              rightIcon={<Icon name="chevron-right" variant="default" />}
              onPress={() => navigation.navigate(item.route)}
              accessible={true}
              accessibilityLabel={item.label}
            >
              <Text>{item.label}</Text>
            </ListItem>
          </Box>
        )}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    flexGrow: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
});

ProfileScreen.propTypes = {
  firstName: PropTypes.string,
  isCXA1Integration: PropTypes.bool,
};

const mapStateToProps = ({
  user: { userId, membersMap, status, isCXA1Integration },
}) => ({
  firstName: membersMap[userId]?.firstName,
  isUserTerminatedOrExtend: isTerminatedOrExtended(status),
  isCXA1Integration,
});

const enhance = compose(connect(mapStateToProps));
export default enhance(ProfileScreen);
