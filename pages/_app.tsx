import "../styles/globals.css";

import type { AppProps } from "next/app";
import {store, persistor} from "../lib/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import Layout from "../components/layout"
import { useRouter } from 'next/router';
import {Transition} from "react-transition-group"


import Head from 'next/head';
import { useEffect, useState } from 'react';


export default function App({ Component, pageProps }: AppProps) {
  const [title, setTitle] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Set the title based on the current route
    switch (router.pathname) {
      case '/':
        setTitle('next');
        break;
      default:
        setTitle('My App');
        break;
    }
  }, [router.pathname]);

  return (
    <Provider store={store}>
      <Head>
  <title>Kalyaniammas - Stor</title>

  <link rel="icon" href="/favicon.ico" />

  {/* Meta tags for SEO */}
  <meta name="description" content="Kalyaniyammas Hair Drops is a premium organic hair oil that is carefully crafted with 100% natural coconut oil and herbs." />
  <meta name="keywords" content="Kalyaniammas, Kalyaniamma hair oil, Kalyaniammas hair drops, organic hair oil, coconut oil, herbs, natural hair care" />
  <meta name="author" content="Your Name" />

  {/* Meta tags for social sharing */}
  <meta property="og:title" content="Kalyaniammas - Premium Organic Hair Oil" />
  <meta property="og:description" content="Kalyaniyammas Hair Drops is a premium organic hair oil that is carefully crafted with 100% natural coconut oil and herbs." />
  <meta property="og:image" content="/your-image-url.jpg" />
  <meta property="og:url" content="https://www.yourwebsite.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Kalyaniammas" />

  {/* Meta tags for Twitter */}
  <meta name="twitter:title" content="Kalyaniammas - Premium Organic Hair Oil" />
  <meta name="twitter:description" content="Kalyaniyammas Hair Drops is a premium organic hair oil that is carefully crafted with 100% natural coconut oil and herbs." />
  <meta name="twitter:image" content="/your-image-url.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@yourtwitterhandle" />

  {/* Meta tags for mobile devices */}
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  {/* Meta tags for browser theme */}
  <meta name="theme-color" content="#77a31f" />
  <meta name="msapplication-navbutton-color" content="#77a31f" />
  <meta name="apple-mobile-web-app-status-bar-style" content="#77a31f" />
</Head>

       <PersistGate loading={null} persistor={persistor}>
        <Layout >
          <Transition
        key={router.route}
        timeout={300}
        classNames="page"
      >
          <Component {...pageProps} />
          </Transition>
        </Layout>
      </PersistGate>
      
    </Provider>
  );
}