// src/pages/Orders.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminAuthContext } from "../context/AdminAuthContext";
import styles from "./Bookings.module.css";

export default function Orders() {
  const { token } = useContext(AdminAuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState("");

  // جلب الأوردرز
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // تغيير الحالة
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/bookings/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setNotification("Status updated successfully!");
      setTimeout(() => setNotification(""), 3000); // تختفي بعد 3 ثواني
    } catch (err) {
      console.error(err);
      setNotification("Failed to update status.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  if (loading) return <div className={styles.spinner}>Loading...</div>;

  return (
    <div className={styles.container}>
      {notification && (
  <div
    className={
      notification === "Status updated successfully!"
        ? styles.notification
        : notification === "Failed to update status."
        ? `${styles.notification} ${styles.error}`
        : styles.notification
    }
  >
    {notification}
  </div>
)}
      <h1>Orders</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.phone}</td>
              <td>{order.date}</td>
              <td>{order.time}</td>
              <td>{order.guests_count}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                 
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
