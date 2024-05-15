
import axios from "axios";
// import styles from "./items.module.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../App";

const Items=({data})=>{
  
    const {image,title,price,_id}=data
    // console.log(_id)
    const [addingToCart, setAddingToCart] = useState(false);

    const addToCart = async () => {
      try {
        // Check if user is authenticated
        const token = localStorage.getItem('TOKEN');
        console.log(token)
        if (!token) {
          alert('User must be logged in to add items to cart.');
          return;
        }
  
        // Set loading state
        setAddingToCart(true);
  
        // Make API call to add product to cart
        const response = await axios.post(
          `${baseURL}/addCart`,
          { productId: _id }, // Assuming _id is the product ID
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        // Handle success response
        console.log('Product added to cart:', response.data);
        alert(response.data.message)
      } catch (error) {
        // Handle error
        console.error('Error adding product to cart:', error.response);
        alert(error.response.data.error)
        // setError('Failed to add product to cart. Please try again.');
      } finally {
        // Reset loading state
        setAddingToCart(false);
      }
    };
  


    return(
        <>
 <div className="card" style={{ width: "100%", maxWidth: "250px" }}>
  <div className="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
    <img src={image} className="img-fluid" style={{ width: "100%", height: "200px", objectFit: "cover" }} alt="Product" />
    <Link to={`/product/${_id}`}>
      <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
    </Link>
  </div>
  <div className="card-body">
    <Link to={`/product/${_id}`}>
      <h5 className="card-title">{title}</h5>
    </Link>
    <br />
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
      <span style={{ fontSize: "25px", color: "blue" }}>₹{price}</span>
      <button className="btn btn-primary" onClick={addToCart} style={{ padding: "0" }}>
        <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/cart-1480736-1253691.png?f=webp&w=256" style={{ width: "30px", height: "30px", backgroundColor: "none", color: "white" }} alt="Add To Cart" />
      </button>
    </div>
  </div>
</div>

        </>
    )
}

export default Items;