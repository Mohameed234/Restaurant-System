import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/Logo2.svg";
import fasebookicon from "../../assets/facebook.svg";
import Insta from "../../assets/instgram.svg";
import twitter from "../../assets/twitter.svg";
import github from "../../assets/github.svg";
import footerimage1 from "../../assets/footer-image-1.png";
import footerimage2 from "../../assets/footer-image-2.png";
import footerimage3 from "../../assets/footer-image-3.png";
import footerimage4 from "../../assets/footer-image-4.png";





export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Left Section */}
        <div className={styles.left}>          
          <div className={styles.logoWrapper}>
            <img src={logo} alt="Logo" />
          </div> 

          <p className={styles.description}>
            In the new era of technology we look in the future with certainty and pride to
            for our company and.
          </p>

          <div className={styles.socialIcons}>
            <span>
              <img src={fasebookicon} alt="Facebook" />
            </span>

            <span>
              <img src={Insta} alt="Insta" />

            </span>

            <span>
              <img src={twitter} alt="twitter" />

            </span>

            <span>
              <img src={github} alt="github" />

            </span>
          </div>
        </div>

        {/* Pages */}
        <div className={styles.linksBlock}>
          <h3>Pages</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Menu</li>
            <li>Pricing</li>
            <li>Blog</li>
            <li>Contact</li>
            <li>Delivery</li>
          </ul>
        </div>

        {/* Utility Pages */}
        <div className={styles.linksBlock}>
          <h3>Utility Pages</h3>
          <ul>
            <li>Start Here</li>
            <li>Styleguide</li>
            <li>Password Protected</li>
            <li>404 Not Found</li>
            <li>Licenses</li>
            <li>Changelog</li>
            <li>View More</li>
          </ul>
        </div>

        {/* Instagram Images */}
        <div className={styles.instagram}>
          <h3>Follow Us On Instagram</h3>
          <div className={styles.imagesGrid}>
            <div className={styles.imgBox}>
              <img src={footerimage1} alt="Image 1" />
            </div>
            <div className={styles.imgBox}>
              <img src={footerimage2} alt="Image 2" />

            </div>
            <div className={styles.imgBox}>
              <img src={footerimage3} alt="Image 3" />

            </div>
            <div className={styles.imgBox}>
              <img src={footerimage4} alt="Image 4" />

            </div>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        Copyright © 2023 Hashtag Developer. All Rights Reserved
      </div>
    </footer>
  );
}
