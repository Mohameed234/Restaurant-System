// src/layouts/AdminLayout.jsx
import { NavLink, Outlet  } from "react-router-dom";
import { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";
import styles from "./Layout.module.css";

export default function AdminLayout() {
  const { admin, logout } = useContext(AdminAuthContext);

  
  const handleLogout = () => {
    logout(); // تفريغ بيانات اليوزر والتوكن
    
  };


  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Admin Panel</h2>
        <nav className={styles.nav}>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/bookings"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Bookings
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/admin/menu-items"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Menu Items
          </NavLink>
        </nav>
        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Welcome, {admin?.name}</h1>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
