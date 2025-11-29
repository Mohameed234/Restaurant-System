import React from "react";
import styles from "./AboutSectionFour.module.css";
import sophire from "../../assets/sophire.png";
import andy from "../../assets/andy.png";
import matt from "../../assets/matt.png";

export default function AboutSectionFour() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>What Our Customers Say</h2>

      <div className={styles.cardsContainer}>
        {/* Card 1 */}
        <div className={styles.card}>
          <h3 className={styles.quote}>“The best restaurant”</h3>
          <p className={styles.text}>
            Last night, we dined at place and were simply blown away. From the moment we
            stepped in, we were enveloped in an inviting atmosphere and greeted with warm
            smiles.
          </p>

            <span className={styles.line}></span>

          <div className={styles.profile}>
            <img src={sophire} className={styles.avatar} alt="Customer 1" />
            <div>
              <h4 className={styles.name}>Sophie Robson</h4>
              <p className={styles.location}>Los Angeles, CA</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <h3 className={styles.quote}>“Simply delicious”</h3>
          <p className={styles.text}>
            Place exceeded my expectations on all fronts. The ambiance was cozy and relaxed,
            making it a perfect venue for our anniversary dinner. Each dish was prepared and
            beautifully presented.
          </p>

          <span className={styles.line}></span>

          <div className={styles.profile}>
            <img src={matt} className={styles.avatar} alt="Customer 2" />
            <div>
              <h4 className={styles.name}>Matt Cannon</h4>
              <p className={styles.location}>San Diego, CA</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className={styles.card}>
          <h3 className={styles.quote}>“One of a kind restaurant”</h3>
          <p className={styles.text}>
            The culinary experience at place is first to none. The atmosphere is vibrant, the
            food – nothing short of extraordinary. The food was the highlight of our evening.
            Highly recommended.
          </p>

          <span className={styles.line}></span>

          <div className={styles.profile}>
            <img src={andy} className={styles.avatar} alt="Customer 3" />
            <div>
              <h4 className={styles.name}>Andy Smith</h4>
              <p className={styles.location}>San Francisco, CA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
