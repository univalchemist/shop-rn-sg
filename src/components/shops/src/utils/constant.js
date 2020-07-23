export const DATE_FORMAT_SHORT = 'DD-MM-YYYY';
export const DATE_FORMAT_LONG = 'DD MMMM YYYY';
export const DATE_FORMAT_1 = 'MMM Do, YYYY';

const CANCELED = 0;
const COMPLETE = 1;
const PENDING = 2;
const REVERSED = 3;
const PROCESSING = 4;

export const ORDER_STATUS = {
  CANCELED,
  COMPLETE,
  PENDING,
  REVERSED,
  PROCESSING,
};

export const ORDER_STATUS_STRING = {
  CANCELED: 'CANCELED',
  COMPLETE: 'COMPLETE',
  PENDING: 'PENDING',
  REVERSED: 'REVERSED',
  PROCESSING: 'PROCESSING',
};

export const USER_ID_FOR_SHOP = 'USER_ID_FOR_SHOP';

export const DELIVERY_TYPE = {
  SELF_COLLECTION: 'selfcollection',
  DELIVERY: 'delivery',
};

export const PRODUCT_TYPE = {
  VIRTUAL: 'virtual',
  SIMPLE: 'simple',
};

export const OFFER_TYPE = {
  E_VOUCHER: 'evoucher',
  DELIVERABLE: 'deliverable',
};
