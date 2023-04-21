import React, { useState, useRef, useEffect } from "react";
import { auth } from "../../lib/firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.css";
import Createuser from "./createUser";

let currentOTPindex = 0;
function Login(setIsOpen) {
  const [phonenumber, setPhonenumber] = useState("+91");
  const [FormChainge, setFormChainge] = useState(false);
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState("");

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [ActiveOTPIndex, setActiveOTPIndex] = useState(0);
  const inputRef = useRef(null);

  const [error, setError] = useState();

  const router = useRouter();

  const generateRecaptchaVerifier = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };
  

  const requestOtp = () => {
    setLoad(true)
    generateRecaptchaVerifier();

    const phonenum = (phone) =>{
      // console.log(phone.length)

      if (phone.length == 10) {
        const phone1 = ("+91"+phone)
        console.log(phone1)
        return(phone1)
      }if(phone.length == 12){
        const phone1 = ("+"+phone)
        console.log(phone1)
        return(phone1)
      }else {
        console.log(phone)
        return(phone)
      }

    }
    
    let phone = phonenum(phonenumber)

    
    // console.log(phone)


    let captcha = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, captcha)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // ...

        setFormChainge(true);
      })
      .catch((error) => {
        // Error; SMS not sent
        grecaptcha.reset(window.recaptchaWidgetId);
        console.log(error);
      });
  };
  const verifyOtp = (otp) => {
    let otpconfirm = otp[0] + otp[1] + otp[2] + otp[3] + otp[4] + otp[5];
    // setOTP(otp);

    if (otpconfirm.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otpconfirm)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;

          setUser(user.phoneNumber);
          Cookies.set("loggedin", user.phoneNumber);

          Createuser(user);
          // router.push("/");
          router.reload();
          // ...
        })
        .catch((error) => {
          setError("error");
          console.log("error");
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };

  const handleChange = (event) => {
    setPhonenumber(event.target.value);
  };
  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const handelChainge = ({ target }) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[currentOTPindex] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (!value) {
      setActiveOTPIndex(currentOTPindex - 1);
    } else {
      setActiveOTPIndex(currentOTPindex + 1);
    }
  };
  const handleOnKeyDown = ({ key }, index) => {
    currentOTPindex = index;
    if (key === "Backspace") {
      setActiveOTPIndex(currentOTPindex - 1);
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
    verifyOtp(otp);
  }, [ActiveOTPIndex]);

  console.log(error == "error");
  return (
    <div className={styles.container}>
      <div id="recaptcha-container"></div>
      <div className={styles.box}>
        <>
          <div className={styles.imgcontainer}>
            <h1 style={{ margin: "1px" }}>Welcome.</h1>
            <p style={{ fontSize: "12px" }}>
              Welcome to our website! We're thrilled that you've decided to sign
              up with us. As a valued member of our community, you'll gain
              access to exclusive features, benefits, and exciting
              opportunities. We can't wait to have you on board and provide you
              with an exceptional experience. Thank you for choosing us, and we
              look forward to serving you!
            </p>
          </div>
          <div className={styles.title}>
            { FormChainge == false ? (
            <h3>Create an acount</h3>) : (
              <div style={{display:"flex", justifyContent: "center"}}>
            <h3 >ENTER OTP</h3>
            </div>
            )
            }
            
          </div>
        </>
        {FormChainge == false ? (
          <>
            <div className={styles.field}>
              {/* <input
                placeholder="+91"
                maxlength="4"
                type="number"
                id="code"
                name="code"
                onChange={handleChangeCode}
                value={code}
                className={styles.code}
                // className={styles.input}
              /> */}
              <input
                placeholder="phone"
                type="number"
                id="phone"
                name="phone"
                onChange={handleChange}
                value={phonenumber}
                className={styles.input}
              />
            </div>
            {FormChainge == false ?
        <button onClick={() => requestOtp()} className={styles.button}>
          <div style={{color:"#ffff"}}>{!load ?"Send OTP": "Loadding..."}</div>
        </button>: ''}
          </>
        ) : (
          <div>
          <div className={styles.otpbase}>
            <div className={styles.container}>
            {otp.map((_, index) => {
              return (
                <div key={index}>
                  <input
                    className={styles.inp}
                    ref={index === ActiveOTPIndex ? inputRef : null}
                    value={otp[index]}
                    onKeyDown={(e) => handleOnKeyDown(e, index)}
                    type="number"
                    onChange={(e) => handelChainge(e)}
                  />
                  
                </div>
              );
            })}
            </div>
            
            <div className={styles.invalidOtp}>
              {error == "error" ? <p>Invalid OTP Code</p> : ""}
            </div>
            
          </div>
          {/* <button onClick={()=>setLoad(true)}>verify</button> */}
          </div>
          
          
        )}
      </div>
      {/* {load ?<div style={{width:"100vw",height:"100vh",backgroundColor:"red"}}>hay</div>:""} */}
      
    </div>
  );
}

export default Login;
