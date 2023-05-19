import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import styles from "../styles/Home.module.css";
import Featured from "../components/tools/Featured";
import PoductList from "../components/template/products/productlist";
import Review from "../components/tools/ytReview";
import { NextSeo } from "next-seo";
import Whatsapp from "../components/tools/whatsapp";

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("kalianiammas");

    const Data = await db.collection("products").find({}).toArray();
    const properties = JSON.parse(JSON.stringify(Data));
    return {
      props: { products: properties },
    };
  } catch (e) {
    console.error(e);
  }
}

export default function Home({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kalyani amma Hair oil</title>

        <link rel="icon" href="/logo.png" />

        {/* Meta tags for SEO */}
        <meta
          name="description"
          content="Our products are carefully crafted
using natural ingredients that are known for
their beneficial properties to promote
healthy hair growth"
        />
        <meta
          name="keywords"
          content="kalyani amma hair oil,
how to make hair growth oil,
top hair oil for male,
top hair oil for ladies,
top hair oil for ladies in india,
top hair oil for ladies in kerala,
which is best hair growth oil available in india,
which is best affordable hair growth oil,
which is best affordable hair growth hair oils,
which is best affordable hair growth hair oils india,
best working hair oils,
best working hair oils for hair growth,
best working hair oils for dandruff,
best working hair oils for premature greying,
best result hair oils for premature greying,
best result hair oils for hair growth,
best hair oil for daily use,
which is the best hair oil for daily use,
which is the best hair care oil,
which is the best hair care oil in india,
which is the best hair care oil in kerala,
which is the best ayurvedic hair oil in kerala,"
        />
        <meta name="author" content="Abhin dev" />

        {/* Meta tags for social sharing */}
        <meta property="og:title" content="Kalyaniammas Hair Oil" />
        <meta
          property="og:description"
          content="Our products are carefully crafted
using natural ingredients that are known for
their beneficial properties to promote
healthy hair growth"
        />
        <meta property="og:image" content="/hero/web home.webp" />
        <meta property="og:url" content="https://www.kalyaniammas.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kalyaniammas" />

        {/* Meta tags for mobile devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Meta tags for browser theme */}
        <meta name="theme-color" content="#77a31f" />
        <meta name="msapplication-navbutton-color" content="#77a31f" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#77a31f" />
        <script>
    {`!function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '452105277009480');
    fbq('track', 'PageView');`}
  </script>
  <noscript>
    <img
      height="1"
      width="1"
      style={{ display: 'none' }}
      alt="fb-pixel"
      src="https://www.facebook.com/tr?id=452105277009480&ev=PageView&noscript=1"
    />
  </noscript>
      </Head>
      <main>
        <Featured />
        <PoductList products={products} />
        <Review />
        <Whatsapp />
      </main>
    </div>
  );
}
