import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import styles from "../styles/Home.module.css";
import Featured from "../components/tools/Featured";
import PoductList from "../components/template/products/productlist";
import Review from "../components/tools/ytReview";



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
      <main>
        <Featured />
        <PoductList products={products} />
        <Review />
      </main>
    </div>
  );
}
