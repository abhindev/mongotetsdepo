import styles from "../../styles/Product.module.css";
import { useState } from "react";
import { MongoClient, ObjectId } from "mongodb";
import { useDispatch } from "react-redux";
import { addProduct } from "../../lib/redux/cartSlice";
import Details from "../../components/template/products/Details";
import { useRouter } from "next/router";
import Slider from "../../components/tools/Slider";
import CarouselSlider from "../../components/tools/productSilde";
import Link from "next/link";
import AddReview from "../../components/template/products/addReview"
import Review from "../../components/template/products/review"
import Form from "../../components/template/form";
interface Params {
  id: string;
}

export const getServerSideProps = async ({ params }: { params: Params } ) => {
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
    const Data = await db.collection("products").find({}).toArray();
    
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        products: JSON.parse(JSON.stringify(Data)),
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

const Product = ({ product, products }: any, ) => {
  const [price, setPrice] = useState(product.prices[0].price);
  const [selection, setSelection] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [variant, serVariant] = useState(product.prices[0].text);
  const [img, setImg] = useState(product.prices[selection].img);
  const dispatch = useDispatch();
  const router = useRouter();



  const reviews = product.reviews
  const handleClickPrice = (size: any) => {
    // console.log(size.price);
    // console.log(size.text);
    setPrice(size.price);
    serVariant(size.text);
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
          {Object.keys(product.prices).length !== 1 ? (
            <h3 className={styles.choose}>Choose the size</h3>
          ) : (
            ""
          )}

          <div className={styles.sizes}>
            {Object.keys(product.prices).length !== 1 ? (
              <>
                {product.prices.map((size: any, i: number) => (
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
                ))}{" "}
              </>
            ) : (
              ""
            )}
          </div>

          <div className={styles.add}>
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
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3 style={{ fontSize: "1.3rem" }}>Related Products</h3>
        </div>
        <div
          style={{
            width: "98vw",
          }}
        >
          <CarouselSlider>
            {products.map((item: any, i: number) => (
              <div key={i}>
                <a href={`/product/${item._id}`}>
                  <img
                    src={item.img[0]}
                    alt={`Image ${i + 1}`}
                    style={{
                      maxHeight: "250px",
                      minHeight: "30px",
                      height: "30vw",
                      backgroundColor: "red",
                    }}
                  />
                </a>
              </div>
            ))}
          </CarouselSlider>
        </div>
      </div>
      <div>
        <h1 style={{ marginLeft: "10%", fontSize: "15px" }}>User reviews</h1>
        <Review reviews={reviews}/>
      <AddReview id={product}/>
      </div>
      
    </>
  );
};

export default Product;
