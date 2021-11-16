import { PaymentMethod, updatePaymentMethod } from '@/src/app/cart';
import CheckoutStepper from '@/src/components/CheckoutStepper';
import FormWrapper from '@/src/components/FormWrapper';
import { Layout } from '@/src/components/Layout';
import { MonetizationOn } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Box } from '@mui/system';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  cachedPaymentMethod: PaymentMethod;
}

const Payment: React.FC<Props> = ({ cachedPaymentMethod }) => {
  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethod>(cachedPaymentMethod);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updatePaymentMethod(paymentMethod));
    router.push('/checkout/confirmation');
  };

  return (
    <Layout title='Complete payment'>
      <Box sx={{ mb: 4 }}>
        <CheckoutStepper activeStep={2} enableHref />
      </Box>
      <FormWrapper title='Select payment method' icon={<MonetizationOn />}>
        <form onSubmit={handleSubmit} noValidate>
          <Box sx={{ mb: 2 }}>
            <FormControl component='fieldset'>
              <RadioGroup
                aria-label='payment method'
                value={paymentMethod}
                name='paymentMethod'
                onChange={(e) =>
                  setPaymentMethod(e.target.value as PaymentMethod)
                }
              >
                <FormControlLabel
                  value='stripe'
                  control={<Radio />}
                  label='Stripe'
                />
                <FormControlLabel
                  value='cod'
                  control={<Radio />}
                  label='Cash on delivery'
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <LoadingButton
            type='submit'
            fullWidth
            color='primary'
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Complete payment
          </LoadingButton>
          <NextLink href='/checkout' passHref>
            <Button fullWidth>Edit shipping details</Button>
          </NextLink>
        </form>
      </FormWrapper>
    </Layout>
  );
};

export default Payment;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cartItems = req.cookies.cartItems
    ? JSON.parse(req.cookies.cartItems)
    : [];
  if (!cartItems.length) {
    return {
      redirect: {
        destination: '/cart',
        permanent: true,
      },
    };
  }

  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?redirect=checkout',
        permanent: true,
      },
    };
  }

  const cachedPaymentMethod = req.cookies.paymentMethod;

  return {
    props: {
      cachedPaymentMethod,
    },
  };
};
