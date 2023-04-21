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
        <title>Kalyaniammas</title>
        
        <link rel="icon" href="/favicon.ico" />
        {/* <!-- Chrome, Firefox OS and Opera --> */}
        <meta name="theme-color" content="#77a31f" />
        {/* <!-- Windows Phone --> */}
        <meta name="msapplication-navbutton-color" content="#77a31f" />
        {/* <!-- iOS Safari --> */}
        <meta name="apple-mobile-web-app-status-bar-style" content="#77a31f" />
        {/*  */}
        <meta name="keywords" content="Kalyaniammas, Kalyaniamma hair oil, Kalyaniammas hair drops"/>
        <meta name="description" content="Kalyaniyammas Hair Drops is a premium organic hair oil that is carefully crafted with 100% natural coconut oil and herbs."/>
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