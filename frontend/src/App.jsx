import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About"
import Menu from "./pages/Menu/Menu";
import ContactUs from "./pages/ContactUs/ContactUs";
import Blog from "./pages/Blog/Blog";
import BookTable from "./pages/BookTable/BookTable";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Profile from "./pages/Profile/Profile";



// import ProtectedRoute from "./routes/ProtectedRoute";
// import { AdminRoute } from "./routes/AdminRoute";


export default function App() {
  return (

    <BrowserRouter>
      <Navbar />

      <Routes>
          {/* Auth */}
          

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />




          
          {/* User */}


        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/pages" element={<Blog />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/profile" element={<Profile />} />



         


       
      </Routes>

      <Footer />
    </BrowserRouter>
  
  );
}
