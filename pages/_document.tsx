import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}