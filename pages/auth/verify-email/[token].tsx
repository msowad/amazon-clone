import { Layout } from '@/src/components/Layout';
import axios from '@/src/utils/axios';
import { Alert, AlertTitle, Container, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';

interface Props {
  data: { success: boolean; message: string };
  error: string;
  loggedIn: boolean;
}

const VerifyEmail: React.FC<Props> = ({ data, error, loggedIn }) => {
  return (
    <Layout>
      <Container maxWidth='xs'>
        {error && (
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        {data.success && (
          <Alert severity='success'>
            <AlertTitle>{data.message}</AlertTitle>
            {loggedIn ? (
              <NextLink href='/' passHref>
                <a>Go to home page</a>
              </NextLink>
            ) : (
              <NextLink href='/auth/login' passHref>
                <a>Login now</a>
              </NextLink>
            )}
          </Alert>
        )}
      </Container>
    </Layout>
  );
};

export default VerifyEmail;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const session = await getSession({ req });

  let props = { data: {}, error: '', loggedIn: session?.user !== null };

  try {
    const { data } = await axios.post('/auth/verify-email', {
      token: query.token,
    });
    props.data = data;
  } catch (error: any) {
    props.error = error.response.data.message || error.message;
  }

  return {
    props,
  };
};
