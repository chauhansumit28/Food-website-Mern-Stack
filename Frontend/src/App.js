import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Placeorder from "./pages/Placeorder/Placeorder";
import MyOrder from "./pages/MyOrder/MyOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { useState } from "react";
import Notification from "./Notification/Notification";


function App() {

    const [showLogin , setShowLogin] =useState(false);

    // const navigate = useNavigate();
    // const home = () => {
    //   navigate('/')
    // }
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <BrowserRouter>
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Placeorder" element={<Placeorder />} />
            <Route path="/myorder" element={<MyOrder />} />
          </Routes>
        </BrowserRouter>
      </div>
    <Notification/>
      <Footer />
    </>
  );
}

export default App;
