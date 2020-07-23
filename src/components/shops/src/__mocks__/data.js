export const CURRENCY = {
  baseCurrency: 'SGD',
  baseCurrencySymbol: 'SG$',
  defaultCurrency: 'SGD',
  defaultCurrencySymbol: 'SG$',
};

export const STORE_CONFIGS = {
  id: 1,
  code: 'default',
  locale: 'en_US',
  timeZone: 'Asia/Singapore',
  weightUnits: 'Asia/Singapore',
  currency: CURRENCY,
};

export const PRODUCT = {
  id: 1,
  sku: 'Product_01',
  name: 'Product 01',
  attributeSetId: 4,
  price: 1000.0,
  finalPrice: 800.0,
  status: 1,
  visibility: 4,
  type: 'simple',
  categoryIds: [3, 8, 59, 2],
  discountPercent: 20.0,
  description:
    'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  shortDescription:
    'Short Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
  vendor: 'TESTVENDOR DONOTSHIP',
  thumbnail: {
    id: 0,
    file:
      'https://shop.cxa2dev.com/media/catalog/product/cache/ca48c27989a3d90b22cca42748fce193/4/1/418035916060_1.png',
    position: 0,
  },
  images: [
    {
      id: 12,
      file:
        'https://shop.cxa2dev.com/media/catalog/product/cache/e9d956138de183bb4dacc5c69c32ff16/4/1/418035916060_1.png',
      position: 2,
    },
    {
      id: 14,
      file:
        'https://shop.cxa2dev.com/media/catalog/product/cache/e9d956138de183bb4dacc5c69c32ff16/4/1/418055916451_1.png',
      position: 2,
    },
  ],
  stock: { inStock: true, isQuantityDecimal: false, quantity: 10000.0 },
  averageRating: 80,
  ratingsCount: 2,
  deliveryMethod: 'delivery,selfcollection',
  deliveryFee: 20.0,
  offerType: 'deliverable',
  voucherValidityRedemption: '30',
  promoStartDate: '2020-06-16 00:00:00',
  promoExpiryDate: '2020-09-30 00:00:00',
  taxClassId: '2',
  redemptionPoint: [
    { redemptId: '3', redemptValue: '1963, Wilson StreetSan Diego' },
    { redemptId: '4', redemptValue: '1964, Wilson StreetSan Diego' },
    { redemptId: '5', redemptValue: '1965, Wilson StreetSan Diego' },
  ],
};

export const SORTINGS = [
  {
    id: 'bestselling',
    name: 'Best selling',
    direction: 'DESC',
  },
  {
    id: 'price',
    name: 'Price high to low',
    direction: 'DESC',
  },
  {
    id: 'price',
    name: 'Price low to high',
    direction: 'ASC',
  },
  {
    id: 'discount',
    name: 'Discount high to low',
    direction: 'DESC',
  },
  {
    id: 'discount',
    name: 'Discount low to high',
    direction: 'ASC',
  },
];

export const CATEGORY_TREE = {
  id: 2,
  parentId: 1,
  name: 'All products',
  isActive: true,
  position: 1,
  includeInMenu: true,
  level: 1,
  productCount: 20,
  children: [
    {
      id: 3,
      parentId: 2,
      name: 'Alternative medicine',
      isActive: true,
      position: 1,
      includeInMenu: true,
      level: 2,
      productCount: 10,
      children: [
        {
          id: 4,
          parentId: 3,
          name: 'All alternative medicine',
          isActive: true,
          position: 1,
          includeInMenu: true,
          level: 3,
          productCount: 2,
          children: [],
        },
        {
          id: 5,
          parentId: 3,
          name: 'TCM',
          isActive: true,
          position: 2,
          includeInMenu: true,
          level: 3,
          productCount: 2,
          children: [],
        },
        {
          id: 6,
          parentId: 3,
          name: 'Homeopathy',
          isActive: true,
          position: 3,
          includeInMenu: true,
          level: 3,
          productCount: 3,
          children: [],
        },
        {
          id: 7,
          parentId: 3,
          name: 'Naturopathy',
          isActive: false,
          position: 4,
          includeInMenu: true,
          level: 3,
          productCount: 2,
          children: [],
        },
      ],
    },
    {
      id: 4,
      parentId: 2,
      name: 'Foods',
      isActive: false,
      position: 2,
      includeInMenu: true,
      level: 2,
      productCount: 0,
      children: [],
    },
  ],
};

export const REVIEW_FORM = {
  ratings: {
    'overall_ratings-1': {
      rating_id: 1,
      position: 10,
      is_active: true,
      label: 'Overall ratings',
      labelId: 'shop.writeReview.overallRating',
      options: {
        oid_1: 1,
        oid_2: 2,
        oid_3: 3,
        oid_4: 4,
        oid_5: 5,
      },
    },
    'productservice_quality-2': {
      rating_id: 2,
      position: 20,
      is_active: true,
      label: 'Product/Service quality',
      labelId: 'shop.writeReview.productServiceQuality',
      options: {
        oid_6: 6,
        oid_7: 7,
        oid_8: 8,
        oid_9: 9,
        oid_10: 10,
      },
    },
    'purchase_experience-3': {
      rating_id: 3,
      position: 30,
      is_active: true,
      label: 'Purchase experience',
      labelId: 'shop.writeReview.purchaseExperience',
      options: {
        oid_11: 11,
        oid_12: 12,
        oid_13: 13,
        oid_14: 14,
        oid_15: 15,
      },
    },
    'redemption_experience-4': {
      rating_id: 4,
      position: 40,
      is_active: true,
      label: 'Redemption experience',
      labelId: 'shop.writeReview.redemptionExperience',
      options: {
        oid_16: 16,
        oid_17: 17,
        oid_18: 18,
        oid_19: 19,
        oid_20: 20,
      },
    },
  },
  fields: {
    nickname: {
      label: 'Name',
      labelId: 'shop.writeReview.name',
      name: 'nickname',
      type: 'text',
    },
    title: {
      label: 'Headline',
      labelId: 'shop.writeReview.headLine',
      name: 'title',
      type: 'text',
    },
    detail: {
      label: 'Write your review',
      labelId: 'shop.writeReview.writeYourReview',
      name: 'detail',
      type: 'textarea',
    },
  },
};

export const GET_REVIEW = [
  {
    id: 8,
    title: 'Bob thinks product makes bob happy',
    detail: 'dfsdfsdfds',
    nickName: 'Bob Jones',
    ratings: [
      { percent: 80.0, ratingCode: 'Overall ratings' },
      { percent: 80.0, ratingCode: 'Product/Service quality' },
      { percent: 80.0, ratingCode: 'Purchase experience' },
      { percent: 80.0, ratingCode: 'Redemption experience' },
    ],
    reviewDate: '2020-04-24T07:29:31',
  },
  {
    id: 7,
    title: 'Good product',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    nickName: 'Simba',
    ratings: [
      { percent: 100.0, ratingCode: 'Overall ratings' },
      { percent: 80.0, ratingCode: 'Purchase experience' },
      { percent: 60.0, ratingCode: 'Product/Service quality' },
    ],
    reviewDate: '2020-04-23T00:44:34',
  },
];

export const GET_TRACK_ORDER = [
  {
    productId: 0,
    sku: 'string',

    shipments: [
      {
        deliveryPartner: 'HK Post Pte Ltd',
        deliveryPartnerCode: 'string',
        trackingNumber: 'HKP-1233455',
        description: 'string',
        address: {
          id: 0,
          region: {
            id: 0,
            region: 'Region',
            code: 'Region',
          },
          regionId: 0,
          countryId: 'SG',
          telephone: '+84123456789',
          postCode: '700000',
          city: 'City',
          firstName: 'Thuong',
          lastName: 'Hoang',
          street: ['11 Le Duan'],
          isSameAsBilling: true,
          saveAddress: true,
        },
      },
    ],
    status: 'PENDING',
    quantityOrdered: 0,
    quantityShipped: 0,
  },
];

//Order History

export const ORDER_HISTORY = [
  {
    grandTotal: 3140.0,
    subTotal: 3100.0,
    discount: 0.0,
    shipping: 40.0,
    tax: 0.0,
    shippingTax: 0.0,
    subtotalIncludingTax: 3100.0,
    shippingIncludingTax: 40.0,
    currency: 'SGD',
    status: 'PENDING',
    orderId: 87,
    orderIdText: 'CXA000000087',
    itemCount: 2,
    payment: { grandTotal: 3140.0, paymentStatus: 'PENDING' },
    items: [
      {
        id: 2,
        quantity: 3,
        total: 2100.0,
        sku: 'Product_02',
        name: 'Product 02',
        description:
          'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        thumbnail: {
          id: 0,
          file:
            'https://shop.cxa2dev.com/media/catalog/product/cache/ca48c27989a3d90b22cca42748fce193/4/1/418055916451.png',
          position: 0,
        },
        vendor: 'TESTVENDOR DONOTSHIP',
        deliveryFee: 20.0,
      },
      {
        id: 1,
        quantity: 1,
        total: 1000.0,
        sku: 'Product_01',
        name: 'Product 01',
        description:
          'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        thumbnail: {
          id: 0,
          file:
            'https://shop.cxa2dev.com/media/catalog/product/cache/ca48c27989a3d90b22cca42748fce193/4/1/418035916060_1.png',
          position: 0,
        },
        vendor: 'TESTVENDOR DONOTSHIP',
        deliveryFee: 20.0,
      },
    ],
    orderDate: '2020-05-19T23:06:01',
  },
  {
    grandTotal: 3140.0,
    subTotal: 3100.0,
    discount: 0.0,
    shipping: 40.0,
    tax: 0.0,
    shippingTax: 0.0,
    subtotalIncludingTax: 3100.0,
    shippingIncludingTax: 40.0,
    currency: 'SGD',
    status: 'PENDING',
    orderId: 88,
    orderIdText: 'CXA000000088',
    itemCount: 2,
    payment: { grandTotal: 3140.0, paymentStatus: 'PENDING' },
    items: [
      {
        id: 2,
        quantity: 3,
        total: 2100.0,
        sku: 'Product_02',
        name: 'Product 02',
        description:
          'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        thumbnail: {
          id: 0,
          file:
            'https://shop.cxa2dev.com/media/catalog/product/cache/ca48c27989a3d90b22cca42748fce193/4/1/418055916451.png',
          position: 0,
        },
        vendor: 'TESTVENDOR DONOTSHIP',
        deliveryFee: 20.0,
      },
      {
        id: 1,
        quantity: 1,
        total: 1000.0,
        sku: 'Product_01',
        name: 'Product 01',
        description:
          'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        thumbnail: {
          id: 0,
          file:
            'https://shop.cxa2dev.com/media/catalog/product/cache/ca48c27989a3d90b22cca42748fce193/4/1/418035916060_1.png',
          position: 0,
        },
        vendor: 'TESTVENDOR DONOTSHIP',
        deliveryFee: 20.0,
      },
    ],
    orderDate: '2020-05-19T23:07:46',
  },
];

export const ORDER_DETAILS_HISTORY = {
  grandTotal: 6750.0,
  subTotal: 6610.0,
  discount: 0.0,
  shipping: 140.0,
  tax: 0.0,
  shippingTax: 0.0,
  subtotalIncludingTax: 6610.0,
  shippingIncludingTax: 140.0,
  currency: 'SGD',
  status: 'COMPLETE',
  orderId: 38,
  orderIdText: 'CXA000000038',
  itemCount: 7,
  payment: { grandTotal: 6750.0, method: 'Cash' },
  items: [
    {
      id: 13,
      quantity: 1,
      total: 1750.0,
      sku: 'Homeopathy_01',
      name: 'Homeopathy 01',
      description:
        'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      vendor: 'TESTVENDOR DONOTSHIP',
      deliveryFee: 20.0,
    },
    {
      id: 14,
      quantity: 1,
      total: 1500.0,
      sku: 'Homeopathy_02',
      name: 'Homeopathy 02',
      description:
        'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      vendor: 'TESTVENDOR DONOTSHIP',
      deliveryFee: 20.0,
    },
    {
      id: 15,
      quantity: 1,
      total: 1500.0,
      sku: 'Naturopathy_01',
      name: 'Naturopathy 01',
      description:
        'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      thumbnail: {
        id: 0,
        file:
          'https://shop.cxa2dev.com/media/catalog/product/cache/ca48c27989a3d90b22cca42748fce193/l/d/ld2cpgnmb_2_1.jpg',
        position: 0,
      },
      vendor: 'TESTVENDOR DONOTSHIP',
      deliveryFee: 20.0,
    },
    {
      id: 16,
      quantity: 1,
      total: 1000.0,
      sku: 'Naturopathy_02',
      name: 'Naturopathy 02',
      description:
        'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      thumbnail: {
        id: 0,
        file:
          'https://shop.cxa2dev.com/media/catalog/product/cache/ca48c27989a3d90b22cca42748fce193/l/e/le7910_2048x2048_1.png',
        position: 0,
      },
      vendor: 'TESTVENDOR DONOTSHIP',
      deliveryFee: 20.0,
    },
    {
      id: 17,
      quantity: 1,
      total: 500.0,
      sku: 'General_checkup_01',
      name: 'General checkup 01',
      description:
        'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      vendor: 'TESTVENDOR DONOTSHIP',
      deliveryFee: 20.0,
    },
    {
      id: 18,
      quantity: 1,
      total: 270.0,
      sku: 'General_checkup_02',
      name: 'General checkup 02',
      description:
        'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      vendor: 'TESTVENDOR DONOTSHIP',
      deliveryFee: 20.0,
    },
    {
      id: 19,
      quantity: 1,
      total: 90.0,
      sku: 'All alternative medicine product',
      name: 'All alternative medicine product',
      description: 'All alternative medicine product description<br>',
      vendor: 'test test',
      deliveryFee: 20.0,
    },
  ],
  orderDate: '2020-05-13T16:15:11',
};

export const TRACK_ORDER = [
  {
    productId: 15,
    sku: 'Naturopathy_01',
    shipments: [
      {
        deliveryPartner: 'Federal Express',
        deliveryPartnerCode: 'fedex',
        trackingNumber: 'A123123',
        address: {
          region: { id: 0 },
          countryId: 'SG',
          telephone: '68823000',
          postCode: '319762',
          city: 'Singapore',
          firstName: 'Jie',
          lastName: 'Shen',
          street: ['620A, Lor 1 Toa Payoh Singapore 319762'],
        },
      },
    ],
    status: 'SHIPPED',
    quantityOrdered: 1,
    quantityShipped: 1,
    vendor: 'TESTVENDOR DONOTSHIP',
  },
];

//Delivery Address

export const ADDRESSES = [
  {
    id: 67,
    region: { id: 0 },
    regionId: 0,
    countryId: 'SG',
    telephone: '68823000',
    postCode: '319762',
    city: 'Singapore',
    firstName: 'Jie',
    lastName: 'Shen',
    street: ['620A, Lor 1 Toa Payoh Singapore 319762'],
    isDefaultShipping: false,
    isDefaultBilling: true,
  },
  {
    id: 98,
    region: { id: 0 },
    regionId: 0,
    countryId: 'SG',
    telephone: '3847342',
    postCode: '50000',
    city: 'Ho Chi Minh',
    firstName: 'Cxa2dev_Us3',
    lastName: 'Cxa2dev_Us3',
    street: ['10 Doan Van Bo'],
    isDefaultShipping: false,
    isDefaultBilling: false,
  },
];

//Cart

export const CART = {
  id: '1933',
  isActive: true,
  isVirtual: false,
  itemsCount: 1,
  itemsQty: 2,
  items: [
    {
      id: 1096,
      sku: 'Product_01',
      quantity: 2,
      name: 'Product 01',
      price: 1000.0,
      type: 'simple',
      thumbnail: {
        id: 0,
        file:
          'https://shop.cxa2dev.com/media/catalog/product/cache/ca48c27989a3d90b22cca42748fce193/4/1/418035916060_1.png',
        position: 0,
      },
      offerType: 'deliverable',
    },
  ],
};

export const CART_TOTAL = {
  grandTotal: 2000.0,
  subTotal: 2000.0,
  discount: 0.0,
  discountedSubTotal: 2000.0,
  shipping: 0.0,
  shippingDiscount: 0.0,
  tax: 0.0,
  shippingTax: 0.0,
  subtotalIncludingTax: 2000.0,
  shippingIncludingTax: 0.0,
  currency: 'SGD',
};

export const SHIPPING = {
  shippingAddress: {
    id: 4263,
    region: { id: 0 },
    countryId: 'SG',
    telephone: '68823000',
    postCode: '319762',
    city: 'Singapore',
    firstName: 'Jie',
    lastName: 'Shen',
    street: ['620A, Lor 1 Toa Payoh Singapore 319762'],
    isSameAsBilling: false,
    saveAddress: false,
  },
  shippingCarrierCode: 'cxa',
  shippingMethodCode: 'cxa',
  options: [
    {
      carrierCode: 'cxa',
      methodCode: 'cxa',
      carrierTitle: 'Cxa shipping',
      methodTitle: 'Cxa shipping',
      priceExcludingTax: 20.0,
      price: 20.0,
    },
    {
      carrierCode: 'vendor_rates',
      methodCode: 'cxa_cxa',
      carrierTitle: 'Cxa shipping',
      methodTitle: 'Cxa shipping',
      priceExcludingTax: 20.0,
      price: 20.0,
    },
  ],
};

export const BILLING = {
  id: 4264,
  region: { id: 0 },
  countryId: 'SG',
  telephone: '3847342',
  postCode: '319762',
  city: 'Singapore',
  firstName: 'Cxa2dev_Us3',
  lastName: 'Cxa2dev_Us3',
  street: ['620A, Lor 1 Toa Payoh Singapore 319762'],
  isSameAsBilling: false,
  saveAddress: false,
};

export const PAYMENT = {
  paymentUrl:
    'https://benefits.cxa2dev.com/payment-purchase?purchaseId=3b1730e7-5eb7-41b8-93a0-f3d7ff060663',
  orderId: 294,
};

export const BANNERS = {
  items: [
    {
      bannerId: '1',
      content: 'test',
      title: 'Test Banner',
      images: 'cxa.jpg',
      group:
        'home,enable-cookies,privacy-policy-cookie-restriction-mode,cat_3,cat_8,cat_10,cat_17,cat_21,cat_23,cat_31,cat_37,cat_43,cat_45,cat_50',
      target: 'self',
      createdAt: '2020-06-03 02:50:20',
      updateAt: '2020-06-03 02:50:20',
      fromDate: '2020-04-30 00:00:00',
      toDate: '2021-05-05 00:00:00',
      status: true,
      fullImage: 'https://shop.cxa2dev.com/media/banner_api/banner/cxa.jpg',
    },
    {
      bannerId: '2',
      content: 'Coke',
      title: 'Coke',
      images: 'Coke.jpeg',
      group: 'home',
      target: 'self',
      createdAt: '2020-06-03 02:50:01',
      updateAt: '2020-06-03 02:50:01',
      fromDate: '2020-05-01 00:00:00',
      toDate: '2021-08-26 00:00:00',
      status: true,
      fullImage: 'https://shop.cxa2dev.com/media/banner_api/banner/Coke.jpeg',
    },
  ],
};
