const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true // Ensure product is required for an order item
    },
    totalPrice: {
        type: Number,
        required: true // Ensure totalPrice is required for an order item
    },
    paymentId: {
        type: String,
        required: true // Ensure paymentId is required for an order item
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending'
    },
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Ensure user is required for an order
    },
    products: [productSchema], // Array of product items
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
