import FormWrapper from '@/src/components/FormWrapper';
import { Layout } from '@/src/components/Layout';
import axios from '@/src/utils/axios';
import { LockOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import React from 'react';
import * as yup from 'yup';

interface Props {
  email: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const ForgotPassword: React.FC<Props> = ({ email }) => {
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    email,
  };

  const handleSubmit = async (values: any, setErrors: any,setFieldValue:any) => {
    try {
      const { data } = await axios.post('/auth/forgot-password', values);
      enqueueSnackbar(data.message, { variant: 'success' });
      setFieldValue('email', '', false);
    } catch (error: any) {
      setErrors({ email: error.message });
    }
  };

  return (
    <Layout title='Forgot password'>
      <FormWrapper title='Forgot password' icon={<LockOutlined />}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting, setErrors,setFieldValue }) => {
            await handleSubmit(values, setErrors,setFieldValue);
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
              <LoadingButton
                loading={isSubmitting}
                type='submit'
                fullWidth
                color='primary'
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                send password reset link
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Layout>
  );
};

export default ForgotPassword;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      email: query.email,
    },
  };
};
