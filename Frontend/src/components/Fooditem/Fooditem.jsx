
import './Fooditem.css';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Fooditem = ({ id, name, price, description, image }) => {
  const { cartItems, addTocart, removeFromCart } = useContext(StoreContext);

  // Safe access to the quantity of the item in the cart
  const itemQuantity = cartItems && cartItems[id] ? cartItems[id] : 0;

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={image} alt={name} />
        {itemQuantity === 0 ? (
          <button className='add' onClick={() => addTocart(id)}>ADD TO CART</button>
        ) : (
          <div className="food-item-counter">
            <img 
              onClick={() => removeFromCart(id)} 
              src={assets.remove_icon_red} 
              alt="Remove" 
            />
            <p>{itemQuantity}</p>
            <img 
              onClick={() => addTocart(id)} 
              src={assets.add_icon_green} 
              alt="Add" 
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default Fooditem;




// import './Fooditem.css';
// import { assets } from '../../assets/assets';
// import {  useContext} from 'react';
// import { StoreContext } from '../../context/StoreContext';


// const Fooditem = ({id,name,price,description,image}) => {

// const {cartItems,addTocart,removeFromCart} = useContext(StoreContext);
  
//   return (
//     <div className='food-item'>
//       <div className="food-item-img-container">
//         <img className='food-item-image' src={image} alt="" />
//         {!cartItems[id]
//               // <img onClick={()=>addTocart(id)} src={assets.add_icon_white} alt="" />
//               ?<button  className='add' onClick={()=>addTocart(id)}>ADD TO CART</button> 
//               :<div className="food-item-counter">
//                   <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
//                   <p>{cartItems[id]}</p>
//                   <img onClick={()=>addTocart(id)} src={assets.add_icon_green} alt="" />
//               </div>
//         }
//       </div>
//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="" />
//         </div>
//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">₹{price}</p>
//       </div>
//     </div>
//   )
// }

// export default Fooditem







