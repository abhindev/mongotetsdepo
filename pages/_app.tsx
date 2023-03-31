import "../styles/globals.css";

import type { AppProps } from "next/app";
import {store, persistor} from "../lib/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import Layout from "../components/layout"
import { useRouter } from 'next/router';
import {Transition} from "react-transition-group"
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Provider store={store}>
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