import { CookieAttributes } from 'js-cookie';

export const MAX_SNACK = 3;

export const PAYMENT_METHODS = [
  {
    label: 'Stripe',
    value: 'stripe',
  },
  {
    label: 'Cash on delivery',
    value: 'cod',
  },
];

export const COOKIES_DEFAULT_OPTIONS: CookieAttributes = {
  expires: 365,
};

export const STRIPE_SUCCESS_URL = (oid: string) =>
  `${process.env.FRONT_END_URL}/orders/${oid}?success=true`;
export const STRIPE_CANCEL_URL = (oid: string) =>
  `${process.env.FRONT_END_URL}/orders/${oid}?success=false`;
