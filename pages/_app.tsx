import { store } from '@/src/app/store';
import createEmotionCache from '@/src/mui/createEmotionCache';
import { MAX_SNACK } from '@/src/utils/constants';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import { Provider } from 'react-redux';
import '../src/styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Amazon clone</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={MAX_SNACK}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <SessionProvider>
            <Component {...pageProps} />
          </SessionProvider>
        </SnackbarProvider>
      </Provider>
    </CacheProvider>
  );
}
