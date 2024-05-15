
// const products=require('../model/productModel')
const  Order= require('../model/orderModel');
const Cart = require('../model/cartModel');
const Product = require('../model/productModel');


const orderController={
   
  createOrder: async (req, res) => {
    try {
      const userId = req.user._id; // Assuming you have user authentication middleware setting req.user
      const products = req.body.products; // Extracting products array from req.body
      // console.log(products)

      if (!products || !Array.isArray(products) || products.length === 0) {
          return res.status(400).json({ error: 'Products array is required and should not be empty' });
      }

      if (!userId) {
          return res.status(401).json({ error: 'Unauthorized. User ID not found.' });
      }

      // Initialize an array to store product documents
      const productDocs = [];

      // Iterate over each product in the request body
      for (const productInfo of products) {
          const { productId, totalPrice, paymentId } = productInfo;
         

          if (!productId) {
              return res.status(400).json({ error: 'Product ID is required' });
          }

          // Find the product by ID
          const product = await Product.findById(productId);
          if (!product) {
              return res.status(404).json({ error: `Product with ID ${productId} not found` });
          }

          // Add the product document to the array
          productDocs.push({
              product: productId,
              totalPrice,
              paymentId
          });
      }

      // Find or create the order for the user
      let order = await Order.findOne({ user: userId, status: 'pending' });

      if (!order) {
          order = new Order({
              user: userId,
              products: [],
              status: 'pending'
          });
      }

      // Add the new products to the order
      order.products.push(...productDocs);
      console.log(order)

      // Save the updated order
      await order.save();

      return res.status(201).json({ message: 'Order updated successfully', order });
  } catch (error) {
      console.error(error);
      res.status(500).json({ status: "failed", error: error.message });
  }
},

    getOrders: async (req, res) => {
      try {
        // Assuming you have user authentication middleware setting req.user
        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized. User ID not found.' });
        }

        // Find all orders for the user and populate product details
        const orders = await Order.find({ user: userId }).populate({
            path: 'products.product',
            model: 'Product'
        });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for the user' });
        }

        return res.status(200).json({ message: 'Orders retrieved successfully', orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "failed", error: error.message });
    }
      },

      deleteOrder: async (req, res) => {
        try {
          const userId = req.user._id;
          const { productId } = req.body;
  
          // Verify if userId and productId are provided
          if (!userId || !productId) {
              return res.status(400).json({ error: 'User ID and Product ID are required' });
          }
  
          // Find the order for the user with status 'pending'
          const order = await Order.findOne({ user: userId, status: 'pending' });
  
          // If no order found or the order doesn't contain the specified product, return an error
          if (!order || !order.products.some(product => product.product.equals(productId))) {
              return res.status(404).json({ error: 'Product not found in the order' });
          }
  
          // Find the index of the product to be removed
          const productIndex = order.products.findIndex(product => product.product.equals(productId));
  
          // Remove the product from the order
          order.products.splice(productIndex, 1);
  
          // Update the totalPrice by deducting the price of the removed product
          const product = await Product.findById(productId);
          if (product) {
              order.totalPrice -= product.price;
          }
  
          // Save the updated order
          await order.save();
  
          return res.status(200).json({ message: 'Product removed from the order', order });
      } catch (error) {
          console.error(error);
          return res.status(500).json({ status: 'failed', error: error.message });
      }
      }

}

module.exports=orderController

