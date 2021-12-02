import FormWrapper from '@/src/components/FormWrapper';
import { Layout } from '@/src/components/Layout';
import axios from '@/src/utils/axios';
import { AccountBox } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession, signIn } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import React from 'react';
import * as yup from 'yup';

interface Props {
  session: Session;
}

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  password: yup.string().required('Password is required'),
  newPassword: yup.string().required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Profile: React.FC<Props> = ({ session }) => {
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    name: session.user.name,
    email: session.user.email,
    password: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleUpdate = async (
    values: any,
    setErrors: any,
    setFieldValue: any
  ) => {
    try {
      const { data } = await axios.post('/auth/update', values);
      signIn('credentials', {
        ...data,
        password: values.newPassword,
        redirect: false,
      });
      setFieldValue('password', '', false);
      setFieldValue('newPassword', '', false);
      setFieldValue('confirmPassword', '', false);
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (e: any) {
      const { field, message } = e.response.data;
      if (field) {
        setErrors({ [field]: message });
      } else {
        enqueueSnackbar(message, { variant: 'error' });
      }
    }
  };

  return (
    <Layout title='Profile'>
      <FormWrapper title='Update profile information' icon={<AccountBox />}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={async (
            values,
            { setSubmitting, setErrors, setFieldValue }
          ) => {
            await handleUpdate(values, setErrors, setFieldValue);
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
                name='name'
                label='Name'
                variant='filled'
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                margin='normal'
                fullWidth
                disabled
                name='email'
                label='Email'
                variant='filled'
                value={values.email}
              />
              <TextField
                margin='normal'
                fullWidth
                required
                name='password'
                label='Password'
                variant='filled'
                type='password'
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <TextField
                margin='normal'
                fullWidth
                required
                name='newPassword'
                label='New password'
                variant='filled'
                type='password'
                value={values.newPassword}
                onChange={handleChange}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
              />
              <TextField
                margin='normal'
                fullWidth
                required
                name='confirmPassword'
                label='Confirm password'
                variant='filled'
                type='password'
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
                update
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Layout>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
