import { CookieAttributes } from "js-cookie";

export const MAX_SNACK = 3;

export const PAYMENT_METHODS = [
  {
    label: "Stripe",
    value: "stripe",
  },
  {
    label: "Cash on delivery",
    value: "cod",
  },
];

export const COOKIES_DEFAULT_OPTIONS: CookieAttributes = {
  expires: 365,
};

export const TAX_RATE = 0.15;
export const SHIPPING_PRICE = 15;
