/* istanbul ignore file */
import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Box, Image, Carousel } from '@shops/wrappers/components';
import { updateSelectedCategory } from '@shops/store/actions';
const screenWidth = Math.round(Dimensions.get('window').width);

const Banners = ({ banners, updateSelectedCategory }) => {
  const renderItem = ({ item, index }) => {
    const applyFilter = () => {
      updateSelectedCategory(item.link);
    };

    return (
      <TouchableOpacity key={index} onPress={applyFilter}>
        <Image width="100%" height={120} source={{ uri: item.fullImage }} />
      </TouchableOpacity>
    );
  };

  if (!banners.length) return null;

  return (
    <Box width="100%" height={120}>
      <Carousel
        loop
        autoplay
        autoplayInterval={5000}
        data={banners}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
      />
    </Box>
  );
};

const mapStateToProps = ({ shop }) => {
  return {
    banners: shop.config.banners,
  };
};

export default connect(mapStateToProps, { updateSelectedCategory })(Banners);
