
const mongoose=require("mongoose")


const productSchema = new mongoose.Schema({
 
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
        type: String,
        required: true
      },
    price: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      default: 2 // Default value if not provided
    },
    category: {
      type: String,
      required: true
    },
    stock: {
        type: Number,
        required: true
      },
   
  });


  
  const Product = mongoose.model('Product', productSchema);
  
  module.exports = Product;