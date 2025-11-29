import React from "react";
import styles from "./ContactUs.module.css";

const ContactUs = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.subtitle}>
        We consider all the drivers of change gives you the components you need
        to change to create a truly happens.
      </p>

      <div className={styles.formWrapper}>
        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="email" placeholder="Enter email address" />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Subject</label>
            <input type="text" placeholder="Write a subject" />
          </div>

          <div className={styles.inputGroup}>
            <label>Message</label>
            <textarea placeholder="Write your message" />
          </div>

          <button className={styles.btn}>Send</button>
        </form>
      </div>

      <div className={styles.infoSection}>
        <div>
          <h4>Call Us:</h4>
          <p className={styles.phone}>+1-234-567-8900</p>
        </div>

        <div>
          <h4>Hours:</h4>
          <p>Mon-Fri: 11am – 8pm</p>
          <p>Sat, Sun: 9am – 10pm</p>
        </div>

        <div>
          <h4>Our Location:</h4>
          <p>123 Bridge Street</p>
          <p>Nowhere Land, LA 12345</p>
          <p>United States</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
