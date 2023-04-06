import React, { useState } from 'react'
import { auth } from "../lib/firebase/firebase"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function Login() {
  const [OTP ,setOTP]= useState()
  const [phonenumber, setPhonenumber] = useState('');
  const [user ,setUser] =useState('')
console.log("+91"+phonenumber)
  const generateRecaptchaVerifier = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
      }
    }, auth);
  }

  const requestOtp = () => {
    generateRecaptchaVerifier()
    let phone = "+91"+phonenumber

    let captcha = window.recaptchaVerifier
    signInWithPhoneNumber(auth, phone, captcha)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
        console.log("sentOtp")
      }).catch((error) => {
        // Error; SMS not sent
        grecaptcha.reset(window.recaptchaWidgetId);
        console.log(error)
      });
  }
  const verifyOtp = (e) => {
    let otp = e.target.value;
    setOTP(otp)
    if(otp.length===6){
      let confirmationResult = window.confirmationResult
      confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user.phoneNumber)
        setUser(user.phoneNumber)
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
      
    }
  }
  const handleChange = event => {
    setPhonenumber(event.target.value);

    console.log('value is:', event.target.value);
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      <input
      placeholder='phone'
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={phonenumber}
      />
      <button onClick={() => requestOtp()}>ok</button>

      <input type="number" id='otp-input'value={OTP} onChange={verifyOtp}/>
    
    <h1>{user}</h1>
    </div>
  )
}

export default Login
