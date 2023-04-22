import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import styles from "../styles/Home.module.css";
import Featured from "../components/tools/Featured";
import PoductList from "../components/template/products/productlist";
import Review from "../components/tools/ytReview";
import { NextSeo } from 'next-seo';


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
  <title>Kalyaniammas - Premium Organic Hair Oil</title>

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
      <main>
        <Featured />
        <PoductList products={products} />
        <Review />
      </main>
    </div>
  );
}
