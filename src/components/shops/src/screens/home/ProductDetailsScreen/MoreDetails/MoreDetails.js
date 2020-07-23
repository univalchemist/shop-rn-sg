import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Text,
  SectionHeadingText,
  Icon,
} from '@shops/wrappers/components';
import { getReviews } from '@shops/store/actions';
import { useTheme, useIntl } from '@shops/wrappers/core/hooks';
import Accordion from 'react-native-collapsible/Accordion';
import { DELIVERY_TYPE, OFFER_TYPE } from '@shops/utils/constant';
import { RatingDetailHeader, RatingDetailContent } from './RatingDetails';
import { SelfCollectionDetailContent } from './SelfCollectionDetails';

export const MoreDetail = ({ product, getReviews, navigation }) => {
  const theme = useTheme();
  const intl = useIntl();
  const [activeSection, setActiveSection] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviewData = async () => {
      const { value: reviews } = await getReviews(product.id);
      setReviews(reviews);
    };
    getReviewData();
  }, [getReviews, product.id]);

  const getSections = () => {
    const sections = [];
    switch (product?.offerType) {
      case OFFER_TYPE.DELIVERABLE: {
        sections.push({
          titleId: 'shop.product.moreProductDetails',
          defaultTitle: 'More Product Details',
          value: product.description,
        });
        if (product?.deliveryMethod?.includes(DELIVERY_TYPE.SELF_COLLECTION)) {
          sections.push({
            titleId: 'shop.product.selfCollectionDetails',
            defaultTitle: 'Self-collection details',
            value: product,
          });
        }
        break;
      }
      case OFFER_TYPE.E_VOUCHER: {
        sections.push({
          titleId: 'shop.product.eVoucherDetails',
          defaultTitle: 'eVoucher details',
          value: product,
        });
        if (product?.howToRedeem) {
          sections.push({
            titleId: 'shop.product.howToRedeem',
            defaultTitle: 'How to redeem',
            value: product.howToRedeem,
          });
        }
      }
    }

    sections.push({
      titleId: 'shop.product.rating',
      defaultTitle: `Review (${reviews.length})`,
      value: reviews,
    });
    return sections;
  };

  const renderHeader = (item, index) => {
    switch (item.titleId) {
      case 'shop.product.rating':
        return (
          <RatingDetailHeader
            item={item}
            reviews={reviews}
            averageRating={product?.averageRating}
            isExpanded={activeSection[0] === index}
          />
        );
      default:
        return renderDefaultHeader({ item, index });
    }
  };
  const renderContent = item => {
    switch (item.titleId) {
      case 'shop.product.rating':
        return (
          <RatingDetailContent
            reviews={reviews}
            sku={product.sku}
            navigation={navigation}
          />
        );
      case 'shop.product.selfCollectionDetails':
      case 'shop.product.eVoucherDetails':
        return <SelfCollectionDetailContent item={item.value} />;
      default:
        return renderDefaultContent({ item: item.value });
    }
  };

  const renderDefaultHeader = ({ item, index }) => {
    return (
      <Box flexDirection={'row'} alignItems={'center'} height={50}>
        <Text width={'90%'}>
          {intl.formatMessage({
            id: item.titleId,
            defaultMessage: item.defaultTitle,
          })}
        </Text>
        <Icon
          name={activeSection[0] === index ? 'expand-less' : 'expand-more'}
          size={30}
        />
      </Box>
    );
  };

  const renderDefaultContent = ({ item }) => {
    return (
      <Box flexDirection={'row'}>
        <Text>{item}</Text>
      </Box>
    );
  };

  return (
    <Box py={24} borderBottomWidth={1} borderColor={theme.colors.divider}>
      <SectionHeadingText>
        {intl.formatMessage({
          id: 'shop.product.moreDetails',
          defaultMessage: 'More Details',
        })}
      </SectionHeadingText>

      <Accordion
        underlayColor={theme.colors.transparent}
        activeSections={activeSection}
        sections={getSections()}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={setActiveSection}
      />
    </Box>
  );
};

export default connect(null, { getReviews })(MoreDetail);
