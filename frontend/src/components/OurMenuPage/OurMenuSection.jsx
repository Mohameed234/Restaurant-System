import React, { useEffect, useState, useContext } from "react";
import axios from "../../api/axios";
import styles from "./OurMenuSection.module.css";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext"; // استيراد الكونتكست

const MenuPage = () => {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const { user, token } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext); // الدالة لإضافة عنصر للكارت وتحديث البادج

  const categories = ["All", "Breakfast", "Main Dishes", "Drinks", "Desserts"];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("/menu-items");
        setItems(response.data.menu_items);
      } catch (error) {
        console.log("Error fetching menu items:", error);
      }
    };

    fetchMenu();
  }, []);

  // === فلترة حسب الكاتيجوري ===
  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className={styles.menuContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Our Menu</h1>
        <p className={styles.description}>
          We consider all the drivers of change gives you the components you need
          to create a truly amazing experience.
        </p>
      </div>

      {/* === التصنيفات === */}
      <div className={styles.categories}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryBtn} ${
              activeCategory === category ? styles.active : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* === الجريد === */}
      <div className={styles.menuGrid}>
        {filteredItems.map((item) => (
          <div key={item.id} className={styles.menuCard}>
            <div className={styles.cardImage}>
              <img
                src={`http://127.0.0.1:8000/storage/${item.image}`}
                alt={item.name}
              />
            </div>

            <div className={styles.cardContent}>
              <div className={styles.itemPrice}>${item.price}</div>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemDescription}>{item.description}</p>

              {/* زر اضافة للكارت يظهر فقط لو المستخدم عامل login */}
              {user && (
                <button
                  className={styles.addToCartBtn}
                  onClick={() => addToCart(item.id)} // استخدام الدالة من الكونتكست
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
