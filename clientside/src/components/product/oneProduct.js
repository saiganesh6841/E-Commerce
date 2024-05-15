// ProductDetailsPage.js
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { displayRazorpay } from '../payment';
import { baseURL } from '../../App';



function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const token=localStorage.getItem('TOKEN')

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/getProductById?id=${id}`);
        setProduct(response.data.data);
        // console.log(product.length)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (product) {
      const newTotalPrice = product.price * quantity;
      setTotalPrice(newTotalPrice);
    }
  }, [product, quantity]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addToCart = async () => {
    try {
        // Check if user is authenticated
        const token = localStorage.getItem('TOKEN');
        console.log(token)
        if (!token) {
          alert('User must be logged in to add items to cart.');
          return;
        }
  
        const response = await axios.post(
          `${baseURL}/addCart`,
          { productId: id }, // Assuming _id is the product ID
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
      }
  };

  const handleBuyNow = () => {
    const productDetails = [{
      productId: product._id,
      totalPrice: totalPrice
    }];

    displayRazorpay(productDetails, token);
  };

  

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', padding: '0 20px' }}>
  <Card style={{ maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', width: '100%' }}>
      <Card.Img variant="left" src={product.image} alt={product.title} style={{ height: "200px", width: "200px", margin: "auto" }} />
      <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
        <Card.Title style={{ color: "grey", fontSize: "30px", marginBottom: '10px' }}>{product.title}</Card.Title>
        <Card.Text>Price: ₹{product.price}</Card.Text>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
          <Button variant="outline-primary" onClick={decrementQuantity}>-</Button>
          <span style={{ margin: '0 10px' }}>{quantity}</span>
          <Button variant="outline-primary" onClick={incrementQuantity}>+</Button>
        </div>
        <Card.Text>Total Price: ₹{totalPrice}</Card.Text>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <Button variant="success" onClick={handleBuyNow}>Buy Now</Button>
          <FontAwesomeIcon icon={faCartPlus} style={{ marginLeft: '10px', fontSize: '30px', cursor: 'pointer' }} onClick={addToCart} />
        </div>
        <div style={{ padding: '20px', width: '100%' }}>
      <Card.Text>{product.description}</Card.Text>
    </div>
      </div>
    </div>
   
  </Card>
</div>

  );
}

export default ProductDetailsPage;
