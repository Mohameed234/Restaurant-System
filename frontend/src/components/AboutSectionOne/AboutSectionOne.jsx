import styles from "./AboutSectionOne.module.css";
import foodImg from "../../assets/your-food-image.png"; 
import phoneIcon from "../../assets/Icon/Outline/phone.svg";
import mailIcon from "../../assets/Icon/Outline/mail.png";
import locationIcon from "../../assets/Icon/Outline/location.svg";

export default function AboutSection() {
    return (
        <section className={styles.section}>
            <div className={styles.left}>
                <div className={styles.imageWrapper}>
                    <img src={foodImg} alt="Food" className={styles.image} />
                </div>

                <div className={styles.card}>
                    <h3>Come and visit us</h3>

                    <div className={styles.row}>    
                        <img src={phoneIcon} alt="phone" />
                        <span>(414) 857 – 0107</span>
                    </div>

                    <div className={styles.row}>
                        <img src={mailIcon} alt="mail" />
                        <span>happytummy@restaurant.com</span>
                    </div>

                    <div className={styles.row}>
                        <img src={locationIcon} alt="location" />
                        <span>
                            837 W. Marshall Lane Marshalltown, IA 50158, Los Angeles
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <h1 className={styles.title}>
                    We provide healthy food for your family.
                </h1>

                <p className={styles.textOne}>
                    Our story began with a vision to create a unique dining experience
                    that merges fine dining, exceptional service, and a vibrant
                    ambiance. Rooted in city's rich culinary culture, we aim to honor
                    our local roots while infusing a global palate.
                </p>

                <p className={styles.text}>
                    At place, we believe that dining is not just about food, but also
                    about the overall experience. Our staff, renowned for their warmth
                    and dedication, strives to make every visit an unforgettable event.
                </p>
            </div>
        </section>
    );
}
