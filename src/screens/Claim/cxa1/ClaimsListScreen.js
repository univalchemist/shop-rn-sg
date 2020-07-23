import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import { Box } from '@heal/src/wrappers/components';
import { useTheme, useIntl } from '@heal/src/wrappers/core/hooks';
import { TabBar, TabView } from 'react-native-tab-view';
import { PlainText, TrackedFloatingActionButton } from '@wrappers/components';
import { CLAIM_PATIENT_DETAILS } from '@routes';
import { categories } from '@store/analytics/trackingActions';
import { getCXA1Claims } from '@store/claim/actions';
import { connect } from 'react-redux';
import RenderingList from './RenderingList';

const ClaimsListScreen = ({
  getCXA1Claims,
  navigation,
  processingClaims,
  completedClaims,
  getCXA1ClaimCompleted,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const intl = useIntl();

  useEffect(() => {
    const fetchClaims = async () => {
      await getCXA1Claims();
    };
    fetchClaims();
  }, [getCXA1Claims, intl]);

  const routes = [
    {
      key: 'processing',
      title: intl.formatMessage({ id: 'claim.header.Processing' }),
      accessibilityLabel: 'Processing Tab',
      trackingAction: 'Processing view',
    },
    {
      key: 'history',
      title: intl.formatMessage({ id: 'claim.header.History' }),
      accessibilityLabel: 'History Tab',
      trackingAction: 'History view',
    },
  ];

  const tabState = {
    routes,
    index: tabIndex,
  };

  const labelStyle = {
    fontSize: theme.fontSizes[2],
    color: theme.colors.gray[0],
    lineHeight: 22,
    fontWeight: theme.fontWeights.bold.toString(),
    textTransform: 'capitalize',
  };

  const renderLabel = ({ route, focused }) => {
    return (
      <Box>
        <PlainText
          style={[
            labelStyle,
            focused
              ? { color: theme.colors.gray[0] }
              : { color: theme.colors.gray[8] },
          ]}
        >
          {route.title}
        </PlainText>
      </Box>
    );
  };

  return (
    <Box flex={1} as={SafeAreaView} backgroundColor={theme.colors.white}>
      <TabView
        navigationState={tabState}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'processing':
              return (
                <RenderingList
                  navigation={navigation}
                  data={processingClaims}
                  status={getCXA1ClaimCompleted}
                />
              );
            case 'history':
              return (
                <RenderingList
                  navigation={navigation}
                  data={completedClaims}
                  status={getCXA1ClaimCompleted}
                />
              );
            default:
              return null;
          }
        }}
        onIndexChange={index => {
          setTabIndex(index);
        }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: theme.colors.primary[0],
            }}
            style={{
              backgroundColor: theme.colors.white,
            }}
            renderLabel={renderLabel}
          />
        )}
        initialLayout={{
          width: Dimensions.get('window').width,
        }}
        style={{ backgroundColor: theme.backgroundColor.default }}
      />
      <TrackedFloatingActionButton
        testID={'iconIcon1'}
        accessibilityLabel={intl.formatMessage({
          id: 'claim.button.makeANewClaim',
        })}
        onPress={() => navigation.navigate(CLAIM_PATIENT_DETAILS)}
        event="make_a_new_claim"
        eventParams={{
          category: 'Claims',
          action: 'Make a new claim',
          label: 'user',
        }}
        actionParams={{
          category: categories.CLAIMS,
          action: 'Make a claim',
        }}
      />
    </Box>
  );
};

const mapStateToProps = ({
  user: { membersMap, userId },
  claim: { claimsMap, claimProcessing, claimCompleted, getCXA1ClaimCompleted },
}) => ({
  processingClaims: claimProcessing,
  completedClaims: claimCompleted,
  claimsMap: claimsMap,
  membersMap,
  userId,
  getCXA1ClaimCompleted,
});

export default connect(mapStateToProps, { getCXA1Claims })(ClaimsListScreen);
