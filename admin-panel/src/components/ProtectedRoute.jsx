import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";
import styles from "./ProtectedRoute.module.css";

export default function AdminRoute({ children }) {
  const { admin, loading  } = useContext(AdminAuthContext);



  if (loading)
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
      </div>
    );


  // لو مش لوجين أو مش admin، ارجع للصفحة اللوجين
  if (!admin) {


    return <Navigate to="/login" replace />;
  }

  return children;
}
