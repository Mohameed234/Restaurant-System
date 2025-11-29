import styles from "./AdminLayout.module.css";
import Sidebar from "../components/Sidebar";
import { Outlet, NavLink  } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />

    
      <aside className={styles.sidebar}>
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="dashboard" className={({ isActive }) => isActive ? styles.active : ""}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="orders" className={({ isActive }) => isActive ? styles.active : ""}>
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to="menu-items" className={({ isActive }) => isActive ? styles.active : ""}>
                Menu Items
              </NavLink>
            </li>
            <li>
              <NavLink to="users" className={({ isActive }) => isActive ? styles.active : ""}>
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>



      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
