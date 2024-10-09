import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:8000";
  const [token, setToken] = useState("");

  const addTocart = async (id) => {
    // Check if the item exists in cartItems and initialize it if it doesn't
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (!updatedCart[id]) {
        updatedCart[id] = 1; // Add the item with quantity 1 if it doesn't exist
        toast.success("Added To Cart Successfully");
      } else {
        updatedCart[id] += 1; // Increment the quantity if it exists
      }
      return updatedCart; // Return the updated cartItems
    });

    // If there's a token, post the add to cart action
    if (token) {
      await axios.post(url + "/api/cart/add", { id }, { headers: { token } });
    }
  };

  const removeFromCart = async (id) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[id] > 1) {
        updatedCart[id] -= 1; // Decrement quantity if more than 1
      } else {
        delete updatedCart[id]; // Remove item if quantity is 1
      }
      return updatedCart;
    });

    if (token) {
      await axios.post(url + "/api/cart/remove", { id }, { headers: { token } });
    }
  };

  const CartIconNumber = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalAmount += cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartQuantity = () => {
    let totalQuantity = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalQuantity += cartItems[item];
      }
    }
    return totalQuantity;
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData || {}); // Safely set cart data
  };

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        setToken(token);
        await loadCartData(token);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addTocart,
    removeFromCart,
    CartIconNumber,
    getTotalCartAmount,
    getTotalCartQuantity,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;



// import { createContext,useState,useEffect } from "react";
// import { food_list } from "../assets/assets";
// import { toast } from "react-toastify";
// import axios from "axios"

// export const StoreContext = createContext(null)
// const StoreContextProvidar =(props) =>{

//     const [cartItems,setCartItems] = useState({});
//      const url = "http://localhost:8000"
//     //  const [food_list,setFoodList] = useState([])
//      const [token,setToken] = useState("");

//     const addTocart = async (id) => {
//         if (!cartItems[id]) {
//          setCartItems((prev)=>({...prev,[id]:1}))
//          toast.success("Add To Cart Successfully")
//         }
//        else{
//          setCartItems((prev)=>({...prev,[id]:prev[id]+1}))
//         }
//         if(token){
//           await axios.post(url+"/api/cart/add",{id},{headers:{token}})
//         }
//     }
    
//     const removeFromCart = async (id)=>{
//       setCartItems((prev)=>({...prev,[id]:prev[id]-1}));
//       if (token) {
//         await axios.post(url+"/api/cart/remove",{id},{headers:{token}})
//       }
//     }

    
//     const CartIconNumber = () =>{
//       let TotalAmount = 0;
//       for(const item in cartItems)
//       {
//         if(cartItems[item]>0){
         
//           TotalAmount += cartItems[item];

//         }
    
//       }
//       return TotalAmount;
//     }


    
//     const getTotalCartAmount = () =>{
//       let TotalAmount = 0;
//       for(const item in cartItems)
//       {
//         if(cartItems[item]>0){
//           let itemInfo = food_list.find((product)=>product._id === item);
//           TotalAmount += itemInfo.price*  cartItems[item];

//         }
    
//       }
//       return TotalAmount;
//     }

    
    
    
//       const getTotalCartQuantity = () => {
//         let totalQuantity = 0;
//         for (const item in cartItems) {
//           if (cartItems[item] > 0) {
//             totalQuantity += cartItems[item];
//           }
//         }
//         return totalQuantity;
//       };

     
    
    
//       const loadCartData = async (token) => {
//         const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
//         setCartItems(response.data.cartData);
//     }

//     useEffect(()=>{
//       async function loadData(){
        
//         if(localStorage.getItem("token")){
//           setToken(localStorage.getItem("token"));
//           await loadCartData(localStorage.getItem("token"));
//         }
//       }
//       loadData();
//     },[])



//     const contextValue = {
//        food_list,
//        cartItems,
//        setCartItems,
//        addTocart,
//        removeFromCart,
//        CartIconNumber,
//        getTotalCartAmount,
//        getTotalCartQuantity,
//        url,
//        token,
//        setToken,
       
//     }
//     return(
//        <StoreContext.Provider value={contextValue}>
//             {props.children}
//        </StoreContext.Provider>

//     )

    
// }
// export default StoreContextProvidar;





