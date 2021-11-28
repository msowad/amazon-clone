import FormWrapper from '@/src/components/FormWrapper';
import { Layout } from '@/src/components/Layout';
import { LockOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Link, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
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
  const router = useRouter();
  const { redirect } = router.query;

  const handleLogin = async (values: any, setErrors: any) => {
    const data: any = await signIn('credentials', {
      redirect: false,
      ...values,
    });
    if (data?.error) {
      setErrors({
        email: data.error,
        password: data.error,
      });
    } else {
      router.push(redirect ? '/' + redirect : '/');
    }
  };

  return (
    <Layout title='Login'>
      <FormWrapper title='Login to your account' icon={<LockOutlined />}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            await handleLogin(values, setErrors);
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
                autoFocus
                fullWidth
                required
                name='email'
                label='Email'
                variant='filled'
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
                variant='filled'
                value={values.password}
                type='password'
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <NextLink
                href={`/auth/forgot-password?email=${values.email}`}
                passHref
              >
                <Link color='inherit' variant='body2'>
                  Forgot password?
                </Link>
              </NextLink>
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
              <NextLink
                href={`/auth/register${
                  router.query.redirect
                    ? `?redirect=${router.query.redirect}`
                    : ''
                }`}
                passHref
              >
                <Link color='inherit' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </NextLink>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Layout>
  );
};

export default Login;
