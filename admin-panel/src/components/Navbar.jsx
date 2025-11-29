import { NavLink } from "react-router-dom";
import styles from "./AdminNavbar.module.css";
import { useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";

export default function AdminNavbar() {
  const { logout, admin } = useContext(AdminAuthContext);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <h2>Admin Panel</h2>
        <p>{admin?.name}</p>
      </div>

      <nav className={styles.nav}>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => isActive ? styles.active : ""}
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/orders" 
          className={({ isActive }) => isActive ? styles.active : ""}
        >
          Orders
        </NavLink>
        <NavLink 
          to="/users" 
          className={({ isActive }) => isActive ? styles.active : ""}
        >
          Users
        </NavLink>
        <NavLink 
          to="/menu-items" 
          className={({ isActive }) => isActive ? styles.active : ""}
        >
          Menu Items
        </NavLink>
      </nav>

      <button onClick={logout} className={styles.logoutBtn}>Logout</button>
    </aside>
  );
}