import React from 'react'
import './Header.css';
import { useState } from 'react';
const Header = () => {
const [itemmenu,setItemenu] = useState('menu');
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. your cravings and elevate your dining experience, one delicious meal at a time.</p>
       <a href="#explore-menu"><button onClick={()=>setItemenu('menu')}>View Menu</button></a>
      </div>
    </div>
  )
}

export default Header;
