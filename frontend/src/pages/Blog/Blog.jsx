import React from "react";
import styles from "./Blog.module.css";

const posts = [
  {
    date: "January 3, 2023",
    title: "How to prepare a delicious gluten free sushi",
    img: "/src/assets/1.png",
  },
  {
    date: "January 3, 2023",
    title: "Exclusive baking lessons from the pastry king",
    img: "/src/assets/2.png",
  },
  {
    date: "January 3, 2023",
    title: "How to prepare the perfect fries in an air fryer",
    img: "/src/assets/3.png",
  },
  {
    date: "January 3, 2023",
    title: "How to prepare delicious chicken tenders",
    img: "/src/assets/4.png",
  },
  {
    date: "January 3, 2023",
    title: "5 great cooking gadgets you can buy to save time",
    img: "/src/assets/5.png",
  },
  {
    date: "January 3, 2023",
    title: "The secret tips & tricks to prepare a perfect burger",
    img: "/src/assets/6.png",
  },
  {
    date: "January 3, 2023",
    title: "7 delicious cheesecake recipes you can prepare",
    img: "/src/assets/7.png",
  },
  {
    date: "January 3, 2023",
    title: "5 great pizza restaurants you should visit this city",
    img: "/src/assets/8.png",
  },
  {
    date: "January 3, 2023",
    title: "5 great cooking gadgets you can buy to save time",
    img: "/src/assets/9.png",
  },
  {
    date: "January 3, 2023",
    title: "How to prepare a delicious gluten free sushi",
    img: "/src/assets/10.png",
  },
  {
    date: "January 3, 2023",
    title: "Top 20 simple and quick desserts for kids",
    img: "/src/assets/1.png",
  },
  {
    date: "January 3, 2023",
    title: "Top 20 simple and quick desserts for kids",
    img: "/src/assets/12.png",
  },
];

const Blog = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Blog & Articles</h1>
      <p className={styles.subtitle}>
        We consider all the drivers of change gives you the components you need
        to change to create a truly happens.
      </p>

      <div className={styles.grid}>
        {posts.map((post, index) => (
          <div key={index} className={styles.card}>
            <img src={post.img} alt={post.title} className={styles.image} />
            <div className={styles.cardBody}>
              <span className={styles.date}>{post.date}</span>
              <h3 className={styles.cardTitle}>{post.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
