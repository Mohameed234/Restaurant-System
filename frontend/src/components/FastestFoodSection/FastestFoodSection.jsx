import styles from "./FastestFoodSection.module.css";
import leftImage from "../../assets/chef.png"; // استبدلها بصورتك
import topRightImage from "../../assets/dish1.png";
import bottomRightImage from "../../assets/dish2.png";
import clockIcon from "../../assets/Icon/Outline/clock.svg";
import offerIcon from "../../assets/Icon/Outline/offer.svg";
import cartIcon from "../../assets/Icon/Outline/cart.svg";


export default function FastestFoodSection() {
    const features = [
        { icon: clockIcon, text: "Delivery within 30 minutes" },
        { icon: offerIcon, text: "Best Offer & Prices" },
        { icon: cartIcon, text: "Online Services Available" },
    ];


    return (
        <section className={styles.section}>
            <div className={styles.imagesWrapper}>
                <div className={styles.leftImage}>
                    <img src={leftImage} alt="chef cooking" />
                </div>

                <div className={styles.rightImages}>
                    <img src={topRightImage} alt="food 1" className={styles.topImg} />
                    <img src={bottomRightImage} alt="food 2" className={styles.bottomImg} />
                </div>
            </div>


            <div className={styles.content}>
                <h2>Fastest Food Delivery in City</h2>
                <p>
                Our visual designer lets you quickly and easily drag your way to custom apps
                and pages for both desktop and mobile.
                </p>


                <ul className={styles.features}>
                    {features.map((item, index) => (
                    <li key={index}>
                        <img src={item.icon} alt="icon" />
                        <span>{item.text}</span>
                    </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}