import AuthWrapper from '@/src/components/AuthWrapper';
import { Layout } from '@/src/components/Layout';
import { LoadingButton } from '@mui/lab';
import { Grid, Link, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import React from 'react';
import * as yup from 'yup';

interface Props {
  //
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

const Login: React.FC<Props> = () => {
  return (
    <Layout title='Login'>
      <AuthWrapper title='Login to your account'>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
            }, 400);
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
                autoFocus
                fullWidth
                required
                name='email'
                label='Email'
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin='normal'
                fullWidth
                required
                name='password'
                label='Password'
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <LoadingButton
                loading={isSubmitting}
                type='submit'
                fullWidth
                color='primary'
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </LoadingButton>
              <Grid container>
                <Grid item>
                  <NextLink href='/register' passHref>
                    <Link variant='body2'>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </NextLink>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </AuthWrapper>
    </Layout>
  );
};

export default Login;
