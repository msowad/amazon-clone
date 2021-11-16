import { PaymentMethod } from '../app/cart';
import { PAYMENT_METHODS } from './constants';

export const getPaymentMethodLabel = (
  paymentMethod: PaymentMethod
): string | undefined => {
  const label = PAYMENT_METHODS.find(
    (method) => method.value === paymentMethod
  )?.label;
  return label;
};
