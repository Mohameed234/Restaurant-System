import styles from "./BrowseMenu.module.css";
import breakfastIcon from "../../assets/breakfast.svg"; // ضع مكانه الايقونات الخاصة بك
import mainIcon from "../../assets/main.svg";
import drinksIcon from "../../assets/drinks.svg";
import dessertIcon from "../../assets/dessert.svg";


export default function BrowseMenu() {
    const menuItems = [
    { title: "Breakfast", icon: breakfastIcon },
    { title: "Main Dishes", icon: mainIcon },
    { title: "Drinks", icon: drinksIcon },
    { title: "Desserts", icon: dessertIcon },
        ];


return (
    <section className={styles.section}>
        <h2 className={styles.title}>Browse Our Menu</h2>

        <div className={styles.cards}>
            {menuItems.map((item, index) => (
                <div className={styles.card} key={index}>
                    <div className={styles.iconCircle}>
                        <img src={item.icon} alt={item.title} />
                    </div>

                    <h3>{item.title}</h3>

                    <p>
                    In the new era of technology we look in the future with certainty and
                    pride for our life.
                    </p>

                    <a href="#" className={styles.exploreLink}>
                    Explore Menu
                    </a>
                </div>
            ))}
        </div>
    </section>
);
}