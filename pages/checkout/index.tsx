import {
  selectShippingDetails,
  ShippingDetails,
  updateShippingDetails,
} from '@/src/app/cart';
import CheckoutStepper from '@/src/components/CheckoutStepper';
import FormWrapper from '@/src/components/FormWrapper';
import { Layout } from '@/src/components/Layout';
import { LocalShipping } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Link, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

interface Props {
  session: Session;
  shippingDetails?: ShippingDetails;
}

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  postalCode: yup.string().required('Postal code is required'),
  country: yup.string().required('Country is required'),
});

const Checkout: React.FC<Props> = ({ session, shippingDetails }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = {
    name: shippingDetails?.name.length
      ? shippingDetails?.name
      : session?.user?.name,
    address: shippingDetails?.address,
    city: shippingDetails?.city,
    postalCode: shippingDetails?.postalCode,
    country: shippingDetails?.country,
  };

  const handleRegister = async (values: any) => {
    dispatch(updateShippingDetails(values));
    router.push('/checkout/payment');
  };

  return (
    <Layout title='Checkout'>
      <Box sx={{ mb: 4 }}>
        <CheckoutStepper activeStep={1} />
      </Box>

      <FormWrapper
        title='Enter shipping details'
        icon={<LocalShipping />}
        maxWidth='md'
      >
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            await handleRegister(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <TextField
                margin='normal'
                fullWidth
                required
                name='name'
                label='Full name'
                value={values.name}
                variant='filled'
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                autoFocus
              />
              <TextField
                margin='normal'
                fullWidth
                required
                name='address'
                label='Address'
                multiline
                rows={2}
                value={values.address}
                variant='filled'
                onChange={handleChange}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
              />
              <TextField
                margin='normal'
                fullWidth
                required
                name='city'
                label='City'
                value={values.city}
                variant='filled'
                onChange={handleChange}
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
              />
              <TextField
                margin='normal'
                fullWidth
                required
                name='postalCode'
                label='Postal code'
                value={values.postalCode}
                variant='filled'
                onChange={handleChange}
                error={touched.postalCode && Boolean(errors.postalCode)}
                helperText={touched.postalCode && errors.postalCode}
              />
              <TextField
                margin='normal'
                fullWidth
                required
                name='country'
                label='Country'
                value={values.country}
                variant='filled'
                onChange={handleChange}
                error={touched.country && Boolean(errors.country)}
                helperText={touched.country && errors.country}
              />
              <LoadingButton
                loading={isSubmitting}
                type='submit'
                fullWidth
                color='primary'
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Proceed to payment
              </LoadingButton>
              <Grid container>
                <Grid item>
                  <NextLink href='/' passHref>
                    <Link variant='body2'>Continue shopping</Link>
                  </NextLink>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Layout>
  );
};

export default Checkout;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?redirect=checkout',
        permanent: true,
      },
    };
  }

  const shippingDetails = req.cookies.shippingDetails
    ? JSON.parse(req.cookies.shippingDetails)
    : {};

  return {
    props: {
      session,
      shippingDetails,
    },
  };
};
