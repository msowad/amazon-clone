import { Container, responsiveFontSizes, CssBaseline } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { StyledLayout } from './styles';
import Head from 'next/head';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/src/mui/theme';
import { useSelector } from 'react-redux';
import { selectColorMode } from '@/src/app/colorMode';
import NextNProgress from 'nextjs-progressbar';

interface Props {
  title?: string;
  description?: string;
}

const Layout: React.FC<Props> = ({ title, children, description }) => {
  const darkMode = useSelector(selectColorMode);

  return (
    <>
      <Head>
        <title>{title ? `${title} - ` : ''}Next.js Amazon Clone</title>
        {description && <meta name='description' content={description} />}
      </Head>
      <ThemeProvider theme={responsiveFontSizes(theme(darkMode))}>
        <CssBaseline />
        <NextNProgress color={theme(darkMode).palette.secondary.light} />
        <StyledLayout>
          <Header />
          <Container className='main'>
            <main className='content'>{children}</main>
          </Container>
          <Footer />
        </StyledLayout>
      </ThemeProvider>
    </>
  );
};

export default Layout;
