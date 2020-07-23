import React from 'react';
import { Box, ListItem, Text } from '@shops/wrappers/components';
import { FlatList } from 'react-native';
import { GreenTick } from '@shops/components';

const SelectAddressModal = ({
  route: {
    params: { onSelectLocation, currentSelected, redemptionPoint },
  },
  navigation,
}) => {
  const onItemPress = item => {
    onSelectLocation?.(item);
    navigation.goBack();
  };
  return (
    <Box flex={1}>
      <FlatList
        data={redemptionPoint}
        keyExtractor={({ redemptId }) => redemptId}
        renderItem={({ item }) => (
          <ListItem
            rightIcon={
              item.redemptId === currentSelected?.redemptId && <GreenTick />
            }
            onPress={() => onItemPress(item)}
            selected={item.redemptId === currentSelected?.redemptId}
            accessible={true}
            accessibilityLabel={item.redemptValue}
          >
            <Text>{item.redemptValue}</Text>
          </ListItem>
        )}
      />
    </Box>
  );
};

export default SelectAddressModal;
