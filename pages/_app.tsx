// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {store, persistor} from "../lib/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import Layout from "../components/layout"
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
      
    </Provider>
  );
}