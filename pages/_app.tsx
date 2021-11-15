import { store } from '@/src/app/store';
import createEmotionCache from '@/src/mui/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
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
        <Component {...pageProps} />
      </Provider>
    </CacheProvider>
  );
}
