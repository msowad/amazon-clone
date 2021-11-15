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
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Test: React.FC<Props> = () => {
  return (
    <Layout title='Register'>
      <AuthWrapper title='Create new account'>
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
                fullWidth
                required
                name='name'
                label='Full name'
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                autoFocus
              />
              <TextField
                margin='normal'
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
              <TextField
                margin='normal'
                fullWidth
                required
                name='confirmPassword'
                label='Confirm Password'
                value={values.confirmPassword}
                onChange={handleChange}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              <LoadingButton
                loading={isSubmitting}
                type='submit'
                fullWidth
                color='primary'
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </LoadingButton>
              <Grid container>
                <Grid item>
                  <NextLink href='/login' passHref>
                    <Link variant='body2'>Already have an account? Login</Link>
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

export default Test;
