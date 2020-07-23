/* istanbul ignore file */
import React from 'react';
import { Box, Text } from '@shops/wrappers/components';
import { FlatList, TouchableOpacity, Clipboard } from 'react-native';
import { connect } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';

const LogScreen = ({ logPayment }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Clipboard.setString(JSON.stringify(item));
          SimpleToast.show('Copied');
        }}
      >
        <Box minHeight={60} borderBottomWidth={1} borderColor={'#00000040'}>
          <Text>{JSON.stringify(item)}</Text>
        </Box>
      </TouchableOpacity>
    );
  };
  return (
    <Box flex={1}>
      <FlatList data={logPayment} renderItem={renderItem} />
    </Box>
  );
};

const mapStateToProps = ({ shop: { log } }) => {
  return {
    logPayment: log.logPayment,
  };
};

export default connect(mapStateToProps)(LogScreen);
