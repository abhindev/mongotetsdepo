import React, { useState } from "react";
import { auth } from "../lib/firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
function Login({rooturi}) {
  console.log(rooturi)
  const [OTP, setOTP] = useState();
  const [phonenumber, setPhonenumber] = useState("");
  const [code, setCode] = useState("91")
  const [user, setUser] = useState("");

  const router = useRouter();
  // console.log("+" + code + phonenumber);
  const generateRecaptchaVerifier = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
      },
      auth
    );
  };

  const requestOtp = () => {
    generateRecaptchaVerifier();
    let phone = "+"+ code+ phonenumber;
console.log(phone)
    let captcha = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, captcha)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
        console.log("sentOtp");
      })
      .catch((error) => {
        // Error; SMS not sent
        grecaptcha.reset(window.recaptchaWidgetId);
        console.log(error);
      });
  };
  const verifyOtp = (e) => {
    let otp = e.target.value;
    setOTP(otp);
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(user.phoneNumber);
          setUser(user.phoneNumber);
          Cookies.set("loggedin");
          router.push("/");
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };
  // if(user.length>9){
  //   router.push({ path: '/' })
  // }
  const handleChange = (event) => {
    setPhonenumber(event.target.value);

    // console.log("value is:", event.target.value);
  };
  const handleChangeCode = (event) => {
    setCode("+"+event.target.value);

    // console.log("value is:", event.target.value);
  };
  return (
    <div className={styles.container}>
      <div id="recaptcha-container"></div>
      <div className={styles.box}>
        <div className={styles.imgcontainer}>

        <img src="/logo.png" alt="" className={styles.img}/>
        </div>
        <div className={styles.title}>
          <h3>Create an acount</h3>
          <button>X</button>
        </div>
        <div className={styles.input}>
          <input
            placeholder="+91"
            type="number"
            id=""
            name=""
            onChange={handleChangeCode}
            value={code}
          />
          <input
            placeholder="phone"
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={phonenumber}
          />
        </div>

        <button onClick={() => requestOtp()}>ok</button>

        <input type="number" id="otp-input" value={OTP} onChange={verifyOtp} />
      </div>
      <h1>{user}</h1>
    </div>
  );
}

export default Login;
