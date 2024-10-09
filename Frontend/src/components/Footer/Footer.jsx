import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  // const navigate = useNavigate();
  // const home = () => {
    
  // }
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente vero illum, ea beatae sunt nulla corrupti placeat? Optio doloremque deleniti quae voluptatibus temporibus accusamus nihil incidunt ea facilis culpa a minus consequatur voluptates rerum, facere eum similique id reprehenderit? Deleniti, voluptas.</p>
        
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
        </div>

        <div className="footer-content-center">
            <h2>COMPANY</h2>
            
                <a href="/">Home</a>
                <a href="#">About us</a>
                <a href="#">Delivery</a>
                <a href="#">Privacy policy</a>
            
        </div>
        <div className="footer-content-right">
            <h2>GETINTOUCH</h2>
            <ul>
                <li><FaPhoneAlt />  +1-212-456-7890</li>
                <li><MdOutlineEmail />  contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © Tomato.com - All Right Reserved.</p>
      
    </div>
  );
};

export default Footer;
