import React from "react";
import styles from "../../styles/Contactus.module.css";
function Contactus() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.tetx}>
          <h1>Contact Us</h1>
          <div className={styles.addres}>
          <p className={styles.addres}>Vihara life care private limited</p>
          <p className={styles.addres}>ground floor, VP 19 86/A,</p>
          <p className={styles.addres}>Varnalaya building, Varambatta,</p>
          <p className={styles.addres}>Wayanad, Kerala - 670731</p>
          
          <p>Mobile Number: +91 79079 21620</p>
          </div>

          {/* <p className={styles.title}>
            For order and product related enquiries,
          </p> */}
          {/* <p> sales@vilvahstore.com</p> */}
          {/* <p className={styles.title}>For collaborations,</p> */}
          {/* <p> collaboration@vilvahstore.com</p> */}
          {/* <p className={styles.title}>For Agro related queries,</p> */}
          {/* <p> agro@vilvahstore.com</p> */}
          {/* <p className={styles.title}>For Opportunities,</p> */}
          {/* <p> careers@vilvahstore.com</p> */}
        </div>
        <div className={styles.form}>
          <div class="formbold-main-wrapper">
            <div class="formbold-form-wrapper">
              <form action="https://formbold.com/s/94NzV" method="POST">
                <div class="formbold-mb-5">
                  <label for="name" class="formbold-form-label">
                    {" "}
                    Full Name{" "}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    class="formbold-form-input"
                  />
                </div>

                <div class="formbold-mb-5">
                  <label for="email" class="formbold-form-label">
                    {" "}
                    Email Address{" "}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    class="formbold-form-input"
                  />
                </div>

                <div class="formbold-mb-5">
                  <label for="subject" class="formbold-form-label">
                    {" "}
                    Subject{" "}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Enter your subject"
                    class="formbold-form-input"
                  />
                </div>

                <div class="formbold-mb-5">
                  <label for="message" class="formbold-form-label">
                    {" "}
                    Message{" "}
                  </label>
                  <textarea
                    rows="6"
                    name="message"
                    id="message"
                    placeholder="Type your message"
                    class="formbold-form-input"
                  ></textarea>
                </div>

                <div>
                  <button class="formbold-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactus;

// <div>

// </div>
