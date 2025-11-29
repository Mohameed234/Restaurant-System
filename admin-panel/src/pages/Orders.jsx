// src/pages/Orders.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import styles from "./Orders.module.css"; 

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const statusOptions = [
    "pending",
    "accepted",
    "preparing",
    "delivering",
    "delivered",
    "rejected",
  ];

  useEffect(() => {
    fetchOrders();
  }, []);   

  async function fetchOrders() {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      // response structure: { status: true, data: [...] }
      setOrders(res.data.data || []);
    } catch (err) {
      console.log(err);
      showNotification("Failed to load orders.", true);
    }
    setLoading(false);
  }

  async function handleStatusChange(orderId, newStatus) {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: newStatus } : o
        )
      );
      showNotification("Order status updated!");
    } catch (err) {
      console.log(err);
      showNotification("Failed to update status.", true);
    }
  }

  function showNotification(msg, error = false) {
    setNotification({ msg, error });
    setTimeout(() => setNotification(null), 3000);
  }

  if (loading) return <p className={styles.loading}>Loading orders...</p>;

  return (
    <div className={styles.container}>
      {notification && (
        <div
          className={`${styles.notification} ${notification.error ? styles.error : ""}`}
        >
          {notification.msg}
        </div>
      )}

      <h2>All Orders</h2>

      <div className={styles.ordersGrid}>
        {orders.map((order) => (
          <div className={styles.card} key={order.id}>
            <h3>Order #{order.id}</h3>
            <p><strong>User:</strong> {order.user?.name || "Guest"}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Phone:</strong> {order.user?.phone || "N/A"}</p>
            <p><strong>Total:</strong> {order.total} EGP</p>

            <p>
              <strong>Status:</strong>{" "}
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </p>

            <div className={styles.items}>
              <strong>Items:</strong>
              <ul>
                {order.items?.map((item) => (
                  <li key={item.id}>
                    {item.menu_item?.name} — {item.quantity} pcs — {item.price} EGP
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
