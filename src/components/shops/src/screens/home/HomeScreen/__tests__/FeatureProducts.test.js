import React from 'react';
import { renderForTest } from '@testUtils';
import FeaturedProducts from '../FeaturedProducts';
import { PRODUCT } from '@shops/__mocks__/data';
import { FlatList } from 'react-native';
import { ProductItem } from '@shops/components';
import messages from '@shops/locales/en-HK.json';
import { fireEvent } from 'react-native-testing-library';
import { Spinner } from '@shops/components';
import { TrackedButton, Button } from '@shops/wrappers/components';
import { SHOP_SELECT_CATEGORY_MODAL } from '@shops/navigation/routes';

const initialState = {
  shop: {
    paginations: {
      suggestedProducts: { numberOfResults: 20, isLoading: true },
      productsByCategoryId: {
        1: { numberOfResults: 4, isLoading: false },
        2: { numberOfResults: 0 },
      },
    },
    filters: {
      params: {},
    },
  },
};

const api = {
  getSuggestedOffers: jest.fn().mockResolvedValue({ data: {} }),
  getProductsByCategoryId: jest.fn().mockResolvedValue({ data: {} }),
};

describe('FeaturedProducts', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should render properly', () => {
    const Comp = renderForTest(
      <FeaturedProducts products={[PRODUCT, PRODUCT]} />,
      {
        initialState,
        api,
      },
    );
    const flatList = Comp.queryByType(FlatList);
    fireEvent(flatList, 'ItemSeparatorComponent');
    expect(flatList).toBeTruthy();
    expect(Comp.queryAllByType(ProductItem)).toHaveLength(2);
    expect(Comp.queryByType(Spinner)).toBeTruthy();
  });

  it('should render properly when product is empty', () => {
    const Comp = renderForTest(<FeaturedProducts products={[]} />, {
      initialState,
      api,
    });
    expect(Comp.queryByText(messages['shop.homePage.noResult'])).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.homePage.noResultInfo']),
    ).toBeTruthy();
  });

  it('should render properly when product is empty by searchTerm ', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const Comp = renderForTest(
      <FeaturedProducts
        products={[]}
        searchTerm={'searchTerm'}
        navigation={navigation}
      />,
      {
        initialState,
        api,
      },
    );
    expect(Comp.queryByText(messages['shop.homePage.noResult'])).toBeTruthy();
    expect(
      Comp.queryByText(messages['shop.homePage.noResultSearchInfo']),
    ).toBeTruthy();
    const button = Comp.queryByType(Button);
    fireEvent.press(button);
    expect(navigation.navigate).toBeCalledWith(SHOP_SELECT_CATEGORY_MODAL);
  });

  it('should not render footer when number Of result lesser than products', () => {
    const initialState = {
      shop: {
        paginations: {
          suggestedProducts: { numberOfResults: 2, isLoading: false },
        },
      },
    };
    const Comp = renderForTest(
      <FeaturedProducts
        products={[
          PRODUCT,
          { ...PRODUCT, id: 2 },
          { ...PRODUCT, id: 3 },
          { ...PRODUCT, id: 4 },
        ]}
      />,
      {
        initialState,
        api,
      },
    );
    expect(Comp.queryByType(TrackedButton)).toBeNull();
  });

  it('should  render LoadMore btn when products smaller than num of result ', () => {
    const initState = { ...initialState };
    initState.shop.paginations.suggestedProducts.isLoading = false;
    const Comp = renderForTest(
      <FeaturedProducts products={[PRODUCT, PRODUCT]} />,
      {
        initialState: initState,
        api,
      },
    );
    const button = Comp.queryByType(TrackedButton);
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(api.getSuggestedOffers).toBeCalled();
  });

  it('should  render products By categories properly ', () => {
    const Comp = renderForTest(
      <FeaturedProducts products={[PRODUCT, PRODUCT]} categoryId={1} />,
      {
        initialState,
        api,
      },
    );
    const button = Comp.queryByType(TrackedButton);
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(api.getProductsByCategoryId).toBeCalled();
  });
});
