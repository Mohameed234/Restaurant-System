import { useEffect, useState } from "react";
import api from "../api/axios";
import styles from "./MenuItems.module.css";

export default function MenuItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      setLoading(true);
      const res = await api.get("/menu-items");
      setItems(res.data.menu_items);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  // ADD
async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("category", form.category);
    if (form.image) data.append("image", form.image);

    for (let [key, value] of data.entries()) {
        console.log(key, value);
      }
  
    try {
      await api.post("/menu-items", data); // لا تحدد headers Content-Type
      showNotification("Item added successfully!");
      fetchItems();
      resetForm();
    } catch (err) {
      console.log(err);
      showNotification("Failed to add item.", true);
    }
  }
  
  // UPDATE
  async function handleUpdate(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("category", form.category);
    if (form.image) data.append("image", form.image);
  
    try {
      await api.post(`/menu-items/${editId}?_method=PUT`, data); // لا تحدد headers Content-Type
      showNotification("Item updated successfully!");
      fetchItems();
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.log(err);
      showNotification("Failed to update item.", true);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/menu-items/${deleteId}`);
      setItems(prev => prev.filter(i => i.id !== deleteId));
      showNotification("Item deleted!");
    } catch (err) {
      console.log(err.response?.data || err);
      showNotification("Failed to delete item.", true);
    }
    setShowDeleteConfirm(false);
    setDeleteId(null);
  }

  function resetForm() {
    setForm({ name: "", description: "", price: "", category: "", image: null });
    setEditId(null);
  }

  function showNotification(msg, error = false) {
    setNotification({ msg, error });
    setTimeout(() => setNotification(null), 3000);
  }

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.container}>
      {/* Notification */}
      {notification && (
        <div className={`${styles.notification} ${notification.error ? styles.error : ""}`}>
          {notification.msg}
        </div>
      )}

      {/* ADD FORM */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Add New Item</h2>
        <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required/>
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form,description:e.target.value})}/>
        <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form,price:e.target.value})} required/>
        <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({...form,category:e.target.value})} required/>
        <input type="file" onChange={e => setForm({...form,image:e.target.files[0]})}/>
        <button type="submit">Add</button>
      </form>

      {/* ITEMS GRID */}
      <div className={styles.itemsGrid}>
        {items.map(item => (
          <div className={styles.card} key={item.id}>
            {item.image && <img src={`http://127.0.0.1:8000/storage/${item.image}`} alt={item.name}/>}
            <h3>{item.name}</h3>
            <p className={styles.category}>{item.category}</p>
            <p className={styles.desc}>{item.description}</p>
            <p className={styles.price}>$ {item.price} </p>

            <div className={styles.cardActions}>
              <button className={styles.editBtn} onClick={()=>{
                setEditId(item.id);
                setForm({name:item.name,description:item.description,price:item.price,category:item.category,image:null});
                setShowModal(true);
              }}>Edit</button>

              <button className={styles.deleteBtn} onClick={()=>{setDeleteId(item.id);setShowDeleteConfirm(true);}}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Item</h2>
            <form onSubmit={handleUpdate}>
              <input type="text" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required/>
              <textarea value={form.description} onChange={e => setForm({...form,description:e.target.value})}/>
              <input type="number" value={form.price} onChange={e => setForm({...form,price:e.target.value})} required/>
              <input type="text" value={form.category} onChange={e => setForm({...form,category:e.target.value})} required/>
              <input type="file" onChange={e => setForm({...form,image:e.target.files[0]})}/>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.saveBtn}>Save</button>
                <button type="button" className={styles.cancelBtn} onClick={()=>setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {showDeleteConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmBox}>
            <h3>Are you sure?</h3>
            <p>This item will be permanently deleted.</p>
            <div className={styles.modalActions}>
              <button className={styles.deleteBtn} onClick={handleDelete}>Yes, Delete</button>
              <button className={styles.cancelBtn} onClick={()=>setShowDeleteConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
