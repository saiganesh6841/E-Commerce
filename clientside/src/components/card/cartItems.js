import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';
import { Button } from 'react-bootstrap';
import { displayRazorpay } from '../payment';
import { useDispatch } from 'react-redux';
import { baseURL } from '../../App';

export const cartCount=createContext()
function CartDetails() {
    const [cartDetails, setCartDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const token = localStorage.getItem('TOKEN');
    

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                

                if (!token) {
                    alert('User must be logged in to view cart details.');
                    return;
                }
                const response = await axios.post(
                    `${baseURL}/getCart`, {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log(response.data.cart.products)
                  
                const productsWithQuantity = response.data.cart.products.map(product => ({
                    ...product,
                    quantity: 1 // Initialize quantity for each product
                }));

                // Assuming response.data is an array of cart items
                setCartDetails(productsWithQuantity);
            } catch (error) {
                console.error('Error fetching cart details:', error);
            } finally {
                setLoading(false); // Update loading state regardless of success or failure
            }
        };

        fetchCartDetails();
    }, []);
console.log(cartDetails);
    useEffect(() => {
        if (cartDetails) {
            // Calculate total price
            let totalPrice = 0;
            cartDetails.forEach(product => {
                totalPrice += parseFloat(product.price) * product.quantity;
            });
            setTotalPrice(totalPrice);
        }
    }, [cartDetails]);
    const removeFromCart = async (productId) => {
        try {
            const token = localStorage.getItem('TOKEN');

            if (!token) {
                alert('User must be logged in to remove items from the cart.');
                return;
            }

            const response = await axios.post(
                `${baseURL}/deleteCart`,
                { productId:productId }, // Assuming _id is the product ID
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log('Item removed from cart:', response.data);
            alert(response.data.message)
            setCartDetails(prevCartDetails => prevCartDetails.filter(item => item._id !== productId));

        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };


    const incrementQuantity = (index) => {
        const updatedCart = [...cartDetails];
        updatedCart[index].quantity++;
        setCartDetails(updatedCart);
    };
    
    const decrementQuantity = (index) => {
        const updatedCart = [...cartDetails];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity--;
            setCartDetails(updatedCart);
        }
    };
    

  

    if (!cartDetails) {
        return <p>Loading cart details...</p>;
    }

    // Render cart details once data is fetched
    return (
        <>
        {/* <div>Total Price: ₹{totalPrice}</div> */}
        <cartCount.Provider value={cartDetails}>
        <div class="container-fluid p-4 my-2 bg-dark text-white rounded-3 fs-5" style={{wordSpacing:"5px",display:"flex",justifyContent:"space-between"}}>
                <p >Total Price : <b style={{marginLeft:"2px"}}>{totalPrice}₹</b></p>

            {/* <p style={{color:"orange", border:"1px solid orange",padding:"1px",}}>Click Here to Checkout</p> */}

            <button style={{padding:"5px",}} className="btn btn-primary" onClick={()=>{
                displayRazorpay(cartDetails,token)
            }}>Click Here to Checkout</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2%", justifyContent: "space-evenly", padding: "2%" }}>
    {cartDetails && cartDetails.length > 0 ? (
        cartDetails.map((product, index) => (
            <div key={index} className="card" style={{ display: "flex", flexDirection: "row", gap: "5%", padding: "2%", border: "1px solid #ccc", borderRadius: "5px" }}>
                <div style={{ flex: "2" }}>
                    <img className="card-img-top" src={product.image} alt="Card image" style={{ width:"100%", height:"100%", objectFit: "cover"}} />
                </div>
                <div className="card-body" style={{ flex: "3", display: "flex", flexDirection: "column" }}>
                    <h4 className="card-title">{product.title.slice(0, 10)}</h4>
                    <p className="card-text">Price: <b>{parseInt(product.price)} ₹</b></p>
                    <p className="card-text">Total Price: <b>{parseFloat(product.price) * product.quantity}  ₹</b></p>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                        <button className="btn btn-dark" onClick={() => decrementQuantity(index)}>-</button>
                        <span style={{ marginRight: "20px", marginLeft: "20px" }}><b>{product.quantity}</b></span>
                        <button className="btn btn-dark" onClick={() => incrementQuantity(index)}>+</button>
                    </div>
                    <br></br>
                    <button className="btn btn-danger" onClick={() => removeFromCart(product._id)}>Remove from Cart</button>
                </div>
            </div>
        ))
    ) : (
        <h1>No Products in Cart</h1>
    )}
</div>

        </cartCount.Provider>
        </>
    );
}

export default CartDetails;
