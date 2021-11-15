import { Container } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { StyledLayout } from './styles';
import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
}

const Layout: React.FC<Props> = ({ title, children, description }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - ` : ''}Next.js Amazon Clone</title>
        {description && <meta name='description' content={description} />}
      </Head>
      <StyledLayout>
        <Header />
        <Container className='main'>
          <main className='content'>{children}</main>
        </Container>
        <Footer />
      </StyledLayout>
    </>
  );
};

export default Layout;
