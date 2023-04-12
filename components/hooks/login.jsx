import React, { useState } from "react";
import { auth } from "../../lib/firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.css";
import createuser from "./createuser"
function Login(setIsOpen) {
  const [OTP, setOTP] = useState();
  const [phonenumber, setPhonenumber] = useState("");
  const [FormChainge, setFormChainge] = useState(false);
  const [code, setCode] = useState("91");
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
    let phone = "+" + code + phonenumber;
    // console.log(phone)
    let captcha = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, captcha)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
        console.log("sentOtp");
        setFormChainge(true);
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
          Cookies.set("loggedin", user.phoneNumber);
          console.log(user.phoneNumber);
          createuser(user);
          // router.push("/");
          router.reload();
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };

  const handleChange = (event) => {
    setPhonenumber(event.target.value);

    // console.log("value is:", event.target.value);
  };
  const handleChangeCode = (event) => {
    setCode(event.target.value);

    // console.log("value is:", event.target.value);
  };
  return (
    <div className={styles.container}>
      <div id="recaptcha-container"></div>
      <div className={styles.box}>
        <div className={styles.imgcontainer}>
          <img src="/logo.png" alt="" className={styles.img} />
        </div>
        <div className={styles.title}>
          <h3>Create an acount</h3>
        </div>
        {!FormChainge ? (
          <div className={styles.field}>
            <input
              placeholder="+91"
              maxlength="4"
              type="number"
              id="code"
              name="code"
              onChange={handleChangeCode}
              value={code}
              className={styles.code}
              // className={styles.input}
            />
            <input
              placeholder="phone"
              type="text"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={phonenumber}
              className={styles.input}
            />
          </div>
        ) : (
          <div className={styles.field}>
            <input
              className={styles.input}
              type="number"
              id="otp-input"
              value={OTP}
              onChange={verifyOtp}
            />{" "}
          </div>
        )}

        <button onClick={() => requestOtp()} className={styles.button}>
          <div>Send Otp</div>
        </button>
      </div>
    </div>
  );
}

export default Login;

// firebase responce
// UserImpl {
//   providerId: 'firebase',
//   proactiveRefresh: ProactiveRefresh,
//   reloadUserInfo: {…},
//   reloadListener: null,
//   uid: 'ui9W1JdQPtSZXVKd1RDrX84fPIj1', …}
//   accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4MjNkMWE0MTg5ZjI3NThjYWI4NDQ4ZmQ0MTIwN2ViZGZhMjVlMzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXV0aC0xZGZmMyIsImF1ZCI6ImF1dGgtMWRmZjMiLCJhdXRoX3RpbWUiOjE2ODExMDE3NjUsInVzZXJfaWQiOiJ1aTlXMUpkUVB0U1pYVktkMVJEclg4NGZQSWoxIiwic3ViIjoidWk5VzFKZFFQdFNaWFZLZDFSRHJYODRmUElqMSIsImlhdCI6MTY4MTEwMTc2NSwiZXhwIjoxNjgxMTA1MzY1LCJwaG9uZV9udW1iZXIiOiIrOTE2MjM1MzU0NDMyIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrOTE2MjM1MzU0NDMyIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.QdmtJd-N9T6WeONm0kwoh-cGxO0bhkiyNmR0NBfjFbmcSXhCPgSvh1Pll1xgO-tj6RADYOtpCya7bb6UlzzEk8jdR1L2nrBVFpmc7KFAlLH_ZC6zEBFWZ0tG9TJnqAlZhBLJyZeFbBL8b5sbcMlkxqAuZEOUr_roiiGggcIH7e4KhY8F_E_sidschmAbTOEe51cWGyDoYQiB5nphoo3rMfL4jr9l2K6g5lMImXHWqQjM_SCCQ6bAStlZRVUXwls9_bRdLvbUy4-9dhSKfhvoR-zEs_HUy_YnvJn8zlv1rYZ33xDjmtWkIftQHjT7cGvnF1C9e_ExKMvmpXTzhZHqrA"
//   auth: AuthImpl {
//     app: FirebaseAppImpl,
//     heartbeatServiceProvider: Provider,
//     config: {…},
//     currentUser: UserImpl,
//     emulatorConfig: null, …}
//     displayName: nullemail: nullemailVerified: falseisAnonymous: falsemetadata: UserMetadata
//     {createdAt: '1680718500872', lastLoginAt: '1681101764998', lastSignInTime: 'Mon, 10 Apr 2023 04:42:44 GMT', creationTime: 'Wed, 05 Apr 2023 18:15:00 GMT'}
//     createdAt: "1680718500872"
//     creationTime: "Wed, 05 Apr 2023 18:15:00 GMT"
//     lastLoginAt: "1681101764998"
//     lastSignInTime: "Mon, 10 Apr 2023 04:42:44 GMT"[[Prototype]]:
//      ObjectphoneNumber: "+916235354432"
//     photoURL: nullproactiveRefresh: ProactiveRefresh
//     {user:
//       UserImpl, isRunning: false, timerId: null, errorBackoff: 30000
//     }providerData: [{…}]providerId: "firebase"reloadListener: nullreloadUserInfo: {localId: 'ui9W1JdQPtSZXVKd1RDrX84fPIj1',
//     providerUserInfo: Array(1), lastLoginAt: '1681101764998',
//     createdAt: '1680718500872',
//     phoneNumber: '+916235354432',
//     stsTokenManager: StsTokenManager
//     {refreshToken: 'APJWN8fECjOm7cvFtETPCc112UzAMiH0wxHhqjWw6TzJr_lbJB…xWoXRio1VT-wi56PLyiE5XRVixfjHpxJSvknfSzSzbK0RcjQj',
//     accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4MjNkMWE0MTg5ZjI3NT…lv1rYZ33xDjmtWkIftQHjT7cGvnF1C9e_ExKMvmpXTzhZHqrA',
//     expirationTime: 1681105365192}tenantId: nulluid: "ui9W1JdQPtSZXVKd1RDrX84fPIj1"
//     refreshToken: (...)[[Prototype]]: Object
