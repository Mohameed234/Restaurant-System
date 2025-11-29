import React from "react";
import styles from "./AboutSectionTwo.module.css";
import menu from "../../assets/restaurant-menu 1.svg";
import order from "../../assets/easy-order.svg";
import timer from "../../assets/timer 1.svg"

export default function AboutSection() {
  return (
    <section className={styles.section}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.overlay}></div>

        <div className={styles.centerContent}>
          <div className={styles.playButton}>
            <div className={styles.playIcon}></div>
          </div>

          <h2 className={styles.heroTitle}>
            Feel the authentic & original taste from us
          </h2>
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.features}>
        <div className={styles.featureBox}>
          <img src={menu} alt="Multi Cuisine Icon" className={styles.icon} />
          <div>

            <h3 className={styles.featureTitle}>Multi Cuisine</h3>
            <p className={styles.text}>In the new era of technology we look in the future with certainty life.</p>
          </div>
        </div>

        <div className={styles.featureBox}>
          <img src={order} alt="Order Icon" className={styles.icon} />
          <div>

            <h3 className={styles.featureTitle}>Easy To Order</h3>
            <p className={styles.text}>In the new era of technology we look in the future with certainty life.</p>
          </div>
        </div>

        <div className={styles.featureBox}>
          <img src={timer} alt="Delivery Icon" className={styles.icon} />
          <div>

            <h3 className={styles.featureTitle}>Fast Delivery</h3>
            <p className={styles.text}>In the new era of technology we look in the future with certainty life.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
