import React from 'react'
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Notification = () => {
  return (
    <div>
      <ToastContainer position='top-right' style={{marginTop: "100px"}}/>
    </div>
  )
}

export default Notification;
