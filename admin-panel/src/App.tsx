// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import AdminLayout from "./pages/Layout";
import AdminRoute from "./components/ProtectedRoute";

import Bookings from "./pages/Bookings.jsx";
import MenuItems from "./pages/MenuItems.jsx";
import Orders from "./pages/Orders.jsx";
// import Users from "./pages/Users";
// import MenuItems from "./pages/MenuItems";

function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          

           {/* Admin routes - كله جوه Layout */}
           <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>


              <Route path="dashboard" element={<Dashboard />} />
               <Route path="bookings" element={<Bookings />} />
              <Route path="orders" element={<Orders />} />
              <Route path="menu-items" element={<MenuItems />} /> 


            </Route>
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

export default App;
