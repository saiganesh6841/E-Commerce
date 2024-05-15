
const products=require('../model/productModel')
const Cart = require('../model/cartModel');

const cartController={
//add the products in cart
    addCart: async(req,res)=>{
      try {
        const userId = req.user._id;
        const { productId } = req.body;
  
        if (!productId) {
          return res.status(400).json({ error: 'Product ID is required' });
        }
        if (!userId) {
          return res.status(401).json({ error: 'Unauthorized. User ID not found.' });
        }
  
        const product = await products.findById(productId);
  
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
  
        let cart = await Cart.findOne({ user: userId });
  
        if (!cart) {
          cart = new Cart({ user: userId, products: [] });
        }
  
        if (cart.products.includes(productId)) {
          return res.status(400).json({ error: 'Product already exists in the cart' });
        }
  
        cart.products.push(productId);
  
        await cart.save();
  
        return res.status(201).json({ message: 'Product added to cart successfully', cart });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'failed', error: error.message });
      }
    },
    //delete cart 
    deleteCart: async (req, res) => {
      try {
        const userId = req.user._id;
        const { productId } = req.body;
  
        if (!userId || !productId) {
          return res.status(400).json({ error: 'User ID and Product ID are required' });
        }
  
        const cart = await Cart.findOne({ user: userId });
  
        if (!cart || !cart.products.includes(productId)) {
          return res.status(404).json({ error: 'Product not found in the cart' });
        }
  
        cart.products.pull(productId);
  
        await cart.save();
  
        return res.status(200).json({ message: 'Product removed from the cart', cart });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'failed', error: error.message });
      }
      },
      //get cart details
    getCart: async (req, res) => {
      try {
        const userId = req.user._id;
  
        const cart = await Cart.findOne({ user: userId }).populate('products');
  
        return res.status(200).json({ cart });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'failed', error: error.message });
      }
      },

      clearCart: async (req, res) => {
        try {
          const userId = req.user._id;
    
          if (!userId) {
            return res.status(401).json({ error: 'Unauthorized. User ID not found.' });
          }
    
          const cart = await Cart.findOne({ user: userId });
    
          if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
          }
    
          cart.products = []; // Remove all products from the cart
    
          await cart.save();
    
          return res.status(200).json({ message: 'Cart cleared successfully', cart });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ status: 'failed', error: error.message });
        }
      }
}

module.exports=cartController