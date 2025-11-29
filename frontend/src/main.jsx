import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AdminAuthProvider> */}

     <AuthProvider>
      <CartProvider >


        <App />
      </CartProvider>
     </AuthProvider>
    
    {/* </AdminAuthProvider> */}
  </StrictMode>,
)
