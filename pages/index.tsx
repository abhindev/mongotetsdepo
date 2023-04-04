import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { InferGetServerSidePropsType } from 'next'
import styles from "../styles/Home.module.css"
import Featured from "../components/tools/Featured"
import PoductList from "../components/template/products/productlist"


export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("kalianiammas");
    
    const Data = await db.collection("products").find({}).toArray();
    const properties = JSON.parse(JSON.stringify(Data))
    return {
      props: { products: properties },
    }
  } catch (e) {
    console.error(e)
  }
}

export default function Home({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Featured/>
      <PoductList products={products}/>
      </main>
    </div> 
  )
}
