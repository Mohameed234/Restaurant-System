// src/pages/Dashboard.jsx
import { useContext, useEffect, useState } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";
import api from "../api/axios";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { admin } = useContext(AdminAuthContext);
  const [stats, setStats] = useState({
    orders: 0,
    items: 0,
    reservations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      setLoading(true);

      const [ordersRes, itemsRes, reservationsRes] = await Promise.all([
        api.get("/orders"),       // يرجع قائمة الأوردرز
        api.get("/menu-items"),   // يرجع قائمة المينيو آيتيمز
        api.get("/bookings"), // افترض عندك endpoint للحجوزات
      ]);
      console.log(ordersRes.data);
      console.log(itemsRes.data);
      console.log(reservationsRes.data);
      

      setStats({
        orders: ordersRes.data.data?.length || 0,
        items: itemsRes.data.menu_items?.length || 0,
        reservations: reservationsRes.data?.length || 0,
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  if (loading) return <p className={styles.loading}>Loading dashboard...</p>;

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Welcome, {admin?.name}</h1>
        <p>Manage your restaurant efficiently</p>
      </header>

      <section className={styles.cardsContainer}>
        <div className={styles.card}>
          <h2>Orders</h2>
          <p>{stats.orders}</p>
        </div>
        <div className={styles.card}>
          <h2>Menu Items</h2>
          <p>{stats.items}</p>
        </div>
        <div className={styles.card}>
          <h2>Reservations</h2>
          <p>{stats.reservations}</p>
        </div>
      </section>

      <section className={styles.info}>
        <p>Use the sidebar to navigate between dashboard sections.</p>
      </section>
    </div>
  );
}
