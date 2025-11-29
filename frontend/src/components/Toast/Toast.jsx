import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "./Toast.module.css";

export default function Toast() {
  const { toast } = useContext(CartContext);

  if (!toast) return null;

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      {toast.message}
    </div>
  );
}
