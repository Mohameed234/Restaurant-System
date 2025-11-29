import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axios";
import styles from "./BookTable.module.css";

const BookTable = () => {
  const { user, token } = useContext(AuthContext);

  
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    name: user?.name || "",
    phone: "",
    guests_count: 1   
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) return <p className={styles.error}>You must be logged in to book a table.</p>;

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "guests_count" ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/bookings", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Your table has been booked successfully!");

      
      setFormData({
        date: "",
        time: "",
        name: user.name,
        phone: "",
        guests_count: 1
      });
    } catch (err) {
      console.error(err);
      setMessage("Failed to book table. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book A Table</h1>
      <p className={styles.subtitle}>Reserve your table quickly and easily.</p>

      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className={styles.inputGroup}>
              <label>Time</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} required />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className={styles.inputGroup}>
              <label>Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1-234-567-890" required />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Total Persons</label>
            
            <select name="guests_count" value={formData.guests_count} onChange={handleChange}>
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'Person' : 'Persons'}
                </option>
              ))}
            </select>
          </div>

          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? "Booking..." : "Book a Table"}
          </button>
        </form>
      </div>

      <div className={styles.map}>
        <iframe
          title="map"
          width="100%"
          height="450"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19801.27664704489!2d-0.1501!3d51.5033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876052ecb73140f%3A0xee39fb8bcbac2b33!2sLondon!5e0!3m2!1sen!2suk!4v1697040100000"
        ></iframe>
      </div>
    </div>
  );
};

export default BookTable;
