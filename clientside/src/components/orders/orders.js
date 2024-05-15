import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../App";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('TOKEN'); // Ensure you use the correct key for your token

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.post(`${baseURL}/getOrders`,{}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Update orders state with response data
                console.log(response.data.orders)
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        // Fetch orders when component mounts
        if (token) {
            fetchOrders();
        }
    }, [token]); // Ensure useEffect runs whenever token changes

    return (
      <>
          <h2>Your Orders</h2>
            {orders.length > 0 ? (
                <div className="row">
                    {orders.map(order => (
                        <div key={order._id} className="col-md-6">
                            <div className="card mb-3">
                                <div className="card-body">
                                    {order.products.map(product => (
                                        <div key={product._id} className="row mb-3">
                                            <div className="col-md-4">
                                                <img src={product.product.image} className="img-fluid" alt={product.product.title} />
                                            </div>
                                            <div className="col-md-8">
                                                <h5 className="card-title">Title: {product.product.title}</h5>
                                                <p className="card-text">Total Price: {product.totalPrice}</p>
                                                <p className="card-text">Payment ID: {product.paymentId}</p>
                                                {/* Add more product details as needed */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No orders found.</p>
            )}
        </>
    );
}

export default Order;
