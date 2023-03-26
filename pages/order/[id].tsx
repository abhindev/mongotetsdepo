import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import clientPromise from '../../lib/mongodb'
import { MongoClient, ObjectId } from 'mongodb';
// import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../lib/redux/cartSlice";
import Link from "next/link";
import Details from "../../components/template/products/Details";
import { useRouter } from 'next/router'
// import Slider from "../../components/slider"

const Order = ({ product, products }: any) => {
  

  return (
    <>
      hi order
    </>
  );
};

interface Params {
    id: string;
  }

export const getServerSideProps = async ({ params }: { params: Params }) => {
    try {
        const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MongoDB connection string is missing.');
}

const client = await MongoClient.connect(uri);
const db = client.db('kalianiammas');
      const order = await db
        .collection('orders')
        .findOne({ _id: new ObjectId(params.id) });
  
      console.log(order);
  
      return {
        props: {
            order: JSON.parse(JSON.stringify(order)),
        },
      };
    } catch (error) {
      console.error(error);
      return {
        props: {
            order: null,
        },
      };
    }
  };

export default Order;