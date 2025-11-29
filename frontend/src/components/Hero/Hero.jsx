import styles from "./Hero.module.css";


export default function Hero() {
return (
<section className={styles.heroSection}>
    <div className={styles.contentBox}>
        <h1>Best food for your taste</h1>
        <p>Discover delectable cuisine and unforgettable moments in our welcoming, culinary haven.</p>


        <div className={styles.actions}>
            <a href="#" className={styles.primary}>Book A Table</a>
            <a href="#" className={styles.secondary}>Explore Menu</a>
        </div>
    </div>
    <div className={styles.heroImage}></div>
</section>
);
}