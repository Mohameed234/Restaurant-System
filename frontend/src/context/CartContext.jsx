import { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token, user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // State للـ toast
  const [toast, setToast] = useState(null); // { message: "Item added!", type: "success" }

  // دالة لإظهار toast
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // تختفي بعد 3 ثواني
  };

  // جلب الكارت عند تسجيل الدخول أو تغير التوكن
  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get("/cart", { headers: { Authorization: `Bearer ${token}` } });
      setCartItems(res.data.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // إضافة عنصر للكارت
  const addToCart = async (menu_item_id) => {
    if (!token || !user) return;
    try {
      await axios.post(
        "/cart",
        { menu_item_id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCart(); // نحدث الكارت بعد الإضافة
      showToast("Item added to cart!"); // نعرض الرسالة
    } catch (err) {
      console.error("Failed to add to cart:", err);
      showToast("Failed to add item.", "error");
    }
  };

  // تحديث كمية عنصر في الكارت
  const updateQuantity = async (itemId, newQty) => {
    if (!token || newQty < 1) return;
    try {
      await axios.put(
        `/cart/${itemId}`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(prev =>
        prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item)
      );
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  // إزالة عنصر من الكارت
  const removeItem = async (itemId) => {
    if (!token) return;
    try {
      await axios.delete(`/cart/${itemId}`, { headers: { Authorization: `Bearer ${token}` } });
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      showToast("Item removed from cart.", "error");
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // في CartContext.jsx
const checkoutOrder = async () => {
    if (!token) return;
  
    try {
      const res = await axios.post(
        "/checkout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (res.data.status) {
        setCartItems([]); // نفرغ الكارت محلياً
        showToast("Order placed successfully!"); // رسالة نجاح
        return res.data.order; // ترجع الأوردر الجديد إذا حبيت تستخدمه
      } else {
        showToast(res.data.message || "Failed to place order.", "error");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      showToast("Checkout failed.", "error");
    }
  };
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, checkoutOrder , updateQuantity, removeItem, toast, showToast }}>
      {children}
    </CartContext.Provider>
  );
};
