import { Box, Button, Icon, Text } from '@shops/wrappers/components';
import { RatingStars } from '@shops/components';
import React from 'react';
import { useIntl } from '@shops/wrappers/core/hooks';
import { SHOP_REVIEW_SCREEN } from '@shops/navigation/routes';
import moment from 'moment';
import { DATE_FORMAT_SHORT } from '@shops/utils/constant';
import ReadMoreText from '@shops/screens/home/ProductDetailsScreen/ReadMoreText';

const MAX_REVIEW_ITEMS = 2;

export const RatingDetailHeader = ({
  item,
  reviews,
  isExpanded,
  averageRating,
}) => {
  const intl = useIntl();
  return (
    <Box flexDirection={'row'} alignItems={'center'} height={50}>
      <Text width={'30%'}>
        {intl.formatMessage(
          {
            id: item.titleId,
            defaultMessage: item.defaultTitle,
          },
          { ratingCount: reviews.length },
        )}
      </Text>
      <RatingStars width={'60%'} rating={averageRating} />
      <Icon name={isExpanded ? 'expand-less' : 'expand-more'} size={30} />
    </Box>
  );
};

export const RatingDetailContent = React.memo(
  ({ reviews, sku, navigation }) => {
    const intl = useIntl();

    const cutDownReviews =
      reviews.length > MAX_REVIEW_ITEMS ? reviews.slice(0, 2) : reviews;

    const renderRatingRow = (item, index) => {
      return (
        <Box key={index.toString()} my={3}>
          <Box flexDirection={'row'}>
            <Box flex={1}>
              <Text>{item.title}</Text>
              <RatingStars rating={item.ratings} />
            </Box>
            <Text>{moment(item.reviewDate).format(DATE_FORMAT_SHORT)}</Text>
          </Box>
          <Box mt={3}>
            <ReadMoreText numberOfLines={3}>{item.detail}</ReadMoreText>
          </Box>
        </Box>
      );
    };

    return (
      <Box>
        {cutDownReviews.map(renderRatingRow)}
        <Box mx={2} my={4}>
          <Button
            outline
            title={intl.formatMessage({
              id: 'shop.product.seeAllReviews',
              defaultMessage: 'See all reviews',
            })}
            onPress={() => {
              navigation.navigate(SHOP_REVIEW_SCREEN, {
                productSku: sku,
                reviews,
              });
            }}
          />
        </Box>
      </Box>
    );
  },
);
