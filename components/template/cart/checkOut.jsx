import React, { useState, useEffect } from "react";
import createOrder from "../../hooks/createOredr";
import createPayment from "../../hooks/createPayment";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import styles from "../../..//styles/Checkout.module.css";

function CheckOut() {
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const num = cart.total + 50;
  const cartTotal = num.toString();

  const [orderId, setOrderId] = useState("");

  const [customername, setCustomername] = useState("");
  const [customemail, setCustomemail] = useState("");
  const [customeraddress, setCustomeraddress] = useState("");
  const [customercity, setCustomerCity] = useState("");
  const [customerstate, setCustomerState] = useState("");
  const [customerpincode, setCustomerPincode] = useState("");
  const [customerphone, setCustomerPhone] = useState("");
  const [customerphone2, setCustomerPhone2] = useState("");

  const [paymethod, setPaymentmethod] = useState(0);

  const initialValues = {
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    phone2: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setCustomername(formValues.name);
      setCustomemail(formValues.email);
      setCustomeraddress(formValues.address);
      setCustomerCity(formValues.city);
      setCustomerState(formValues.state);
      setCustomerPincode(formValues.pincode);
      setCustomerPhone(formValues.phone);
      setCustomerPhone2(formValues.phone2);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.address) {
      errors.address = "Address is required!";
    }
    if (!values.city) {
      errors.city = "city is required";
    }
    if (!values.state) {
      errors.state = "state is required";
    }
    if (!values.pincode) {
      errors.pincode = "pincode is required";
    }
    if (!values.phone) {
      errors.phone = "phone is required";
    }
    if (!values.phone2) {
      null;
    } else if (values.phone2.length < 10) {
      errors.phone2 = "phone must be  10 characters";
    }
    return errors;
  };
  /////////////validation---end////////////////////
  /////////////create oreder//////////////////////

  const customer = customername;
  const email = customemail;
  const Address = customeraddress;
  const City = customercity;
  const State = customerstate;
  const pinCode = customerpincode;
  const phone = customerphone;
  const phone2 = customerphone2;
  const item = cart;
  const total = cartTotal;
  const paymentmethod = paymethod;
  /////////////////////////
  const order_id = orderId;
  const order_amount = total;
  const customer_id = "customer_" + Date.now();
  const customer_name = customer;
  const customer_email = email;
  const customer_phone = phone;
  ////////////////////////////
  const err = Object.keys(formErrors).length;
  const val = Object.keys(setFormValues).length;

  ///////////////////////////
  // const [createNewOrder, setCreateNewOrder] = useState(true)

  const onLaoded = () => {
    if (isSubmit && err == 0 && val < 7 && loading == false) {
      // if (createNewOrder){
      // setCreateNewOrder(false)
      createOrder(
        customer,
        Address,
        City,
        State,
        pinCode,
        phone,
        phone2,
        item,
        email,
        total,
        paymentmethod
      ).then(function (result) {
        console.log("added");
        setLoading(true);
        if (paymethod == 1) {
          router.push(`/order/success/${result.insertedId}`);
        }

        if (paymethod == 0) {
          setOrderId(result.insertedId);
          //loading
          setLoading(true);
          //loadingend

          const order_id = result.insertedId;
          // handilClickBuy()

          createPayment(
            order_id,
            order_amount,
            customer_id,
            customer_name,
            customer_email,
            customer_phone
          ).then(function (result) {
            router.push(result?.payment_link);
            return "normalReturn";
          });
        }
        return "normalReturn";
      });
      // }
    } else {
      console.log("error");
    }
  };
  /////////////////pay-end////////////////

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.title}>Contact Information</h1>

        <div className={styles.ui_form}>
          <div className={styles.field}>
            {/* <label>Username</label> */}
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <p className={styles.error}>{formErrors.name}</p>
          <div className={styles.field}>
            {/* <label>email</label> */}
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p className={styles.error}>{formErrors.name}</p>
          <div className={styles.field}>
            {/* <label>phone</label> */}
            <input
              className={styles.input}
              type="number"
              name="phone"
              placeholder="phone"
              value={formValues.phone}
              onChange={handleChange}
            />
          </div>
          <p className={styles.error}>{formErrors.phone}</p>
          <h1 className={styles.title}>Shipping address</h1>
          <div className={styles.field}>
            {/* <label>address</label> */}
            <input
              className={styles.input}
              type="text"
              name="address"
              placeholder="Address"
              value={formValues.address}
              onChange={handleChange}
            />
          </div>
          <p className={styles.error}>{formErrors.address}</p>
          <div className={styles.field}>
            {/* <label>ciity</label> */}
            <input
              className={styles.input}
              type="text"
              name="city"
              placeholder="city"
              value={formValues.city}
              onChange={handleChange}
            />
          </div>
          <p className={styles.error}>{formErrors.city}</p>
          <div className={styles.field}>
            {/* <label>State</label> */}
            <input
              className={styles.input}
              type="text"
              name="state"
              placeholder="state"
              value={formValues.state}
              onChange={handleChange}
            />
          </div>
          <p className={styles.error}>{formErrors.state}</p>
          <div className={styles.field}>
            {/* <label>pincode</label> */}
            <input
              className={styles.input}
              type="number"
              name="pincode"
              placeholder="pincode"
              value={formValues.pincode}
              onChange={handleChange}
            />
          </div>
          <p className={styles.error}>{formErrors.pincode}</p>

          <div className={styles.field}>
            <input
              className={styles.input}
              type="number"
              name="phone2"
              placeholder="phone"
              value={formValues.phone2}
              onChange={handleChange}
            />
          </div>
          <p className={styles.error}>{formErrors.phone2}</p>
          <div className={styles.paytittl}>
            <h3 style={{fontWeight:400,fontSize:"1.4rem" ,marginTop:"2px",marginBottom:"0px"}}>Payment</h3>
            <p>All transactions are secure and encrypted.</p>
          </div>
          <div className={styles.paymentmethod}>
            <div
              className={styles.rediobutton}
              onClick={() => setPaymentmethod(0)}
            >
              <button
                className={styles.rediobuttoninner}
                style={paymethod == 0 ? { backgroundColor: "#77a31f" } : {}}
              ></button>
              <div className={styles.buttontext}>
                <p>UPI,CARDS, WALLETS NETBANKING</p>
              </div>
            </div>
            <div className={styles.line}></div>
            <div
              className={styles.rediobutton}
              onClick={() => setPaymentmethod(1)}
            >
              <button
                className={styles.rediobuttoninner}
                style={paymethod == 1 ? { backgroundColor: "#77a31f" } : {}}
              ></button>
              <div className={styles.buttontext}>
                <p>Cash on Delivery (COD)</p>
              </div>
            </div>

            {/* <button onClick={() => setPaymentmethod(1)}>
              cod:: {paymethod}
            </button> */}
          </div>
          {/* {paymethod} */}
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <>
              <div onLoad={onLaoded()}></div>
            </>
          ) : (
            <div className={styles.btn}>
              <button className={styles.button}>Submit</button>
            </div>
          )}
        </div>
      </form>
      {loading == true ? (
        <div className={styles.loading_container}>
          <div className={styles.loading}></div>
        </div>
      ) : null}
    </div>
  );
}

export default CheckOut;
