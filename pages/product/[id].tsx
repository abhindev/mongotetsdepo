import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import clientPromise from "../../lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../lib/redux/cartSlice";
import Link from "next/link";
import Details from "../../components/template/products/Details";
import { useRouter } from "next/router";
// import Slider from "../../components/slider"
import Slider from "../../components/tools/Slider";


interface Params {
  id: string;
}

export const getServerSideProps = async ({ params }: { params: Params }) => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MongoDB connection string is missing.");
    }

    const client = await MongoClient.connect(uri);
    const db = client.db("kalianiammas");
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(params.id) });

    // console.log(product);

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        product: null,
      },
    };
  }
};




const Product = ({ product, products }: any) => {
  // console.log(pizzas)
  const [price, setPrice] = useState(product.prices[0].price);
  const [selection, setSelection] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [variant, serVariant] = useState(product.prices[0].text);
  const [img, setImg] = useState(product.prices[selection].img);
  const dispatch = useDispatch();
  const router = useRouter();

  console.log(product);
  console.log(img);

  const handleClickPrice = (size: any) => {
    console.log(size.price);
    console.log(size.text);
    setPrice(size.price);
    serVariant(size.text);
  };
  // console.log(product.prices[0].text);
  // const changePrice = (number: any) => {
  //   setPrice(price + number);
  // };

  // const handleSize = (sizeIndex: any) => {
  //   const difference = product.prices[sizeIndex] - product.prices[size];
  //   setSize(sizeIndex);
  //   changePrice(difference);
  // };

  // const handleChange = (e: any, option: any) => {
  //   const checked = e.target.checked;

  //   if (checked) {
  //     changePrice(option.price);
  //     setExtras((prev): any => [...prev, option]);
  //   } else {
  //     changePrice(-option.price);
  //     // setExtras(extras.filter((extra) => extra._id !== option._id));
  //   }
  // };
  

  const addQuantity = () => {
    setQuantity(Number(quantity) + 1);
  };
  const removeQuantity = () => {
    setQuantity(Number(quantity) - 1);
  };

  const handleClickAddtoCart = () => {
    dispatch(addProduct({ ...product, price, quantity, variant }));
  };
  const handleClickBuy = () => {
    dispatch(addProduct({ ...product, price, quantity, variant }));
    router.push("/cart");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.imgContainer}>
          <Slider imageArray={img}/> 
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.title}>{product.title}</p>
          <span className={styles.price}>₹ {price}</span>
          <div className={styles.decsDiv}>
            <p className={styles.desc}>{product.desc}</p>
          </div>
          {Object.keys(product.prices).length !== 1 ?<h3 className={styles.choose}>Choose the size</h3> : ""}
          
          <div className={styles.sizes}>
            {Object.keys(product.prices).length !== 1 ? <>{product.prices.map((size: any, i: number) => (
              <div className={styles.size} key={i}>
              <h1
                style={{
                  backgroundColor: i == selection ? "#76A11F" : "white",
                  color: i == selection ? "white" : "black",
                }}
                className={styles.number}
                onClick={(e) => {
                  {
                    handleClickPrice(size);
                  }
                  setSelection(i);
                  setImg(product.prices[i].img);
                }}
              >
                {size.text}
              </h1>
            </div> 
            ))} </>: ''}
            
          </div>

          <div className={styles.add}>
            {/*<div className={styles.quantity}>
               <button
                className={styles.quantity_button}
                onClick={() => {
                  quantity > 1 ? removeQuantity() : null;
                }}
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                className={styles.quantity_button}
                onClick={() => addQuantity()}
              >
                +
              </button>
            </div> */}
            <button
              className={styles.button}
              onClick={handleClickBuy}
              style={{ backgroundColor: "#76A11F" }}
            >
              BUY NOW
            </button>
            <button className={styles.button} onClick={handleClickAddtoCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div>
        <Details product={product} />
        <p style={{ textAlign: "center", fontSize: "13px" ,whiteSpace: 'pre'}}>
          {/* `{"xhmvb \n ashgjdbc"}` */}
          {"line1 \n line w"}
        </p>
        {/* <Slider pizza={pizzas}/> */}
      </div>
      <div>
        <h1 style={{ marginLeft: "10%", fontSize: "15px" }}>User reviews</h1>
      </div>
    </>
  );
};



export default Product;


