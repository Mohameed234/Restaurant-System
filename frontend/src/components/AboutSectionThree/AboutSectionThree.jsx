import React from "react";
import styles from "./AboutSectionThree.module.css";
import image from "../../assets/about-sec-3.png"

export default function AboutSectionThree() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.left}>
          <h2 className={styles.title}>A little information<br />for our valuable guest</h2>

          <p className={styles.description}>
            At place, we believe that dining is not just about food, but also about the
            overall experience. Our staff, renowned for their warmth and dedication,
            strives to make every visit an unforgettable event.
          </p>

          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <h3 className={styles.statNumber}>3</h3>
              <p className={styles.statText}>Locations</p>
            </div>

            <div className={styles.statBox}>
              <h3 className={styles.statNumber}>1995</h3>
              <p className={styles.statText}>Founded</p>
            </div>

            <div className={styles.statBox}>
              <h3 className={styles.statNumber}>65+</h3>
              <p className={styles.statText}>Staff Members</p>
            </div>

            <div className={styles.statBox}>
              <h3 className={styles.statNumber}>100%</h3>
              <p className={styles.statText}>Satisfied Customers</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className={styles.right}>
          <img src={image} alt="About Image" className={styles.image} />
        </div>
      </div>
    </section>
  );
}
