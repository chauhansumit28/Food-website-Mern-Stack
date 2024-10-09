import React, { useContext, useState } from 'react'
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import Swal from 'sweetalert2';
 
const LoginPopup = ({setShowLogin}) => {

  const { url, setToken } = useContext(StoreContext);

  const [currstate, setCurrstate] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
    
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(data => ({ ...data, [name]: value }));
  }


  const onLogin = async (event) =>{
    event.preventDefault()
    let newUrl = url;
    if (currstate==="Login"){
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl,data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("user._id", response.data.userId);
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
}


//reset api connect
  const handelResetPassword = async () => {
    if (!data.email) {
      alert('Please enter your email for password reset');
      return;
    }
  
    try {
      const response = await axios.post(`${url}/api/user/reset`, { email: data.email });
      if (response.status === 200) {
        // alert("Password reset email sent. Please check your inbox.");
        Swal.fire({
          icon: 'success',
          title: 'Reset Password',
          text: 'Password reset email sent. Please check your inbox.',
        });
      }
    } catch (error) {
      alert("Error sending reset email. Please try again later.");
    }
  }
  

    
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currstate}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div> 
        <div className="login-popup-inputs">
          {currstate === "Login" ? null : (
            <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your name' required />
          )}

          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email'  required  />
          <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Your password' required />
        </div>
        <button type='submit'>{currstate === "Sign Up" ? "Create account" : "Login "}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required /> 
          <p>By continuing, I agree to the terms of use & privacy policy.</p> 
        </div>
        {currstate === "Login" ? (
          <p>Create a new account? <span onClick={() => setCurrstate("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account?<span onClick={() => setCurrstate("Login")}>Login here</span></p>
          
        )}
        <p> Reset  Password? <span onClick={handelResetPassword}>Reset here</span></p>
      </form>
    </div>
  );
}

export default LoginPopup;







