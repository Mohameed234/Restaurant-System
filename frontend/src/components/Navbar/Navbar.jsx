import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from '../../assets/Logo.png';
import phoneIcone from '../../assets/Icon/Outline/phone.png';
import mailIcon from '../../assets/Icon/Outline/mail.png';
import facebook from '../../assets/facebook.svg';
 import instgram from '../../assets/instgram.svg';
  import twitter from '../../assets/twitter.svg'; 
  import github from '../../assets/github.svg';
import cartIcon from '../../assets/cart.png'; 
import avatarPlaceholder from '../../assets/avatar.png'; 
import { AuthContext } from "../../context/AuthContext.jsx";
import { CartContext } from "../../context/CartContext.jsx";

export default function Navbar() {
    const { user, token, logout } = useContext(AuthContext);
    const { cartItems, updateQuantity, removeItem , checkoutOrder } = useContext(CartContext); // استخدم الكونتكست
    const [cartOpen, setCartOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className={styles.navbarContainer}>
            {/* Top bar */}
            <div className={styles.navbarTop}>
                 <div className={styles.navbarTopLeft}>
                     <div> 
                        <img src={phoneIcone} alt="Phone-Icon" />
                         <span>(414) 857 - 0107</span>
                          </div> 
                          <div>
                             <img src={mailIcon} alt="Mail-Icon" /> 
                             <span>yummy@bistrobliss</span> 
                             </div>
                              </div>
                               <div className={styles.navbarTopRight}>
                                 <a href="#"><img src={facebook} alt="facebook-Icon" /></a>
                                <a href="#"><img src={instgram} alt="instgram-Icon" /></a>
                                 <a href="#"><img src={twitter} alt="twitter-Icon" /></a>
                                  <a href="#"><img src={github} alt="github-Icon" /></a>
                                   </div>
            </div>


            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <img src={logo} alt="Our-logo" />
                </div>

                <ul className={styles.navLinks}>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>Home</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ""}>About</NavLink></li>
                    <li><NavLink to="/menu" className={({ isActive }) => isActive ? styles.active : ""}>Menu</NavLink></li>
                    <li><NavLink to="/pages" className={({ isActive }) => isActive ? styles.active : ""}>Pages</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : ""}>Contact</NavLink></li>
                </ul>

                {token && user ? (
                    <div className={styles.userSection}>
                        <Link to="/book-table" className={styles.bookButton}>Book A Table</Link>

                        {/* Cart Icon + Badge */}
                        <div className={styles.cartIconWrapper} onClick={() => setCartOpen(!cartOpen)}>
                            <img src={cartIcon} alt="Cart" />
                            {cartItems.length > 0 && (
                                <span className={styles.cartBadge}>{cartItems.length}</span>
                            )}
                        </div>

                        {/* Avatar */}
                        <div className={styles.avatarWrapper}>
                            <div onClick={() => setDropdownOpen(!dropdownOpen)} className={styles.avatar}>
                                <img src={user?.avatar || avatarPlaceholder} alt="User Avatar" />
                                <span>{user?.name || "User"}</span>
                            </div>
                            {dropdownOpen && (
                                <div className={styles.dropdown}>
                                    <Link to="/profile">Profile</Link>
                                    <button onClick={logout}>Logout</button>
                                </div>
                            )}
                        </div>

                        {/* Cart Slider */}
                        {cartOpen && (
                            <div className={styles.cartSlider}>
                                <div className={styles.cartHeader}>
                                    <h3>Your Cart</h3>
                                    <button 
                                        className={styles.closeCart} 
                                        onClick={() => setCartOpen(false)}
                                    >
                                        ×
                                    </button>
                                </div>

                                {cartItems.length === 0 ? (
                                    <p>Your cart is empty.</p>
                                ) : (
                                    <>
                                        <ul className={styles.cartList}>
                                            {cartItems
                                                .filter(item => item.menu_item)
                                                .map(item => (
                                                <li key={item.id} className={styles.cartItem}>
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/${item.menu_item.image}`}
                                                        alt={item.menu_item.name}
                                                        className={styles.cartItemImage}
                                                    />
                                                    <div className={styles.cartItemInfo}>
                                                        <h4 className={styles.cartItemName}>{item.menu_item.name}</h4>
                                                        <p className={styles.cartItemPrice}>
                                                            ${ (parseFloat(item.menu_item.price) * item.quantity).toFixed(2) }
                                                        </p>
                                                        <div className={styles.quantityControls}>
                                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                                            <span>{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        className={styles.removeBtn} 
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        ×
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className={styles.cartFooter}>
                                            <p>Total: ${cartItems.reduce((sum, item) => sum + item.quantity * parseFloat(item.menu_item.price), 0).toFixed(2)}</p>
                                             {/* تعديل الزر */}
                                                <button 
                                                    className={styles.bookButton} 
                                                    onClick={async () => {
                                                    const order = await checkoutOrder();
                                                    if(order){
                                                        setCartOpen(false); // اغلاق الكارت بعد النجاح
                                                        // ممكن تعمل redirect لصفحة تأكيد إذا حبيت
                                                    }
                                                    }}
                                                >
                                                    Checkout
                                                </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={styles.authButtons}>
                        <Link to="/login" className={styles.loginBtn}>Login</Link>
                        <Link to="/register" className={styles.registerBtn}>Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
